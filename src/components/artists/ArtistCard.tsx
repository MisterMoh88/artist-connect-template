
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Music } from 'lucide-react';
import { Artist } from '@/types/supabase-custom';
import { cn } from '@/lib/utils';

interface ArtistCardProps {
  artist: Artist;
  className?: string;
}

const ArtistCard = ({ artist, className }: ArtistCardProps) => {
  const { name, bio, image_url, social_instagram, social_facebook, social_youtube, social_spotify } = artist;

  return (
    <div className={cn(
      "glass-card overflow-hidden group transition-all duration-500 card-hover",
      className
    )}>
      <div className="aspect-[4/5] relative overflow-hidden">
        <img
          src={image_url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1470&auto=format&fit=crop'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition-all duration-300">
          <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
          <p className="text-white/80 text-sm line-clamp-2 mb-3">{bio}</p>
          
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {social_instagram && (
              <a 
                href={`https://instagram.com/${social_instagram}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-brand-500/50 hover:bg-brand-500 hover:text-black text-white/90 transition-colors"
                aria-label={`Instagram de ${name}`}
              >
                <Instagram size={16} />
              </a>
            )}
            {social_facebook && (
              <a 
                href={`https://facebook.com/${social_facebook}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-brand-500/50 hover:bg-brand-500 hover:text-black text-white/90 transition-colors"
                aria-label={`Facebook de ${name}`}
              >
                <Facebook size={16} />
              </a>
            )}
            {social_youtube && (
              <a 
                href={`https://youtube.com/@${social_youtube}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-brand-500/50 hover:bg-brand-500 hover:text-black text-white/90 transition-colors"
                aria-label={`YouTube de ${name}`}
              >
                <Youtube size={16} />
              </a>
            )}
            {social_spotify && (
              <a 
                href={social_spotify.startsWith('spotify:') 
                  ? `https://open.spotify.com/artist/${social_spotify.split(':')[2]}` 
                  : social_spotify} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-brand-500/50 hover:bg-brand-500 hover:text-black text-white/90 transition-colors"
                aria-label={`Spotify de ${name}`}
              >
                <Music size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
