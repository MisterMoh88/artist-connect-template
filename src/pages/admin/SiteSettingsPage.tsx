
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Loader2, Save } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import AdminLayout from '@/components/layout/AdminLayout';
import { SiteInfo, HeroSection, FeaturedSection, FeaturesSection, TestimonialsSection, CtaSection } from '@/services/siteSettings';
import { useToast } from '@/hooks/use-toast';

// Schémas de validation
const siteInfoSchema = z.object({
  name: z.string().min(1, 'Le nom du site est requis'),
  tagline: z.string().min(1, 'Le slogan est requis'),
  logo_url: z.string().optional(),
});

const heroSectionSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  subtitle: z.string().min(1, 'Le sous-titre est requis'),
  buttonText: z.string().min(1, 'Le texte du bouton est requis'),
  secondaryButtonText: z.string().min(1, 'Le texte du bouton secondaire est requis'),
  buttonLink: z.string().min(1, 'Le lien du bouton est requis'),
  secondaryButtonLink: z.string().min(1, 'Le lien du bouton secondaire est requis'),
});

const featuredSectionSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  subtitle: z.string().min(1, 'Le sous-titre est requis'),
});

const featuresSectionSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  subtitle: z.string().min(1, 'Le sous-titre est requis'),
});

const testimonialsSectionSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  subtitle: z.string().min(1, 'Le sous-titre est requis'),
});

const ctaSectionSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  subtitle: z.string().min(1, 'Le sous-titre est requis'),
  primaryButtonText: z.string().min(1, 'Le texte du bouton primaire est requis'),
  secondaryButtonText: z.string().min(1, 'Le texte du bouton secondaire est requis'),
  primaryButtonLink: z.string().min(1, 'Le lien du bouton primaire est requis'),
  secondaryButtonLink: z.string().min(1, 'Le lien du bouton secondaire est requis'),
});

