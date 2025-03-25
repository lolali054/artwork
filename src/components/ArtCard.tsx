import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Painting } from '@/lib/data';

interface ArtCardProps {
  painting: Painting;
  index: number;
}

const ArtCard = ({ painting, index }: ArtCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const animationDelay = `${index * 100}ms`;
  
  return (
    <div 
      className="art-card rounded-lg overflow-hidden bg-white shadow-md animate-fade-up"
      style={{ animationDelay }}
    >
      <Link to={`/painting/${painting.id}`} className="block relative">
        <div className="aspect-[4/3] overflow-hidden bg-gallery-50 flex items-center justify-center">
          <img 
            src={painting.imageUrl}
            alt={painting.title}
            className={`art-image w-full h-auto object-contain transition-all duration-700 ${
              isImageLoaded ? "scale-100" : "scale-105 blur-sm"
            }`}
            onLoad={() => setIsImageLoaded(true)}
            style={{ maxHeight: '100%' }}
          />
        </div>
        
        {painting.sold && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
            Vendu
          </div>
        )}
      </Link>
      
      <div className="p-4">
        <Link to={`/painting/${painting.id}`}>
          <h3 className="font-serif text-xl hover:text-accent-dark transition-colors">
            {painting.title}
          </h3>
        </Link>
        <p className="text-gallery-700 text-sm mt-1">{painting.medium}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="font-medium text-lg">
            {painting.price.toLocaleString()} $
          </span>
          <Link 
            to={`/painting/${painting.id}`}
            className="text-sm text-accent hover:text-accent-dark transition-colors"
          >
            Voir Détails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
