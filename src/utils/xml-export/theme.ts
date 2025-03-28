
import { escapeXML } from './helpers';

// Générer les informations d'installation du thème
export const generateThemeInstallationXML = (): string => {
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
export const generateCustomPostTypesXML = (): string => {
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
  
  // Ajouter la définition des post_types directement
  let postTypeXML = `
  <wp:option>
    <wp:option_name>cptui_post_types</wp:option_name>
    <wp:option_value><![CDATA[${JSON.stringify(customPostTypes)}]]></wp:option_value>
    <wp:autoload>yes</wp:autoload>
  </wp:option>`;
  
  // Ajouter des déclarations explicites de post type
  postTypeXML += `
  <!-- Déclaration explicite des post types -->
  <wp:post_type>
    <wp:post_type_id>artiste</wp:post_type_id>
    <wp:post_type_name><![CDATA[artiste]]></wp:post_type_name>
    <wp:post_type_label><![CDATA[Artistes]]></wp:post_type_label>
    <wp:post_type_singular_label><![CDATA[Artiste]]></wp:post_type_singular_label>
  </wp:post_type>
  <wp:post_type>
    <wp:post_type_id>media</wp:post_type_id>
    <wp:post_type_name><![CDATA[media]]></wp:post_type_name>
    <wp:post_type_label><![CDATA[Médias]]></wp:post_type_label>
    <wp:post_type_singular_label><![CDATA[Média]]></wp:post_type_singular_label>
  </wp:post_type>`;
  
  return postTypeXML;
};

// Générer les champs personnalisés ACF
export const generateACFFieldsXML = (): string => {
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
