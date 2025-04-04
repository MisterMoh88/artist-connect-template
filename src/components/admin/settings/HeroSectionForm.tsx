
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
import { HeroSection, HeroImage, updateSiteSetting } from '@/services/siteSettings';
import { Trash2, Plus, ImageIcon } from 'lucide-react';
import { uploadFile, deleteFile } from '@/services/storageService';
import { v4 as uuidv4 } from 'uuid';
import ImageUpload from '@/components/ui/image-upload';

const heroSectionSchema = z.object({
  title: z.string().min(5, 'Le titre doit contenir au moins 5 caractères'),
  subtitle: z.string().min(10, 'Le sous-titre doit contenir au moins 10 caractères'),
  buttonText: z.string(),
  secondaryButtonText: z.string(),
  buttonLink: z.string(),
  secondaryButtonLink: z.string(),
  // images will be handled separately
});

interface HeroSectionFormProps {
  initialData: HeroSection;
}

const HeroSectionForm = ({ initialData }: HeroSectionFormProps) => {
  const { toast } = useToast();
  
  // Ensure we have an images array
  const initialImages = initialData.images || [];
  
  const [images, setImages] = useState<HeroImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  
  const form = useForm<HeroSection>({
    resolver: zodResolver(heroSectionSchema),
    defaultValues: initialData,
  });

  const handleSubmit = async (data: HeroSection) => {
    try {
      // Combine form data with images
      const updatedData: HeroSection = {
        ...data,
        images
      };
      
      const success = await updateSiteSetting('hero_section', updatedData);
      
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

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      
      const imageId = uuidv4();
      const url = await uploadFile(file, 'site-images', 'hero');
      
      const newImage: HeroImage = {
        id: imageId,
        url,
        alt: 'Image de la section héro'
      };
      
      const updatedImages = [...images, newImage];
      setImages(updatedImages);
      
      // Update the site settings with the new images
      await updateSiteSetting('hero_section', {
        ...form.getValues(),
        images: updatedImages
      });
      
      toast({
        title: 'Image ajoutée',
        description: "L'image a été ajoutée avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: "Une erreur est survenue lors du téléchargement de l'image.",
      });
    } finally {
      setUploading(false);
    }
  };
  
  const handleDeleteImage = async (imageToDelete: HeroImage) => {
    try {
      // Delete file from storage if it's a Supabase URL
      if (imageToDelete.url.includes('storage/v1')) {
        await deleteFile(imageToDelete.url, 'site-images');
      }
      
      // Update local state
      const updatedImages = images.filter(img => img.id !== imageToDelete.id);
      setImages(updatedImages);
      
      // Update site settings
      await updateSiteSetting('hero_section', {
        ...form.getValues(),
        images: updatedImages
      });
      
      toast({
        title: 'Image supprimée',
        description: "L'image a été supprimée avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'image:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: "Une erreur est survenue lors de la suppression de l'image.",
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
          <CardContent className="space-y-6">
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

            {/* Images de la section héro */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel className="text-base">Images du carrousel</FormLabel>
                <div className="text-sm text-muted-foreground">
                  {images.length} image{images.length !== 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {images.map(image => (
                  <div key={image.id} className="relative group overflow-hidden rounded-lg">
                    <img 
                      src={image.url} 
                      alt={image.alt}
                      className="w-full aspect-video object-cover" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDeleteImage(image)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                ))}
                
                <div className="aspect-video flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <ImageUpload
                    onChange={handleImageUpload}
                    label="Ajouter une image (16:9)"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Enregistrer les modifications</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default HeroSectionForm;
