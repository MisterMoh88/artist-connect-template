
import { Grid, TrendingUp, Zap, Megaphone, BarChart4, Share2, DollarSign } from 'lucide-react';
import FeatureCard from './FeatureCard';
import SectionHeading from '../ui/section-heading';

const FeaturesSection = () => {
  const features = [
    {
      icon: Grid,
      title: 'Gestion de Projet',
      description: 'Outils de gestion de projet spécialisés pour artistes et leurs équipes.',
      delay: 100
    },
    {
      icon: TrendingUp,
      title: 'Marketing Digital',
      description: 'Stratégies de marketing personnalisées pour développer votre audience.',
      delay: 200
    },
    {
      icon: Zap,
      title: 'Automatisation',
      description: 'Automatisez la publication sur vos réseaux sociaux et gagnez du temps.',
      delay: 300
    },
    {
      icon: Megaphone,
      title: 'Relations Presse',
      description: 'Accédez aux médias et obtenez une couverture pour vos sorties.',
      delay: 400
    },
    {
      icon: BarChart4,
      title: 'Analyses & Rapports',
      description: 'Suivez vos performances avec des tableaux de bord analytiques détaillés.',
      delay: 500
    },
    {
      icon: Share2,
      title: 'Distribution',
      description: 'Diffusez votre musique sur toutes les plateformes de streaming.',
      delay: 600
    },
    {
      icon: DollarSign,
      title: 'Monétisation',
      description: 'Maximisez vos revenus grâce à nos stratégies de monétisation.',
      delay: 700
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-brand-50/20">
      <div className="container px-4 md:px-6 mx-auto">
        <SectionHeading
          title="Services Complets pour Artistes"
          subtitle="Notre gamme de services est conçue pour vous aider à développer votre carrière et à maximiser votre impact numérique."
          badge="Nos services"
          centered
        />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
