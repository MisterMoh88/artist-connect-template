
import { Loader2 } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import AdminLayout from '@/components/layout/AdminLayout';
import SettingsTabs from '@/components/admin/settings/SettingsTabs';

const SiteSettingsPage = () => {
  const { settings, isLoading, uploadLogo } = useSiteSettings();

  // Default settings to ensure all components have data to work with
  const defaultSettings = {
    site_info: {
      name: "BkoTube",
      tagline: "Communication digitale pour artistes",
      logo_url: ""
    },
    hero_section: {
      title: "Propulsez votre carrière artistique",
      subtitle: "Plateforme complète de gestion digitale pour artistes",
      buttonText: "Découvrir",
      secondaryButtonText: "Contacter",
      buttonLink: "/services",
      secondaryButtonLink: "/contact",
      images: []
    },
    featured_section: {
      title: "Artistes en vedette",
      subtitle: "Découvrez les talents du moment"
    },
    features_section: {
      title: "Nos services",
      subtitle: "Solutions digitales pour les artistes"
    },
    testimonials_section: {
      title: "Ce que disent nos clients",
      subtitle: "Témoignages de nos artistes",
      testimonials: []
    },
    pricing_section: {
      title: "Offres adaptées à chaque étape de votre carrière",
      subtitle: "Des forfaits flexibles qui évoluent avec votre succès",
      plans: []
    },
    cta_section: {
      title: "Prêt à faire passer votre carrière au niveau supérieur ?",
      subtitle: "Rejoignez des centaines d'artistes qui font confiance à BkoTube",
      primaryButtonText: "Commencer",
      secondaryButtonText: "En savoir plus",
      primaryButtonLink: "/services",
      secondaryButtonLink: "/contact"
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
          <span className="ml-2 text-lg font-medium">Chargement des paramètres...</span>
        </div>
      </AdminLayout>
    );
  }

  // Merge loaded settings with defaults to ensure all properties exist
  const mergedSettings = {
    ...defaultSettings,
    ...settings,
    hero_section: {
      ...defaultSettings.hero_section,
      ...settings?.hero_section,
      images: settings?.hero_section?.images || []
    },
    testimonials_section: {
      ...defaultSettings.testimonials_section,
      ...settings?.testimonials_section,
      testimonials: settings?.testimonials_section?.testimonials || []
    },
    pricing_section: {
      ...defaultSettings.pricing_section,
      ...settings?.pricing_section,
      plans: settings?.pricing_section?.plans || []
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Paramètres du site</h1>
          <p className="text-muted-foreground">
            Gérez les paramètres de votre site comme le logo, le nom et les sections de la page d'accueil.
          </p>
        </div>

        <SettingsTabs 
          settings={mergedSettings} 
          uploadLogo={uploadLogo} 
        />
      </div>
    </AdminLayout>
  );
};

export default SiteSettingsPage;
