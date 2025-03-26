
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  Music, 
  AlertCircle 
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import PageLayout from '@/components/layout/PageLayout';
import SectionHeading from '@/components/ui/section-heading';

const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler l'envoi du formulaire
    
    // Simulons une réponse réussie (dans un cas réel, cela proviendrait du serveur)
    const success = Math.random() > 0.2; // 80% de chances de succès pour la démo
    
    if (success) {
      setFormSubmitted(true);
      setFormError(false);
    } else {
      setFormError(true);
    }
  };
  
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-brand-50/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block animate-fade-in">
              <span className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-xs font-medium">
                Contactez-nous
              </span>
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight animated-element">
              Parlons de votre projet musical
            </h1>
            <p className="mt-4 text-xl text-muted-foreground animated-element">
              Notre équipe est à votre disposition pour répondre à vos questions et vous accompagner dans votre stratégie digitale.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="py-12 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Mail,
                title: "Email",
                description: "Nous vous répondons sous 24h",
                content: "contact@bkotube.com",
                link: "mailto:contact@bkotube.com",
                delay: 100
              },
              {
                icon: Phone,
                title: "Téléphone",
                description: "Lun-Ven, 9h-18h",
                content: "+223 XX XX XX XX",
                link: "tel:+22XXXXXXXX",
                delay: 200
              },
              {
                icon: MapPin,
                title: "Adresse",
                description: "Venez nous rencontrer",
                content: "Bamako, Mali",
                link: "#map",
                delay: 300
              },
              {
                icon: Clock,
                title: "Horaires",
                description: "Nos bureaux sont ouverts",
                content: "Lun-Ven, 9h-18h",
                delay: 400
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="glass-card p-6 text-center animated-element"
                style={{ transitionDelay: `${item.delay}ms` }}
              >
                <div className="inline-flex items-center justify-center p-3 rounded-lg bg-brand-100 text-brand-600 mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                {item.link ? (
                  <a 
                    href={item.link} 
                    className="text-brand-600 hover:underline font-medium"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="font-medium">{item.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-16 bg-brand-50/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading
                title="Envoyez-nous un message"
                subtitle="Complétez le formulaire ci-dessous et notre équipe vous contactera dans les plus brefs délais."
                badge="Contact"
              />
              
              <div className="mt-8">
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="general">Général</TabsTrigger>
                    <TabsTrigger value="service">Services</TabsTrigger>
                    <TabsTrigger value="support">Support</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="general" className="mt-6">
                    {!formSubmitted ? (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="firstname">Prénom</Label>
                              <Input id="firstname" placeholder="Votre prénom" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastname">Nom</Label>
                              <Input id="lastname" placeholder="Votre nom" required />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="votre@email.com" required />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="subject">Sujet</Label>
                            <Input id="subject" placeholder="Sujet de votre message" required />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea 
                              id="message" 
                              placeholder="Détaillez votre demande..." 
                              rows={5}
                              required
                            />
                          </div>
                        </div>
                        
                        {formError && (
                          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 flex items-start">
                            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-sm">
                              Une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer.
                            </p>
                          </div>
                        )}
                        
                        <Button type="submit" className="w-full gap-2">
                          <Send className="h-4 w-4" />
                          Envoyer le message
                        </Button>
                      </form>
                    ) : (
                      <div className="text-center p-8 bg-brand-50 rounded-xl border border-brand-100 space-y-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-100 text-brand-600">
                          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold">Message envoyé avec succès !</h3>
                        <p className="text-muted-foreground">
                          Merci de nous avoir contactés. Notre équipe reviendra vers vous dans les plus brefs délais.
                        </p>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setFormSubmitted(false);
                            setFormError(false);
                          }}
                        >
                          Envoyer un autre message
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="service" className="mt-6">
                    {!formSubmitted ? (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="service-name">Nom</Label>
                              <Input id="service-name" placeholder="Votre nom complet" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="service-email">Email</Label>
                              <Input id="service-email" type="email" placeholder="votre@email.com" required />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="service-type">Service intéressé</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez un service" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="marketing">Marketing Digital</SelectItem>
                                <SelectItem value="social">Gestion Réseaux Sociaux</SelectItem>
                                <SelectItem value="content">Production de Contenu</SelectItem>
                                <SelectItem value="pr">Relations Presse</SelectItem>
                                <SelectItem value="distribution">Distribution Musicale</SelectItem>
                                <SelectItem value="other">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="budget">Budget approximatif</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez votre budget" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="small">Moins de 50 000 FCFA</SelectItem>
                                <SelectItem value="medium">50 000 - 100 000 FCFA</SelectItem>
                                <SelectItem value="large">100 000 - 200 000 FCFA</SelectItem>
                                <SelectItem value="enterprise">Plus de 200 000 FCFA</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="service-message">Détails du projet</Label>
                            <Textarea 
                              id="service-message" 
                              placeholder="Décrivez votre projet et vos besoins..." 
                              rows={5}
                              required
                            />
                          </div>
                        </div>
                        
                        {formError && (
                          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 flex items-start">
                            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-sm">
                              Une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer.
                            </p>
                          </div>
                        )}
                        
                        <Button type="submit" className="w-full gap-2">
                          <Send className="h-4 w-4" />
                          Demander un devis
                        </Button>
                      </form>
                    ) : (
                      <div className="text-center p-8 bg-brand-50 rounded-xl border border-brand-100 space-y-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-100 text-brand-600">
                          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold">Demande envoyée avec succès !</h3>
                        <p className="text-muted-foreground">
                          Merci pour votre intérêt. Un membre de notre équipe vous contactera sous 24h pour discuter de votre projet.
                        </p>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setFormSubmitted(false);
                            setFormError(false);
                          }}
                        >
                          Envoyer une autre demande
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="support" className="mt-6">
                    {!formSubmitted ? (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="support-name">Nom</Label>
                              <Input id="support-name" placeholder="Votre nom complet" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="support-email">Email</Label>
                              <Input id="support-email" type="email" placeholder="votre@email.com" required />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="issue-type">Type de problème</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez un type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="account">Problème de compte</SelectItem>
                                <SelectItem value="payment">Problème de paiement</SelectItem>
                                <SelectItem value="service">Problème avec un service</SelectItem>
                                <SelectItem value="technical">Problème technique</SelectItem>
                                <SelectItem value="other">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="urgent">Niveau d'urgence</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez un niveau d'urgence" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Faible - Question générale</SelectItem>
                                <SelectItem value="medium">Moyen - Besoin d'une réponse bientôt</SelectItem>
                                <SelectItem value="high">Élevé - Problème affectant mon travail</SelectItem>
                                <SelectItem value="critical">Critique - Besoin d'aide immédiate</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="support-message">Description du problème</Label>
                            <Textarea 
                              id="support-message" 
                              placeholder="Décrivez en détail le problème que vous rencontrez..." 
                              rows={5}
                              required
                            />
                          </div>
                        </div>
                        
                        {formError && (
                          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 flex items-start">
                            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-sm">
                              Une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer.
                            </p>
                          </div>
                        )}
                        
                        <Button type="submit" className="w-full gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Soumettre la demande
                        </Button>
                      </form>
                    ) : (
                      <div className="text-center p-8 bg-brand-50 rounded-xl border border-brand-100 space-y-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-100 text-brand-600">
                          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold">Demande de support envoyée !</h3>
                        <p className="text-muted-foreground">
                          Nous avons bien reçu votre demande de support. Un membre de notre équipe vous contactera rapidement.
                        </p>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setFormSubmitted(false);
                            setFormError(false);
                          }}
                        >
                          Soumettre une autre demande
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="glass-card p-6 animated-element">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Music className="mr-2 h-5 w-5 text-brand-600" />
                  FAQ Artistes
                </h3>
                
                <div className="space-y-4">
                  {[
                    {
                      question: "Comment puis-je commencer avec BkoTube ?",
                      answer: "Pour commencer, vous pouvez nous contacter via le formulaire ou nous appeler directement. Nous organiserons ensuite un rendez-vous pour discuter de vos besoins et vous proposer une solution adaptée."
                    },
                    {
                      question: "Quels sont les délais de mise en place ?",
                      answer: "La mise en place de nos services prend généralement entre 1 et 2 semaines, selon la complexité de votre projet et le pack choisi."
                    },
                    {
                      question: "Comment fonctionne le paiement ?",
                      answer: "Nous proposons plusieurs options de paiement, dont des abonnements mensuels ou annuels, ainsi que des solutions de paiement mobile adaptées au marché local."
                    },
                    {
                      question: "Puis-je annuler mon abonnement ?",
                      answer: "Oui, vous pouvez annuler votre abonnement à tout moment. Les abonnements sont sans engagement de durée minimale."
                    }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-medium">{item.question}</h4>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div id="map" className="rounded-xl overflow-hidden border h-[300px] bg-muted animated-element">
                <div className="w-full h-full flex items-center justify-center bg-brand-50">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-brand-600 mx-auto mb-2" />
                    <p className="font-medium">Notre emplacement</p>
                    <p className="text-sm text-muted-foreground">
                      Bamako, Mali
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partners */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <SectionHeading
            title="Ils nous font confiance"
            subtitle="Nous collaborons avec les meilleures marques et artistes de l'industrie musicale."
            badge="Partenaires"
            centered
          />
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {Array.from({ length: 6 }).map((_, index) => (
              <div 
                key={index} 
                className="h-16 w-32 bg-muted rounded flex items-center justify-center animated-element"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-muted-foreground font-medium">
                  Partner {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactPage;
