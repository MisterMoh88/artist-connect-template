
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Youtube, Facebook, Instagram, Mail, Phone, Home } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-brand-500/20 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/lovable-uploads/4be3a94e-de95-4478-94aa-dceac072a809.png" alt="BkoTube Logo" className="h-12 w-auto" />
            </Link>
            <p className="text-muted-foreground max-w-xs">
              BKOTUBE, votre partenaire pour la promotion audiovisuelle des artistes et labels.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-secondary p-2 rounded-full hover:bg-brand-500 hover:text-black transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-secondary p-2 rounded-full hover:bg-brand-500 hover:text-black transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-secondary p-2 rounded-full hover:bg-brand-500 hover:text-black transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-brand-500">Navigation</h3>
            <nav className="space-y-3 flex flex-col">
              <Link to="/" className="hover:text-brand-400 transition-colors">Accueil</Link>
              <Link to="/services" className="hover:text-brand-400 transition-colors">Services</Link>
              <Link to="/artistes" className="hover:text-brand-400 transition-colors">Les Artistes</Link>
              <Link to="/blog" className="hover:text-brand-400 transition-colors">Blog</Link>
              <Link to="/contact" className="hover:text-brand-400 transition-colors">Contact</Link>
            </nav>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-brand-500">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail size={18} className="mr-2 text-brand-500" />
                <a href="mailto:contact@bkotube.com" className="hover:text-brand-400 transition-colors">
                  contact@bkotube.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-2 text-brand-500" />
                <a href="tel:+123456789" className="hover:text-brand-400 transition-colors">
                  +123 456 789
                </a>
              </div>
              <div className="flex items-start">
                <Home size={18} className="mr-2 mt-1 text-brand-500" />
                <p>123 Rue Exemple, 12345 Ville, Pays</p>
              </div>
              
              <Button asChild variant="outline" className="mt-4 border-brand-500">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-muted flex flex-wrap justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} BKOTUBE. Tous droits réservés.
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-brand-400 transition-colors">Politique de confidentialité</Link>
            <Link to="/terms" className="hover:text-brand-400 transition-colors">Conditions d'utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
