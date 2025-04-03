
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { updateSiteSetting, SiteInfo, HeroSection, FeaturedSection, FeaturesSection, TestimonialsSection, CtaSection } from '@/services/siteSettings';
import AdminLayout from '@/components/layout/AdminLayout';
import { Loader2 } from 'lucide-react';

const siteInfoSchema = z.object({
  name: z.string().min(2, 'Le nom du site doit contenir au moins 2 caractères'),
  tagline: z.string(),
  logo_url: z.string(),
});

const heroSectionSchema = z.object({
  title: z.string().min(5, 'Le titre doit contenir au moins 5 caractères'),
  subtitle: z.string().min(10, 'Le sous-titre doit contenir au moins 10 caractères'),
  buttonText: z.string(),
  secondaryButtonText: z.string(),
  buttonLink: z.string(),
  secondaryButtonLink: z.string(),
});

const featuredSectionSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  subtitle: z.string().min(5, 'Le sous-titre doit contenir au moins 5 caractères'),
});

const featuresSectionSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  subtitle: z.string().min(5, 'Le sous-titre doit contenir au moins 5 caractères'),
});

const testimonialsSectionSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  subtitle: z.string().min(5, 'Le sous-titre doit contenir au moins 5 caractères'),
});

const ctaSectionSchema = z.object({
  title: z.string().min(5, 'Le titre doit contenir au moins 5 caractères'),
  subtitle: z.string().min(10, 'Le sous-titre doit contenir au moins 10 caractères'),
  primaryButtonText: z.string(),
  secondaryButtonText: z.string(),
  primaryButtonLink: z.string(),
  secondaryButtonLink: z.string(),
});

