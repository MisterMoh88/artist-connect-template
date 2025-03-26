
import { ReactNode, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  withAnimation?: boolean;
}

const PageLayout = ({ children, className, withAnimation = true }: PageLayoutProps) => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    if (withAnimation) {
      // Animate elements with .animated-element class
      const animateElements = () => {
        const elements = document.querySelectorAll('.animated-element');
        elements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top <= window.innerHeight * 0.85;
          
          if (isVisible) {
            element.classList.add('visible');
          }
        });
      };
      
      // Run once on mount
      setTimeout(animateElements, 100);
      
      // Add scroll event listener
      window.addEventListener('scroll', animateElements);
      
      return () => {
        window.removeEventListener('scroll', animateElements);
      };
    }
  }, [withAnimation]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={cn("flex-grow pt-20", className)}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
