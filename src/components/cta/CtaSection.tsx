
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CtaSectionProps {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  bgClass?: string;
}

const CtaSection = ({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  bgClass = "bg-brand-900 text-white",
}: CtaSectionProps) => {
  return (
    <section className={`py-20 ${bgClass} relative overflow-hidden`}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] rounded-full bg-brand-700/20 blur-3xl" />
        <div className="absolute -bottom-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-brand-800/20 blur-3xl" />
      </div>
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 animated-element">
            {title}
          </h2>
          <p className="text-lg opacity-90 mb-8 animated-element">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animated-element">
            <Button 
              asChild 
              size="lg" 
              className="bg-brand-500 hover:bg-brand-600 text-white group"
            >
              <Link to={primaryButtonLink}>
                {primaryButtonText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            {secondaryButtonText && (
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="bg-transparent border-white/20 text-white hover:bg-white/10"
              >
                <Link to={secondaryButtonLink || '#'}>
                  {secondaryButtonText}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
