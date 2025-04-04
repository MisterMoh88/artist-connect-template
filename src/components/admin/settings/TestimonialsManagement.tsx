
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Testimonial, TestimonialsSection, updateSiteSetting } from '@/services/siteSettings';
import { Trash2, Plus, Edit, Quote } from 'lucide-react';
import { uploadFile, deleteFile } from '@/services/storageService';
import { v4 as uuidv4 } from 'uuid';
import ImageUpload from '@/components/ui/image-upload';

const sectionSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  subtitle: z.string().min(10, 'Le sous-titre doit contenir au moins 10 caractères'),
});

const testimonialSchema = z.object({
  id: z.string().optional(),
  content: z.string().min(10, 'Le témoignage doit contenir au moins 10 caractères'),
  author: z.string().min(2, 'Le nom de l\'auteur doit contenir au moins 2 caractères'),
  role: z.string().min(2, 'Le poste/rôle doit contenir au moins 2 caractères'),
  image: z.string().optional(),
});

interface TestimonialsManagementProps {
  initialData: TestimonialsSection;
}

const TestimonialsManagement = ({ initialData }: TestimonialsManagementProps) => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialData.testimonials || []);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const sectionForm = useForm<TestimonialsSection>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      title: initialData.title,
      subtitle: initialData.subtitle,
    },
  });

  const testimonialForm = useForm<Testimonial>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      content: '',
      author: '',
      role: '',
    },
  });

  const handleSectionSubmit = async (data: TestimonialsSection) => {
    try {
      const updatedSection = {
        ...data,
        testimonials
      };
      
      const success = await updateSiteSetting('testimonials_section', updatedSection);
      
      if (success) {
        toast({
          title: 'Section témoignages mise à jour',
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

  const handleOpenAddDialog = () => {
    testimonialForm.reset({
      content: '',
      author: '',
      role: '',
    });
    setEditingTestimonial(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (testimonial: Testimonial) => {
    testimonialForm.reset({
      id: testimonial.id,
      content: testimonial.content,
      author: testimonial.author,
      role: testimonial.role,
      image: testimonial.image,
    });
    setEditingTestimonial(testimonial);
    setIsDialogOpen(true);
  };

  const handleTestimonialSubmit = async (data: Testimonial) => {
    try {
      let updatedTestimonials: Testimonial[];
      
      if (editingTestimonial) {
        // Update existing testimonial
        updatedTestimonials = testimonials.map(t => 
          t.id === editingTestimonial.id ? { ...data, id: t.id } : t
        );
      } else {
        // Add new testimonial
        const newTestimonial: Testimonial = {
          ...data,
          id: uuidv4()
        };
        updatedTestimonials = [...testimonials, newTestimonial];
      }
      
      setTestimonials(updatedTestimonials);
      
      // Update in database
      const updatedSection = {
        title: sectionForm.getValues('title'),
        subtitle: sectionForm.getValues('subtitle'),
        testimonials: updatedTestimonials
      };
      
      await updateSiteSetting('testimonials_section', updatedSection);
      
      setIsDialogOpen(false);
      
      toast({
        title: editingTestimonial ? 'Témoignage mis à jour' : 'Témoignage ajouté',
        description: editingTestimonial 
          ? 'Le témoignage a été mis à jour avec succès.'
          : 'Le témoignage a été ajouté avec succès.',
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'enregistrement du témoignage.',
      });
    }
  };

  const handleDeleteTestimonial = async (testimonialId: string) => {
    try {
      const testimonialToDelete = testimonials.find(t => t.id === testimonialId);
      
      if (testimonialToDelete?.image && testimonialToDelete.image.includes('storage/v1')) {
        try {
          await deleteFile(testimonialToDelete.image, 'site-images');
        } catch (err) {
          console.warn('Erreur lors de la suppression de l\'image:', err);
          // Continue even if image delete fails
        }
      }
      
      const updatedTestimonials = testimonials.filter(t => t.id !== testimonialId);
      setTestimonials(updatedTestimonials);
      
      // Update in database
      const updatedSection = {
        title: sectionForm.getValues('title'),
        subtitle: sectionForm.getValues('subtitle'),
        testimonials: updatedTestimonials
      };
      
      await updateSiteSetting('testimonials_section', updatedSection);
      
      toast({
        title: 'Témoignage supprimé',
        description: 'Le témoignage a été supprimé avec succès.',
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du témoignage:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la suppression du témoignage.',
      });
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const imageUrl = await uploadFile(file, 'site-images', 'testimonials');
      testimonialForm.setValue('image', imageUrl);
      setUploading(false);
      
      toast({
        title: 'Image téléchargée',
        description: 'L\'image a été téléchargée avec succès.',
      });
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error);
      setUploading(false);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors du téléchargement de l\'image.',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Section titles form */}
      <Card>
        <CardHeader>
          <CardTitle>Section Témoignages</CardTitle>
          <CardDescription>
            Modifiez les titres de la section témoignages qui apparaît sur la page d'accueil.
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

      {/* Testimonials list */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gérer les témoignages</CardTitle>
            <CardDescription>
              Ajoutez, modifiez ou supprimez les témoignages qui apparaissent sur votre site.
            </CardDescription>
          </div>
          <Button onClick={handleOpenAddDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un témoignage
          </Button>
        </CardHeader>
        <CardContent>
          {testimonials.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Quote className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p>Aucun témoignage n'a été ajouté.</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={handleOpenAddDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter le premier témoignage
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map(testimonial => (
                <Card key={testimonial.id} className="overflow-hidden">
                  <div className="flex flex-col h-full">
                    <div className="bg-muted/30 p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          {testimonial.image ? (
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                              <img 
                                src={testimonial.image} 
                                alt={testimonial.author}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="font-semibold text-primary">
                                {testimonial.author.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div className="ml-3">
                            <h4 className="font-medium">{testimonial.author}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleOpenEditDialog(testimonial)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Modifier</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                            <span className="sr-only">Supprimer</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex-1">
                      <p className="text-sm leading-relaxed">"{testimonial.content}"</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Testimonial Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingTestimonial ? 'Modifier le témoignage' : 'Ajouter un témoignage'}
            </DialogTitle>
          </DialogHeader>
          <Form {...testimonialForm}>
            <form onSubmit={testimonialForm.handleSubmit(handleTestimonialSubmit)} className="space-y-4">
              <FormField
                control={testimonialForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Témoignage</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={testimonialForm.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de l'auteur</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={testimonialForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poste / Rôle</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormItem>
                <FormLabel>Photo (optionnelle)</FormLabel>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {testimonialForm.watch('image') ? (
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img 
                          src={testimonialForm.watch('image')}
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <ImageUpload
                      value={testimonialForm.watch('image')}
                      onChange={handleImageUpload}
                      label="Télécharger une photo"
                      maxWidth={200}
                      maxHeight={200}
                    />
                  </div>
                </div>
              </FormItem>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={uploading}>
                  {editingTestimonial ? 'Mettre à jour' : 'Ajouter'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialsManagement;
