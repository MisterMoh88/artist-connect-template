
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import AdminLayout from '@/components/layout/AdminLayout';
import SettingsTabs from '@/components/admin/settings/SettingsTabs';

const SiteSettingsPage = () => {
  const { settings, isLoading, uploadLogo } = useSiteSettings();

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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Paramètres du site</h1>
          <p className="text-muted-foreground">
            Gérez les paramètres de votre site comme le logo, le nom et les sections de la page d'accueil.
          </p>
        </div>

        {settings && (
          <SettingsTabs 
            settings={settings} 
            uploadLogo={uploadLogo} 
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default SiteSettingsPage;
