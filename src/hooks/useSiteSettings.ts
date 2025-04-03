
import { useState, useEffect } from 'react';
import { getSiteSettings, updateSiteSetting, SiteSettings } from '@/services/siteSettings';
import { uploadFile, deleteFile } from '@/services/storageService';
import { useToast } from '@/hooks/use-toast';

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const data = await getSiteSettings();
        setSettings(data);
      } catch (err) {
        console.error('Erreur lors du chargement des paramètres:', err);
        setError('Impossible de charger les paramètres du site');
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Impossible de charger les paramètres du site',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [toast]);

  const updateSetting = async (key: keyof SiteSettings, value: any) => {
    try {
      setIsLoading(true);
      const success = await updateSiteSetting(key, value);
      
      if (success) {
        // Mettre à jour l'état local
        setSettings(prev => prev ? { ...prev, [key]: value } : null);
        toast({
          title: 'Succès',
          description: 'Paramètres mis à jour avec succès',
        });
      } else {
        throw new Error('Échec de la mise à jour');
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de mettre à jour les paramètres',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Télécharger une image de logo et mettre à jour les paramètres
  const uploadLogo = async (file: File) => {
    try {
      setIsLoading(true);
      
      // 1. Supprimer l'ancien logo si nécessaire
      if (settings?.site_info.logo_url) {
        try {
          await deleteFile(settings.site_info.logo_url, 'site-images');
        } catch (err) {
          console.warn('Impossible de supprimer l\'ancien logo, on continue avec le téléchargement du nouveau');
        }
      }
      
      // 2. Télécharger le nouveau logo
      const logo_url = await uploadFile(file, 'site-images', 'logos');
      
      // 3. Mettre à jour les paramètres
      const updatedSiteInfo = {
        ...settings?.site_info,
        logo_url
      };
      
      const success = await updateSiteSetting('site_info', updatedSiteInfo);
      
      if (success) {
        setSettings(prev => prev ? {
          ...prev,
          site_info: {
            ...prev.site_info,
            logo_url
          }
        } : null);
        
        toast({
          title: 'Succès',
          description: 'Logo téléchargé et paramètres mis à jour',
        });
      } else {
        throw new Error('Échec de la mise à jour des paramètres');
      }
    } catch (err) {
      console.error('Erreur lors du téléchargement du logo:', err);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de télécharger le logo',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    settings, 
    isLoading, 
    error, 
    updateSetting,
    uploadLogo
  };
}
