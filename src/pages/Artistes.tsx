
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Music, Users, BarChart3, Calendar, FileText, User, Mail, Lock, Upload, ChevronRight } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeading from '@/components/ui/section-heading';
import CtaSection from '@/components/cta/CtaSection';

const Artistes = () => {
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulons un envoi de formulaire
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };
  
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-brand-50/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block animate-fade-in">
              <span className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-xs font-medium">
                Espace Dédié aux Artistes
              </span>
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight animated-element">
              Votre espace personnel pour gérer votre carrière
            </h1>
            <p className="mt-4 text-xl text-muted-foreground animated-element">
              Accès exclusif à des outils professionnels pour développer votre présence en ligne et optimiser votre stratégie digitale.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animated-element">
              <Button asChild size="lg">
                <a href="#inscription">
                  S'inscrire maintenant
                </a>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link to="/login">
                  Se connecter
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <SectionHeading
            title="Tout ce dont vous avez besoin, au même endroit"
            subtitle="Notre espace artiste est conçu pour vous simplifier la vie et vous aider à vous concentrer sur votre musique."
            badge="Fonctionnalités"
            centered
          />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Music,
                title: "Gestion de catalogue",
                description: "Organisez vos titres, albums et vidéos dans une interface intuitive."
              },
              {
                icon: Calendar,
                title: "Planification",
                description: "Planifiez vos publications et sorties avec notre calendrier éditorial."
              },
              {
                icon: BarChart3,
                title: "Statistiques détaillées",
                description: "Suivez vos performances sur toutes les plateformes en temps réel."
              },
              {
                icon: Users,
                title: "Gestion d'équipe",
                description: "Invitez votre équipe et attribuez des rôles spécifiques."
              },
              {
                icon: FileText,
                title: "Dossiers de presse",
                description: "Créez et partagez des dossiers de presse professionnels en quelques clics."
              },
              {
                icon: Upload,
                title: "Distribution simplifiée",
                description: "Distribuez votre musique sur toutes les plateformes de streaming."
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card p-6 animated-element" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="inline-flex items-center justify-center p-3 rounded-lg bg-brand-100 text-brand-600 mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Demo Preview */}
      <section className="py-16 bg-brand-50/30">
        <div className="container px-4 md:px-6 mx-auto">
          <SectionHeading
            title="Une interface intuitive pour tous vos besoins"
            subtitle="Découvrez notre plateforme conçue spécifiquement pour les artistes et leur équipe."
            badge="Aperçu"
            centered
          />
          
          <div className="mt-12">
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full max-w-xl mx-auto grid-cols-3">
                <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
                <TabsTrigger value="analytics">Analyses</TabsTrigger>
                <TabsTrigger value="content">Contenu</TabsTrigger>
              </TabsList>
              <div className="mt-8 rounded-xl overflow-hidden border bg-card shadow-xl">
                <TabsContent value="dashboard" className="mt-0">
                  <div className="bg-gradient-to-r from-brand-600 to-brand-800 aspect-video w-full flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <h3 className="text-xl font-semibold mb-2">Tableau de bord</h3>
                      <p className="text-white/80">Aperçu global de vos performances et activités</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="analytics" className="mt-0">
                  <div className="bg-gradient-to-r from-brand-700 to-brand-900 aspect-video w-full flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <h3 className="text-xl font-semibold mb-2">Analyses détaillées</h3>
                      <p className="text-white/80">Statistiques complètes sur toutes vos plateformes</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="content" className="mt-0">
                  <div className="bg-gradient-to-r from-brand-500 to-brand-700 aspect-video w-full flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <h3 className="text-xl font-semibold mb-2">Gestion de contenu</h3>
                      <p className="text-white/80">Organisez et planifiez tout votre contenu digital</p>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Registration Form */}
      <section id="inscription" className="py-16 bg-background scroll-mt-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title="Créez votre compte artiste"
                subtitle="Rejoignez notre communauté d'artistes et accédez à tous nos outils professionnels."
                badge="Inscription"
              />
              
              <div className="mt-8 space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  {[
                    {
                      title: "Comment fonctionne l'inscription ?",
                      content: "L'inscription est simple et rapide. Remplissez le formulaire ci-contre avec vos informations personnelles et professionnelles. Après validation de votre compte, vous aurez accès à votre espace personnel."
                    },
                    {
                      title: "Quels sont les documents nécessaires ?",
                      content: "Pour une inscription complète, nous vous recommandons de préparer une photo de profil professionnelle, des liens vers vos profils sur les réseaux sociaux et plateformes de streaming, ainsi qu'une courte biographie."
                    },
                    {
                      title: "Combien de temps pour la validation ?",
                      content: "La validation de votre compte est généralement effectuée sous 24h. Vous recevrez un email de confirmation dès que votre compte sera activé."
                    },
                    {
                      title: "Est-ce payant de créer un compte ?",
                      content: "La création d'un compte est entièrement gratuite. Vous pourrez ensuite choisir parmi nos différentes offres selon vos besoins spécifiques."
                    }
                  ].map((item, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger className="text-left">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
            
            <div className="glass-card p-8 animated-element">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">Prénom</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="first-name" placeholder="Votre prénom" className="pl-10" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Nom</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="last-name" placeholder="Votre nom" className="pl-10" required />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="artist-name">Nom d'artiste</Label>
                      <div className="relative">
                        <Music className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="artist-name" placeholder="Votre nom d'artiste ou groupe" className="pl-10" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="votre@email.com" className="pl-10" required />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="password" type="password" placeholder="********" className="pl-10" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmer</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="confirm-password" type="password" placeholder="********" className="pl-10" required />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biographie courte</Label>
                      <Textarea id="bio" placeholder="Parlez-nous de votre musique, style et projets..." required />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="terms" className="rounded border-gray-300" required />
                    <Label htmlFor="terms" className="text-sm">
                      J'accepte les{" "}
                      <Link to="/terms" className="text-brand-600 hover:underline">
                        conditions d'utilisation
                      </Link>{" "}
                      et la{" "}
                      <Link to="/privacy" className="text-brand-600 hover:underline">
                        politique de confidentialité
                      </Link>
                    </Label>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Créer mon compte
                  </Button>
                  
                  <p className="text-center text-sm text-muted-foreground">
                    Vous avez déjà un compte ?{" "}
                    <Link to="/login" className="text-brand-600 hover:underline">
                      Connectez-vous
                    </Link>
                  </p>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-600 mb-4">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold">Inscription réussie!</h3>
                  <p className="text-muted-foreground">
                    Merci de vous être inscrit. Un email de confirmation a été envoyé à votre adresse.
                  </p>
                  <Button asChild className="mt-4">
                    <Link to="/login">
                      Accéder à mon espace
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-brand-900 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <SectionHeading
            title="Ce que disent nos artistes"
            subtitle="Découvrez l'expérience des artistes qui utilisent notre plateforme au quotidien."
            badge="Témoignages"
            centered
            className="text-white [&_p]:text-white/70"
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Cette plateforme m'a permis de professionnaliser ma communication et d'atteindre une audience internationale.",
                author: "Ibrahim L.",
                role: "Auteur-compositeur"
              },
              {
                quote: "Les outils d'analyse m'ont aidé à mieux comprendre mon public et à adapter ma stratégie de contenu.",
                author: "Aminata D.",
                role: "Chanteuse"
              },
              {
                quote: "Grâce à BkoTube, j'ai pu automatiser mes publications et me concentrer sur ma musique tout en développant ma présence en ligne.",
                author: "Moussa T.",
                role: "Producteur"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-brand-800/40 border border-brand-700/30 p-6 rounded-2xl animated-element"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="space-y-4">
                  <p className="italic text-white/90">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-semibold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">{testimonial.author}</h4>
                      <p className="text-sm text-white/70">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CtaSection 
        title="Prêt à faire décoller votre carrière ?"
        subtitle="Rejoignez notre communauté d'artistes et accédez à des outils professionnels pour développer votre présence en ligne."
        primaryButtonText="Créer mon compte gratuitement"
        primaryButtonLink="#inscription"
        secondaryButtonText="En savoir plus"
        secondaryButtonLink="/contact"
      />
    </PageLayout>
  );
};

export default Artistes;
