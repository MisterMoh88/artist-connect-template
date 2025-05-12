
// Sample YouTube video data
// In a real application, you would fetch this from YouTube API
export interface YouTubeVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
  views?: number;
  description?: string;
}

// Sample data - replace with actual YouTube API calls in production
const sampleVideos: YouTubeVideo[] = [
  {
    videoId: 'dQw4w9WgXcQ',
    title: 'BKOTUBE - Session live avec artiste invité',
    thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1470&auto=format&fit=crop',
    publishedAt: '2023-05-15T10:30:00Z',
    channelTitle: 'BKOTUBE',
    views: 123456,
    description: 'Session live exclusive avec notre artiste invité du mois. Performance acoustique et interview.'
  },
  {
    videoId: 'ZPOzOhpGnng',
    title: 'Nouveau clip - "Étoiles Nocturnes" par Afro Band',
    thumbnail: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1470&auto=format&fit=crop',
    publishedAt: '2023-05-10T14:20:00Z',
    channelTitle: 'BKOTUBE',
    views: 89742,
    description: 'Découvrez le nouveau clip "Étoiles Nocturnes" par Afro Band, tourné dans les rues de Bamako.'
  },
  {
    videoId: 'jNQXAC9IVRw',
    title: 'Interview exclusive - Les coulisses de la création musicale',
    thumbnail: 'https://images.unsplash.com/photo-1598387846148-47e82ee120cc?q=80&w=1476&auto=format&fit=crop',
    publishedAt: '2023-05-05T09:15:00Z',
    channelTitle: 'BKOTUBE',
    views: 45678,
    description: 'Entretien avec le producteur Amadou K. sur les coulisses de la création musicale et les tendances actuelles.'
  },
  {
    videoId: 'yPYZpwSpKmA',
    title: 'Making-of - Tournage du clip "Rayons Solaires"',
    thumbnail: 'https://images.unsplash.com/photo-1574701148212-8518049c7b2c?q=80&w=1472&auto=format&fit=crop',
    publishedAt: '2023-04-28T16:45:00Z',
    channelTitle: 'BKOTUBE',
    views: 34567,
    description: 'Les coulisses du tournage du clip "Rayons Solaires", avec des interviews exclusives de l\'équipe technique.'
  },
  {
    videoId: 'JGwWNGJdvx8',
    title: 'Live Report - Festival de musique d\'été',
    thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1470&auto=format&fit=crop',
    publishedAt: '2023-04-20T20:30:00Z',
    channelTitle: 'BKOTUBE',
    views: 78901,
    description: 'Reportage en direct du Festival de musique d\'été avec interviews des artistes et ambiance des concerts.'
  },
  {
    videoId: 'kRaIGHIlmDw',
    title: 'Tutoriel - Comment optimiser l\'acoustique de votre home studio',
    thumbnail: 'https://images.unsplash.com/photo-1580745089072-488e4a8d148d?q=80&w=1632&auto=format&fit=crop',
    publishedAt: '2023-04-15T11:20:00Z',
    channelTitle: 'BKOTUBE',
    views: 56789,
    description: 'Guide pratique pour améliorer l\'acoustique de votre home studio avec un budget limité.'
  }
];

export const getRecentVideos = async (): Promise<YouTubeVideo[]> => {
  // Simulation d'un appel API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleVideos);
    }, 500);
  });
};

export const getVideoById = async (id: string): Promise<YouTubeVideo | undefined> => {
  // Simulation d'un appel API
  return new Promise((resolve) => {
    setTimeout(() => {
      const video = sampleVideos.find(v => v.videoId === id);
      resolve(video);
    }, 300);
  });
};
