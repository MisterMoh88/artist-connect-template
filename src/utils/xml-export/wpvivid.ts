
import { Artist, MediaContent, Category } from '@/types/supabase-custom';
import { escapeXML, generateSlug, downloadFile, generateWordPressUserInfo, generateWPVividUUID, getWPVividFormattedDate } from './helpers';
import { generateXMLExport } from './index';

// Structure de l'archive WPVivid authentique basée sur les exemples fournis
const generateWPVividStructure = () => {
  // Génère un UUID WPVivid pour toute l'archive (format vu dans les exemples)
  const backupId = generateWPVividUUID();
  const dateFormat = getWPVividFormattedDate();
  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
  const currentDay = String(new Date().getDate()).padStart(2, '0');
  const formattedTime = dateFormat.split('-').slice(3).join('_');
  
  // Format: yellow-yuvraj-g8.zipwp.link_wpvivid-523837ee3394a_2025-03-29-01-59
  const archivePrefix = `bkotube_wpvivid-${backupId}a_${currentYear}-${currentMonth}-${currentDay}-${formattedTime}`;
  
  return {
    backupId,
    dateFormat,
    // Format basé sur l'exemple
    archivePrefix,
    // Noms des fichiers ZIP individuels
    zipFiles: {
      content: `${archivePrefix}_backup_content.zip`,
      core: `${archivePrefix}_backup_core.zip`,
      db: `${archivePrefix}_backup_db.zip`,
      plugin: `${archivePrefix}_backup_plugin.zip`,
      themes: `${archivePrefix}_backup_themes.zip`,
      uploads: `${archivePrefix}_backup_uploads.zip`
    },
    // Dossiers principaux
    folders: {
      themes: 'themes',
      plugins: 'plugins',
      uploads: 'uploads',
      content: 'wp-content',
      db: 'db'
    },
    // Fichier d'info package
    packageInfo: 'wpvivid_package_info.json'
  };
};

// Générer le package info de WPVivid
const generateWPVividPackageInfo = (backupStructure: any) => {
  // Format exact basé sur l'analyse des fichiers wpvivid_package_info.json
  return {
    create_time: Math.floor(Date.now() / 1000),
    web_server: "Apache",
    php_version: "8.0.30",
    mysql_version: "8.0.36",
    wordpress_version: "6.4.3",
    locale: "fr_FR",
    backup_id: backupStructure.backupId + "a",
    backup_files: {
      themes: true,
      plugins: true,
      uploads: true,
      content: true,
      database: true
    },
    files": {
      "themes": `${backupStructure.zipFiles.themes}`,
      "plugins": `${backupStructure.zipFiles.plugin}`,
      "uploads": `${backupStructure.zipFiles.uploads}`,
      "content": `${backupStructure.zipFiles.content}`,
      "db": `${backupStructure.zipFiles.db}`
    }
  };
};

