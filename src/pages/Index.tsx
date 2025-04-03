
import { useEffect } from 'react';
import HeroSection from '@/components/hero/HeroSection';
import FeaturesSection from '@/components/features/FeaturesSection';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import PricingSection from '@/components/pricing/PricingSection';
import CtaSection from '@/components/cta/CtaSection';
import PageLayout from '@/components/layout/PageLayout';
import FeaturedSection from '@/components/featured/FeaturedSection';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const Index = () => {
  const { settings, isLoading } = useSiteSettings();

  // Utiliser les valeurs par défaut si les paramètres ne sont pas encore chargés
  const heroProps = settings?.hero_section || {
    title: "Propulsez votre carrière artistique dans l'ère numérique",
    subtitle: "Plateforme complète de gestion de communication digitale pour artistes, labels et agences. Maximisez votre présence en ligne et développez votre audience.",
    buttonText: "Découvrir nos services",
    secondaryButtonText: "Contacter un expert",
    buttonLink: "/services",
    secondaryButtonLink: "/contact"
  };

  const ctaProps = settings?.cta_section || {
    title: "Prêt à faire passer votre carrière au niveau supérieur ?",
    subtitle: "Rejoignez des centaines d'artistes qui font confiance à BkoTube pour leur communication digitale.",
    primaryButtonText: "Commencer maintenant",
    secondaryButtonText: "En savoir plus",
    primaryButtonLink: "/services",
    secondaryButtonLink: "/contact"
  };

  return (
    <PageLayout>
      <HeroSection 
        title={heroProps.title}
        subtitle={heroProps.subtitle}
        buttonText={heroProps.buttonText}
        secondaryButtonText={heroProps.secondaryButtonText}
        buttonLink={heroProps.buttonLink}
        secondaryButtonLink={heroProps.secondaryButtonLink}
        useCarousel={true}
      />
      
      <FeaturedSection />
      
      <FeaturesSection />
      
      <TestimonialsSection />
      
      <PricingSection />
      
      <CtaSection 
        title={ctaProps.title}
        subtitle={ctaProps.subtitle}
        primaryButtonText={ctaProps.primaryButtonText}
        secondaryButtonText={ctaProps.secondaryButtonText}
        primaryButtonLink={ctaProps.primaryButtonLink}
        secondaryButtonLink={ctaProps.secondaryButtonLink}
      />
    </PageLayout>
  );
};

export default Index;
