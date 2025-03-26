
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { FeaturedMedia } from '@/types/supabase-custom';
import { useToast } from '@/hooks/use-toast';

const FeaturedMediaContent = () => {
  const [featuredMedia, setFeaturedMedia] = useState<FeaturedMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFeaturedMedia = async () => {
      try {
        const { data, error } = await supabase
          .from('media_contents')
          .select(`
            *,
            artists (name),
            categories (name)
          `)
          .eq('featured', true)
          .limit(6);

        if (error) throw error;

        const formattedData = data.map((item) => ({
          ...item,
          artist_name: item.artists?.name,
          category_name: item.categories?.name
        }));

        setFeaturedMedia(formattedData);
      } catch (error) {
        console.error('Error fetching featured media:', error);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les contenus mis en avant',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMedia();
  }, [toast]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="h-48" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredMedia.length > 0 ? (
        featuredMedia.map((media) => (
          <Card key={media.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <AspectRatio ratio={16 / 9}>
              <img 
                src={media.cover_image_url || '/placeholder.svg'} 
                alt={media.title} 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg line-clamp-1">{media.title}</h3>
                <Badge variant="secondary">{media.category_name}</Badge>
              </div>
              <p className="text-muted-foreground text-sm mb-2">Par {media.artist_name}</p>
              <p className="text-sm line-clamp-2 mb-4">{media.description}</p>
              <Button size="sm" className="w-full">Découvrir</Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-full text-center py-8">
          <p className="text-muted-foreground">Aucun contenu mis en avant pour le moment.</p>
        </div>
      )}
    </div>
  );
};

export default FeaturedMediaContent;
