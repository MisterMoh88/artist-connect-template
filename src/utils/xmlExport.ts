
import { Artist, MediaContent, Category } from '@/types/supabase-custom';

// Fonction pour échapper les caractères spéciaux XML
const escapeXML = (text: string | null | undefined): string => {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

// Générer un slug à partir d'une chaîne (pour les identifiants)
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Générer le XML pour un artiste
const generateArtistXML = (artist: Artist, index: number): string => {
  // Créer un objet pour les réseaux sociaux
  const socialLinks = {
    facebook: artist.social_facebook,
    instagram: artist.social_instagram,
    spotify: artist.social_spotify,
    youtube: artist.social_youtube
  };
  
  const pubDate = new Date(artist.created_at).toUTCString();
  const postName = generateSlug(artist.name);
  
  return `
  <item>
    <title><![CDATA[${artist.name}]]></title>
    <link>https://bkotube.com/artiste/${postName}</link>
    <pubDate>${pubDate}</pubDate>
    <dc:creator><![CDATA[admin]]></dc:creator>
    <guid isPermaLink="false">https://bkotube.com/artiste/${postName}</guid>
    <description></description>
    <content:encoded><![CDATA[${artist.bio || ''}]]></content:encoded>
    <excerpt:encoded><![CDATA[]]></excerpt:encoded>
    <wp:post_id>${index + 1000}</wp:post_id>
    <wp:post_date><![CDATA[${new Date(artist.created_at).toISOString().split('T')[0]}]]></wp:post_date>
    <wp:post_date_gmt><![CDATA[${new Date(artist.created_at).toISOString().split('T')[0]}]]></wp:post_date_gmt>
    <wp:post_modified><![CDATA[${new Date(artist.created_at).toISOString().split('T')[0]}]]></wp:post_modified>
    <wp:post_modified_gmt><![CDATA[${new Date(artist.created_at).toISOString().split('T')[0]}]]></wp:post_modified_gmt>
    <wp:comment_status><![CDATA[closed]]></wp:comment_status>
    <wp:ping_status><![CDATA[closed]]></wp:ping_status>
    <wp:post_name><![CDATA[${postName}]]></wp:post_name>
    <wp:status><![CDATA[publish]]></wp:status>
    <wp:post_parent>0</wp:post_parent>
    <wp:menu_order>0</wp:menu_order>
    <wp:post_type><![CDATA[artiste]]></wp:post_type>
    <wp:post_password><![CDATA[]]></wp:post_password>
    <wp:is_sticky>0</wp:is_sticky>
    <wp:postmeta>
      <wp:meta_key><![CDATA[_photo]]></wp:meta_key>
      <wp:meta_value><![CDATA[${artist.image_url || ''}]]></wp:meta_value>
    </wp:postmeta>
    <wp:postmeta>
      <wp:meta_key><![CDATA[_social_media]]></wp:meta_key>
      <wp:meta_value><![CDATA[${JSON.stringify(socialLinks)}]]></wp:meta_value>
    </wp:postmeta>
    <wp:postmeta>
      <wp:meta_key><![CDATA[_email]]></wp:meta_key>
      <wp:meta_value><![CDATA[${artist.email || ''}]]></wp:meta_value>
    </wp:postmeta>
  </item>`;
};

// Générer le XML pour un média
const generateMediaXML = (media: MediaContent, artistName: string = '', categoryName: string = '', index: number): string => {
  const pubDate = new Date(media.created_at).toUTCString();
  const postName = generateSlug(media.title);
  
  return `
  <item>
    <title><![CDATA[${media.title}]]></title>
    <link>https://bkotube.com/media/${postName}</link>
    <pubDate>${pubDate}</pubDate>
    <dc:creator><![CDATA[admin]]></dc:creator>
    <guid isPermaLink="false">https://bkotube.com/media/${postName}</guid>
    <description></description>
    <content:encoded><![CDATA[${media.description || ''}]]></content:encoded>
    <excerpt:encoded><![CDATA[]]></excerpt:encoded>
    <wp:post_id>${index + 2000}</wp:post_id>
    <wp:post_date><![CDATA[${new Date(media.created_at).toISOString().split('T')[0]}]]></wp:post_date>
    <wp:post_date_gmt><![CDATA[${new Date(media.created_at).toISOString().split('T')[0]}]]></wp:post_date_gmt>
    <wp:post_modified><![CDATA[${new Date(media.updated_at).toISOString().split('T')[0]}]]></wp:post_modified>
    <wp:post_modified_gmt><![CDATA[${new Date(media.updated_at).toISOString().split('T')[0]}]]></wp:post_modified_gmt>
    <wp:comment_status><![CDATA[closed]]></wp:comment_status>
    <wp:ping_status><![CDATA[closed]]></wp:ping_status>
    <wp:post_name><![CDATA[${postName}]]></wp:post_name>
    <wp:status><![CDATA[publish]]></wp:status>
    <wp:post_parent>0</wp:post_parent>
    <wp:menu_order>0</wp:menu_order>
    <wp:post_type><![CDATA[media]]></wp:post_type>
    <wp:post_password><![CDATA[]]></wp:post_password>
    <wp:is_sticky>0</wp:is_sticky>
    <wp:postmeta>
      <wp:meta_key><![CDATA[_cover_image]]></wp:meta_key>
      <wp:meta_value><![CDATA[${media.cover_image_url || ''}]]></wp:meta_value>
    </wp:postmeta>
    <wp:postmeta>
      <wp:meta_key><![CDATA[_artist]]></wp:meta_key>
      <wp:meta_value><![CDATA[${artistName}]]></wp:meta_value>
    </wp:postmeta>
    <wp:postmeta>
      <wp:meta_key><![CDATA[_category]]></wp:meta_key>
      <wp:meta_value><![CDATA[${categoryName}]]></wp:meta_value>
    </wp:postmeta>
    <wp:postmeta>
      <wp:meta_key><![CDATA[_media_url]]></wp:meta_key>
      <wp:meta_value><![CDATA[${media.media_url}]]></wp:meta_value>
    </wp:postmeta>
    <wp:postmeta>
      <wp:meta_key><![CDATA[_featured]]></wp:meta_key>
      <wp:meta_value><![CDATA[${media.featured ? '1' : '0'}]]></wp:meta_value>
    </wp:postmeta>
    <wp:postmeta>
      <wp:meta_key><![CDATA[_release_date]]></wp:meta_key>
      <wp:meta_value><![CDATA[${media.release_date}]]></wp:meta_value>
    </wp:postmeta>
  </item>`;
};

// Générer le XML pour une catégorie
const generateCategoryXML = (category: Category): string => {
  const nicename = generateSlug(category.name);

  return `
  <wp:term>
    <wp:term_id>${category.id}</wp:term_id>
    <wp:term_taxonomy>category</wp:term_taxonomy>
    <wp:term_slug><![CDATA[${nicename}]]></wp:term_slug>
    <wp:term_parent></wp:term_parent>
    <wp:term_name><![CDATA[${category.name}]]></wp:term_name>
    <wp:term_description><![CDATA[${category.slug || ''}]]></wp:term_description>
  </wp:term>`;
};

// Générer les options du site
const generateSiteOptionsXML = (): string => {
  return `
  <wp:option>
    <wp:option_name>siteurl</wp:option_name>
    <wp:option_value><![CDATA[https://bkotube.com]]></wp:option_value>
    <wp:autoload>yes</wp:autoload>
  </wp:option>
  <wp:option>
    <wp:option_name>blogname</wp:option_name>
    <wp:option_value><![CDATA[BkoTube]]></wp:option_value>
    <wp:autoload>yes</wp:autoload>
  </wp:option>
  <wp:option>
    <wp:option_name>blogdescription</wp:option_name>
    <wp:option_value><![CDATA[Plateforme de contenu musical et vidéo]]></wp:option_value>
    <wp:autoload>yes</wp:autoload>
  </wp:option>
  <wp:option>
    <wp:option_name>timezone_string</wp:option_name>
    <wp:option_value><![CDATA[Africa/Bamako]]></wp:option_value>
    <wp:autoload>yes</wp:autoload>
  </wp:option>
  <wp:option>
    <wp:option_name>template</wp:option_name>
    <wp:option_value><![CDATA[bkotube-theme]]></wp:option_value>
    <wp:autoload>yes</wp:autoload>
  </wp:option>
  <wp:option>
    <wp:option_name>stylesheet</wp:option_name>
    <wp:option_value><![CDATA[bkotube-theme]]></wp:option_value>
    <wp:autoload>yes</wp:autoload>
  </wp:option>
  <wp:option>
    <wp:option_name>date_format</wp:option_name>
    <wp:option_value><![CDATA[j F Y]]></wp:option_value>
    <wp:autoload>yes</wp:autoload>
  </wp:option>
  <wp:option>
    <wp:option_name>time_format</wp:option_name>
    <wp:option_value><![CDATA[H:i]]></wp:option_value>
    <wp:autoload>yes</wp:autoload>
  </wp:option>`;
};

// Générer les paramètres du thème
const generateThemeSettingsXML = (): string => {
  const themeSettings = {
    colors: {
      primary: '#0ea5e9',
      secondary: '#f3f4f6',
      accent: '#3b82f6',
      background: '#ffffff',
      text: '#1f2937'
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      headingFontFamily: 'Inter, sans-serif'
    },
    layout: {
      containerWidth: '1280px',
      headerHeight: '80px',
      footerHeight: '250px'
    },
    socialMedia: {
      facebook: 'https://facebook.com/bkotube',
      instagram: 'https://instagram.com/bkotube',
      youtube: 'https://youtube.com/bkotube'
    },
    logo: '/images/bkotube-logo.png',
    favicon: '/images/favicon.ico'
  };

  return `
  <wp:option>
    <wp:option_name>theme_mods_bkotube-theme</wp:option_name>
    <wp:option_value><![CDATA[${JSON.stringify(themeSettings)}]]></wp:option_value>
    <wp:autoload>yes</wp:autoload>
  </wp:option>`;
};

// Générer les plugins actifs
const generateActivePluginsXML = (): string => {
  const activePlugins = [
    'advanced-custom-fields/acf.php',
    'contact-form-7/wp-contact-form-7.php',
    'wp-media-category-management/wp-media-category-management.php',
    'seo-by-rank-math/rank-math.php',
    'elementor/elementor.php',
    'custom-post-type-ui/custom-post-type-ui.php'
  ];

  return `
  <wp:option>
    <wp:option_name>active_plugins</wp:option_name>
    <wp:option_value><![CDATA[${JSON.stringify(activePlugins)}]]></wp:option_value>
    <wp:autoload>yes</wp:autoload>
  </wp:option>`;
};

// Générer les menus de navigation
const generateNavigationMenusXML = (): string => {
  const menuStructure = {
    'main-menu': {
      id: 1,
      name: 'Menu Principal',
      items: [
        { title: 'Accueil', url: '/', order: 1 },
        { title: 'Services', url: '/services', order: 2 },
        { title: 'Artistes', url: '/artistes', order: 3 },
        { title: 'Blog', url: '/blog', order: 4 },
        { title: 'Contact', url: '/contact', order: 5 }
      ]
    },
    'footer-menu': {
      id: 2,
      name: 'Menu Pied de Page',
      items: [
        { title: 'Accueil', url: '/', order: 1 },
        { title: 'À propos', url: '/a-propos', order: 2 },
        { title: 'Confidentialité', url: '/confidentialite', order: 3 },
        { title: 'Conditions d\'utilisation', url: '/conditions-utilisation', order: 4 },
        { title: 'Contact', url: '/contact', order: 5 }
      ]
    }
  };

  let menusXML = '';
  
  // Menu Locations
  menusXML += `
  <wp:option>
    <wp:option_name>nav_menu_locations</wp:option_name>
    <wp:option_value><![CDATA[{"primary":1,"footer":2}]]></wp:option_value>
    <wp:autoload>yes</wp:autoload>
  </wp:option>`;
  
  // Menu Termes
  for (const [key, menu] of Object.entries(menuStructure)) {
    menusXML += `
    <wp:term>
      <wp:term_id>${menu.id}</wp:term_id>
      <wp:term_taxonomy>nav_menu</wp:term_taxonomy>
      <wp:term_slug><![CDATA[${key}]]></wp:term_slug>
      <wp:term_name><![CDATA[${menu.name}]]></wp:term_name>
    </wp:term>`;
    
    // Menu Items (en tant que posts)
    menu.items.forEach((item, index) => {
      const itemId = 3000 + (menu.id * 100) + index;
      const itemSlug = generateSlug(item.title);
      
      menusXML += `
      <item>
        <title><![CDATA[${item.title}]]></title>
        <link>${item.url}</link>
        <pubDate>${new Date().toUTCString()}</pubDate>
        <dc:creator><![CDATA[admin]]></dc:creator>
        <guid isPermaLink="false">https://bkotube.com/?p=${itemId}</guid>
        <wp:post_id>${itemId}</wp:post_id>
        <wp:post_date><![CDATA[${new Date().toISOString().split('T')[0]}]]></wp:post_date>
        <wp:post_date_gmt><![CDATA[${new Date().toISOString().split('T')[0]}]]></wp:post_date_gmt>
        <wp:post_name><![CDATA[menu-${itemSlug}]]></wp:post_name>
        <wp:status><![CDATA[publish]]></wp:status>
        <wp:post_type><![CDATA[nav_menu_item]]></wp:post_type>
        <wp:postmeta>
          <wp:meta_key><![CDATA[_menu_item_type]]></wp:meta_key>
          <wp:meta_value><![CDATA[custom]]></wp:meta_value>
        </wp:postmeta>
        <wp:postmeta>
          <wp:meta_key><![CDATA[_menu_item_menu_item_parent]]></wp:meta_key>
          <wp:meta_value><![CDATA[0]]></wp:meta_value>
        </wp:postmeta>
        <wp:postmeta>
          <wp:meta_key><![CDATA[_menu_item_object]]></wp:meta_key>
          <wp:meta_value><![CDATA[custom]]></wp:meta_value>
        </wp:postmeta>
        <wp:postmeta>
          <wp:meta_key><![CDATA[_menu_item_url]]></wp:meta_key>
          <wp:meta_value><![CDATA[${item.url}]]></wp:meta_value>
        </wp:postmeta>
        <wp:postmeta>
          <wp:meta_key><![CDATA[_menu_item_target]]></wp:meta_key>
          <wp:meta_value><![CDATA[]]></wp:meta_value>
        </wp:postmeta>
        <wp:postmeta>
          <wp:meta_key><![CDATA[_menu_item_classes]]></wp:meta_key>
          <wp:meta_value><![CDATA[a:1:{i:0;s:0:"";}]]></wp:meta_value>
        </wp:postmeta>
        <wp:postmeta>
          <wp:meta_key><![CDATA[_menu_item_xfn]]></wp:meta_key>
          <wp:meta_value><![CDATA[]]></wp:meta_value>
        </wp:postmeta>
        <wp:postmeta>
          <wp:meta_key><![CDATA[_menu_item_position]]></wp:meta_key>
          <wp:meta_value><![CDATA[${item.order}]]></wp:meta_value>
        </wp:postmeta>
      </item>`;
    });
  }
  
  return menusXML;
};

// Générer les pages statiques
const generateStaticPagesXML = (): string => {
  const pages = [
    {
      id: 4000,
      title: 'À propos',
      slug: 'a-propos',
      content: 'Page à propos de BkoTube - Plateforme de contenu musical et vidéo basée à Bamako, Mali.'
    },
    {
      id: 4001,
      title: 'Confidentialité',
      slug: 'confidentialite',
      content: 'Politique de confidentialité de BkoTube - Nous respectons votre vie privée et protégeons vos données personnelles.'
    },
    {
      id: 4002,
      title: 'Conditions d\'utilisation',
      slug: 'conditions-utilisation',
      content: 'Conditions générales d\'utilisation de BkoTube - En utilisant notre plateforme, vous acceptez ces conditions.'
    }
  ];
  
  let pagesXML = '';
  
  pages.forEach(page => {
    pagesXML += `
    <item>
      <title><![CDATA[${page.title}]]></title>
      <link>https://bkotube.com/${page.slug}</link>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <dc:creator><![CDATA[admin]]></dc:creator>
      <guid isPermaLink="false">https://bkotube.com/?page_id=${page.id}</guid>
      <description></description>
      <content:encoded><![CDATA[${page.content}]]></content:encoded>
      <excerpt:encoded><![CDATA[]]></excerpt:encoded>
      <wp:post_id>${page.id}</wp:post_id>
      <wp:post_date><![CDATA[${new Date().toISOString().split('T')[0]}]]></wp:post_date>
      <wp:post_date_gmt><![CDATA[${new Date().toISOString().split('T')[0]}]]></wp:post_date_gmt>
      <wp:post_name><![CDATA[${page.slug}]]></wp:post_name>
      <wp:status><![CDATA[publish]]></wp:status>
      <wp:post_parent>0</wp:post_parent>
      <wp:menu_order>0</wp:menu_order>
      <wp:post_type><![CDATA[page]]></wp:post_type>
      <wp:post_password><![CDATA[]]></wp:post_password>
      <wp:is_sticky>0</wp:is_sticky>
    </item>`;
  });
  
  return pagesXML;
};

// Générer les widgets
const generateWidgetsXML = (): string => {
  const widgets = {
    'sidebar-1': [
      {
        id: 'search-2',
        title: 'Recherche',
        type: 'search'
      },
      {
        id: 'recent-posts-2',
        title: 'Articles récents',
        type: 'recent-posts',
        count: 5
      },
      {
        id: 'categories-2',
        title: 'Catégories',
        type: 'categories'
      }
    ],
    'footer-1': [
      {
        id: 'text-1',
        title: 'À propos de BkoTube',
        type: 'text',
        content: 'BkoTube est une plateforme de contenu musical et vidéo basée à Bamako, Mali. Notre mission est de promouvoir les talents locaux et de diffuser la culture malienne à travers le monde.'
      }
    ],
    'footer-2': [
      {
        id: 'text-2',
        title: 'Nous contacter',
        type: 'text',
        content: 'Email: contact@bkotube.com<br>Téléphone: +223 XX XX XX XX<br>Adresse: Bamako, Mali'
      }
    ]
  };
  
  return `
  <wp:option>
    <wp:option_name>sidebars_widgets</wp:option_name>
    <wp:option_value><![CDATA[${JSON.stringify(widgets)}]]></wp:option_value>
    <wp:autoload>yes</wp:autoload>
  </wp:option>`;
};

// Générer les informations d'installation du thème
const generateThemeInstallationXML = (): string => {
  const themeContent = {
    name: 'BkoTube Theme',
    version: '1.0.0',
    template_dir: 'bkotube-theme',
    stylesheet_dir: 'bkotube-theme',
    template: 'bkotube-theme',
    stylesheet: 'bkotube-theme',
    status: 'active',
    title: 'BkoTube Theme',
    author: 'BkoTube',
    description: 'Thème personnalisé pour la plateforme BkoTube',
    tags: ['music', 'video', 'responsive', 'modern'],
    text_domain: 'bkotube-theme',
    required_plugins: [
      'advanced-custom-fields',
      'contact-form-7',
      'elementor'
    ]
  };
  
  return `
  <wp:option>
    <wp:option_name>theme_data</wp:option_name>
    <wp:option_value><![CDATA[${JSON.stringify(themeContent)}]]></wp:option_value>
    <wp:autoload>yes</wp:autoload>
  </wp:option>`;
};

// Générer les types de contenu personnalisés
const generateCustomPostTypesXML = (): string => {
  const customPostTypes = [
    {
      name: 'artiste',
      label: 'Artistes',
      singular_label: 'Artiste',
      description: 'Type de contenu pour les artistes de BkoTube',
      public: true,
      has_archive: true,
      supports: ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
      taxonomies: ['category'],
      menu_icon: 'dashicons-microphone'
    },
    {
      name: 'media',
      label: 'Médias',
      singular_label: 'Média',
      description: 'Type de contenu pour les médias de BkoTube',
      public: true,
      has_archive: true,
      supports: ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
      taxonomies: ['category'],
      menu_icon: 'dashicons-format-video'
    }
  ];
  
  return `
  <wp:option>
    <wp:option_name>cptui_post_types</wp:option_name>
    <wp:option_value><![CDATA[${JSON.stringify(customPostTypes)}]]></wp:option_value>
    <wp:autoload>yes</wp:autoload>
  </wp:option>`;
};

// Générer les champs personnalisés ACF
const generateACFFieldsXML = (): string => {
  const acfFields = [
    {
      key: 'group_artiste',
      title: 'Informations Artiste',
      fields: [
        {
          key: 'field_photo',
          label: 'Photo',
          name: '_photo',
          type: 'image'
        },
        {
          key: 'field_social_media',
          label: 'Réseaux sociaux',
          name: '_social_media',
          type: 'group',
          sub_fields: [
            {
              key: 'field_facebook',
              label: 'Facebook',
              name: 'facebook',
              type: 'url'
            },
            {
              key: 'field_instagram',
              label: 'Instagram',
              name: 'instagram',
              type: 'url'
            },
            {
              key: 'field_spotify',
              label: 'Spotify',
              name: 'spotify',
              type: 'url'
            },
            {
              key: 'field_youtube',
              label: 'YouTube',
              name: 'youtube',
              type: 'url'
            }
          ]
        },
        {
          key: 'field_email',
          label: 'Email',
          name: '_email',
          type: 'email'
        }
      ],
      location: [
        [
          {
            param: 'post_type',
            operator: '==',
            value: 'artiste'
          }
        ]
      ]
    },
    {
      key: 'group_media',
      title: 'Informations Média',
      fields: [
        {
          key: 'field_cover_image',
          label: 'Image de couverture',
          name: '_cover_image',
          type: 'image'
        },
        {
          key: 'field_artist',
          label: 'Artiste',
          name: '_artist',
          type: 'post_object',
          post_type: ['artiste']
        },
        {
          key: 'field_category',
          label: 'Catégorie',
          name: '_category',
          type: 'taxonomy',
          taxonomy: 'category'
        },
        {
          key: 'field_media_url',
          label: 'URL du média',
          name: '_media_url',
          type: 'url'
        },
        {
          key: 'field_featured',
          label: 'En vedette',
          name: '_featured',
          type: 'true_false'
        },
        {
          key: 'field_release_date',
          label: 'Date de sortie',
          name: '_release_date',
          type: 'date_picker'
        }
      ],
      location: [
        [
          {
            param: 'post_type',
            operator: '==',
            value: 'media'
          }
        ]
      ]
    }
  ];
  
  return `
  <wp:option>
    <wp:option_name>acf_field_groups</wp:option_name>
    <wp:option_value><![CDATA[${JSON.stringify(acfFields)}]]></wp:option_value>
    <wp:autoload>yes</wp:autoload>
  </wp:option>`;
};

// Fonction principale d'exportation
export const generateXMLExport = (
  artists: Artist[],
  mediaContents: MediaContent[],
  categories: Category[]
): string => {
  const date = new Date().toISOString();
  const siteTitle = "BkoTube";
  const siteUrl = "https://bkotube.com";
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- This is a WordPress eXtended RSS file generated by BkoTube as an export of your site. -->
<!-- It contains information about your site's posts, pages, comments, categories, and other content. -->
<!-- You may use this file to transfer that content from one site to another. -->
<!-- This file is not intended to serve as a complete backup of your site. -->

<!-- To import this information into a WordPress site follow these steps: -->
<!-- 1. Log in to that site as an administrator. -->
<!-- 2. Go to Tools: Import in the WordPress admin panel. -->
<!-- 3. Install the "WordPress" importer from the list. -->
<!-- 4. Activate & Run Importer. -->
<!-- 5. Upload this file using the form provided on that page. -->
<!-- 6. You will first be asked to map the authors in this export file to users -->
<!--    on the site. For each author, you may choose to map to an -->
<!--    existing user on the site or to create a new user. -->
<!-- 7. WordPress will then import each of the posts, pages, comments, categories, etc. -->
<!--    contained in this file into your site. -->

<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/"
>
<channel>
  <title>${siteTitle}</title>
  <link>${siteUrl}</link>
  <description>Plateforme de contenu musical et vidéo</description>
  <pubDate>${new Date().toUTCString()}</pubDate>
  <language>fr-FR</language>
  <wp:wxr_version>1.2</wp:wxr_version>
  <wp:base_site_url>${siteUrl}</wp:base_site_url>
  <wp:base_blog_url>${siteUrl}</wp:base_blog_url>
  <generator>https://bkotube.com/export</generator>

  <!-- Informations sur l'auteur -->
  <wp:author>
    <wp:author_id>1</wp:author_id>
    <wp:author_login><![CDATA[admin]]></wp:author_login>
    <wp:author_email><![CDATA[admin@bkotube.com]]></wp:author_email>
    <wp:author_display_name><![CDATA[Administrateur]]></wp:author_display_name>
    <wp:author_first_name><![CDATA[Admin]]></wp:author_first_name>
    <wp:author_last_name><![CDATA[BkoTube]]></wp:author_last_name>
  </wp:author>
`;

  // Ajouter les options du site
  xml += generateSiteOptionsXML();
  
  // Ajouter les paramètres du thème
  xml += generateThemeSettingsXML();
  
  // Ajouter les plugins actifs
  xml += generateActivePluginsXML();
  
  // Ajouter les widgets
  xml += generateWidgetsXML();
  
  // Ajouter les informations d'installation du thème
  xml += generateThemeInstallationXML();
  
  // Ajouter les types de contenu personnalisés
  xml += generateCustomPostTypesXML();
  
  // Ajouter les champs personnalisés ACF
  xml += generateACFFieldsXML();

  // Ajouter les types de contenu personnalisés
  xml += `
  <wp:term>
    <wp:term_id>1</wp:term_id>
    <wp:term_taxonomy>post_type</wp:term_taxonomy>
    <wp:term_slug><![CDATA[artiste]]></wp:term_slug>
    <wp:term_name><![CDATA[Artiste]]></wp:term_name>
    <wp:term_description><![CDATA[Type de contenu pour les artistes de BkoTube]]></wp:term_description>
  </wp:term>
  <wp:term>
    <wp:term_id>2</wp:term_id>
    <wp:term_taxonomy>post_type</wp:term_taxonomy>
    <wp:term_slug><![CDATA[media]]></wp:term_slug>
    <wp:term_name><![CDATA[Media]]></wp:term_name>
    <wp:term_description><![CDATA[Type de contenu pour les médias de BkoTube]]></wp:term_description>
  </wp:term>
`;

  // Ajouter les catégories
  categories.forEach(category => {
    xml += generateCategoryXML(category);
  });

  // Ajouter les menus de navigation
  xml += generateNavigationMenusXML();
  
  // Ajouter les pages statiques
  xml += generateStaticPagesXML();

  // Ajouter les artistes
  artists.forEach((artist, index) => {
    xml += generateArtistXML(artist, index);
  });

  // Ajouter les médias
  mediaContents.forEach((media, index) => {
    // Trouver le nom de l'artiste associé
    const artist = artists.find(a => a.id === media.artist_id);
    const category = categories.find(c => c.id === media.category_id);
    
    xml += generateMediaXML(media, artist?.name || '', category?.name || '', index);
  });

  xml += `
</channel>
</rss>`;

  return xml;
};

// Fonction pour déclencher le téléchargement du fichier XML
export const downloadXMLFile = (xml: string, filename = 'bkotube-export.xml'): void => {
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
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
