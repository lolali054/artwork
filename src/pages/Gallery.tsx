import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryGrid from '@/components/GalleryGrid';
import { getAllPaintings, Painting } from '@/lib/data';

const Gallery = () => {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [filteredPaintings, setFilteredPaintings] = useState<Painting[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterShown, setFilterShown] = useState(false);
  const [filters, setFilters] = useState({
    medium: 'all',
    priceRange: 'all',
    availability: 'all',
  });
  
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
    
    // Get all paintings
    const allPaintings = getAllPaintings();
    setPaintings(allPaintings);
    setFilteredPaintings(allPaintings);
  }, [location]);
  
  // Filter paintings based on search and filters
  useEffect(() => {
    let result = paintings;
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        painting =>
          painting.title.toLowerCase().includes(query) ||
          painting.description.toLowerCase().includes(query) ||
          painting.medium.toLowerCase().includes(query)
      );
    }
    
    // Filter by medium
    if (filters.medium !== 'all') {
      result = result.filter(painting => 
        painting.medium.toLowerCase().includes(filters.medium.toLowerCase())
      );
    }
    
    // Filter by price range
    if (filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case 'under1000':
          result = result.filter(painting => painting.price < 1000);
          break;
        case '1000to2000':
          result = result.filter(painting => painting.price >= 1000 && painting.price <= 2000);
          break;
        case 'over2000':
          result = result.filter(painting => painting.price > 2000);
          break;
      }
    }
    
    // Filter by availability
    if (filters.availability !== 'all') {
      const isAvailable = filters.availability === 'available';
      result = result.filter(painting => isAvailable ? !painting.sold : painting.sold);
    }
    
    setFilteredPaintings(result);
  }, [searchQuery, filters, paintings]);
  
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  // Extract unique medium values for filter
  const mediums = [...new Set(paintings.map(painting => painting.medium))];
  
  return (
    <div className="min-h-screen page-transition">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Gallery Header */}
        <section className="bg-gallery-100 py-12 md:py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center animate-fade-up">
              <h1 className="text-3xl md:text-5xl font-serif">La Galerie</h1>
              <p className="mt-4 text-gallery-700">
                Explorez la collection complète des peintures de paysages de Cindy Roy-Boutin. 
                Chaque pièce capture un moment unique dans la nature.
              </p>
            </div>
          </div>
        </section>
        
        {/* Gallery Filters */}
        <section className="py-8 border-b border-gallery-200">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-up">
              <div className="w-full md:w-64">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher une œuvre..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 border border-gallery-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  />
                </div>
              </div>
              
              <button
                onClick={() => setFilterShown(!filterShown)}
                className="md:hidden flex items-center px-4 py-2 border border-gallery-300 rounded-md bg-white"
              >
                <Filter size={18} className="mr-2" />
                Filtres
              </button>
              
              <div className={`${filterShown ? 'flex' : 'hidden'} md:flex flex-wrap gap-4`}>
                {/* Medium Filter */}
                <div>
                  <select
                    value={filters.medium}
                    onChange={(e) => handleFilterChange('medium', e.target.value)}
                    className="px-4 py-2 border border-gallery-300 rounded-md bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  >
                    <option value="all">Tous les Médiums</option>
                    {mediums.map((medium) => (
                      <option key={medium} value={medium.toLowerCase()}>
                        {medium}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Price Range Filter */}
                <div>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="px-4 py-2 border border-gallery-300 rounded-md bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  >
                    <option value="all">Tous les Prix</option>
                    <option value="under1000">Moins de 1 000 $</option>
                    <option value="1000to2000">1 000 $ - 2 000 $</option>
                    <option value="over2000">Plus de 2 000 $</option>
                  </select>
                </div>
                
                {/* Availability Filter */}
                <div>
                  <select
                    value={filters.availability}
                    onChange={(e) => handleFilterChange('availability', e.target.value)}
                    className="px-4 py-2 border border-gallery-300 rounded-md bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  >
                    <option value="all">Toute Disponibilité</option>
                    <option value="available">Disponible</option>
                    <option value="sold">Vendu</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Gallery Grid */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            {filteredPaintings.length > 0 ? (
              <GalleryGrid paintings={filteredPaintings} />
            ) : (
              <div className="text-center py-12 animate-fade-up">
                <h3 className="text-xl font-serif">Aucune œuvre ne correspond à vos filtres</h3>
                <p className="mt-2 text-gallery-700">Essayez d'ajuster votre recherche ou vos filtres</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      medium: 'all',
                      priceRange: 'all',
                      availability: 'all',
                    });
                  }}
                  className="mt-4 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors"
                >
                  Effacer Tous les Filtres
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;
