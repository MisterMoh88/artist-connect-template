
import { Artist, MediaContent, Category } from '@/types/supabase-custom';
import { escapeXML, generateSlug, downloadFile } from './helpers';
import { generateXMLExport } from './index';

// Structure de dossiers WPVivid
const WPVIVID_FOLDERS = [
    'themes',
    'plugins',
    'uploads',
    'others'
];

// Fonction pour générer les métadonnées WPVivid
const generateWPVividMetadata = () => {
  const now = new Date();
  const timestamp = Math.floor(now.getTime() / 1000);
  
  return {
    site_url: 'https://bkotube.com',
    home_url: 'https://bkotube.com',
    wp_version: '6.4.3',
    wp_content_path: 'wp-content',
    db_prefix: 'wp_',
    backup_time: timestamp,
    backup_type: 'Migration',
    backup_plugin: 'bkotube_export',
    backup_plugin_version: '1.0.0',
    php_version: '8.0',
    mysql_version: '8.0',
    server_os: 'Linux',
    wordpress_name: 'BkoTube',
    wordpress_description: 'Plateforme de contenu musical et vidéo'
  };
};

// Générer le manifeste WPVivid
const generateWPVividManifest = (fileList: string[]) => {
  const metadata = generateWPVividMetadata();
  
  const manifest = {
    plugin_name: 'wpvivid-backuprestore',
    plugin_version: '0.9.76',
    create_time: metadata.backup_time,
    backup_type: metadata.backup_type,
    site_url: metadata.site_url,
    home_url: metadata.home_url,
    wordpress_version: metadata.wp_version,
    backup_prefix: 'bkotube',
    db_prefix: metadata.db_prefix,
    mysql_version: metadata.mysql_version,
    php_version: metadata.php_version,
    server_info: {
      os: metadata.server_os,
      web_server: 'Nginx'
    },
    file_list: fileList,
    root_path: '',
    backup_files: {
      content: {
        themes: true,
        plugins: true,
        uploads: true,
        wp_content: true,
        additional_file_patterns: []
      },
      core: true,
      database: true
    }
  };
  
  return JSON.stringify(manifest, null, 2);
};

// Fonction pour créer l'archive WPVivid
export const generateWPVividBackup = async (
  artists: Artist[],
  mediaContents: MediaContent[],
  categories: Category[]
): Promise<void> => {
  try {
    // 1. Générer le XML WXR
    const wxrContent = generateXMLExport(artists, mediaContents, categories);
    
    // 2. Créer une structure de fichiers à inclure dans l'archive
    const files = [
      {
        name: 'database/bkotube-database.xml',
        content: wxrContent,
        type: 'text/xml'
      },
      {
        name: 'wpvivid_manifest.json',
        content: generateWPVividManifest(['database/bkotube-database.xml']),
        type: 'application/json'
      }
    ];
    
    // 3. Créer l'archive ZIP
    await createWPVividZIP(files);
    
  } catch (error) {
    console.error('Erreur lors de la génération de la sauvegarde WPVivid:', error);
    throw error;
  }
};

// Utilise JSZip pour créer l'archive
const createWPVividZIP = async (files: { name: string, content: string, type: string }[]): Promise<void> => {
  // Dynamically import JSZip only when needed
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();
  
  // Créer la structure de dossiers
  WPVIVID_FOLDERS.forEach(folder => {
    zip.folder(folder);
  });
  
  // Ajouter les fichiers principaux
  zip.folder('database');
  
  // Ajouter le contenu aux fichiers
  files.forEach(file => {
    if (file.name.includes('/')) {
      // Si le fichier est dans un sous-dossier
      const parts = file.name.split('/');
      const folderName = parts[0];
      const fileName = parts[1];
      
      const folder = zip.folder(folderName);
      if (folder) {
        folder.file(fileName, file.content);
      }
    } else {
      // Fichier à la racine
      zip.file(file.name, file.content);
    }
  });
  
  // Générer l'archive ZIP
  const content = await zip.generateAsync({ type: 'blob' });
  
  // Date formatée pour le nom du fichier
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  
  // Déclencher le téléchargement
  downloadFile(content, `bkotube-wpvivid-backup-${formattedDate}.zip`, 'application/zip');
};
