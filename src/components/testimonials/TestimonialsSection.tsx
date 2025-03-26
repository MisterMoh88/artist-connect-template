
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeading from '../ui/section-heading';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    content: "BkoTube a transformé ma présence en ligne. En moins de 3 mois, j'ai vu mon audience croître de 200% et mes revenus augmenter significativement.",
    author: "Marie Koné",
    role: "Chanteuse",
    image: "/images/testimonial-1.jpg"
  },
  {
    content: "Leur approche professionnelle et leur connaissance du marketing digital m'ont aidé à atteindre un public international que je n'aurais jamais pu toucher seul.",
    author: "Ibrahim Touré",
    role: "Producteur",
    image: "/images/testimonial-2.jpg"
  },
  {
    content: "L'équipe de BkoTube comprend vraiment les besoins des artistes. Leur gestion de mes réseaux sociaux m'a permis de me concentrer sur ma musique tout en développant ma communauté.",
    author: "Aminata Diallo",
    role: "Auteure-compositrice",
    image: "/images/testimonial-3.jpg"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="py-20 bg-brand-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10">
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-brand-500 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-brand-400 blur-3xl"></div>
      </div>
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <SectionHeading
          title="Ce que disent nos clients"
          subtitle="Découvrez comment nous avons aidé des artistes à développer leur présence en ligne et à réussir leur carrière."
          badge="Témoignages"
          centered
          className="text-white [&_p]:text-brand-100/80"
        />
        
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute -top-10 -left-10 text-brand-500 opacity-20">
              <Quote size={80} />
            </div>
            
            <div className="relative bg-brand-800/30 backdrop-blur-sm border border-brand-700/40 rounded-2xl p-8 shadow-xl">
              {testimonials.map((testimonial, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "transition-opacity duration-500 absolute inset-0 flex flex-col justify-between p-8",
                    idx === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  )}
                >
                  <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                    {testimonial.content}
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-brand-400/20 overflow-hidden flex-shrink-0">
                      {testimonial.image ? (
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-brand-600/50 flex items-center justify-center text-white">
                          {testimonial.author.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-brand-300 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Current testimonial for better SEO and accessibility */}
              <div className="opacity-0 h-0 overflow-hidden">
                <p>{testimonials[activeIndex].content}</p>
                <p>{testimonials[activeIndex].author}, {testimonials[activeIndex].role}</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="bg-brand-800/30 border-brand-700/40 text-white hover:bg-brand-700/50"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                {testimonials.map((_, idx) => (
                  <Button
                    key={idx}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "w-2 h-2 p-0 rounded-full transition-all",
                      idx === activeIndex 
                        ? "bg-brand-500 w-6" 
                        : "bg-brand-700/60 hover:bg-brand-600/60"
                    )}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <span className="sr-only">Voir témoignage {idx + 1}</span>
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="bg-brand-800/30 border-brand-700/40 text-white hover:bg-brand-700/50"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
