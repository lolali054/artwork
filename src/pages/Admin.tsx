import { useState } from 'react';
import { Painting, paintings, getAllPaintings } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArtworkForm from '@/components/admin/ArtworkForm';
import { Edit, Trash2, Plus } from 'lucide-react';

// Note: This is a simplified admin interface for demonstration purposes
// In a real application, this would be protected by authentication
// and would use API calls to manage the data

const Admin = () => {
  const [allPaintings, setAllPaintings] = useState<Painting[]>(getAllPaintings());
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  const handleEditClick = (painting: Painting) => {
    setSelectedPainting(painting);
    setIsEditing(true);
    setIsAddingNew(false);
  };
  
  const handleAddNewClick = () => {
    setSelectedPainting(null);
    setIsEditing(false);
    setIsAddingNew(true);
  };
  
  const handleDeleteClick = (id: string) => {
    // In a real application, this would make an API call
    // For this demo, we'll just update the local state
    if (confirm('Êtes-vous sûr de vouloir supprimer cette œuvre?')) {
      setAllPaintings(prev => prev.filter(p => p.id !== id));
    }
  };
  
  const handleSubmit = (artworkData: Omit<Painting, 'id'>) => {
    // In a real application, this would make an API call
    
    if (isEditing && selectedPainting) {
      // Update existing painting
      const updatedPaintings = allPaintings.map(p => 
        p.id === selectedPainting.id ? { ...p, ...artworkData } : p
      );
      setAllPaintings(updatedPaintings);
      alert('Œuvre mise à jour avec succès!');
    } else if (isAddingNew) {
      // Add new painting
      const newId = (Math.max(...allPaintings.map(p => parseInt(p.id))) + 1).toString();
      const newPainting = { id: newId, ...artworkData };
      setAllPaintings(prev => [...prev, newPainting]);
      alert('Nouvelle œuvre ajoutée avec succès!');
    }
    
    // Reset form state
    setIsEditing(false);
    setIsAddingNew(false);
    setSelectedPainting(null);
  };
  
  return (
    <div className="min-h-screen page-transition">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="bg-gallery-100 py-12 md:py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center animate-fade-up">
              <h1 className="text-3xl md:text-5xl font-serif">Administration</h1>
              <p className="mt-4 text-gallery-700">
                Gérez les œuvres d'art de la galerie
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-6">
            {(isEditing || isAddingNew) ? (
              <div className="mb-8">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setIsAddingNew(false);
                    setSelectedPainting(null);
                  }}
                  className="px-4 py-2 border border-gallery-300 rounded-md hover:bg-gallery-50 transition-colors"
                >
                  Retour à la liste
                </button>
                
                <div className="mt-6">
                  <ArtworkForm 
                    onSubmit={handleSubmit}
                    initialData={selectedPainting || undefined}
                    isEditing={isEditing}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif">Œuvres d'Art</h2>
                  <button
                    onClick={handleAddNewClick}
                    className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors flex items-center"
                  >
                    <Plus size={18} className="mr-2" />
                    Ajouter une Œuvre
                  </button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gallery-200">
                    <thead className="bg-gallery-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gallery-500 uppercase tracking-wider">
                          Image
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gallery-500 uppercase tracking-wider">
                          Titre
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gallery-500 uppercase tracking-wider">
                          Prix
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gallery-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gallery-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gallery-200">
                      {allPaintings.map((painting) => (
                        <tr key={painting.id} className="hover:bg-gallery-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-16 w-16 rounded overflow-hidden">
                              <img 
                                src={painting.imageUrl} 
                                alt={painting.title} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gallery-900">{painting.title}</div>
                            <div className="text-sm text-gallery-500">{painting.medium}, {painting.year}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gallery-900">{painting.price.toLocaleString()} $</div>
                            <div className="text-sm text-gallery-500">{painting.dimensions}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              painting.sold 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {painting.sold ? 'Vendu' : 'Disponible'}
                            </span>
                            {painting.featured && (
                              <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                En vedette
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleEditClick(painting)}
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(painting.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 text-sm text-gallery-500">
                  <p>
                    Note: Cette interface d'administration est une démonstration. Dans une application réelle, 
                    elle serait protégée par une authentification et utiliserait des appels API pour gérer les données.
                  </p>
                  <p className="mt-2">
                    Les modifications apportées ici ne sont pas persistantes et seront perdues lors du rechargement de la page.
                  </p>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
