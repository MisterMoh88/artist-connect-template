
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-brand-50/30">
      <div className="text-center max-w-md animate-fade-in">
        <div className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-brand-700 mb-4">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Page non trouvée</h1>
        <p className="text-muted-foreground mb-8 px-4">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" asChild className="gap-2">
            <Link to="/" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Link>
          </Button>
          <Button asChild className="gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Accueil
            </Link>
          </Button>
        </div>
        
        <div className="mt-16 md:mt-20 relative">
          <div className="absolute inset-0 blur-xl bg-brand-100/30 rounded-full"></div>
          <div className="relative z-10 glass-card p-6 flex flex-col items-center">
            <h2 className="text-lg font-medium mb-4">Vous cherchez quelque chose ?</h2>
            <div className="grid grid-cols-2 gap-3 w-full">
              <Link to="/services" className="text-brand-600 hover:underline text-sm py-2">
                Services
              </Link>
              <Link to="/artistes" className="text-brand-600 hover:underline text-sm py-2">
                Espace Artiste
              </Link>
              <Link to="/blog" className="text-brand-600 hover:underline text-sm py-2">
                Blog
              </Link>
              <Link to="/contact" className="text-brand-600 hover:underline text-sm py-2">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
