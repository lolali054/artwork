import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getPaintingById, getAllPaintings, Painting as PaintingType } from '@/lib/data';

const Painting = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [painting, setPainting] = useState<PaintingType | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [relatedPaintings, setRelatedPaintings] = useState<PaintingType[]>([]);
  
  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
    
    if (!id) {
      navigate('/gallery');
      return;
    }
    
    const foundPainting = getPaintingById(id);
    if (foundPainting) {
      setPainting(foundPainting);
      
      // Find related paintings (same medium or by same artist)
      const allPaintings = getAllPaintings();
      const related = allPaintings
        .filter(
          (p) => 
            p.id !== id && 
            (p.medium === foundPainting.medium || p.artist === foundPainting.artist)
        )
        .slice(0, 3);
      
      setRelatedPaintings(related);
    } else {
      navigate('/gallery');
    }
  }, [id, navigate]);
  
  const handlePurchase = () => {
    if (painting?.sold) {
      toast("Cette œuvre a déjà été vendue", {
        description: "Veuillez parcourir notre galerie pour les pièces disponibles",
      });
    } else {
      toast("Demande envoyée avec succès", {
        description: "Nous vous contacterons bientôt concernant votre achat",
      });
    }
  };
  
  if (!painting) {
    return null;
  }
  
  return (
    <div className="min-h-screen page-transition">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <div className="mb-8 animate-fade-up">
            <Link to="/gallery" className="inline-flex items-center text-gallery-600 hover:text-accent-dark">
              <ArrowLeft size={16} className="mr-2" />
              Retour à la Galerie
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Artwork Image */}
            <div className="animate-fade-up">
              <div className="relative overflow-hidden rounded-lg shadow-lg bg-white">
                <img 
                  src={painting.imageUrl}
                  alt={painting.title}
                  className={`w-full h-auto transition-all duration-700 ${
                    isImageLoaded ? "scale-100 animate-image-load" : "scale-105 blur-sm"
                  }`}
                  onLoad={() => setIsImageLoaded(true)}
                />
                
                {painting.sold && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md font-medium">
                    Vendu
                  </div>
                )}
              </div>
            </div>
            
            {/* Artwork Details */}
            <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
              <h1 className="text-3xl md:text-4xl font-serif">{painting.title}</h1>
              <p className="text-xl text-gallery-600 mt-2">{painting.artist}</p>
              
              <div className="mt-6">
                <p className="text-gallery-700 leading-relaxed">{painting.description}</p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <DetailItem label="Médium" value={painting.medium} />
                <DetailItem label="Dimensions" value={painting.dimensions} />
                <DetailItem label="Année" value={painting.year.toString()} />
                <DetailItem label="Prix" value={`${painting.price.toLocaleString()} $`} />
              </div>
              
              <div className="mt-8 space-y-4">
                {!painting.sold ? (
                  <>
                    <button
                      onClick={handlePurchase}
                      className="w-full px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-md transition-colors flex items-center justify-center"
                    >
                      <Check size={18} className="mr-2" />
                      Acheter l'Œuvre
                    </button>
                    
                    <a
                      href="#contact-form"
                      className="w-full px-6 py-3 border border-accent text-accent hover:bg-accent/5 rounded-md transition-colors block text-center"
                    >
                      Se Renseigner sur Cette Pièce
                    </a>
                  </>
                ) : (
                  <>
                    <div className="text-center p-4 bg-gallery-100 rounded-md">
                      <p className="text-gallery-800">
                        Cette œuvre a été vendue, mais vous pouvez explorer des œuvres similaires de l'artiste.
                      </p>
                    </div>
                    
                    <Link
                      to="/gallery"
                      className="w-full px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-md transition-colors block text-center"
                    >
                      Explorer des Œuvres Similaires
                    </Link>
                  </>
                )}
              </div>
              
              <div className="mt-8 border-t border-gallery-200 pt-6">
                <h3 className="text-lg font-medium">Expédition et Retours</h3>
                <ul className="mt-2 space-y-2 text-gallery-700">
                  <li className="flex items-start">
                    <Check size={16} className="text-accent mt-1 mr-2 flex-shrink-0" />
                    Expédition mondiale disponible
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-accent mt-1 mr-2 flex-shrink-0" />
                    Emballage professionnel pour assurer une livraison sécurisée
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-accent mt-1 mr-2 flex-shrink-0" />
                    Satisfaction garantie ou remboursement à 100%
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Inquiry Form */}
          <div id="contact-form" className="mt-16 py-12 bg-gallery-50 rounded-lg animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="max-w-2xl mx-auto px-6">
              <h2 className="text-2xl font-serif text-center">Demande de Renseignements</h2>
              <p className="mt-2 text-gallery-700 text-center">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
              </p>
              
              <form className="mt-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gallery-700 mb-1">
                      Nom
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-gallery-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent outline-none transition"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gallery-700 mb-1">
                      Email
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-gallery-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent outline-none transition"
                      placeholder="Votre email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="inquiry-message" className="block text-sm font-medium text-gallery-700 mb-1">
                    Message
                  </label>
                  <textarea 
                    id="inquiry-message" 
                    rows={4} 
                    className="w-full px-4 py-2 border border-gallery-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent outline-none transition"
                    placeholder="Je suis intéressé(e) par cette œuvre..."
                    defaultValue={`Je suis intéressé(e) par "${painting.title}" de ${painting.artist}.`}
                  ></textarea>
                </div>
                
                <button 
                  type="button" 
                  onClick={handlePurchase}
                  className="px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-md transition-colors"
                >
                  Envoyer la Demande
                </button>
              </form>
            </div>
          </div>
          
          {/* Related Artwork */}
          {relatedPaintings.length > 0 && (
            <div className="mt-16 animate-fade-up" style={{ animationDelay: '300ms' }}>
              <h2 className="text-2xl font-serif">Vous Pourriez Aussi Aimer</h2>
              
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPaintings.map((relatedPainting) => (
                  <Link 
                    to={`/painting/${relatedPainting.id}`} 
                    key={relatedPainting.id}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-md bg-white art-card">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={relatedPainting.imageUrl}
                          alt={relatedPainting.title}
                          className="art-image w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-serif text-lg group-hover:text-accent-dark transition-colors">
                          {relatedPainting.title}
                        </h3>
                        <p className="text-gallery-700 text-sm mt-1">{relatedPainting.medium}</p>
                        <p className="mt-2 font-medium">{relatedPainting.price.toLocaleString()} $</p>
                      </div>
                      
                      {relatedPainting.sold && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                          Vendu
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface DetailItemProps {
  label: string;
  value: string;
}

const DetailItem = ({ label, value }: DetailItemProps) => (
  <div>
    <p className="text-sm text-gallery-600">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default Painting;
