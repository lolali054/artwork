import { Instagram, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gallery-50 border-t border-gallery-200">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-serif">ARTISAN</h3>
            <p className="text-gallery-700 max-w-md">
              Présentant les magnifiques peintures de paysages de Cindy Roy-Boutin. 
              Chaque œuvre capture l'essence et la beauté de la nature.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} label="Instagram" />
              <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} label="Facebook" />
              <SocialLink href="mailto:contact@cindy-roy-boutin.com" icon={<Mail size={18} />} label="Email" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider font-medium">Liens Rapides</h4>
            <nav className="flex flex-col space-y-2">
              <FooterLink to="/" label="Accueil" />
              <FooterLink to="/gallery" label="Galerie" />
              <FooterLink to="/#about" label="À Propos de l'Artiste" />
              <FooterLink to="/#contact" label="Contact" />
            </nav>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider font-medium">Visitez la Galerie</h4>
            <address className="not-italic text-gallery-700">
              <p>7850 Avenue Paiement</p>
              <p>Montréal, Québec</p>
              <p>Canada</p>
              <p className="mt-2">Ouvert du Mardi au Samedi</p>
              <p>10h00 - 18h00</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gallery-200 mt-10 pt-6 text-sm text-gallery-600 flex flex-col md:flex-row justify-between items-center">
          <p> {currentYear} Galerie ARTISAN. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-accent-dark transition-colors">Politique de Confidentialité</Link>
            <Link to="/terms" className="hover:text-accent-dark transition-colors">Conditions d'Utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:bg-accent hover:text-white"
  >
    {icon}
  </a>
);

interface FooterLinkProps {
  to: string;
  label: string;
}

const FooterLink = ({ to, label }: FooterLinkProps) => (
  <Link 
    to={to} 
    className="text-gallery-700 hover:text-accent-dark transition-colors"
  >
    {label}
  </Link>
);

export default Footer;
