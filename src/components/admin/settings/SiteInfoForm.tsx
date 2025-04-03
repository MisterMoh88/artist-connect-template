
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { SiteInfo, updateSiteSetting } from '@/services/siteSettings';
import ImageUpload from '@/components/ui/image-upload';

const siteInfoSchema = z.object({
  name: z.string().min(2, 'Le nom du site doit contenir au moins 2 caractères'),
  tagline: z.string(),
  logo_url: z.string(),
});

interface SiteInfoFormProps {
  initialData: SiteInfo;
  onLogoUpload: (file: File) => Promise<void>;
}

const SiteInfoForm = ({ initialData, onLogoUpload }: SiteInfoFormProps) => {
  const { toast } = useToast();
  const form = useForm<SiteInfo>({
    resolver: zodResolver(siteInfoSchema),
    defaultValues: initialData,
  });

  const handleSubmit = async (data: SiteInfo) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations du site</CardTitle>
        <CardDescription>
          Modifiez le nom du site, le slogan et le logo qui apparaissent sur le site.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
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
              control={form.control}
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
            <div>
              <FormLabel>Logo du site</FormLabel>
              <FormDescription className="mb-3">Téléchargez le logo qui apparaîtra dans l'en-tête et le pied de page.</FormDescription>
              <ImageUpload 
                value={form.watch('logo_url')} 
                onChange={onLogoUpload}
                maxWidth={200}
                maxHeight={100}
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

export default SiteInfoForm;
