import { useState } from 'react';
import { Painting } from '@/lib/data';

interface ArtworkFormProps {
  onSubmit: (artwork: Omit<Painting, 'id'>) => void;
  initialData?: Painting;
  isEditing?: boolean;
}

const ArtworkForm = ({ onSubmit, initialData, isEditing = false }: ArtworkFormProps) => {
  const [formData, setFormData] = useState<Omit<Painting, 'id'>>({
    title: initialData?.title || '',
    artist: initialData?.artist || 'Cindy Roy-Boutin',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    dimensions: initialData?.dimensions || '',
    medium: initialData?.medium || '',
    year: initialData?.year || new Date().getFullYear(),
    imageUrl: initialData?.imageUrl || '',
    featured: initialData?.featured || false,
    sold: initialData?.sold || false,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(initialData?.imageUrl || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Generate a filename based on the next ID and title
      const filename = formData.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      
      // This is just for display - actual file handling would be done on submission
      setFormData(prev => ({ 
        ...prev, 
        imageUrl: `/images/artwork/${filename}.jpg` 
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, you would upload the image file here
    // and then update the imageUrl with the actual path
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-serif mb-4">
          {isEditing ? 'Modifier une Œuvre' : 'Ajouter une Nouvelle Œuvre'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gallery-700 mb-1">
                Titre
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gallery-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent outline-none"
              />
            </div>
            
            <div>
              <label htmlFor="medium" className="block text-sm font-medium text-gallery-700 mb-1">
                Médium
              </label>
              <input
                type="text"
                id="medium"
                name="medium"
                value={formData.medium}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gallery-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                placeholder="Huile sur toile, Acrylique, etc."
              />
            </div>
            
            <div>
              <label htmlFor="dimensions" className="block text-sm font-medium text-gallery-700 mb-1">
                Dimensions (cm)
              </label>
              <input
                type="text"
                id="dimensions"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gallery-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                placeholder="60 x 90 cm"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gallery-700 mb-1">
                  Prix ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="50"
                  className="w-full px-4 py-2 border border-gallery-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                />
              </div>
              
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gallery-700 mb-1">
                  Année
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  min="2000"
                  max={new Date().getFullYear()}
                  className="w-full px-4 py-2 border border-gallery-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4 w-4 text-accent focus:ring-accent border-gallery-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 text-sm text-gallery-700">
                  Mettre en avant
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sold"
                  name="sold"
                  checked={formData.sold}
                  onChange={handleChange}
                  className="h-4 w-4 text-accent focus:ring-accent border-gallery-300 rounded"
                />
                <label htmlFor="sold" className="ml-2 text-sm text-gallery-700">
                  Vendu
                </label>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gallery-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gallery-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent outline-none"
              />
            </div>
            
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gallery-700 mb-1">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gallery-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent outline-none"
              />
              
              {previewUrl && (
                <div className="mt-2 relative aspect-[3/4] w-full max-w-[200px] overflow-hidden rounded-md border border-gallery-200">
                  <img 
                    src={previewUrl} 
                    alt="Aperçu" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <p className="mt-1 text-sm text-gallery-500">
                L'image sera enregistrée dans /public/images/artwork/
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-accent hover:bg-accent-dark text-white rounded-md transition-colors"
          >
            {isEditing ? 'Mettre à Jour' : 'Ajouter l\'Œuvre'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ArtworkForm;
