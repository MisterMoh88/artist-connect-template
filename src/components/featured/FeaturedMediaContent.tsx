
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FeaturedItem } from '@/services/featuredItemsService';

interface FeaturedMediaContentProps {
  item: FeaturedItem;
}

const FeaturedMediaContent = ({ item }: FeaturedMediaContentProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <AspectRatio ratio={16 / 9}>
        <img 
          src={item.cover_image || '/placeholder.svg'} 
          alt={item.title} 
          className="object-cover w-full h-full"
        />
      </AspectRatio>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
          <Badge variant="secondary">{item.type}</Badge>
        </div>
        <p className="text-muted-foreground text-sm mb-2">Par {item.artist}</p>
        <div className="flex justify-between text-xs text-muted-foreground mb-4">
          {item.release_date && <span>{new Date(item.release_date).toLocaleDateString()}</span>}
          <span>{item.likes} J'aime</span>
        </div>
        <Button size="sm" className="w-full" asChild>
          <a href={item.link} target="_blank" rel="noopener noreferrer">Découvrir</a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeaturedMediaContent;
