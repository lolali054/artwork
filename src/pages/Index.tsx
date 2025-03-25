import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Frame, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedArt from '@/components/FeaturedArt';
import { getFeaturedPaintings } from '@/lib/data';

const Index = () => {
  const featuredPaintings = getFeaturedPaintings();
  
  return (
    <div className="min-h-screen page-transition">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86"
            alt="Arrière-plan de la galerie"
            className="w-full h-full object-cover animate-image-load"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 mt-16">
          <div className="max-w-3xl text-white">
            <span className="inline-block py-1 px-3 border border-white/30 rounded text-sm backdrop-blur-sm bg-white/10 animate-fade-up">
              Cindy Roy-Boutin Art Fin
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif mt-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
              Découvrez la Beauté de la Nature à Travers l'Art
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl animate-fade-up" style={{ animationDelay: '200ms' }}>
              Plongez dans des paysages captivants qui apportent la sérénité et l'émerveillement de la nature dans votre foyer.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
              <Link
                to="/gallery"
                className="px-8 py-3 bg-white text-gallery-900 rounded-md hover:bg-gallery-100 transition-colors"
              >
                Explorer la Galerie
              </Link>
              <a
                href="#about"
                className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-md hover:bg-white/30 transition-colors"
              >
                À Propos de l'Artiste
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Artwork Section */}
      <FeaturedArt paintings={featuredPaintings} />
      
      {/* About the Artist Section - Modernized with blur effects */}
      <section id="about" className="py-20 md:py-28 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-light/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 animate-fade-up">
              <div className="bg-white/60 backdrop-blur-md p-10 md:p-12 rounded-2xl shadow-xl border border-white/20">
                <h2 className="text-base font-sans uppercase tracking-wider text-gallery-600">À Propos de l'Artiste</h2>
                <h3 className="text-4xl md:text-5xl font-serif mt-2 bg-gradient-to-r from-accent-dark to-accent bg-clip-text text-transparent">Cindy Roy-Boutin</h3>
                
                <div className="mt-8 space-y-5 text-gallery-700 text-lg">
                  <p>
                    Cindy Roy-Boutin est une artiste paysagiste basée à Montréal, dont le travail est défini par une connexion profonde avec les environnements naturels et leurs ambiances en constante évolution.
                  </p>
                  <p>
                    Avec plus de 15 ans de pratique artistique, les peintures de Cindy capturent l'essence des paysages à travers un mélange unique de techniques traditionnelles et d'expression contemporaine. Son travail invite les spectateurs à vivre la tranquillité et l'émerveillement des espaces naturels.
                  </p>
                  <p>
                    Chaque peinture commence par des études de terrain et des croquis approfondis, permettant à Cindy de développer une compréhension intime de ses sujets avant de leur donner vie sur toile.
                  </p>
                </div>
                
                <div className="mt-10">
                  <Link 
                    to="/#contact" 
                    className="inline-flex items-center text-accent-dark hover:text-accent font-medium text-lg transition-all duration-300 ease-in-out relative group"
                  >
                    <span>Contactez-nous</span>
                    <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-dark group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-48 h-48 bg-accent/10 rounded-lg -z-10 blur-md"></div>
                <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-accent/20 rounded-lg -z-10 blur-md"></div>
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1518495973542-4542c06a5843"
                    alt="Cindy Roy-Boutin"
                    className="w-full h-auto animate-image-load hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  
                  {/* Glass overlay with artist quote */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm p-4 text-white">
                    <p className="text-sm italic">"L'art est ma façon de traduire la beauté de notre monde en un langage visuel que tout le monde peut comprendre."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits/Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto animate-fade-up">
            <h2 className="text-sm font-sans uppercase tracking-wider text-gallery-600">Pourquoi Choisir Notre Galerie</h2>
            <h3 className="text-3xl md:text-4xl font-serif mt-1">
              Une Expérience Artistique Unique
            </h3>
            <p className="mt-4 text-gallery-700">
              Chez ARTISAN, nous croyons en la création de connexions significatives entre les artistes, les œuvres d'art et les amateurs d'art.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <FeatureCard 
              icon={<Palette className="text-accent" size={24} />} 
              title="Œuvres Originales" 
              description="Chaque pièce de notre galerie est une création originale, vous assurant de posséder une œuvre d'art unique qui ne peut être reproduite."
              delay={0}
            />
            <FeatureCard 
              icon={<Frame className="text-accent" size={24} />} 
              title="Encadrement Expert" 
              description="Nous fournissons des services d'encadrement professionnels pour compléter parfaitement votre œuvre d'art sélectionnée et en rehausser la beauté."
              delay={100}
            />
            <FeatureCard 
              icon={<MapPin className="text-accent" size={24} />} 
              title="Expédition Mondiale" 
              description="Nous emballons et expédions soigneusement les œuvres d'art à l'international, apportant les paysages de Cindy aux amateurs d'art du monde entier."
              delay={200}
            />
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-gallery-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-fade-up">
              <h2 className="text-sm font-sans uppercase tracking-wider text-gallery-600">Contactez-Nous</h2>
              <h3 className="text-3xl md:text-4xl font-serif mt-1">Nous Contacter</h3>
              
              <p className="mt-4 text-gallery-700 max-w-xl">
                Que vous soyez intéressé par l'achat d'une œuvre d'art, la commande d'une pièce, ou que vous ayez simplement une question, nous serions ravis d'avoir de vos nouvelles.
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
                  <label htmlFor="subject" className="block text-sm font-medium text-gallery-700 mb-1">
                    Sujet
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-2 border border-gallery-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent outline-none transition"
                    placeholder="Sujet"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gallery-700 mb-1">
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-4 py-2 border border-gallery-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent outline-none transition"
                    placeholder="Votre message"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-md transition-colors"
                >
                  Envoyer le Message
                </button>
              </form>
            </div>
            
            <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
              <div className="h-full rounded-lg overflow-hidden shadow-lg bg-white p-6">
                <h4 className="text-xl font-serif">Visitez la Galerie</h4>
                <address className="not-italic mt-4 text-gallery-700">
                  <p>7850 Avenue Paiement</p>
                  <p>Montréal, Québec</p>
                  <p>Canada</p>
                </address>
                
                <div className="mt-6">
                  <h5 className="font-medium text-gallery-900">Heures d'Ouverture</h5>
                  <div className="mt-2 text-gallery-700">
                    <p>Mardi - Samedi: 10h00 - 18h00</p>
                    <p>Dimanche: 12h00 - 16h00</p>
                    <p>Lundi: Fermé</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h5 className="font-medium text-gallery-900">Informations de Contact</h5>
                  <div className="mt-2 text-gallery-700">
                    <p>Téléphone: (514) 555-1234</p>
                    <p>Email: contact@cindy-roy-boutin.com</p>
                  </div>
                </div>
                
                <div className="mt-6 aspect-video w-full rounded-lg overflow-hidden bg-gallery-100">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.4421745242584!2d-73.7099344!3d45.5504799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91f8f4a1f1b5d%3A0x5e0a2f2a8f3a5e0a!2s7850%20Avenue%20Paiement%2C%20Montr%C3%A9al%2C%20QC!5e0!3m2!1sfr!2sca!4v1696459881707!5m2!1sfr!2sca" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => (
  <div 
    className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow animate-fade-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
      {icon}
    </div>
    <h4 className="text-xl font-serif mt-4">{title}</h4>
    <p className="mt-2 text-gallery-700">{description}</p>
  </div>
);

export default Index;
