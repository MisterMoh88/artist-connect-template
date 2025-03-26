
import { Link } from 'react-router-dom';
import { Music, Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Music size={28} className="text-brand-400" />
              <span className="font-bold text-xl tracking-tight">BkoTube</span>
            </Link>
            <p className="text-brand-100/80 text-sm max-w-xs">
              Plateforme de gestion de communication digitale pour artistes, offrant des services professionnels pour développer votre présence en ligne.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-brand-300 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-brand-300 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-brand-300 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-brand-300 hover:text-white transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-lg">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-brand-100/80 hover:text-white transition-colors text-sm">
                  Marketing Digital
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-brand-100/80 hover:text-white transition-colors text-sm">
                  Gestion de Réseaux Sociaux
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-brand-100/80 hover:text-white transition-colors text-sm">
                  Production de Contenu
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-brand-100/80 hover:text-white transition-colors text-sm">
                  Relations Presse
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-brand-100/80 hover:text-white transition-colors text-sm">
                  Monétisation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-lg">Liens Utiles</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/artistes" className="text-brand-100/80 hover:text-white transition-colors text-sm">
                  Espace Artiste
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-brand-100/80 hover:text-white transition-colors text-sm">
                  Blog & Actualités
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-brand-100/80 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="text-brand-100/80 hover:text-white transition-colors text-sm">
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link to="/confidentialite" className="text-brand-100/80 hover:text-white transition-colors text-sm">
                  Politique de Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-lg">Newsletter</h3>
            <p className="text-brand-100/80 text-sm mb-4">
              Inscrivez-vous pour recevoir nos dernières actualités et offres.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Votre email" 
                className="bg-brand-900/50 border-brand-800 text-white placeholder:text-brand-400/70 focus-visible:ring-brand-500"
              />
              <Button size="icon" variant="default">
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-brand-300/70 text-sm mb-4 md:mb-0">
              © {currentYear} BkoTube. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <Link to="/mentions-legales" className="text-brand-300/70 hover:text-white transition-colors text-sm">
                Mentions Légales
              </Link>
              <Link to="/confidentialite" className="text-brand-300/70 hover:text-white transition-colors text-sm">
                Confidentialité
              </Link>
              <Link to="/cgv" className="text-brand-300/70 hover:text-white transition-colors text-sm">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
