
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

/**
 * Télécharge un fichier dans un bucket Supabase
 * @param file Fichier à télécharger
 * @param bucket Nom du bucket
 * @param path Chemin optionnel dans le bucket
 * @returns URL publique du fichier téléchargé
 */
export async function uploadFile(file: File, bucket: string, path: string = ''): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = path ? `${path}/${fileName}` : fileName;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Erreur lors du téléchargement du fichier:', error);
      throw error;
    }

    // Récupérer l'URL publique du fichier
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Erreur inattendue lors du téléchargement:', error);
    throw error;
  }
}

/**
 * Supprime un fichier d'un bucket Supabase
 * @param url URL publique du fichier à supprimer
 * @param bucket Nom du bucket
 * @returns true si la suppression a réussi
 */
export async function deleteFile(url: string, bucket: string): Promise<boolean> {
  try {
    // Extraire le nom du fichier de l'URL
    const filePathMatch = url.match(/\/storage\/v1\/object\/public\/.+\/(.+)/);
    if (!filePathMatch || filePathMatch.length < 2) {
      throw new Error('Format d\'URL non valide');
    }
    
    const filePath = filePathMatch[1];
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error('Erreur lors de la suppression du fichier:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Erreur inattendue lors de la suppression:', error);
    throw error;
  }
}
