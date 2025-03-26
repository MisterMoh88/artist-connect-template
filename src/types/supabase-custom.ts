
import type { Database } from '@/integrations/supabase/types';

// You can add type extensions here without modifying the original types.ts file
export type Tables = Database['public']['Tables'];

// Example of how to get types for specific tables
export type Artist = Tables['artists']['Row'];
export type Category = Tables['categories']['Row'];
export type MediaContent = Tables['media_contents']['Row'];
export type Profile = Tables['profiles']['Row'];
export type Subscription = Tables['subscriptions']['Row'];

// Add any additional custom types here
export type FeaturedMedia = MediaContent & {
  artist_name?: string;
  category_name?: string;
};