// Générer le fichier SQL de la base de données
const generateWPVividDatabase = (artists: Artist[], mediaContents: MediaContent[], categories: Category[]) => {
  const sql = [
    "-- BkoTube Export MySQL dump",
    `-- Generated: ${new Date().toISOString()}`,
    "-- ------------------------------------------------------",
    "/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;",
    "/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;",
    "/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;",
    "/*!40101 SET NAMES utf8mb4 */;",
    "",
    "-- Database: `wordpress`",
    "--",
    "",
    "-- --------------------------------------------------------",
    ""
  ];

  // Format de CREATE DATABASE conforme à WPVivid
  sql.push("CREATE DATABASE IF NOT EXISTS `wordpress` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
  sql.push("USE `wordpress`;");
  
  // Ajouter les créations de tables
  sql.push(`
-- Table structure for table \`wp_posts\`
DROP TABLE IF EXISTS \`wp_posts\`;
CREATE TABLE \`wp_posts\` (
  \`ID\` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  \`post_author\` bigint(20) unsigned NOT NULL DEFAULT 0,
  \`post_date\` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  \`post_date_gmt\` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  \`post_content\` longtext NOT NULL,
  \`post_title\` text NOT NULL,
  \`post_excerpt\` text NOT NULL,
  \`post_status\` varchar(20) NOT NULL DEFAULT 'publish',
  \`comment_status\` varchar(20) NOT NULL DEFAULT 'open',
  \`ping_status\` varchar(20) NOT NULL DEFAULT 'open',
  \`post_password\` varchar(255) NOT NULL DEFAULT '',
  \`post_name\` varchar(200) NOT NULL DEFAULT '',
  \`to_ping\` text NOT NULL,
  \`pinged\` text NOT NULL,
  \`post_modified\` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  \`post_modified_gmt\` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  \`post_content_filtered\` longtext NOT NULL,
  \`post_parent\` bigint(20) unsigned NOT NULL DEFAULT 0,
  \`guid\` varchar(255) NOT NULL DEFAULT '',
  \`menu_order\` int(11) NOT NULL DEFAULT 0,
  \`post_type\` varchar(20) NOT NULL DEFAULT 'post',
  \`post_mime_type\` varchar(100) NOT NULL DEFAULT '',
  \`comment_count\` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (\`ID\`),
  KEY \`post_name\` (\`post_name\`(191)),
  KEY \`type_status_date\` (\`post_type\`,\`post_status\`,\`post_date\`,\`ID\`),
  KEY \`post_parent\` (\`post_parent\`),
  KEY \`post_author\` (\`post_author\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // Insérer quelques artistes comme posts
  artists.forEach((artist, index) => {
    const postDate = new Date(artist.created_at).toISOString().slice(0, 19).replace('T', ' ');
    const id = 1000 + index;
    const postName = generateSlug(artist.name);
    
    sql.push(`
-- Artist: ${artist.name}
INSERT INTO \`wp_posts\` (\`ID\`, \`post_author\`, \`post_date\`, \`post_date_gmt\`, \`post_content\`, \`post_title\`, \`post_excerpt\`, \`post_status\`, \`post_name\`, \`post_type\`) 
VALUES (${id}, 1, '${postDate}', '${postDate}', '${escapeXML(artist.bio || '')}', '${escapeXML(artist.name)}', '', 'publish', '${postName}', 'artiste');
    `);
  });

  // Insérer quelques médias comme posts
  mediaContents.forEach((media, index) => {
    const postDate = new Date(media.created_at).toISOString().slice(0, 19).replace('T', ' ');
    const id = 2000 + index;
    const postName = generateSlug(media.title);
    
    sql.push(`
-- Media: ${media.title}
INSERT INTO \`wp_posts\` (\`ID\`, \`post_author\`, \`post_date\`, \`post_date_gmt\`, \`post_content\`, \`post_title\`, \`post_excerpt\`, \`post_status\`, \`post_name\`, \`post_type\`) 
VALUES (${id}, 1, '${postDate}', '${postDate}', '${escapeXML(media.description || '')}', '${escapeXML(media.title)}', '', 'publish', '${postName}', 'media');
    `);
  });

  // Structure de la table des catégories
  sql.push(`
-- Table structure for table \`wp_terms\`
DROP TABLE IF EXISTS \`wp_terms\`;
CREATE TABLE \`wp_terms\` (
  \`term_id\` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  \`name\` varchar(200) NOT NULL DEFAULT '',
  \`slug\` varchar(200) NOT NULL DEFAULT '',
  \`term_group\` bigint(10) NOT NULL DEFAULT 0,
  PRIMARY KEY (\`term_id\`),
  KEY \`slug\` (\`slug\`(191)),
  KEY \`name\` (\`name\`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // Insérer les catégories
  categories.forEach((category, index) => {
    const id = 100 + index;
    const slug = category.slug || generateSlug(category.name);
    
    sql.push(`
-- Category: ${category.name}
INSERT INTO \`wp_terms\` (\`term_id\`, \`name\`, \`slug\`, \`term_group\`) 
VALUES (${id}, '${escapeXML(category.name)}', '${slug}', 0);
    `);
  });

  // Ajouter la fin du fichier SQL
  sql.push(`
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
  `);

  return sql.join("\n");
};

