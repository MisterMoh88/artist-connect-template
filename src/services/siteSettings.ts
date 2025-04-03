
import { supabase } from '@/integrations/supabase/client';

export type SiteInfo = {
  name: string;
  tagline: string;
  logo_url: string;
};

export type HeroSection = {
  title: string;
  subtitle: string;
  buttonText: string;
  secondaryButtonText: string;
  buttonLink: string;
  secondaryButtonLink: string;
};

export type FeaturedSection = {
  title: string;
  subtitle: string;
};

export type FeaturesSection = {
  title: string;
  subtitle: string;
};

export type TestimonialsSection = {
  title: string;
  subtitle: string;
};

export type CtaSection = {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonLink: string;
};

export type SiteSettings = {
  site_info: SiteInfo;
  hero_section: HeroSection;
  featured_section: FeaturedSection;
  features_section: FeaturesSection;
  testimonials_section: TestimonialsSection;
  cta_section: CtaSection;
};

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const settings: Record<string, any> = {};
    
    // Récupérer tous les paramètres du site
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');
    
    if (error) {
      console.error('Erreur lors de la récupération des paramètres du site:', error);
      return null;
    }
    
    // Convertir le tableau de résultats en un objet
    data.forEach((item) => {
      settings[item.key] = item.value;
    });
    
    return settings as SiteSettings;
  } catch (error) {
    console.error('Erreur inattendue:', error);
    return null;
  }
}

export async function getSiteSetting(key: string): Promise<any | null> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', key)
      .single();
    
    if (error) {
      console.error(`Erreur lors de la récupération du paramètre ${key}:`, error);
      return null;
    }
    
    return data.value;
  } catch (error) {
    console.error('Erreur inattendue:', error);
    return null;
  }
}

export async function updateSiteSetting(key: string, value: any): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('site_settings')
      .update({ 
        value,
        updated_at: new Date().toISOString()
      })
      .eq('key', key);
    
    if (error) {
      console.error(`Erreur lors de la mise à jour du paramètre ${key}:`, error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Erreur inattendue:', error);
    return false;
  }
}
