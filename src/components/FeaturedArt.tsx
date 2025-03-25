
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Painting } from '@/lib/data';

interface FeaturedArtProps {
  paintings: Painting[];
}

const FeaturedArt = ({ paintings }: FeaturedArtProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const currentPainting = paintings[currentIndex];
  
  const handleNext = () => {
    setIsImageLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % paintings.length);
  };
  
  const handlePrev = () => {
    setIsImageLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + paintings.length) % paintings.length);
  };
  
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-sm font-sans uppercase tracking-wider text-gallery-600 animate-fade-up">Featured Work</h2>
            <h3 className="text-3xl md:text-4xl font-serif mt-1 animate-fade-up" style={{ animationDelay: '100ms' }}>
              Highlighted Pieces
            </h3>
          </div>
          <Link 
            to="/gallery" 
            className="group flex items-center mt-4 md:mt-0 text-sm font-medium animate-fade-up"
            style={{ animationDelay: '200ms' }}
          >
            View all artwork
            <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="relative overflow-hidden rounded-lg bg-white shadow-xl">
          <div className="aspect-[16/9] md:aspect-[21/9] w-full relative">
            {paintings.map((painting, index) => (
              <div 
                key={painting.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img 
                  src={painting.imageUrl}
                  alt={painting.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                    isImageLoaded ? "scale-100 animate-image-load" : "scale-105 blur-sm"
                  }`}
                  onLoad={() => setIsImageLoaded(true)}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 text-white z-20">
                  <div className="animate-fade-up max-w-2xl" style={{ animationDelay: '300ms' }}>
                    <h3 className="text-lg font-sans tracking-wider uppercase text-white/80">
                      {painting.medium}
                    </h3>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mt-2">
                      {painting.title}
                    </h2>
                    <p className="mt-2 md:mt-4 text-white/90 max-w-prose text-sm md:text-base line-clamp-2 md:line-clamp-3">
                      {painting.description}
                    </p>
                    <Link 
                      to={`/painting/${painting.id}`}
                      className="inline-block mt-4 md:mt-6 px-6 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-md transition-colors duration-300"
                    >
                      View Artwork
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation controls */}
          <button 
            onClick={handlePrev}
            className="absolute top-1/2 left-4 z-20 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition-colors duration-300"
            aria-label="Previous artwork"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute top-1/2 right-4 z-20 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition-colors duration-300"
            aria-label="Next artwork"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Pagination dots */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {paintings.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white w-4" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArt;
