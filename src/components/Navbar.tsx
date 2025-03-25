import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-12 py-4 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-sm' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-serif font-medium tracking-wider"
          >
            <span className="animate-fade-in">ARTISAN</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" label="Accueil" />
            <NavLink to="/gallery" label="Galerie" />
            <NavLink to="/virtual-gallery" label="Galerie 3D" />
            <NavLink to="/#about" label="À Propos" />
            <NavLink to="/#contact" label="Contact" />
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full p-10">
            <div className="flex justify-end mb-8">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gallery-500 hover:text-gallery-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-6 text-xl">
              <MobileNavLink to="/" label="Accueil" />
              <MobileNavLink to="/gallery" label="Galerie" />
              <MobileNavLink to="/virtual-gallery" label="Galerie 3D" />
              <MobileNavLink to="/#about" label="À Propos" />
              <MobileNavLink to="/#contact" label="Contact" />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink = ({ to, label }: NavLinkProps) => {
  const location = useLocation();
  const isActive = 
    to === '/' 
      ? location.pathname === '/' 
      : location.pathname.startsWith(to) || 
        (to.startsWith('/#') && location.pathname === '/');
  
  return (
    <Link 
      to={to} 
      className={`relative py-2 text-sm tracking-wide transition-colors duration-300 uppercase ${
        isActive 
          ? 'text-accent-dark font-medium' 
          : 'text-foreground hover:text-accent'
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-dark" />
      )}
    </Link>
  );
};

const MobileNavLink = ({ to, label }: NavLinkProps) => {
  const location = useLocation();
  const isActive = 
    to === '/' 
      ? location.pathname === '/' 
      : location.pathname.startsWith(to) || 
        (to.startsWith('/#') && location.pathname === '/');
  
  return (
    <Link 
      to={to} 
      className={`py-3 px-6 text-sm transition-colors duration-300 uppercase ${
        isActive 
          ? 'text-accent-dark font-medium bg-gallery-100' 
          : 'text-foreground hover:bg-gallery-50'
      }`}
    >
      {label}
    </Link>
  );
};

export default Navbar;
