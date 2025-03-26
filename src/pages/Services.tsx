
import { Check, Music, Mic, Radio, Rss, Youtube, ThumbsUp, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeading from '@/components/ui/section-heading';
import PricingSection from '@/components/pricing/PricingSection';
import FeatureCard from '@/components/features/FeatureCard';
import CtaSection from '@/components/cta/CtaSection';

const Services = () => {
  const serviceCategories = [
    {
      title: "Stratégie Digitale",
      description: "Développez votre marque avec une stratégie sur mesure",
      icon: BarChart3,
      services: [
        "Analyse de votre présence actuelle",
        "Définition des objectifs et KPIs",
        "Planification stratégique",
        "Positionnement de marque",
        "Calendrier éditorial"
      ]
    },
    {
      title: "Gestion de Réseaux Sociaux",
      description: "Développez votre audience et augmentez l'engagement",
      icon: ThumbsUp,
      services: [
        "Création et optimisation de profils",
        "Planification de contenu",
        "Interaction avec les fans",
        "Gestion de communauté",
        "Campagnes publicitaires"
      ]
    },
    {
      title: "Production de Contenu",
      description: "Contenu professionnel adapté à votre univers artistique",
      icon: Youtube,
      services: [
        "Séances photo professionnelles",
        "Tournage et montage vidéo",
        "Design graphique personnalisé",
        "Rédaction de biographies et textes",
        "Animation et motion design"
      ]
    },
    {
      title: "Relations Presse & Médias",
      description: "Obtenez de la visibilité dans les médias pertinents",
      icon: Rss,
      services: [
        "Communiqués de presse",
        "Dossiers de presse",
        "Relations avec les médias",
        "Organisation d'interviews",
        "Placement dans des playlists"
      ]
    },
    {
      title: "Promotion de Concerts",
      description: "Remplissez vos salles et créez des événements mémorables",
      icon: Radio,
      services: [
        "Stratégie de promotion d'événements",
        "Campagnes de billetterie",
        "Communication avant/pendant/après",
        "Couverture de l'événement",
        "Analyse post-événement"
      ]
    },
    {
      title: "Coaching Artistique",
      description: "Développez votre identité et améliorez vos performances",
      icon: Mic,
      services: [
        "Développement d'image de marque",
        "Techniques de scène",
        "Préparation aux interviews",
        "Formation aux réseaux sociaux",
        "Développement carrière"
      ]
    }
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-brand-50/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block animate-fade-in">
              <span className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-xs font-medium">
                Services Spécialisés pour Artistes
              </span>
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight animated-element">
              Tout ce dont vous avez besoin pour réussir dans l'industrie musicale
            </h1>
            <p className="mt-4 text-xl text-muted-foreground animated-element">
              Des solutions complètes et personnalisées pour dynamiser votre présence digitale 
              et maximiser l'impact de votre musique.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <SectionHeading
            title="Nos services spécialisés"
            subtitle="Des solutions complètes pour répondre à tous vos besoins en communication digitale."
            badge="Expertise"
            centered
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((category, index) => (
              <FeatureCard
                key={index}
                icon={category.icon}
                title={category.title}
                description={category.description}
                delay={index * 100}
                className="h-full"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      {serviceCategories.map((category, index) => (
        <section 
          key={index} 
          id={category.title.toLowerCase().replace(/\s+/g, '-')}
          className={`py-20 ${index % 2 === 0 ? 'bg-brand-50/30' : 'bg-background'}`}
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`space-y-6 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="inline-block">
                  <span className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-xs font-medium">
                    Service Spécialisé
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight animated-element">
                  {category.title}
                </h2>
                <p className="text-lg text-muted-foreground animated-element">
                  {category.description}
                </p>
                
                <div className="space-y-4 pt-2 animated-element">
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Check className="h-5 w-5 text-brand-600" />
                      </div>
                      <p className="ml-3 text-base">{service}</p>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 animated-element">
                  <Button asChild>
                    <Link to="/contact">
                      Demander un devis
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className={`rounded-xl overflow-hidden shadow-xl animated-element ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="bg-gradient-to-br from-brand-500 to-brand-700 aspect-video rounded-xl flex items-center justify-center">
                  <category.icon className="h-24 w-24 text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <CtaSection 
        title="Prêt à transformer votre présence digitale ?"
        subtitle="Nos experts sont prêts à vous accompagner dans le développement de votre carrière."
        primaryButtonText="Nous contacter"
        primaryButtonLink="/contact"
        secondaryButtonText="Explorer les forfaits"
        secondaryButtonLink="#pricing"
      />
    </PageLayout>
  );
};

export default Services;
