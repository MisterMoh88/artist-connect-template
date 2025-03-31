
import { Artist, MediaContent, Category } from '@/types/supabase-custom';
import { escapeXML, generateSlug, downloadFile, generateWordPressUserInfo } from './helpers';
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
    wordpress_description: 'Plateforme de contenu musical et vidéo',
    admin_user: generateWordPressUserInfo()
  };
};

// Liste des plugins inclus dans la sauvegarde
const generatePluginsList = () => {
  return [
    {
      name: 'advanced-custom-fields',
      version: '6.2.5',
      file: 'plugins/advanced-custom-fields/acf.php'
    },
    {
      name: 'contact-form-7',
      version: '5.8.4',
      file: 'plugins/contact-form-7/wp-contact-form-7.php'
    },
    {
      name: 'custom-post-type-ui',
      version: '1.15.1',
      file: 'plugins/custom-post-type-ui/custom-post-type-ui.php'
    },
    {
      name: 'elementor',
      version: '3.18.0',
      file: 'plugins/elementor/elementor.php'
    },
    {
      name: 'seo-by-rank-math',
      version: '1.0.122',
      file: 'plugins/seo-by-rank-math/rank-math.php'
    },
    {
      name: 'wp-media-category-management',
      version: '1.9.0',
      file: 'plugins/wp-media-category-management/wp-media-category-management.php'
    },
    {
      name: 'wpvivid-backuprestore',
      version: '0.9.76',
      file: 'plugins/wpvivid-backuprestore/wpvivid-backuprestore.php'
    }
  ];
};

// Générer des fichiers factices pour les thèmes et plugins
const generateThemeFiles = () => {
  return [
    {
      name: 'themes/bkotube-theme/style.css',
      content: `/*
Theme Name: BkoTube Theme
Theme URI: https://bkotube.com
Author: BkoTube
Author URI: https://bkotube.com
Description: Thème personnalisé pour la plateforme BkoTube
Version: 1.0.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: bkotube-theme
*/`,
      type: 'text/css'
    },
    {
      name: 'themes/bkotube-theme/functions.php',
      content: `<?php
/**
 * BkoTube Theme functions and definitions
 *
 * @package BkoTube
 */

// Register Custom Post Types
function bkotube_register_post_types() {
    // Artiste CPT
    register_post_type('artiste', [
        'labels' => [
            'name' => 'Artistes',
            'singular_name' => 'Artiste'
        ],
        'public' => true,
        'has_archive' => true,
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
        'menu_icon' => 'dashicons-microphone'
    ]);

    // Media CPT
    register_post_type('media', [
        'labels' => [
            'name' => 'Médias',
            'singular_name' => 'Média'
        ],
        'public' => true,
        'has_archive' => true,
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
        'menu_icon' => 'dashicons-format-video'
    ]);
}
add_action('init', 'bkotube_register_post_types');

// Register ACF Fields
function bkotube_acf_init() {
    if (function_exists('acf_add_local_field_group')) {
        // Fields for Artistes
        acf_add_local_field_group([
            'key' => 'group_artiste',
            'title' => 'Informations Artiste',
            'fields' => [
                [
                    'key' => 'field_photo',
                    'label' => 'Photo',
                    'name' => '_photo',
                    'type' => 'image'
                ],
                [
                    'key' => 'field_social_media',
                    'label' => 'Réseaux sociaux',
                    'name' => '_social_media',
                    'type' => 'group',
                    'sub_fields' => [
                        [
                            'key' => 'field_facebook',
                            'label' => 'Facebook',
                            'name' => 'facebook',
                            'type' => 'url'
                        ],
                        [
                            'key' => 'field_instagram',
                            'label' => 'Instagram',
                            'name' => 'instagram',
                            'type' => 'url'
                        ],
                        [
                            'key' => 'field_spotify',
                            'label' => 'Spotify',
                            'name' => 'spotify',
                            'type' => 'url'
                        ],
                        [
                            'key' => 'field_youtube',
                            'label' => 'YouTube',
                            'name' => 'youtube',
                            'type' => 'url'
                        ]
                    ]
                ],
                [
                    'key' => 'field_email',
                    'label' => 'Email',
                    'name' => '_email',
                    'type' => 'email'
                ]
            ],
            'location' => [
                [
                    [
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'artiste'
                    ]
                ]
            ]
        ]);
        
        // Fields for Media
        acf_add_local_field_group([
            'key' => 'group_media',
            'title' => 'Informations Média',
            'fields' => [
                [
                    'key' => 'field_cover_image',
                    'label' => 'Image de couverture',
                    'name' => '_cover_image',
                    'type' => 'image'
                ],
                [
                    'key' => 'field_artist',
                    'label' => 'Artiste',
                    'name' => '_artist',
                    'type' => 'post_object',
                    'post_type' => ['artiste']
                ],
                [
                    'key' => 'field_media_url',
                    'label' => 'URL du média',
                    'name' => '_media_url',
                    'type' => 'url'
                ],
                [
                    'key' => 'field_featured',
                    'label' => 'En vedette',
                    'name' => '_featured',
                    'type' => 'true_false'
                ],
                [
                    'key' => 'field_release_date',
                    'label' => 'Date de sortie',
                    'name' => '_release_date',
                    'type' => 'date_picker'
                ]
            ],
            'location' => [
                [
                    [
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'media'
                    ]
                ]
            ]
        ]);
    }
}
add_action('acf/init', 'bkotube_acf_init');`,
      type: 'application/x-php'
    },
    {
      name: 'themes/bkotube-theme/index.php',
      content: `<?php get_header(); ?>

<div id="primary" class="content-area">
    <main id="main" class="site-main">
        <?php
        if (have_posts()) :
            while (have_posts()) :
                the_post();
                get_template_part('template-parts/content', get_post_type());
            endwhile;
            the_posts_navigation();
        else :
            get_template_part('template-parts/content', 'none');
        endif;
        ?>
    </main>
</div>

<?php get_sidebar(); ?>
<?php get_footer(); ?>`,
      type: 'application/x-php'
    }
  ];
};

