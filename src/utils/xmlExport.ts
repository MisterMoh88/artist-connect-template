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
  // Créer une description par défaut si elle n'existe pas
  const categoryDescription = category.slug || '';
  const nicename = generateSlug(category.name);

  return `
  <wp:term>
    <wp:term_id>${category.id}</wp:term_id>
    <wp:term_taxonomy>category</wp:term_taxonomy>
    <wp:term_slug><![CDATA[${nicename}]]></wp:term_slug>
    <wp:term_parent></wp:term_parent>
    <wp:term_name><![CDATA[${category.name}]]></wp:term_name>
    <wp:term_description><![CDATA[${categoryDescription}]]></wp:term_description>
  </wp:term>`;
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
  <wp:author>
    <wp:author_id>1</wp:author_id>
    <wp:author_login><![CDATA[admin]]></wp:author_login>
    <wp:author_email><![CDATA[admin@bkotube.com]]></wp:author_email>
    <wp:author_display_name><![CDATA[Administrateur]]></wp:author_display_name>
    <wp:author_first_name><![CDATA[Admin]]></wp:author_first_name>
    <wp:author_last_name><![CDATA[BkoTube]]></wp:author_last_name>
  </wp:author>
`;

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
