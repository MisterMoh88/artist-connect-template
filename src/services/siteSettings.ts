
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
  images: HeroImage[];
};

export type HeroImage = {
  id: string;
  url: string;
  alt: string;
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
  testimonials: Testimonial[];
};

export type Testimonial = {
  id: string;
  content: string;
  author: string;
  role: string;
  image?: string;
};

export type PricingSection = {
  title: string;
  subtitle: string;
  plans: PricingPlan[];
};

export type PricingPlan = {
  id: string;
  title: string;
  description: string;
  price: {
    monthly: string;
    annual: string;
  };
  popular?: boolean;
  features: PricingFeature[];
};

export type PricingFeature = {
  text: string;
  included: boolean;
  tooltip?: string;
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
  pricing_section: PricingSection;
  cta_section: CtaSection;
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');
    
    if (error) {
      console.error('Erreur lors de la récupération des paramètres du site:', error);
      throw error;
    }
    
    // Convertir le tableau de résultats en un objet
    const settings: Record<string, any> = {};
    data.forEach((item) => {
      settings[item.key] = item.value;
    });
    
    return settings as SiteSettings;
  } catch (error) {
    console.error('Erreur inattendue:', error);
    throw error;
  }
}

export async function getSiteSetting(key: string): Promise<any> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', key)
      .single();
    
    if (error) {
      console.error(`Erreur lors de la récupération du paramètre ${key}:`, error);
      throw error;
    }
    
    return data.value;
  } catch (error) {
    console.error('Erreur inattendue:', error);
    throw error;
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
