
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Music, Video, Disc, Calendar, Clock, Heart, Share2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { FeaturedItem, getFeaturedItems } from "@/services/featuredItemsService";

interface FeaturedSectionProps {
  title: string;
  subtitle: string;
}

const getTypeIcon = (type: FeaturedItem["type"]) => {
  switch (type) {
    case "song":
      return <Music className="h-4 w-4" />;
    case "video":
      return <Video className="h-4 w-4" />;
    case "mixtape":
      return <Disc className="h-4 w-4" />;
    case "album":
      return <Disc className="h-4 w-4" />;
    default:
      return <Music className="h-4 w-4" />;
  }
};

const getTypeLabel = (type: FeaturedItem["type"]) => {
  switch (type) {
    case "song":
      return "Son";
    case "video":
      return "Clip";
    case "mixtape":
      return "Mixtape";
    case "album":
      return "Album";
    default:
      return type;
  }
};

const FeaturedSection = ({ title, subtitle }: FeaturedSectionProps) => {
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeaturedItems = async () => {
      try {
        setIsLoading(true);
        const items = await getFeaturedItems();
        setFeaturedItems(items);
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement des articles en vedette:", err);
        setError("Impossible de charger les articles en vedette");
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedItems();
  }, []);

  return (
    <section className="py-16 bg-brand-50/30">
      <div className="container px-4 md:px-6 mx-auto">
        <SectionHeading
          title={title}
          subtitle={subtitle}
          badge="Nouveautés"
          centered
        />
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
            <span className="ml-2 text-lg">Chargement...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-gray-500">
            {error}
          </div>
        ) : featuredItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Aucun contenu en vedette pour le moment
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {featuredItems.map((item, index) => (
              <Card key={item.id} className="animated-element glass-card overflow-hidden" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={item.cover_image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="flex items-center gap-1 bg-black/70 text-white">
                      {getTypeIcon(item.type)}
                      {getTypeLabel(item.type)}
                    </Badge>
                  </div>
                  <Button size="icon" variant="ghost" className="absolute bottom-2 right-2 bg-black/50 text-white rounded-full hover:bg-black/70">
                    <PlayCircle className="h-6 w-6" />
                  </Button>
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
                  <CardDescription>{item.artist}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 pb-2">
                  <div className="flex items-center text-sm text-muted-foreground gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(item.release_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    {item.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {item.duration}
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-2 flex justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4 text-brand-500" />
                    {item.likes?.toLocaleString() || 0}
                  </div>
                  <Button asChild variant="ghost" size="sm" className="px-2">
                    <Link to={item.link}>
                      Voir plus
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        <div className="flex justify-center mt-12">
          <Button asChild variant="outline" className="gap-2 group">
            <Link to="/blog">
              Voir toutes les sorties
              <Share2 className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
