import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VirtualGallery from '@/components/gallery3d/VirtualGallery';
import SelectionCart from '@/components/gallery3d/SelectionCart';
import { getAllPaintings, Painting } from '@/lib/data';

const VirtualGalleryPage: React.FC = () => {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [selectedPaintings, setSelectedPaintings] = useState<Painting[]>([]);
  const [showInstructions, setShowInstructions] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
    
    // Get all paintings
    const allPaintings = getAllPaintings();
    setPaintings(allPaintings);
    
    // Check if user has visited the page before
    const hasVisitedBefore = localStorage.getItem('hasVisitedVirtualGallery');
    if (hasVisitedBefore) {
      setShowInstructions(false);
    } else {
      localStorage.setItem('hasVisitedVirtualGallery', 'true');
    }
  }, [location]);
  
  const handleAddToSelection = (painting: Painting) => {
    // Check if painting is already in selection
    if (!selectedPaintings.some(p => p.id === painting.id) && !painting.sold) {
      setSelectedPaintings([...selectedPaintings, painting]);
    }
  };
  
  const handleRemoveFromSelection = (paintingId: string) => {
    setSelectedPaintings(selectedPaintings.filter(p => p.id !== paintingId));
  };
  
  const handleCheckout = () => {
    // Redirect to contact form with selected paintings
    const paintingIds = selectedPaintings.map(p => p.id).join(',');
    window.location.href = `/#contact?paintings=${paintingIds}`;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 relative">
        {/* Virtual Gallery Experience */}
        <VirtualGallery 
          paintings={paintings} 
        />
        
        {/* Selection Cart */}
        <SelectionCart 
          selectedPaintings={selectedPaintings}
          onRemoveFromSelection={handleRemoveFromSelection}
          onCheckout={handleCheckout}
        />
        
        {/* First-time Instructions */}
        {showInstructions && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full p-8">
              <h2 className="text-2xl font-serif text-gallery-800 mb-4">Bienvenue dans la Galerie Virtuelle</h2>
              
              <div className="space-y-4 text-gallery-700">
                <p>
                  Explorez les œuvres d'art de Cindy Roy-Boutin dans notre espace virtuel immersif.
                </p>
                
                <div className="bg-gallery-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gallery-800 mb-2">Comment naviguer :</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Utilisez les touches <span className="font-mono bg-gallery-100 px-1 rounded">W</span>, <span className="font-mono bg-gallery-100 px-1 rounded">A</span>, <span className="font-mono bg-gallery-100 px-1 rounded">S</span>, <span className="font-mono bg-gallery-100 px-1 rounded">D</span> pour vous déplacer</li>
                    <li>Cliquez et faites glisser pour regarder autour de vous</li>
                    <li>Cliquez sur une œuvre d'art pour voir les détails</li>
                    <li>Utilisez les contrôles en bas de l'écran pour changer de mode de navigation</li>
                  </ul>
                </div>
                
                <p>
                  Vous pouvez ajouter des œuvres à votre sélection et demander plus d'informations à tout moment.
                </p>
              </div>
              
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowInstructions(false)}
                  className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-md transition-colors"
                >
                  Commencer la visite
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default VirtualGalleryPage;
