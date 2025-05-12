
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const routes = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Les Artistes', path: '/artistes' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4',
        isScrolled ? 'glass-morphism shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 animate-fade-in">
            <img src="/lovable-uploads/4be3a94e-de95-4478-94aa-dceac072a809.png" alt="BkoTube Logo" className="h-12 w-auto animate-glow" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {routes.map((route, index) => (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  location.pathname === route.path
                    ? 'text-brand-500 bg-brand-500/10'
                    : 'text-foreground/70 hover:text-brand-400 hover:bg-brand-500/5',
                  'animate-fade-in group',
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="relative">
                  {route.name}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            ))}
            <Button
              asChild
              variant="outline"
              className="ml-2 animate-fade-in border-brand-500 text-brand-500 hover:bg-brand-500/10 hover:text-brand-400"
              style={{ animationDelay: `${routes.length * 50}ms` }}
            >
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none text-brand-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? (
              <X size={24} className="transition-transform duration-300 ease-in-out" />
            ) : (
              <Menu size={24} className="transition-transform duration-300 ease-in-out" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 top-[73px] bg-background/95 backdrop-blur-sm md:hidden transition-all duration-300 ease-in-out',
          isMenuOpen ? 'opacity-100 z-40' : 'opacity-0 -z-10'
        )}
      >
        <nav className="container mx-auto px-4 py-8 flex flex-col space-y-4">
          {routes.map((route, index) => (
            <Link
              key={route.path}
              to={route.path}
              className={cn(
                'px-4 py-3 rounded-lg text-base font-medium transition-all duration-200',
                location.pathname === route.path
                  ? 'text-brand-500 bg-brand-500/10'
                  : 'text-foreground/80 hover:text-brand-400 hover:bg-brand-500/5',
                isMenuOpen ? 'animate-slide-up' : '',
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {route.name}
            </Link>
          ))}
          <Button
            asChild
            variant="outline"
            className={cn('mt-4 border-brand-500 text-brand-500', isMenuOpen ? 'animate-slide-up' : '')}
            style={{ animationDelay: `${routes.length * 50}ms` }}
          >
            <Link to="/contact">Nous contacter</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
