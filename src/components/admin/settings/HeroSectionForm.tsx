
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { HeroSection, updateSiteSetting } from '@/services/siteSettings';

const heroSectionSchema = z.object({
  title: z.string().min(5, 'Le titre doit contenir au moins 5 caractères'),
  subtitle: z.string().min(10, 'Le sous-titre doit contenir au moins 10 caractères'),
  buttonText: z.string(),
  secondaryButtonText: z.string(),
  buttonLink: z.string(),
  secondaryButtonLink: z.string(),
});

interface HeroSectionFormProps {
  initialData: HeroSection;
}

const HeroSectionForm = ({ initialData }: HeroSectionFormProps) => {
  const { toast } = useToast();
  const form = useForm<HeroSection>({
    resolver: zodResolver(heroSectionSchema),
    defaultValues: initialData,
  });

  const handleSubmit = async (data: HeroSection) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Section Héro</CardTitle>
        <CardDescription>
          Modifiez le contenu de la section principale en haut de la page d'accueil.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
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
              control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
  );
};

export default HeroSectionForm;
