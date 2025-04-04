
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PricingSection, PricingPlan, PricingFeature, updateSiteSetting } from '@/services/siteSettings';
import { Trash2, Plus, Edit, Package, Check, X, Pencil, GripVertical } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { v4 as uuidv4 } from 'uuid';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const sectionSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  subtitle: z.string().min(10, 'Le sous-titre doit contenir au moins 10 caractères'),
});

const pricingPlanSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, 'Le titre doit contenir au moins 2 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  price: z.object({
    monthly: z.string().min(1, 'Veuillez entrer un prix mensuel'),
    annual: z.string().min(1, 'Veuillez entrer un prix annuel'),
  }),
  popular: z.boolean().optional(),
  features: z.array(
    z.object({
      text: z.string().min(2, 'Le texte doit contenir au moins 2 caractères'),
      included: z.boolean(),
      tooltip: z.string().optional(),
    })
  ).optional(),
});

const featureSchema = z.object({
  text: z.string().min(2, 'Le texte doit contenir au moins 2 caractères'),
  included: z.boolean(),
  tooltip: z.string().optional(),
});

interface PricingManagementProps {
  initialData: PricingSection;
}

const PricingManagement = ({ initialData }: PricingManagementProps) => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<PricingPlan[]>(initialData.plans || []);
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<PricingPlan | null>(null);
  const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState<PricingFeature | null>(null);
  const [tempFeatures, setTempFeatures] = useState<PricingFeature[]>([]);

  const sectionForm = useForm<PricingSection>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      title: initialData.title,
      subtitle: initialData.subtitle,
    },
  });

  const planForm = useForm<PricingPlan>({
    resolver: zodResolver(pricingPlanSchema),
    defaultValues: {
      title: '',
      description: '',
      price: {
        monthly: '',
        annual: '',
      },
      features: [],
    },
  });

  const featureForm = useForm<PricingFeature>({
    resolver: zodResolver(featureSchema),
    defaultValues: {
      text: '',
      included: true,
      tooltip: '',
    },
  });

  const handleSectionSubmit = async (data: PricingSection) => {
    try {
      const updatedSection = {
        ...data,
        plans
      };
      
      const success = await updateSiteSetting('pricing_section', updatedSection);
      
      if (success) {
        toast({
          title: 'Section tarifs mise à jour',
          description: 'Les informations de la section ont été mises à jour avec succès.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Une erreur est survenue lors de la mise à jour.',
        });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la mise à jour.',
      });
    }
  };

  const openAddPlan = () => {
    planForm.reset({
      title: '',
      description: '',
      price: {
        monthly: '',
        annual: '',
      },
      popular: false,
      features: [],
    });
    setTempFeatures([]);
    setCurrentPlan(null);
    setIsEditingPlan(true);
  };

  const openEditPlan = (plan: PricingPlan) => {
    planForm.reset({
      ...plan,
    });
    setTempFeatures(plan.features || []);
    setCurrentPlan(plan);
    setIsEditingPlan(true);
  };

  const handlePlanSubmit = async (data: PricingPlan) => {
    try {
      let updatedPlans: PricingPlan[];
      const planWithFeatures = {
        ...data,
        id: currentPlan?.id || uuidv4(),
        features: tempFeatures,
      };
      
      if (currentPlan) {
        // Update existing plan
        updatedPlans = plans.map(p => p.id === currentPlan.id ? planWithFeatures : p);
      } else {
        // Add new plan
        updatedPlans = [...plans, planWithFeatures];
      }
      
      setPlans(updatedPlans);
      
      // Update in database
      const updatedSection = {
        title: sectionForm.getValues('title'),
        subtitle: sectionForm.getValues('subtitle'),
        plans: updatedPlans
      };
      
      await updateSiteSetting('pricing_section', updatedSection);
      setIsEditingPlan(false);
      
      toast({
        title: currentPlan ? 'Forfait mis à jour' : 'Forfait ajouté',
        description: currentPlan 
          ? 'Le forfait a été mis à jour avec succès.'
          : 'Le forfait a été ajouté avec succès.',
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'enregistrement du forfait.',
      });
    }
  };

  const handleDeletePlan = async (planId: string) => {
    try {
      const updatedPlans = plans.filter(p => p.id !== planId);
      setPlans(updatedPlans);
      
      // Update in database
      const updatedSection = {
        title: sectionForm.getValues('title'),
        subtitle: sectionForm.getValues('subtitle'),
        plans: updatedPlans
      };
      
      await updateSiteSetting('pricing_section', updatedSection);
      
      toast({
        title: 'Forfait supprimé',
        description: 'Le forfait a été supprimé avec succès.',
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du forfait:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la suppression du forfait.',
      });
    }
  };

  const openAddFeature = () => {
    featureForm.reset({
      text: '',
      included: true,
      tooltip: '',
    });
    setCurrentFeature(null);
    setIsFeatureDialogOpen(true);
  };

  const openEditFeature = (feature: PricingFeature, index: number) => {
    featureForm.reset({
      text: feature.text,
      included: feature.included,
      tooltip: feature.tooltip || '',
    });
    setCurrentFeature({ ...feature, index });
    setIsFeatureDialogOpen(true);
  };

  const handleFeatureSubmit = (data: PricingFeature) => {
    let updatedFeatures: PricingFeature[];
    
    if (currentFeature !== null && typeof currentFeature.index !== 'undefined') {
      // Edit existing feature
      updatedFeatures = [...tempFeatures];
      updatedFeatures[currentFeature.index] = data;
    } else {
      // Add new feature
      updatedFeatures = [...tempFeatures, data];
    }
    
    setTempFeatures(updatedFeatures);
    setIsFeatureDialogOpen(false);
  };

  const handleDeleteFeature = (index: number) => {
    const updatedFeatures = tempFeatures.filter((_, i) => i !== index);
    setTempFeatures(updatedFeatures);
  };

  return (
    <div className="space-y-6">
      {/* Section titles form */}
      <Card>
        <CardHeader>
          <CardTitle>Section Tarifs</CardTitle>
          <CardDescription>
            Modifiez les titres de la section tarifs qui apparaît sur la page d'accueil.
          </CardDescription>
        </CardHeader>
        <Form {...sectionForm}>
          <form onSubmit={sectionForm.handleSubmit(handleSectionSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={sectionForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre principal</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={sectionForm.control}
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
            </CardContent>
            <CardFooter>
              <Button type="submit">Enregistrer les modifications</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {/* Pricing plans management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gérer les forfaits</CardTitle>
            <CardDescription>
              Ajoutez, modifiez ou supprimez les offres de prix qui apparaissent sur votre site.
            </CardDescription>
          </div>
          <Button onClick={openAddPlan}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un forfait
          </Button>
        </CardHeader>
        <CardContent>
          {plans.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p>Aucun forfait n'a été ajouté.</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={openAddPlan}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter le premier forfait
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {plans.map(plan => (
                <Card key={plan.id} className={`overflow-hidden ${plan.popular ? 'border-primary' : ''}`}>
                  <div className="flex flex-col h-full">
                    {plan.popular && (
                      <div className="bg-primary text-primary-foreground text-center text-xs py-1 font-medium">
                        POPULAIRE
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{plan.title}</CardTitle>
                          <CardDescription className="mt-2">{plan.description}</CardDescription>
                        </div>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => openEditPlan(plan)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Modifier</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeletePlan(plan.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                            <span className="sr-only">Supprimer</span>
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col space-y-4">
                        <div>
                          <div className="text-2xl font-bold">{plan.price.monthly}</div>
                          <div className="text-sm text-muted-foreground">par mois</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold">{plan.price.annual}</div>
                          <div className="text-sm text-muted-foreground">par an</div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          {plan.features?.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              {feature.included ? (
                                <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                              ) : (
                                <X className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
                              )}
                              <span className={feature.included ? '' : 'text-muted-foreground'}>{feature.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit/Add Plan Dialog */}
      <Dialog open={isEditingPlan} onOpenChange={setIsEditingPlan}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              {currentPlan ? 'Modifier le forfait' : 'Ajouter un forfait'}
            </DialogTitle>
          </DialogHeader>
          <Form {...planForm}>
            <form onSubmit={planForm.handleSubmit(handlePlanSubmit)} className="space-y-4">
              <FormField
                control={planForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du forfait</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={planForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={planForm.control}
                  name="price.monthly"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix mensuel</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="ex: 49.900 FCFA" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={planForm.control}
                  name="price.annual"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix annuel</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="ex: 39.900 FCFA" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={planForm.control}
                name="popular"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Forfait populaire</FormLabel>
                      <FormDescription>
                        Mettre ce forfait en évidence comme étant le plus populaire.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value || false}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Separator />

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-medium">Fonctionnalités du forfait</h4>
                  <Button type="button" size="sm" variant="outline" onClick={openAddFeature}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une fonctionnalité
                  </Button>
                </div>

                {tempFeatures.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground border rounded-md">
                    <p>Aucune fonctionnalité n'a été ajoutée.</p>
                    <Button type="button" variant="ghost" size="sm" onClick={openAddFeature} className="mt-2">
                      <Plus className="h-4 w-4 mr-1" />
                      Ajouter
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {tempFeatures.map((feature, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-2 border rounded-md bg-muted/30"
                      >
                        <div className="flex items-center overflow-hidden">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="w-6 flex-shrink-0">
                                  {feature.included ? (
                                    <Check className="h-4 w-4 text-primary" />
                                  ) : (
                                    <X className="h-4 w-4 text-muted-foreground" />
                                  )}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                {feature.included ? 'Inclus' : 'Non inclus'}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <span className="ml-2 text-sm truncate">{feature.text}</span>
                          {feature.tooltip && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="ml-1 text-muted-foreground">ℹ️</div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {feature.tooltip}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                        <div className="flex space-x-1">
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm"
                            onClick={() => openEditFeature(feature, index)}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            <span className="sr-only">Éditer</span>
                          </Button>
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteFeature(index)}
                          >
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                            <span className="sr-only">Supprimer</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline" 
                  onClick={() => setIsEditingPlan(false)}
                >
                  Annuler
                </Button>
                <Button type="submit">
                  {currentPlan ? 'Mettre à jour' : 'Ajouter'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Feature Dialog */}
      <Dialog open={isFeatureDialogOpen} onOpenChange={setIsFeatureDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentFeature ? 'Modifier la fonctionnalité' : 'Ajouter une fonctionnalité'}
            </DialogTitle>
          </DialogHeader>
          <Form {...featureForm}>
            <form onSubmit={featureForm.handleSubmit(handleFeatureSubmit)} className="space-y-4">
              <FormField
                control={featureForm.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description de la fonctionnalité</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="ex: Gestion de 2 réseaux sociaux" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={featureForm.control}
                name="tooltip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Info-bulle (optionnelle)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="ex: Facebook et Instagram" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={featureForm.control}
                name="included"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Fonctionnalité incluse</FormLabel>
                      <FormDescription>
                        Cette fonctionnalité est-elle incluse dans ce forfait?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline" 
                  onClick={() => setIsFeatureDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button type="submit">
                  {currentFeature ? 'Mettre à jour' : 'Ajouter'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PricingManagement;
