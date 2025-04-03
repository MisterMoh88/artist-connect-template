
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash, Plus, Upload, Image, Music, Video, Disc, Calendar, Clock, Heart } from 'lucide-react';
import { 
  FeaturedItem, 
  getFeaturedItems, 
  createFeaturedItem, 
  updateFeaturedItem, 
  deleteFeaturedItem 
} from '@/services/featuredItemsService';
import { uploadFile } from '@/services/storageService';

const featuredItemSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  artist: z.string().min(2, 'Le nom de l\'artiste doit contenir au moins 2 caractères'),
  type: z.enum(['song', 'video', 'mixtape', 'album']),
  link: z.string().url('Veuillez entrer une URL valide'),
  release_date: z.string(),
  duration: z.string().optional(),
  likes: z.number().int().nonnegative().optional(),
});

type FormValues = z.infer<typeof featuredItemSchema>;

const FeaturedItemsAdmin = () => {
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(featuredItemSchema),
    defaultValues: {
      title: '',
      artist: '',
      type: 'song',
      link: '',
      release_date: new Date().toISOString().split('T')[0],
      duration: '',
      likes: 0,
    }
  });

  useEffect(() => {
    loadFeaturedItems();
  }, []);

  const loadFeaturedItems = async () => {
    try {
      setIsLoading(true);
      const items = await getFeaturedItems();
      setFeaturedItems(items);
    } catch (error) {
      console.error('Erreur lors du chargement des articles en vedette:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de charger les articles en vedette',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    form.reset({
      title: '',
      artist: '',
      type: 'song',
      link: '',
      release_date: new Date().toISOString().split('T')[0],
      duration: '',
      likes: 0,
    });
    setSelectedImage(null);
    setImagePreview(null);
    setEditingItem(null);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      
      if (!selectedImage && !editingItem) {
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Veuillez sélectionner une image de couverture',
        });
        return;
      }
      
      let coverImageUrl = '';
      
      // Télécharger l'image si elle a été sélectionnée
      if (selectedImage) {
        coverImageUrl = await uploadFile(selectedImage, 'featured-items');
      } else if (editingItem) {
        // Garder l'URL existante si en mode édition
        const existingItem = featuredItems.find(item => item.id === editingItem);
        coverImageUrl = existingItem?.cover_image || '';
      }
      
      if (editingItem) {
        // Mode édition
        await updateFeaturedItem(editingItem, {
          ...data,
          cover_image: coverImageUrl || undefined,
        });
        
        toast({
          title: 'Succès',
          description: 'Article mis à jour avec succès',
        });
      } else {
        // Mode création
        await createFeaturedItem({
          ...data,
          cover_image: coverImageUrl,
        });
        
        toast({
          title: 'Succès',
          description: 'Article créé avec succès',
        });
      }
      
      // Recharger les articles et réinitialiser le formulaire
      await loadFeaturedItems();
      resetForm();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'article:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible d\'enregistrer l\'article',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: FeaturedItem) => {
    form.reset({
      title: item.title,
      artist: item.artist,
      type: item.type,
      link: item.link,
      release_date: new Date(item.release_date).toISOString().split('T')[0],
      duration: item.duration || '',
      likes: item.likes || 0,
    });
    setEditingItem(item.id);
    setImagePreview(item.cover_image);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      setIsLoading(true);
      
      await deleteFeaturedItem(deleteId);
      
      toast({
        title: 'Succès',
        description: 'Article supprimé avec succès',
      });
      
      // Recharger les articles
      await loadFeaturedItems();
      setDeleteId(null);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de supprimer l\'article',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeIcon = (type: FeaturedItem['type']) => {
    switch (type) {
      case 'song':
        return <Music className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'mixtape':
        return <Disc className="h-4 w-4" />;
      case 'album':
        return <Disc className="h-4 w-4" />;
      default:
        return <Music className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: FeaturedItem['type']) => {
    switch (type) {
      case 'song':
        return 'Son';
      case 'video':
        return 'Clip';
      case 'mixtape':
        return 'Mixtape';
      case 'album':
        return 'Album';
      default:
        return type;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des articles en vedette</h1>
          <p className="text-muted-foreground">
            Ajoutez, modifiez ou supprimez les articles qui apparaissent dans la section "À la Une" de la page d'accueil.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{editingItem ? 'Modifier un article' : 'Ajouter un article'}</CardTitle>
                <CardDescription>
                  {editingItem 
                    ? 'Modifiez les informations de l\'article sélectionné' 
                    : 'Remplissez le formulaire pour ajouter un nouvel article en vedette'}
                </CardDescription>
              </CardHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Titre de la publication" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="artist"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Artiste</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Nom de l'artiste" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="song">Son</SelectItem>
                              <SelectItem value="video">Clip</SelectItem>
                              <SelectItem value="mixtape">Mixtape</SelectItem>
                              <SelectItem value="album">Album</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="release_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date de sortie</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Durée (optionnel)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="3:45" />
                          </FormControl>
                          <FormDescription>Format: minutes:secondes</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="likes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre de likes (optionnel)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              min="0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="link"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lien</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://exemple.com/page" />
                          </FormControl>
                          <FormDescription>URL vers laquelle l'utilisateur sera redirigé</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <FormLabel>Image de couverture</FormLabel>
                      <div className="mt-2">
                        {imagePreview ? (
                          <div className="relative group">
                            <img 
                              src={imagePreview} 
                              alt="Aperçu" 
                              className="w-full h-48 object-cover rounded-md"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button 
                                variant="secondary" 
                                size="sm"
                                type="button"
                                onClick={() => {
                                  setSelectedImage(null);
                                  setImagePreview(null);
                                }}
                              >
                                Changer l'image
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                            <Input 
                              type="file" 
                              id="cover_image"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                            <label 
                              htmlFor="cover_image" 
                              className="cursor-pointer flex flex-col items-center space-y-2"
                            >
                              <Image className="h-8 w-8 text-gray-400" />
                              <span className="text-sm text-gray-500">
                                Cliquez pour télécharger une image
                              </span>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="ghost"
                      onClick={resetForm}
                    >
                      Annuler
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>Chargement...</>
                      ) : editingItem ? (
                        <>
                          <Pencil className="h-4 w-4" />
                          Mettre à jour
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          Ajouter
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Articles en vedette</CardTitle>
                <CardDescription>
                  Liste des articles actuellement en vedette sur la page d'accueil
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-4">Chargement...</div>
                ) : featuredItems.length === 0 ? (
                  <div className="text-center py-4">Aucun article en vedette pour le moment</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-14">Image</TableHead>
                        <TableHead>Titre</TableHead>
                        <TableHead>Artiste</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {featuredItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="w-10 h-10 overflow-hidden rounded-md">
                              <img 
                                src={item.cover_image} 
                                alt={item.title} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell>{item.artist}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {getTypeIcon(item.type)}
                              <span>{getTypeLabel(item.type)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(item.release_date).toLocaleDateString('fr-FR')}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleEdit(item)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => setDeleteId(item.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Êtes-vous sûr de vouloir supprimer cet article ? Cette action ne peut pas être annulée.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setDeleteId(null)}>
                                      Annuler
                                    </AlertDialogCancel>
                                    <AlertDialogAction 
                                      className="bg-red-500 hover:bg-red-700"
                                      onClick={handleDelete}
                                    >
                                      Supprimer
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default FeaturedItemsAdmin;