// Générer les fichiers de thème pour l'archive
const generateThemeFiles = () => {
  return [
    {
      path: 'bkotube-theme/style.css',
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
*/`
    },
    {
      path: 'bkotube-theme/functions.php',
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
add_action('acf/init', 'bkotube_acf_init');`
    },
    {
      path: 'bkotube-theme/index.php',
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
<?php get_footer(); ?>`
    },
    {
      path: 'bkotube-theme/header.php',
      content: `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
    <header id="masthead" class="site-header">
        <div class="site-branding">
            <?php the_custom_logo(); ?>
            <h1 class="site-title"><a href="<?php echo esc_url(home_url('/')); ?>" rel="home"><?php bloginfo('name'); ?></a></h1>
        </div>

        <nav id="site-navigation" class="main-navigation">
            <?php
            wp_nav_menu(
                array(
                    'theme_location' => 'menu-1',
                    'menu_id'        => 'primary-menu',
                )
            );
            ?>
        </nav>
    </header>`
    },
    {
      path: 'bkotube-theme/footer.php',
      content: `<footer id="colophon" class="site-footer">
        <div class="site-info">
            <span class="copyright">© <?php echo date('Y'); ?> BkoTube</span>
        </div>
    </footer>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>`
    }
  ];
};

// Générer les fichiers de plugin
const generatePluginFiles = () => {
  return [
    // Fichier principal d'ACF
    {
      path: 'advanced-custom-fields/acf.php',
      content: `<?php
/*
Plugin Name: Advanced Custom Fields
Plugin URI: https://www.advancedcustomfields.com/
Description: Customize WordPress with powerful, professional and intuitive fields.
Version: 6.2.5
Author: ACF
Author URI: https://www.advancedcustomfields.com/
Text Domain: acf
*/

// Exit if accessed directly
if (!defined('ABSPATH')) exit;

// Define constants (for example purposes)
define('ACF_VERSION', '6.2.5');
define('ACF_PATH', plugin_dir_path(__FILE__));
define('ACF_URL', plugin_dir_url(__FILE__));`
    },
    // Contact Form 7
    {
      path: 'contact-form-7/wp-contact-form-7.php',
      content: `<?php
/*
Plugin Name: Contact Form 7
Plugin URI: https://contactform7.com/
Description: Just another contact form plugin. Simple but flexible.
Author: Takayuki Miyoshi
Author URI: https://contactform7.com/
Text Domain: contact-form-7
Version: 5.8.4
*/

// Exit if accessed directly
if (!defined('ABSPATH')) exit;`
    },
    // Custom Post Type UI
    {
      path: 'custom-post-type-ui/custom-post-type-ui.php',
      content: `<?php
/*
Plugin Name: Custom Post Type UI
Plugin URI: https://github.com/WebDevStudios/custom-post-type-ui/
Description: Admin UI for creating custom post types and custom taxonomies for WordPress
Author: WebDevStudios
Version: 1.15.1
Author URI: https://webdevstudios.com/
Text Domain: custom-post-type-ui
Domain Path: /languages
*/

// Exit if accessed directly
if (!defined('ABSPATH')) exit;`
    },
    // Elementor
    {
      path: 'elementor/elementor.php',
      content: `<?php
/*
Plugin Name: Elementor
Description: The Elementor Website Builder has it all: drag and drop page builder, pixel perfect design, mobile responsive editing, and more.
Plugin URI: https://elementor.com/?utm_source=wp-plugins&utm_campaign=plugin-uri&utm_medium=wp-dash
Author: Elementor.com
Version: 3.18.0
Author URI: https://elementor.com/?utm_source=wp-plugins&utm_campaign=author-uri&utm_medium=wp-dash
Text Domain: elementor
*/

// Exit if accessed directly
if (!defined('ABSPATH')) exit;`
    }
  ];
};

// Fonction pour créer l'archive WPVivid
export const generateWPVividBackup = async (
  artists: Artist[],
  mediaContents: MediaContent[],
  categories: Category[]
): Promise<void> => {
  try {
    // Créer la structure WPVivid
    const backupStructure = generateWPVividStructure();
    
    // Générer le XML WXR
    const wxrContent = generateXMLExport(artists, mediaContents, categories);
    
    // Générer le fichier de package info WPVivid
    const packageInfoContent = generateWPVividPackageInfo(backupStructure);
    
    // Générer le fichier SQL de la base de données
    const dbContent = generateWPVividDatabase(artists, mediaContents, categories);
    
    // Générer les fichiers de thème
    const themeFiles = generateThemeFiles();
    
    // Générer les fichiers de plugin
    const pluginFiles = generatePluginFiles();
    
    // Créer les archives ZIP individuelles
    const JSZip = (await import('jszip')).default;
    
    // 1. Archive DB
    const dbZip = new JSZip();
    dbZip.file("wpvivid_database.sql", dbContent);
    dbZip.file("wpvivid_wordpress_export.xml", wxrContent);
    
    // 2. Archive Themes
    const themesZip = new JSZip();
    themeFiles.forEach(file => {
      themesZip.file(file.path, file.content);
    });
    themesZip.file("wpvivid_package_info.json", JSON.stringify(packageInfoContent, null, 2));
    
    // 3. Archive Plugins
    const pluginsZip = new JSZip();
    pluginFiles.forEach(file => {
      pluginsZip.file(file.path, file.content);
    });
    
    // 4. Archive Content (vide mais nécessaire)
    const contentZip = new JSZip();
    contentZip.file("wp-content/readme.txt", "BkoTube Content Directory");
    
    // 5. Archive Uploads (vide mais nécessaire)
    const uploadsZip = new JSZip();
    uploadsZip.file("uploads/readme.txt", "BkoTube Uploads Directory");
    
    // 6. Archive Package Info (fichier séparé hors des archives)
    const packageInfoBlob = new Blob([JSON.stringify(packageInfoContent, null, 2)], { type: 'application/json' });
    
    // Générer toutes les archives
    const dbBlob = await dbZip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 5 }
    });
    
    const themesBlob = await themesZip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 5 }
    });
    
    const pluginsBlob = await pluginsZip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 5 }
    });
    
    const contentBlob = await contentZip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 5 }
    });
    
    const uploadsBlob = await uploadsZip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 5 }
    });
    
    // Télécharger tous les fichiers
    downloadFile(dbBlob, backupStructure.zipFiles.db, 'application/zip');
    downloadFile(themesBlob, backupStructure.zipFiles.themes, 'application/zip');
    downloadFile(pluginsBlob, backupStructure.zipFiles.plugin, 'application/zip');
    downloadFile(contentBlob, backupStructure.zipFiles.content, 'application/zip');
    downloadFile(uploadsBlob, backupStructure.zipFiles.uploads, 'application/zip');
    downloadFile(packageInfoBlob, backupStructure.packageInfo, 'application/json');
    
    // Notification de succès
    console.log('Archives WPVivid générées avec succès.');
    
  } catch (error) {
    console.error('Erreur lors de la génération de la sauvegarde WPVivid:', error);
    throw error;
  }
};

// Cette fonction n'est plus utilisée car nous créons des archives séparées
const createWPVividZIP = async (
  files: { name: string, content: string, type: string }[],
  archiveName: string
): Promise<void> => {
  try {
    // Dynamically import JSZip only when needed
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    
    // Ajouter les fichiers à l'archive
    for (const file of files) {
      zip.file(file.name, file.content);
    }
    
    // Générer l'archive ZIP avec des paramètres optimisés
    const content = await zip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 5  // Un niveau plus modéré pour éviter la corruption
      },
      comment: `WPVivid Backup Archive created by BkoTube Export Tool - ${new Date().toISOString()}`
    });
    
    // Déclencher le téléchargement
    downloadFile(content, `${archiveName}.zip`, 'application/zip');
  } catch (error) {
    console.error('Erreur lors de la création du fichier ZIP:', error);
    throw error;
  }
};
