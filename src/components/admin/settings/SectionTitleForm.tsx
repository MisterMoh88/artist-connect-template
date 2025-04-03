
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { updateSiteSetting } from '@/services/siteSettings';

const sectionTitleSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  subtitle: z.string().min(5, 'Le sous-titre doit contenir au moins 5 caractères'),
});

interface SectionTitleFormProps {
  initialData: {
    title: string;
    subtitle: string;
  };
  settingsKey: string;
  title: string;
  description: string;
}

const SectionTitleForm = ({ initialData, settingsKey, title, description }: SectionTitleFormProps) => {
  const { toast } = useToast();
  const form = useForm<{ title: string; subtitle: string }>({
    resolver: zodResolver(sectionTitleSchema),
    defaultValues: initialData,
  });

  const handleSubmit = async (data: { title: string; subtitle: string }) => {
    try {
      const success = await updateSiteSetting(settingsKey, data);
      
      if (success) {
        toast({
          title: 'Section mise à jour',
          description: `La section ${title.toLowerCase()} a été mise à jour avec succès.`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: `Une erreur est survenue lors de la mise à jour de la section ${title.toLowerCase()}.`,
        });
      }
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la section ${title.toLowerCase()}:`, error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: `Une erreur est survenue lors de la mise à jour de la section ${title.toLowerCase()}.`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
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
  );
};

export default SectionTitleForm;
