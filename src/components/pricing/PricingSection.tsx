
import { useState } from 'react';
import SectionHeading from '../ui/section-heading';
import PricingCard from './PricingCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PricingPlan } from '@/services/siteSettings';

// Fallback pricing data if none is provided
const defaultPricingData = {
  starter: {
    title: "Débutant",
    description: "Idéal pour les artistes émergents qui cherchent à établir leur présence en ligne.",
    features: [
      { text: "Gestion de 2 réseaux sociaux", included: true, tooltip: "Facebook et Instagram ou autres au choix" },
      { text: "2 publications par semaine", included: true },
      { text: "Analyses mensuelles", included: true },
      { text: "Support par email", included: true },
      { text: "Relations presse", included: false },
      { text: "Production de contenu", included: false, tooltip: "Photos, vidéos, designs graphiques" },
      { text: "Stratégie de monétisation", included: false },
    ],
    price: {
      monthly: "49.900 FCFA",
      annual: "39.900 FCFA"
    }
  },
  professional: {
    title: "Professionnel",
    description: "Pour les artistes en pleine croissance qui veulent développer leur audience.",
    features: [
      { text: "Gestion de 4 réseaux sociaux", included: true },
      { text: "4 publications par semaine", included: true },
      { text: "Analyses hebdomadaires", included: true },
      { text: "Support prioritaire", included: true },
      { text: "Relations presse basiques", included: true, tooltip: "Communiqués de presse et contacts avec médias locaux" },
      { text: "Production de contenu", included: true, tooltip: "1 séance photo mensuelle incluse" },
      { text: "Stratégie de monétisation", included: false },
    ],
    price: {
      monthly: "99.900 FCFA",
      annual: "84.900 FCFA"
    },
    popular: true
  },
  premium: {
    title: "Premium",
    description: "Solution complète pour les artistes établis qui souhaitent maximiser leur impact.",
    features: [
      { text: "Gestion de tous les réseaux", included: true, tooltip: "Toutes les plateformes pertinentes" },
      { text: "Publication quotidienne", included: true },
      { text: "Analyses en temps réel", included: true },
      { text: "Support dédié 24/7", included: true },
      { text: "Relations presse avancées", included: true, tooltip: "Couverture média nationale et internationale" },
      { text: "Production complète", included: true, tooltip: "Photos, vidéos et designs illimités" },
      { text: "Stratégie de monétisation", included: true, tooltip: "Optimisation des revenus sur toutes les plateformes" },
    ],
    price: {
      monthly: "199.900 FCFA",
      annual: "169.900 FCFA"
    }
  },
  custom: {
    title: "Entreprise",
    description: "Solution sur mesure pour labels, agences et artistes internationaux.",
    features: [
      { text: "Stratégie personnalisée", included: true },
      { text: "Équipe dédiée", included: true },
      { text: "Analyses complètes", included: true },
      { text: "Support VIP", included: true },
      { text: "Relations presse internationales", included: true },
      { text: "Production haut de gamme", included: true },
      { text: "Stratégie de revenus complète", included: true },
    ],
    customPrice: "Sur mesure"
  }
};

interface PricingSectionProps {
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

const PricingSection = ({ 
  title = "Offres adaptées à chaque étape de votre carrière",
  subtitle = "Des forfaits flexibles qui évoluent avec votre succès. Choisissez le plan qui correspond à vos besoins actuels.",
  plans = []
}: PricingSectionProps) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  // Use provided plans if available, or fall back to defaults
  const pricingPlans = plans && plans.length >= 3 
    ? plans 
    : [
        { ...defaultPricingData.starter, id: 'starter' },
        { ...defaultPricingData.professional, id: 'professional' },
        { ...defaultPricingData.premium, id: 'premium' },
        { ...defaultPricingData.custom, id: 'custom', price: { monthly: 'Sur mesure', annual: 'Sur mesure' } }
      ];
  
  return (
    <section className="py-20 bg-gradient-to-b from-background to-brand-50/20">
      <div className="container px-4 md:px-6 mx-auto">
        <SectionHeading
          title={title}
          subtitle={subtitle}
          badge="Nos tarifs"
          centered
        />
        
        <div className="flex justify-center mt-8 mb-12">
          <div className="bg-muted/50 p-1 rounded-lg inline-flex">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-md transition-all",
                billingCycle === 'monthly' ? "bg-white shadow-sm" : "hover:bg-white/50"
              )}
              onClick={() => setBillingCycle('monthly')}
            >
              Mensuel
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-md transition-all",
                billingCycle === 'annual' ? "bg-white shadow-sm" : "hover:bg-white/50",
                "relative"
              )}
              onClick={() => setBillingCycle('annual')}
            >
              Annuel
              <span className="absolute -top-2 -right-2 bg-brand-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                -15%
              </span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              title={plan.title}
              price={billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}
              description={plan.description}
              features={plan.features}
              popular={plan.popular}
              buttonText={plan.title === "Entreprise" ? "Nous contacter" : "Choisir ce plan"}
              buttonLink={plan.title === "Entreprise" ? "/contact" : "/services"}
              delay={100 * (index + 1)}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Besoin d'une solution spécifique ? Contactez-nous pour discuter de vos besoins et obtenir une offre personnalisée.
          </p>
          <Button variant="outline" asChild>
            <a href="/contact">Demander un devis personnalisé</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