const SiteSettingsPage = () => {
  const { settings, isLoading } = useSiteSettings();
  const { toast } = useToast();

  const siteInfoForm = useForm<SiteInfo>({
    resolver: zodResolver(siteInfoSchema),
    defaultValues: {
      name: '',
      tagline: '',
      logo_url: '',
    },
  });

  const heroSectionForm = useForm<HeroSection>({
    resolver: zodResolver(heroSectionSchema),
    defaultValues: {
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
    defaultValues: {
      title: '',
      subtitle: '',
    },
  });

  const featuresSectionForm = useForm<FeaturesSection>({
    resolver: zodResolver(featuresSectionSchema),
    defaultValues: {
      title: '',
      subtitle: '',
    },
  });

  const testimonialsSectionForm = useForm<TestimonialsSection>({
    resolver: zodResolver(testimonialsSectionSchema),
    defaultValues: {
      title: '',
      subtitle: '',
    },
  });

  const ctaSectionForm = useForm<CtaSection>({
    resolver: zodResolver(ctaSectionSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      primaryButtonText: '',
      secondaryButtonText: '',
      primaryButtonLink: '',
      secondaryButtonLink: '',
    },
  });

  // Mettre à jour les formulaires lorsque les paramètres sont chargés
  useEffect(() => {
    if (settings) {
      siteInfoForm.reset(settings.site_info);
      heroSectionForm.reset(settings.hero_section);
      featuredSectionForm.reset(settings.featured_section);
      featuresSectionForm.reset(settings.features_section);
      testimonialsSectionForm.reset(settings.testimonials_section);
      ctaSectionForm.reset(settings.cta_section);
    }
  }, [settings, siteInfoForm, heroSectionForm, featuredSectionForm, featuresSectionForm, testimonialsSectionForm, ctaSectionForm]);

  const handleSiteInfoSubmit = async (data: SiteInfo) => {
    try {
      const success = await updateSiteSetting('site_info', data);
      
      if (success) {
        toast({
          title: 'Informations du site mises à jour',
          description: 'Les informations du site ont été mises à jour avec succès.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Une erreur est survenue lors de la mise à jour des informations du site.',
        });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations du site:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la mise à jour des informations du site.',
      });
    }
  };

  const handleHeroSectionSubmit = async (data: HeroSection) => {
    try {
      const success = await updateSiteSetting('hero_section', data);
      
      if (success) {
        toast({
          title: 'Section héro mise à jour',
          description: 'La section héro a été mise à jour avec succès.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Une erreur est survenue lors de la mise à jour de la section héro.',
        });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la section héro:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la mise à jour de la section héro.',
      });
    }
  };

  const handleFeaturedSectionSubmit = async (data: FeaturedSection) => {
    try {
      const success = await updateSiteSetting('featured_section', data);
      
      if (success) {
        toast({
          title: 'Section en vedette mise à jour',
          description: 'La section en vedette a été mise à jour avec succès.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Une erreur est survenue lors de la mise à jour de la section en vedette.',
        });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la section en vedette:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la mise à jour de la section en vedette.',
      });
    }
  };

  const handleFeaturesSectionSubmit = async (data: FeaturesSection) => {
    try {
      const success = await updateSiteSetting('features_section', data);
      
      if (success) {
        toast({
          title: 'Section caractéristiques mise à jour',
          description: 'La section caractéristiques a été mise à jour avec succès.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Une erreur est survenue lors de la mise à jour de la section caractéristiques.',
        });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la section caractéristiques:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la mise à jour de la section caractéristiques.',
      });
    }
  };

  const handleTestimonialsSectionSubmit = async (data: TestimonialsSection) => {
    try {
      const success = await updateSiteSetting('testimonials_section', data);
      
      if (success) {
        toast({
          title: 'Section témoignages mise à jour',
          description: 'La section témoignages a été mise à jour avec succès.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Une erreur est survenue lors de la mise à jour de la section témoignages.',
        });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la section témoignages:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la mise à jour de la section témoignages.',
      });
    }
  };

  const handleCtaSectionSubmit = async (data: CtaSection) => {
    try {
      const success = await updateSiteSetting('cta_section', data);
      
      if (success) {
        toast({
          title: 'Section CTA mise à jour',
          description: 'La section CTA a été mise à jour avec succès.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Une erreur est survenue lors de la mise à jour de la section CTA.',
        });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la section CTA:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la mise à jour de la section CTA.',
      });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
          <span className="ml-2 text-lg font-medium">Chargement des paramètres...</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Paramètres du site</h1>
          <p className="text-muted-foreground">
            Gérez les paramètres de votre site comme le logo, le nom et les sections de la page d'accueil.
          </p>
        </div>

        <Tabs defaultValue="site-info">
          <TabsList className="mb-6">
            <TabsTrigger value="site-info">Informations du site</TabsTrigger>
            <TabsTrigger value="hero">Section Héro</TabsTrigger>
            <TabsTrigger value="featured">Section En vedette</TabsTrigger>
            <TabsTrigger value="features">Section Services</TabsTrigger>
            <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
            <TabsTrigger value="cta">Section CTA</TabsTrigger>
          </TabsList>

          {/* Site Info */}
          <TabsContent value="site-info">
            <Card>
              <CardHeader>
                <CardTitle>Informations du site</CardTitle>
                <CardDescription>
                  Modifiez le nom du site, le slogan et le logo qui apparaissent sur le site.
                </CardDescription>
              </CardHeader>
              <Form {...siteInfoForm}>
                <form onSubmit={siteInfoForm.handleSubmit(handleSiteInfoSubmit)}>
                  <CardContent className="space-y-4">
                    <FormField
                      control={siteInfoForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom du site</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>Le nom qui apparaît dans l'en-tête du site.</FormDescription>
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
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>Un court slogan décrivant votre site.</FormDescription>
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
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>L'URL de l'image du logo.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Enregistrer</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>

          {/* Hero Section */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Section Héro</CardTitle>
                <CardDescription>
                  Modifiez le contenu de la section principale en haut de la page d'accueil.
                </CardDescription>
              </CardHeader>
              <Form {...heroSectionForm}>
                <form onSubmit={heroSectionForm.handleSubmit(handleHeroSectionSubmit)}>
                  <CardContent className="space-y-4">
                    <FormField
                      control={heroSectionForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Textarea {...field} />
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
                              <Input {...field} />
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
                              <Input {...field} />
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
                              <Input {...field} />
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
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Enregistrer</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>

          {/* Featured Section */}
          <TabsContent value="featured">
            <Card>
              <CardHeader>
                <CardTitle>Section En vedette</CardTitle>
                <CardDescription>
                  Modifiez les titres de la section artistes en vedette.
                </CardDescription>
              </CardHeader>
              <Form {...featuredSectionForm}>
                <form onSubmit={featuredSectionForm.handleSubmit(handleFeaturedSectionSubmit)}>
                  <CardContent className="space-y-4">
                    <FormField
                      control={featuredSectionForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Enregistrer</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>

          {/* Features Section */}
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Section Services</CardTitle>
                <CardDescription>
                  Modifiez les titres de la section services.
                </CardDescription>
              </CardHeader>
              <Form {...featuresSectionForm}>
                <form onSubmit={featuresSectionForm.handleSubmit(handleFeaturesSectionSubmit)}>
                  <CardContent className="space-y-4">
                    <FormField
                      control={featuresSectionForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Enregistrer</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>

          {/* Testimonials Section */}
          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <CardTitle>Section Témoignages</CardTitle>
                <CardDescription>
                  Modifiez les titres de la section témoignages.
                </CardDescription>
              </CardHeader>
              <Form {...testimonialsSectionForm}>
                <form onSubmit={testimonialsSectionForm.handleSubmit(handleTestimonialsSectionSubmit)}>
                  <CardContent className="space-y-4">
                    <FormField
                      control={testimonialsSectionForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Enregistrer</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>

          {/* CTA Section */}
          <TabsContent value="cta">
            <Card>
              <CardHeader>
                <CardTitle>Section CTA</CardTitle>
                <CardDescription>
                  Modifiez le contenu de la section d'appel à l'action en bas de la page d'accueil.
                </CardDescription>
              </CardHeader>
              <Form {...ctaSectionForm}>
                <form onSubmit={ctaSectionForm.handleSubmit(handleCtaSectionSubmit)}>
                  <CardContent className="space-y-4">
                    <FormField
                      control={ctaSectionForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Textarea {...field} />
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
                            <FormLabel>Texte du bouton principal</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                            <FormLabel>Lien du bouton principal</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                              <Input {...field} />
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
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Enregistrer</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SiteSettingsPage;
