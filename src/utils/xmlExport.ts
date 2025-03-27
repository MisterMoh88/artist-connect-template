
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

// Générer le XML pour un artiste
const generateArtistXML = (artist: Artist): string => {
  return `
  <item>
    <title>${escapeXML(artist.name)}</title>
    <wp:post_type>artiste</wp:post_type>
    <content:encoded><![CDATA[${artist.bio || ''}]]></content:encoded>
    <wp:postmeta>
      <wp:meta_key>_photo</wp:meta_key>
      <wp:meta_value>${escapeXML(artist.avatar_url)}</wp:meta_value>
    </wp:postmeta>
    <wp:postmeta>
      <wp:meta_key>_social_media</wp:meta_key>
      <wp:meta_value>${escapeXML(artist.social_links ? JSON.stringify(artist.social_links) : '')}</wp:meta_value>
    </wp:postmeta>
  </item>`;
};

// Générer le XML pour un média
const generateMediaXML = (media: MediaContent, artistName?: string, categoryName?: string): string => {
  return `
  <item>
    <title>${escapeXML(media.title)}</title>
    <wp:post_type>media</wp:post_type>
    <content:encoded><![CDATA[${media.description || ''}]]></content:encoded>
    <wp:postmeta>
      <wp:meta_key>_cover_image</wp:meta_key>
      <wp:meta_value>${escapeXML(media.thumbnail_url)}</wp:meta_value>
    </wp:postmeta>
    <wp:postmeta>
      <wp:meta_key>_artist</wp:meta_key>
      <wp:meta_value>${escapeXML(artistName || '')}</wp:meta_value>
    </wp:postmeta>
    <wp:postmeta>
      <wp:meta_key>_category</wp:meta_key>
      <wp:meta_value>${escapeXML(categoryName || '')}</wp:meta_value>
    </wp:postmeta>
    <wp:postmeta>
      <wp:meta_key>_media_url</wp:meta_key>
      <wp:meta_value>${escapeXML(media.media_url)}</wp:meta_value>
    </wp:postmeta>
    <wp:postmeta>
      <wp:meta_key>_featured</wp:meta_key>
      <wp:meta_value>${media.is_featured ? '1' : '0'}</wp:meta_value>
    </wp:postmeta>
  </item>`;
};

// Générer le XML pour une catégorie
const generateCategoryXML = (category: Category): string => {
  return `
  <wp:category>
    <wp:term_id>${category.id}</wp:term_id>
    <wp:category_nicename>${escapeXML(category.slug)}</wp:category_nicename>
    <wp:cat_name>${escapeXML(category.name)}</wp:cat_name>
    <wp:category_description>${escapeXML(category.description)}</wp:category_description>
  </wp:category>`;
};

// Fonction principale d'exportation
export const generateXMLExport = (
  artists: Artist[],
  mediaContents: MediaContent[],
  categories: Category[]
): string => {
  const date = new Date().toISOString();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/">
<channel>
  <title>BkoTube Export</title>
  <description>Content export from BkoTube platform</description>
  <pubDate>${date}</pubDate>
  <generator>BkoTube XML Exporter</generator>
`;

  // Ajouter les catégories
  categories.forEach(category => {
    xml += generateCategoryXML(category);
  });

  // Ajouter les artistes
  artists.forEach(artist => {
    xml += generateArtistXML(artist);
  });

  // Ajouter les médias
  mediaContents.forEach(media => {
    // Trouver le nom de l'artiste associé
    const artist = artists.find(a => a.id === media.artist_id);
    const category = categories.find(c => c.id === media.category_id);
    
    xml += generateMediaXML(media, artist?.name, category?.name);
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
