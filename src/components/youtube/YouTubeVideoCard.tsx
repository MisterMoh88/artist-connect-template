
import { useState } from 'react';
import { Button } from '../ui/button';
import { Play } from 'lucide-react';

interface YouTubeVideoProps {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle?: string;
  views?: number;
  description?: string;
}

const YouTubeVideoCard = ({
  videoId,
  title,
  thumbnail,
  publishedAt,
  channelTitle = 'BKOTUBE',
  views,
  description,
}: YouTubeVideoProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const formatViews = (viewCount?: number) => {
    if (!viewCount) return '';
    
    if (viewCount >= 1000000) {
      return `${(viewCount / 1000000).toFixed(1)}M vues`;
    } else if (viewCount >= 1000) {
      return `${(viewCount / 1000).toFixed(1)}k vues`;
    }
    return `${viewCount} vues`;
  };

  const handlePlay = () => {
    setIsLoading(true);
    setShowVideo(true);
  };

  return (
    <div className="glass-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/20 card-hover">
      <div className="aspect-video relative overflow-hidden">
        {!showVideo ? (
          <>
            <img 
              src={thumbnail} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
              <Button 
                onClick={handlePlay}
                variant="outline"
                size="icon"
                className="w-16 h-16 rounded-full bg-brand-500/80 hover:bg-brand-500 border-none text-black shadow-lg hover:scale-110 transition-all duration-300"
              >
                <Play className="h-8 w-8 fill-current" />
              </Button>
            </div>
          </>
        ) : (
          <div className="youtube-container">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background">
                <div className="w-12 h-12 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin"></div>
              </div>
            )}
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setIsLoading(false)}
            ></iframe>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold line-clamp-2 group-hover:text-brand-500 transition-colors mb-2">
          {title}
        </h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{channelTitle}</span>
          <div className="flex space-x-2">
            {views && <span>{formatViews(views)}</span>}
            <span>•</span>
            <span>{formatDate(publishedAt)}</span>
          </div>
        </div>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default YouTubeVideoCard;
