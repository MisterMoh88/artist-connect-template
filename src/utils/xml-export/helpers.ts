
import { Artist, MediaContent, Category } from '@/types/supabase-custom';

// Fonction pour échapper les caractères spéciaux XML
export const escapeXML = (text: string | null | undefined): string => {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

// Générer un slug à partir d'une chaîne (pour les identifiants)
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Enlever les accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Fonction pour déclencher le téléchargement d'un fichier (générique)
export const downloadFile = (content: Blob, filename: string, contentType: string): void => {
  const url = URL.createObjectURL(content);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  // Nettoyer
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};

// Fonction pour télécharger un fichier XML (spécifique aux exports XML)
export const downloadXMLFile = (xml: string, filename = 'bkotube-export.xml'): void => {
  const blob = new Blob([xml], { type: 'application/xml' });
  downloadFile(blob, filename, 'application/xml');
};

// Fonction pour générer les informations d'utilisateur WordPress
export const generateWordPressUserInfo = () => {
  return {
    admin_username: 'Admin',
    admin_password: 'Bkotube@2025',
    admin_email: 'admin@bkotube.com',
    first_name: 'Admin',
    last_name: 'BkoTube',
    role: 'administrator'
  };
};

// Génère un UUID format WPVivid - modifié pour correspondre au format réel
export const generateWPVividUUID = () => {
  // Format: 6 caractères hexadécimaux
  return randomString(6);
};

// Fonction pour générer une chaîne aléatoire (utilisée pour l'UUID)
function randomString(length: number): string {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Génère la date au format WPVivid (YYYY-MM-DD-HH-II-SS)
export const getWPVividFormattedDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
};

// Encodage Base64 pour les fichiers binaires (utilisé pour les images)
export const encodeBase64 = (str: string): string => {
  return btoa(unescape(encodeURIComponent(str)));
};
