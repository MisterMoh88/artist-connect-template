
import { useState, useEffect } from 'react';
import { getSiteSettings, updateSiteSetting, SiteSettings } from '@/services/siteSettings';
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

  return { 
    settings, 
    isLoading, 
    error, 
    updateSetting 
  };
}
