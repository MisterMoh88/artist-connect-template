
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Music, Video, Disc, Calendar, Clock, Heart, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

interface MediaItem {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  type: "song" | "video" | "mixtape" | "album";
  releaseDate: string;
  duration?: string;
  likes?: number;
  link: string;
}

const featuredItems: MediaItem[] = [
  {
    id: "1",
    title: "Nouvelle Vague",
    artist: "Diamant Noir",
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop",
    type: "song",
    releaseDate: "2023-09-15",
    duration: "3:45",
    likes: 1245,
    link: "/blog/nouvelle-vague"
  },
  {
    id: "2",
    title: "Esprit Libre",
    artist: "MC Solaar",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=500&auto=format&fit=crop",
    type: "video",
    releaseDate: "2023-08-20",
    duration: "4:12",
    likes: 3680,
    link: "/blog/esprit-libre"
  },
  {
    id: "3",
    title: "Summer Vibes",
    artist: "DJ Arafat",
    coverImage: "https://images.unsplash.com/photo-1557787163-1635e2efb160?q=80&w=500&auto=format&fit=crop",
    type: "mixtape",
    releaseDate: "2023-07-01",
    duration: "48:23",
    likes: 5421,
    link: "/blog/summer-vibes"
  },
  {
    id: "4",
    title: "Renaissance",
    artist: "Youssou N'Dour",
    coverImage: "https://images.unsplash.com/photo-1598387846148-47e82ee120cc?q=80&w=500&auto=format&fit=crop",
    type: "album",
    releaseDate: "2023-10-05",
    duration: "58:16",
    likes: 7895,
    link: "/blog/renaissance"
  }
];

const getTypeIcon = (type: MediaItem["type"]) => {
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

const getTypeLabel = (type: MediaItem["type"]) => {
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

const FeaturedSection = () => {
  return (
    <section className="py-16 bg-brand-50/30">
      <div className="container px-4 md:px-6 mx-auto">
        <SectionHeading
          title="À la Une"
          subtitle="Découvrez les dernières sorties de nos artistes"
          badge="Nouveautés"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {featuredItems.map((item, index) => (
            <Card key={item.id} className="animated-element glass-card overflow-hidden" style={{ transitionDelay: `${index * 100}ms` }}>
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={item.coverImage} 
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
                    {new Date(item.releaseDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
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
                  {item.likes?.toLocaleString()}
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