const SiteSettingsPage = () => {
  const { settings, isLoading, updateSetting } = useSiteSettings();
  const [activeTab, setActiveTab] = useState('site-info');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Formulaires pour chaque section
  const siteInfoForm = useForm<SiteInfo>({
    resolver: zodResolver(siteInfoSchema),
    defaultValues: settings?.site_info || {
      name: '',
      tagline: '',
      logo_url: '',
    },
  });

  const heroSectionForm = useForm<HeroSection>({
    resolver: zodResolver(heroSectionSchema),
    defaultValues: settings?.hero_section || {
      title: '',
      subtitle: '',
      buttonText: '',
      secondaryButtonText: '',
      buttonLink: '',
      secondaryButtonLink: '',
    },
  });

  const featuredSectionForm = useForm<FeaturedSection>({
    resolver: zodResolver(featuredSectionSchema),
    defaultValues: settings?.featured_section || {
      title: '',
      subtitle: '',
    },
  });

  const featuresSectionForm = useForm<FeaturesSection>({
    resolver: zodResolver(featuresSectionSchema),
    defaultValues: settings?.features_section || {
      title: '',
      subtitle: '',
    },
  });

  const testimonialsSectionForm = useForm<TestimonialsSection>({
    resolver: zodResolver(testimonialsSectionSchema),
    defaultValues: settings?.testimonials_section || {
      title: '',
      subtitle: '',
    },
  });

  const ctaSectionForm = useForm<CtaSection>({
    resolver: zodResolver(ctaSectionSchema),
    defaultValues: settings?.cta_section || {
      title: '',
      subtitle: '',
      primaryButtonText: '',
      secondaryButtonText: '',
      primaryButtonLink: '',
      secondaryButtonLink: '',
    },
  });

  // Mettre à jour les valeurs des formulaires lorsque les paramètres sont chargés
  useState(() => {
    if (settings) {
      siteInfoForm.reset(settings.site_info);
      heroSectionForm.reset(settings.hero_section);
      featuredSectionForm.reset(settings.featured_section);
      featuresSectionForm.reset(settings.features_section);
      testimonialsSectionForm.reset(settings.testimonials_section);
      ctaSectionForm.reset(settings.cta_section);
    }
  });

  // Gérer la soumission des formulaires
  const onSubmitSiteInfo = async (data: SiteInfo) => {
    setIsSaving(true);
    try {
      await updateSetting('site_info', data);
      toast({
        title: 'Succès',
        description: 'Informations du site mises à jour',
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations du site:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const onSubmitHeroSection = async (data: HeroSection) => {
    setIsSaving(true);
    try {
      await updateSetting('hero_section', data);
      toast({
        title: 'Succès',
        description: 'Section héro mise à jour',
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la section héro:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const onSubmitFeaturedSection = async (data: FeaturedSection) => {
    setIsSaving(true);
    try {
      await updateSetting('featured_section', data);
      toast({
        title: 'Succès',
        description: 'Section en vedette mise à jour',
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la section en vedette:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const onSubmitFeaturesSection = async (data: FeaturesSection) => {
    setIsSaving(true);
    try {
      await updateSetting('features_section', data);
      toast({
        title: 'Succès',
        description: 'Section fonctionnalités mise à jour',
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la section fonctionnalités:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const onSubmitTestimonialsSection = async (data: TestimonialsSection) => {
    setIsSaving(true);
    try {
      await updateSetting('testimonials_section', data);
      toast({
        title: 'Succès',
        description: 'Section témoignages mise à jour',
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la section témoignages:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const onSubmitCtaSection = async (data: CtaSection) => {
    setIsSaving(true);
    try {
      await updateSetting('cta_section', data);
      toast({
        title: 'Succès',
        description: 'Section CTA mise à jour',
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la section CTA:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
          <span className="ml-2">Chargement des paramètres...</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container pb-10">
        <h1 className="text-3xl font-bold mb-2">Paramètres du site</h1>
        <p className="text-muted-foreground mb-6">Gérez les paramètres généraux du site et le contenu de la page d'accueil</p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 w-full grid grid-cols-3 md:grid-cols-6 h-auto gap-2">
            <TabsTrigger value="site-info" className="px-4 py-2">
              Informations du site
            </TabsTrigger>
            <TabsTrigger value="hero-section" className="px-4 py-2">
              Section héro
            </TabsTrigger>
            <TabsTrigger value="featured-section" className="px-4 py-2">
              Section en vedette
            </TabsTrigger>
            <TabsTrigger value="features-section" className="px-4 py-2">
              Services
            </TabsTrigger>
            <TabsTrigger value="testimonials-section" className="px-4 py-2">
              Témoignages
            </TabsTrigger>
            <TabsTrigger value="cta-section" className="px-4 py-2">
              Section CTA
            </TabsTrigger>
          </TabsList>
          
          {/* Informations du site */}
          <TabsContent value="site-info">
            <Card>
              <CardHeader>
                <CardTitle>Informations du site</CardTitle>
                <CardDescription>
                  Configurez les informations générales du site comme le nom, le slogan et le logo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...siteInfoForm}>
                  <form onSubmit={siteInfoForm.handleSubmit(onSubmitSiteInfo)} className="space-y-6">
                    <FormField
                      control={siteInfoForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom du site</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Nom du site" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={siteInfoForm.control}
                      name="tagline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slogan</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Slogan du site" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={siteInfoForm.control}
                      name="logo_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL du logo</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="URL du logo" 
                              {...field} 
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enregistrement...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Enregistrer
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Section héro */}
          <TabsContent value="hero-section">
            <Card>
              <CardHeader>
                <CardTitle>Section héro</CardTitle>
                <CardDescription>
                  Configurez le contenu de la section principale de la page d'accueil.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...heroSectionForm}>
                  <form onSubmit={heroSectionForm.handleSubmit(onSubmitHeroSection)} className="space-y-6">
                    <FormField
                      control={heroSectionForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Titre de la section héro" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={heroSectionForm.control}
                      name="subtitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sous-titre</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Sous-titre de la section héro" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={heroSectionForm.control}
                        name="buttonText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Texte du bouton principal</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Texte du bouton" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={heroSectionForm.control}
                        name="buttonLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lien du bouton principal</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Lien du bouton" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={heroSectionForm.control}
                        name="secondaryButtonText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Texte du bouton secondaire</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Texte du bouton secondaire" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={heroSectionForm.control}
                        name="secondaryButtonLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lien du bouton secondaire</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Lien du bouton secondaire" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enregistrement...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Enregistrer
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Section en vedette */}
          <TabsContent value="featured-section">
            <Card>
              <CardHeader>
                <CardTitle>Section en vedette</CardTitle>
                <CardDescription>
                  Configurez le contenu de la section "Artistes en vedette".
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...featuredSectionForm}>
                  <form onSubmit={featuredSectionForm.handleSubmit(onSubmitFeaturedSection)} className="space-y-6">
                    <FormField
                      control={featuredSectionForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Titre de la section en vedette" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={featuredSectionForm.control}
                      name="subtitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sous-titre</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Sous-titre de la section en vedette" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enregistrement...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Enregistrer
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Section services */}
          <TabsContent value="features-section">
            <Card>
              <CardHeader>
                <CardTitle>Section services</CardTitle>
                <CardDescription>
                  Configurez le contenu de la section des services.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...featuresSectionForm}>
                  <form onSubmit={featuresSectionForm.handleSubmit(onSubmitFeaturesSection)} className="space-y-6">
                    <FormField
                      control={featuresSectionForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Titre de la section services" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={featuresSectionForm.control}
                      name="subtitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sous-titre</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Sous-titre de la section services" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enregistrement...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Enregistrer
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Section témoignages */}
          <TabsContent value="testimonials-section">
            <Card>
              <CardHeader>
                <CardTitle>Section témoignages</CardTitle>
                <CardDescription>
                  Configurez le contenu de la section des témoignages.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...testimonialsSectionForm}>
                  <form onSubmit={testimonialsSectionForm.handleSubmit(onSubmitTestimonialsSection)} className="space-y-6">
                    <FormField
                      control={testimonialsSectionForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Titre de la section témoignages" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={testimonialsSectionForm.control}
                      name="subtitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sous-titre</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Sous-titre de la section témoignages" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enregistrement...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Enregistrer
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Section CTA */}
          <TabsContent value="cta-section">
            <Card>
              <CardHeader>
                <CardTitle>Section CTA</CardTitle>
                <CardDescription>
                  Configurez le contenu de la section d'appel à l'action.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...ctaSectionForm}>
                  <form onSubmit={ctaSectionForm.handleSubmit(onSubmitCtaSection)} className="space-y-6">
                    <FormField
                      control={ctaSectionForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Titre de la section CTA" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={ctaSectionForm.control}
                      name="subtitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sous-titre</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Sous-titre de la section CTA" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={ctaSectionForm.control}
                        name="primaryButtonText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Texte du bouton primaire</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Texte du bouton primaire" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={ctaSectionForm.control}
                        name="primaryButtonLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lien du bouton primaire</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Lien du bouton primaire" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={ctaSectionForm.control}
                        name="secondaryButtonText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Texte du bouton secondaire</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Texte du bouton secondaire" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={ctaSectionForm.control}
                        name="secondaryButtonLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lien du bouton secondaire</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Lien du bouton secondaire" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enregistrement...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Enregistrer
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SiteSettingsPage;
