
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, Youtube, Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeading from '@/components/ui/section-heading';
import YouTubeVideoCard from '@/components/youtube/YouTubeVideoCard';
import MatrixBackground from '@/components/matrix/MatrixBackground';
import { getRecentVideos } from '@/services/youtubeService';

const Index = () => {
  const { data: videos = [], isLoading } = useQuery({
    queryKey: ['youtubeVideos'],
    queryFn: getRecentVideos,
  });

  const [featuredVideo, ...otherVideos] = videos;

  return (
    <PageLayout>
      <MatrixBackground />
      
      {/* Hero Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block animate-fade-in">
              <span className="bg-brand-500/20 text-brand-500 px-3 py-1 rounded-full text-xs font-medium">
                Production Audiovisuelle
              </span>
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animated-element">
              Propulsez votre <span className="text-gradient">visibilité</span> <br/>
              audiovisuelle
            </h1>
            <p className="mt-4 text-xl text-muted-foreground animated-element">
              BKOTUBE produit et promeut des contenus audiovisuels de qualité pour les artistes et labels.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animated-element">
              <Button asChild size="lg" className="bg-brand-500 hover:bg-brand-600 text-black">
                <a href="#videos" className="flex items-center">
                  <Play size={18} className="mr-2" />
                  Voir nos productions
                </a>
              </Button>
              <Button variant="outline" asChild size="lg" className="border-brand-500 text-brand-500 hover:bg-brand-500/10">
                <Link to="/contact" className="flex items-center">
                  Nous contacter
                  <ChevronRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Glowing effect */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px]"></div>
      </section>
      
      {/* Featured Video Section */}
      {featuredVideo && (
        <section id="videos" className="py-16 bg-black/50">
          <div className="container px-4 md:px-6 mx-auto">
            <SectionHeading
              title="Notre dernière production"
              description="Découvrez notre contenu le plus récent"
              badge="À la une"
              centered
            />
            
            <div className="mt-12 max-w-4xl mx-auto">
              <YouTubeVideoCard
                videoId={featuredVideo.videoId}
                title={featuredVideo.title}
                thumbnail={featuredVideo.thumbnail}
                publishedAt={featuredVideo.publishedAt}
                channelTitle={featuredVideo.channelTitle}
                views={featuredVideo.views}
                description={featuredVideo.description}
              />
            </div>
          </div>
        </section>
      )}
      
      {/* Recent Videos Grid */}
      <section className="py-16 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <SectionHeading
            title="Nos productions récentes"
            description="Explorez nos dernières créations audiovisuelles"
            centered
          />
          
          <div className="mt-12">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="glass-card animate-pulse">
                    <div className="aspect-video bg-muted"></div>
                    <div className="p-4 space-y-2">
                      <div className="h-6 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherVideos.map((video) => (
                  <YouTubeVideoCard
                    key={video.videoId}
                    videoId={video.videoId}
                    title={video.title}
                    thumbnail={video.thumbnail}
                    publishedAt={video.publishedAt}
                    channelTitle={video.channelTitle}
                    views={video.views}
                    description={video.description}
                  />
                ))}
              </div>
            )}
            
            <div className="mt-12 text-center">
              <Button asChild variant="outline" size="lg" className="border-brand-500 text-brand-500 hover:bg-brand-500/10">
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Youtube size={18} className="mr-2" />
                  Voir toutes nos vidéos sur YouTube
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-black/30 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <SectionHeading
            title="Nos services"
            description="Solutions audiovisuelles professionnelles"
            centered
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Production Vidéo",
                description: "Réalisation de clips musicaux, vidéos promotionnelles, et captations de concerts avec équipement professionnel.",
                icon: "🎬"
              },
              {
                title: "Diffusion",
                description: "Promotion et diffusion de vos contenus sur nos plateformes et réseaux partenaires pour maximiser votre visibilité.",
                icon: "📱"
              },
              {
                title: "Consulting",
                description: "Accompagnement stratégique pour optimiser votre présence digitale et votre image de marque audiovisuelle.",
                icon: "📊"
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="glass-card p-6 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg hover:shadow-brand-500/20"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-brand-500">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
                <div className="mt-6">
                  <Link 
                    to="/services" 
                    className="text-brand-500 hover:text-brand-400 transition-colors flex items-center text-sm font-medium"
                  >
                    En savoir plus
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-500/20 rounded-full blur-[100px]"></div>
        
        <div className="container px-4 md:px-6 mx-auto">
          <div className="glass-card p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à propulser votre projet ?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment nous pouvons vous aider à atteindre vos objectifs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-brand-500 hover:bg-brand-600 text-black">
                <Link to="/contact">Nous contacter</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-brand-500 text-brand-500 hover:bg-brand-500/10">
                <Link to="/services">Voir nos services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
