
import { supabase } from '@/integrations/supabase/client';

export type FeaturedItem = {
  id: string;
  title: string;
  artist: string;
  type: "song" | "video" | "mixtape" | "album";
  cover_image: string;
  release_date: string;
  duration?: string;
  likes?: number;
  link: string;
  created_at?: string;
  updated_at?: string;
};

export async function getFeaturedItems(): Promise<FeaturedItem[]> {
  try {
    const { data, error } = await supabase
      .from('featured_items')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Erreur lors de la récupération des articles en vedette:', error);
      throw error;
    }
    
    return data as FeaturedItem[];
  } catch (error) {
    console.error('Erreur inattendue:', error);
    throw error;
  }
}

export async function getFeaturedItem(id: string): Promise<FeaturedItem> {
  try {
    const { data, error } = await supabase
      .from('featured_items')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Erreur lors de la récupération de l'article ${id}:`, error);
      throw error;
    }
    
    return data as FeaturedItem;
  } catch (error) {
    console.error('Erreur inattendue:', error);
    throw error;
  }
}

export async function createFeaturedItem(item: Omit<FeaturedItem, 'id' | 'created_at' | 'updated_at'>): Promise<FeaturedItem> {
  try {
    const { data, error } = await supabase
      .from('featured_items')
      .insert([item])
      .select()
      .single();
    
    if (error) {
      console.error('Erreur lors de la création de l\'article:', error);
      throw error;
    }
    
    return data as FeaturedItem;
  } catch (error) {
    console.error('Erreur inattendue:', error);
    throw error;
  }
}

export async function updateFeaturedItem(id: string, item: Partial<Omit<FeaturedItem, 'id' | 'created_at' | 'updated_at'>>): Promise<FeaturedItem> {
  try {
    const { data, error } = await supabase
      .from('featured_items')
      .update({ 
        ...item, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Erreur lors de la mise à jour de l'article ${id}:`, error);
      throw error;
    }
    
    return data as FeaturedItem;
  } catch (error) {
    console.error('Erreur inattendue:', error);
    throw error;
  }
}

export async function deleteFeaturedItem(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('featured_items')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Erreur lors de la suppression de l'article ${id}:`, error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Erreur inattendue:', error);
    throw error;
  }
}
