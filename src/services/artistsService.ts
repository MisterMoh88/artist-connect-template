
import { Artist } from "@/types/supabase-custom";
import { supabase } from "@/integrations/supabase/client";

// Get all artists from the database
export const getArtists = async (): Promise<Artist[]> => {
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching artists:", error);
    throw error;
  }

  return data || [];
};

// Sample data in case the database is not set up
export const getSampleArtists = async (): Promise<Artist[]> => {
  const currentDate = new Date().toISOString();
  
  return [
    {
      id: "1",
      name: "Amadou & Mariam",
      bio: "Duo malien de musique afro-blues, connu internationalement pour leur fusion unique de musiques traditionnelles maliennes et de sons contemporains.",
      email: "contact@amadou-mariam.com",
      image_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1470&auto=format&fit=crop",
      social_instagram: "amadoumariam",
      social_facebook: "amadouandmariam",
      social_youtube: "amadouandmariam",
      social_spotify: "spotify:artist:amadoumariam",
      created_at: currentDate
    },
    {
      id: "2",
      name: "Oumou Sangaré",
      bio: "Chanteuse malienne de renommée mondiale, surnommée 'la diva du Wassoulou', Oumou est connue pour son engagement pour les droits des femmes.",
      email: "contact@oumoufans.com",
      image_url: "https://images.unsplash.com/photo-1605722625766-a4c989c747a4?q=80&w=1470&auto=format&fit=crop",
      social_instagram: "oumoufans",
      social_facebook: "oumoufans",
      social_youtube: null,
      social_spotify: "spotify:artist:oumousangare",
      created_at: currentDate
    },
    {
      id: "3",
      name: "Toumani Diabaté",
      bio: "Virtuose de la kora, Toumani Diabaté est issu d'une famille de griots et a révolutionné la musique traditionnelle malienne avec des collaborations internationales.",
      email: "booking@toumani.com",
      image_url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1470&auto=format&fit=crop",
      social_instagram: "toumanidiabate",
      social_facebook: "toumanidiabate",
      social_youtube: "toumanidiabate",
      social_spotify: "spotify:artist:toumanidiabate",
      created_at: currentDate
    },
    {
      id: "4",
      name: "Vieux Farka Touré",
      bio: "Fils d'Ali Farka Touré, Vieux continue l'héritage musical de son père en mêlant blues du désert et sonorités modernes.",
      email: "info@vieuxfarkatoure.com",
      image_url: "https://images.unsplash.com/photo-1456327193353-33d5c48b68da?q=80&w=1470&auto=format&fit=crop",
      social_instagram: "vieuxfarka",
      social_facebook: "vieuxfarkatoure",
      social_youtube: "vieuxfarkatoure",
      social_spotify: "spotify:artist:vieuxfarkatoure",
      created_at: currentDate
    },
    {
      id: "5",
      name: "Fatoumata Diawara",
      bio: "Auteure-compositrice-interprète et actrice, Fatoumata apporte une vision contemporaine et féministe à la musique malienne sur la scène mondiale.",
      email: "management@fatoumatadiawara.com",
      image_url: "https://images.unsplash.com/photo-1556115694-e1f0e5245201?q=80&w=1504&auto=format&fit=crop",
      social_instagram: "fatoumatadiawara",
      social_facebook: "fatoumatadiawara",
      social_youtube: "fatoumatadiawara",
      social_spotify: "spotify:artist:fatoumatadiawara",
      created_at: currentDate
    },
    {
      id: "6",
      name: "Rokia Traoré",
      bio: "Artiste aux multiples facettes, Rokia mélange les styles et les influences pour créer une musique profondément personnelle et engagée.",
      email: "contact@rokia.com",
      image_url: "https://images.unsplash.com/photo-1565103474209-c10418776eb2?q=80&w=1470&auto=format&fit=crop",
      social_instagram: "rokiatraore",
      social_facebook: "rokiatraoremusic",
      social_youtube: "rokiatraore",
      social_spotify: "spotify:artist:rokiatraore",
      created_at: currentDate
    }
  ];
};

// Get artists with fallback to sample data
export const getArtistsWithFallback = async (): Promise<Artist[]> => {
  try {
    const artists = await getArtists();
    if (artists && artists.length > 0) {
      return artists;
    }
    return getSampleArtists();
  } catch (error) {
    console.log("Falling back to sample artists data");
    return getSampleArtists();
  }
};
