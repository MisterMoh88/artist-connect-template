
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  showTrustedBy?: boolean;
  className?: string;
}

const HeroSection = ({
  title,
  subtitle,
  image = '/images/hero-image.webp',
  buttonText = 'Commencer',
  buttonLink = '/services',
  secondaryButtonText,
  secondaryButtonLink = '/contact',
  showTrustedBy = true,
  className,
}: HeroSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={cn(
      "relative overflow-hidden bg-gradient-to-b from-background to-brand-50/30 py-20 md:py-32",
      className
    )}>
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-100/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-subtle"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-100/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className={cn(
            "flex flex-col space-y-6 transition-all duration-700 ease-out",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                {title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-[600px]">
                {subtitle}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button asChild size="lg" className="gap-2 group">
                <Link to={buttonLink}>
                  {buttonText}
                  <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              {secondaryButtonText && (
                <Button asChild variant="outline" size="lg" className="gap-2 group">
                  <Link to={secondaryButtonLink || '/contact'}>
                    {secondaryButtonText}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}
            </div>
            
            {showTrustedBy && (
              <div className="pt-4 border-t border-border flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">Faites confiance à des centaines d'artistes et de labels</p>
                <div className="flex items-center gap-4 opacity-70">
                  <div className="h-8 w-20 bg-foreground/20 rounded-md animate-pulse"></div>
                  <div className="h-8 w-24 bg-foreground/20 rounded-md animate-pulse"></div>
                  <div className="h-8 w-16 bg-foreground/20 rounded-md animate-pulse"></div>
                  <div className="h-8 w-20 bg-foreground/20 rounded-md animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
          
          <div className={cn(
            "relative aspect-video lg:aspect-square rounded-2xl overflow-hidden transition-all duration-700 ease-out",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            "image-wrapper" + (isLoaded ? " image-loaded" : "")
          )}>
            <div className="image-placeholder bg-brand-100/50"></div>
            <img
              src={image}
              alt="Plateforme de gestion pour artistes"
              className={cn(
                "object-cover w-full h-full rounded-2xl image-main",
                "shadow-xl shadow-brand-200/40"
              )}
              onLoad={() => setIsLoaded(true)}
            />
            
            {/* Floating Card Animation */}
            <div className="absolute -bottom-20 -right-20 w-60 h-60 md:w-80 md:h-80 rounded-full bg-brand-500/10 blur-3xl animate-float"></div>
            
            <div className="absolute top-8 right-8 glass-card p-4 max-w-[240px] animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="text-brand-600 font-medium mb-2">Promotion réseaux</div>
              <div className="text-sm text-brand-800/80">+200% d'engagement sur Instagram</div>
            </div>
            
            <div className="absolute bottom-8 left-8 glass-card p-4 max-w-[240px] animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-brand-600 font-medium mb-2">Gestion de projet</div>
              <div className="text-sm text-brand-800/80">100% de satisfaction client</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
