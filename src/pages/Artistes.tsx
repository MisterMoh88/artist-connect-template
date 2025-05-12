
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeading from '@/components/ui/section-heading';
import ArtistCard from '@/components/artists/ArtistCard';
import MatrixBackground from '@/components/matrix/MatrixBackground';
import { getArtistsWithFallback } from '@/services/artistsService';

const Artistes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: artists = [], isLoading } = useQuery({
    queryKey: ['artists'],
    queryFn: getArtistsWithFallback,
  });
  
  const filteredArtists = artists.filter(artist => 
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (artist.bio && artist.bio.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <PageLayout>
      <MatrixBackground />
      
      {/* Hero Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block animate-fade-in">
              <span className="bg-brand-500/20 text-brand-500 px-3 py-1 rounded-full text-xs font-medium">
                Talents & Collaborations
              </span>
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animated-element">
              Nos <span className="text-gradient">Artistes</span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground animated-element">
              Découvrez les talents avec lesquels nous collaborons pour créer des contenus audiovisuels exceptionnels.
            </p>
          </div>
        </div>
        
        {/* Glowing effect */}
        <div className="absolute -top-40 right-20 w-96 h-96 bg-brand-500/20 rounded-full blur-[100px]"></div>
      </section>
      
      {/* Artists Search */}
      <section className="py-8">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/70" />
              <Input
                placeholder="Rechercher un artiste..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/30 border-brand-500/30 focus-visible:ring-brand-500 h-12"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 text-brand-500 hover:text-brand-600 h-10 w-10"
                onClick={() => setSearchTerm('')}
                disabled={searchTerm === ''}
              >
                {searchTerm && <span className="sr-only">Effacer la recherche</span>}
                {searchTerm && 'X'}
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Artists Grid */}
      <section className="py-8 pb-20">
        <div className="container px-4 md:px-6 mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass-card aspect-[4/5] animate-pulse">
                  <div className="w-full h-full bg-muted"></div>
                </div>
              ))}
            </div>
          ) : filteredArtists.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Aucun artiste trouvé</h3>
              <p className="text-muted-foreground">
                Aucun artiste ne correspond à votre recherche. Essayez d'autres termes.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm('')}
                className="mt-4 border-brand-500 text-brand-500 hover:bg-brand-500/10"
              >
                Voir tous les artistes
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredArtists.map((artist) => (
                <ArtistCard 
                  key={artist.id} 
                  artist={artist} 
                  className="animated-element"
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 relative overflow-hidden bg-black/50">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px]"></div>
        
        <div className="container px-4 md:px-6 mx-auto">
          <div className="glass-card p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vous êtes un artiste ?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Vous souhaitez collaborer avec BKOTUBE pour vos projets audiovisuels ? Contactez-nous pour discuter de vos besoins.
            </p>
            <Button asChild size="lg" className="bg-brand-500 hover:bg-brand-600 text-black">
              <a href="/contact">Contactez-nous</a>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Artistes;
