
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Artist } from '@/types/supabase-custom';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Loader2,
  Instagram,
  Facebook,
  Youtube,
  Music
} from 'lucide-react';

const ArtistesAdmin = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [formData, setFormData] = useState<Partial<Artist>>({
    name: '',
    email: '',
    bio: '',
    social_instagram: '',
    social_facebook: '',
    social_youtube: '',
    social_spotify: '',
    image_url: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      setArtists(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des artistes:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les artistes.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    artist.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddDialog = () => {
    setSelectedArtist(null);
    setFormData({
      name: '',
      email: '',
      bio: '',
      social_instagram: '',
      social_facebook: '',
      social_youtube: '',
      social_spotify: '',
      image_url: ''
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (artist: Artist) => {
    setSelectedArtist(artist);
    setFormData({
      name: artist.name,
      email: artist.email,
      bio: artist.bio,
      social_instagram: artist.social_instagram,
      social_facebook: artist.social_facebook,
      social_youtube: artist.social_youtube,
      social_spotify: artist.social_spotify,
      image_url: artist.image_url
    });
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (artist: Artist) => {
    setSelectedArtist(artist);
    setIsDeleteDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (selectedArtist) {
        // Mise à jour
        const { error } = await supabase
          .from('artists')
          .update(formData)
          .eq('id', selectedArtist.id);
        
        if (error) throw error;
        
        toast({
          title: 'Succès',
          description: 'L\'artiste a été mis à jour avec succès.',
        });
      } else {
        // Création
        const { error } = await supabase
          .from('artists')
          .insert([formData]);
        
        if (error) throw error;
        
        toast({
          title: 'Succès',
          description: 'L\'artiste a été créé avec succès.',
        });
      }
      
      setIsDialogOpen(false);
      fetchArtists();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'enregistrement.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedArtist) return;
    
    try {
      const { error } = await supabase
        .from('artists')
        .delete()
        .eq('id', selectedArtist.id);
      
      if (error) throw error;
      
      toast({
        title: 'Succès',
        description: 'L\'artiste a été supprimé avec succès.',
      });
      
      setIsDeleteDialogOpen(false);
      fetchArtists();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la suppression.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Gestion des artistes</h1>
            <p className="text-muted-foreground">Gérez les artistes de votre plateforme</p>
          </div>
          <Button onClick={openAddDialog} className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un artiste
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un artiste..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Réseaux sociaux</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    <span className="mt-2 text-sm text-muted-foreground">Chargement des artistes...</span>
                  </TableCell>
                </TableRow>
              ) : filteredArtists.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <p className="text-muted-foreground">Aucun artiste trouvé</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredArtists.map((artist) => (
                  <TableRow key={artist.id}>
                    <TableCell className="font-medium">{artist.name}</TableCell>
                    <TableCell>{artist.email}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {artist.social_instagram && (
                          <Instagram size={16} className="text-pink-600" />
                        )}
                        {artist.social_facebook && (
                          <Facebook size={16} className="text-blue-600" />
                        )}
                        {artist.social_youtube && (
                          <Youtube size={16} className="text-red-600" />
                        )}
                        {artist.social_spotify && (
                          <Music size={16} className="text-green-600" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(artist)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => openDeleteDialog(artist)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Dialogue d'ajout/modification */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedArtist ? 'Modifier un artiste' : 'Ajouter un artiste'}
            </DialogTitle>
            <DialogDescription>
              {selectedArtist 
                ? 'Modifiez les informations de l\'artiste' 
                : 'Remplissez les informations pour ajouter un nouvel artiste'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom de l'artiste *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Biographie</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={formData.bio || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image_url">URL de l'image</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  value={formData.image_url || ''}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="social_instagram">Instagram</Label>
                  <Input
                    id="social_instagram"
                    name="social_instagram"
                    value={formData.social_instagram || ''}
                    onChange={handleInputChange}
                    placeholder="@nomutilisateur"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="social_facebook">Facebook</Label>
                  <Input
                    id="social_facebook"
                    name="social_facebook"
                    value={formData.social_facebook || ''}
                    onChange={handleInputChange}
                    placeholder="@nomutilisateur"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="social_youtube">YouTube</Label>
                  <Input
                    id="social_youtube"
                    name="social_youtube"
                    value={formData.social_youtube || ''}
                    onChange={handleInputChange}
                    placeholder="@chaine ou URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="social_spotify">Spotify</Label>
                  <Input
                    id="social_spotify"
                    name="social_spotify"
                    value={formData.social_spotify || ''}
                    onChange={handleInputChange}
                    placeholder="URL de l'artiste"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit">
                {selectedArtist ? 'Mettre à jour' : 'Ajouter'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialogue de confirmation de suppression */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer l'artiste {selectedArtist?.name} ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDelete}
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ArtistesAdmin;
