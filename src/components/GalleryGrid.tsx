
import ArtCard from './ArtCard';
import { Painting } from '@/lib/data';

interface GalleryGridProps {
  paintings: Painting[];
}

const GalleryGrid = ({ paintings }: GalleryGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {paintings.map((painting, index) => (
        <ArtCard key={painting.id} painting={painting} index={index} />
      ))}
    </div>
  );
};

export default GalleryGrid;
