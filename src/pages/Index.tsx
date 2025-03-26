
import HeroSection from '@/components/hero/HeroSection';
import FeaturesSection from '@/components/features/FeaturesSection';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import PricingSection from '@/components/pricing/PricingSection';
import CtaSection from '@/components/cta/CtaSection';
import PageLayout from '@/components/layout/PageLayout';
import FeaturedSection from '@/components/featured/FeaturedSection';

const Index = () => {
  return (
    <PageLayout>
      <HeroSection 
        title="Propulsez votre carrière artistique dans l'ère numérique"
        subtitle="Plateforme complète de gestion de communication digitale pour artistes, labels et agences. Maximisez votre présence en ligne et développez votre audience."
        buttonText="Découvrir nos services"
        secondaryButtonText="Contacter un expert"
        buttonLink="/services"
        secondaryButtonLink="/contact"
        useCarousel={true}
      />
      
      <FeaturedSection />
      
      <FeaturesSection />
      
      <TestimonialsSection />
      
      <PricingSection />
      
      <CtaSection 
        title="Prêt à faire passer votre carrière au niveau supérieur ?"
        subtitle="Rejoignez des centaines d'artistes qui font confiance à BkoTube pour leur communication digitale."
        primaryButtonText="Commencer maintenant"
        primaryButtonLink="/services"
        secondaryButtonText="En savoir plus"
        secondaryButtonLink="/contact"
      />
    </PageLayout>
  );
};

export default Index;
