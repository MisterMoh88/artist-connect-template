import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { generateXMLExport, downloadXMLFile } from '@/utils/xml-export';
import { useToast } from '@/hooks/use-toast';
import { Artist, MediaContent, Category } from '@/types/supabase-custom';
import { Loader2 } from 'lucide-react';

const Export = () => {
  const { toast } = useToast();
  const [includeArtists, setIncludeArtists] = useState(true);
  const [includeMedia, setIncludeMedia] = useState(true);
  const [includeCategories, setIncludeCategories] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  // Récupérer les données de la base de données
  const { data: artists = [], isLoading: isLoadingArtists } = useQuery({
    queryKey: ['artists'],
    queryFn: async () => {
      const { data, error } = await supabase.from('artists').select('*');
      if (error) throw error;
      return data as Artist[];
    },
  });

  const { data: mediaContents = [], isLoading: isLoadingMedia } = useQuery({
    queryKey: ['media_contents'],
    queryFn: async () => {
      const { data, error } = await supabase.from('media_contents').select('*');
      if (error) throw error;
      return data as MediaContent[];
    },
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) throw error;
      return data as Category[];
    },
  });

  const isLoading = isLoadingArtists || isLoadingMedia || isLoadingCategories;

  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      const dataToExport = {
        artists: includeArtists ? artists : [],
        mediaContents: includeMedia ? mediaContents : [],
        categories: includeCategories ? categories : []
      };
      
      // Générer le XML
      const xml = generateXMLExport(
        dataToExport.artists,
        dataToExport.mediaContents,
        dataToExport.categories
      );
      
      // Déclencher le téléchargement
      downloadXMLFile(xml);
      
      toast({
        title: "Exportation réussie",
        description: "Votre contenu a été exporté avec succès au format XML.",
      });
    } catch (error) {
      console.error("Erreur lors de l'exportation:", error);
      toast({
        title: "Erreur d'exportation",
        description: "Une erreur s'est produite lors de l'exportation de votre contenu.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <PageLayout className="py-0">
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-4">Exportation</h1>
        <p className="text-lg mb-8">Exportez votre contenu BkoTube vers d'autres plateformes.</p>
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Exportation au format XML</CardTitle>
            <CardDescription>
              Exportez votre contenu BkoTube au format XML compatible avec WordPress et d'autres CMS.
              <br />
              Pour plus d'informations, consultez notre{" "}
              <a 
                href="/docs/guide-exportation-wordpress.md" 
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                guide d'exportation vers WordPress
              </a>.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Contenu à exporter</h3>
                <p className="text-sm text-muted-foreground">
                  Sélectionnez les types de contenu que vous souhaitez inclure dans l'exportation.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeArtists" 
                    checked={includeArtists} 
                    onCheckedChange={(checked) => setIncludeArtists(checked as boolean)}
                  />
                  <label htmlFor="includeArtists" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Artistes ({artists.length})
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeMedia" 
                    checked={includeMedia} 
                    onCheckedChange={(checked) => setIncludeMedia(checked as boolean)}
                  />
                  <label htmlFor="includeMedia" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Contenus média ({mediaContents.length})
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeCategories" 
                    checked={includeCategories} 
                    onCheckedChange={(checked) => setIncludeCategories(checked as boolean)}
                  />
                  <label htmlFor="includeCategories" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Catégories ({categories.length})
                  </label>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Format</h3>
                <p className="text-sm text-muted-foreground">
                  Le fichier sera exporté au format XML compatible avec WordPress (WXR).
                </p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {isLoading ? 'Chargement des données...' : `${artists.length} artistes, ${mediaContents.length} médias, ${categories.length} catégories disponibles`}
            </p>
            <Button 
              onClick={handleExport} 
              disabled={isLoading || isExporting || (!includeArtists && !includeMedia && !includeCategories)}
            >
              {isExporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exportation...
                </>
              ) : (
                'Exporter au format XML'
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Export;
