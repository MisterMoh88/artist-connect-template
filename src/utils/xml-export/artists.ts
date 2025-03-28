
import { Artist } from '@/types/supabase-custom';
import { generateSlug } from './helpers';

// Générer le XML pour un artiste
export const generateArtistXML = (artist: Artist, index: number): string => {
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