// Générer le manifeste WPVivid
const generateWPVividManifest = (fileList: string[]) => {
  const metadata = generateWPVividMetadata();
  const plugins = generatePluginsList();
  
  const manifest = {
    plugin_name: 'wpvivid-backuprestore',
    plugin_version: '0.9.76',
    create_time: metadata.backup_time,
    backup_type: metadata.backup_type,
    site_url: metadata.site_url,
    home_url: metadata.home_url,
    wordpress_version: metadata.wp_version,
    wordpress_admin_user: metadata.admin_user,
    backup_prefix: 'bkotube',
    db_prefix: metadata.db_prefix,
    mysql_version: metadata.mysql_version,
    php_version: metadata.php_version,
    server_info: {
      os: metadata.server_os,
      web_server: 'Nginx'
    },
    file_list: fileList,
    plugins_list: plugins,
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
    
    // 2. Générer les fichiers de thème
    const themeFiles = generateThemeFiles();
    
    // 3. Créer une structure de fichiers à inclure dans l'archive
    const files = [
      {
        name: 'database/bkotube-database.xml',
        content: wxrContent,
        type: 'text/xml'
      },
      ...themeFiles,
      {
        name: 'wordpress-config.json',
        content: JSON.stringify({
          site_title: 'BkoTube',
          admin_user: generateWordPressUserInfo(),
          site_url: 'https://bkotube.com',
          installed_plugins: generatePluginsList().map(p => p.name)
        }, null, 2),
        type: 'application/json'
      },
      {
        name: 'wpvivid_manifest.json',
        content: generateWPVividManifest([
          'database/bkotube-database.xml', 
          'wordpress-config.json',
          ...themeFiles.map(f => f.name)
        ]),
        type: 'application/json'
      }
    ];
    
    // 4. Créer l'archive ZIP
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
      const folderPath = parts.slice(0, -1).join('/');
      const fileName = parts[parts.length - 1];
      
      // Créer tous les dossiers nécessaires
      let folder = zip;
      const folderParts = folderPath.split('/');
      for (const part of folderParts) {
        folder = folder.folder(part) || folder;
      }
      
      folder.file(fileName, file.content);
    } else {
      // Fichier à la racine
      zip.file(file.name, file.content);
    }
  });
  
  // Date formatée pour le nom du fichier
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  
  // Générer l'archive ZIP
  const content = await zip.generateAsync({ 
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: {
      level: 9
    }
  });
  
  // Déclencher le téléchargement
  downloadFile(content, `bkotube-wpvivid-backup-${formattedDate}.zip`, 'application/zip');
};
