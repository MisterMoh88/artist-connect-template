
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SiteSettings } from '@/services/siteSettings';
import SiteInfoForm from './SiteInfoForm';
import HeroSectionForm from './HeroSectionForm';
import SectionTitleForm from './SectionTitleForm';
import CTASectionForm from './CTASectionForm';

interface SettingsTabsProps {
  settings: SiteSettings;
  uploadLogo: (file: File) => Promise<void>;
}

const SettingsTabs = ({ settings, uploadLogo }: SettingsTabsProps) => {
  const [activeTab, setActiveTab] = useState('site-info');

  return (
    <Tabs defaultValue="site-info" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6">
        <TabsTrigger value="site-info">Informations du site</TabsTrigger>
        <TabsTrigger value="hero">Section Héro</TabsTrigger>
        <TabsTrigger value="featured">Section En vedette</TabsTrigger>
        <TabsTrigger value="features">Section Services</TabsTrigger>
        <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
        <TabsTrigger value="cta">Section CTA</TabsTrigger>
      </TabsList>

      {/* Site Info */}
      <TabsContent value="site-info">
        <SiteInfoForm 
          initialData={settings.site_info} 
          onLogoUpload={uploadLogo} 
        />
      </TabsContent>

      {/* Hero Section */}
      <TabsContent value="hero">
        <HeroSectionForm initialData={settings.hero_section} />
      </TabsContent>

      {/* Featured Section */}
      <TabsContent value="featured">
        <SectionTitleForm
          initialData={settings.featured_section}
          settingsKey="featured_section"
          title="Section En vedette"
          description="Modifiez les titres de la section artistes en vedette."
        />
      </TabsContent>

      {/* Features Section */}
      <TabsContent value="features">
        <SectionTitleForm
          initialData={settings.features_section}
          settingsKey="features_section"
          title="Section Services"
          description="Modifiez les titres de la section services."
        />
      </TabsContent>

      {/* Testimonials Section */}
      <TabsContent value="testimonials">
        <SectionTitleForm
          initialData={settings.testimonials_section}
          settingsKey="testimonials_section"
          title="Section Témoignages"
          description="Modifiez les titres de la section témoignages."
        />
      </TabsContent>

      {/* CTA Section */}
      <TabsContent value="cta">
        <CTASectionForm initialData={settings.cta_section} />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
