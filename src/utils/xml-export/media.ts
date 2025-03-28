
import { MediaContent } from '@/types/supabase-custom';
import { escapeXML, generateSlug } from './helpers';

// Générer le XML pour un média
export const generateMediaXML = (media: MediaContent, artistName: string = '', categoryName: string = '', index: number): string => {
  const pubDate = new Date(media.created_at).toUTCString();
  const postName = generateSlug(media.title);
  
  return `
  <item>
    <title><![CDATA[${escapeXML(media.title)}]]></title>
    <link>https://bkotube.com/media/${postName}</link>
    <pubDate>${pubDate}</pubDate>
    <dc:creator><![CDATA[admin]]></dc:creator>
    <guid isPermaLink="false">https://bkotube.com/media/${postName}</guid>
    <description></description>
    <content:encoded><![CDATA[${escapeXML(media.description || '')}]]></content:encoded>
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
      <wp:meta_value><![CDATA[${escapeXML(artistName)}]]></wp:meta_value>
    </wp:postmeta>
    <wp:postmeta>
      <wp:meta_key><![CDATA[_category]]></wp:meta_key>
      <wp:meta_value><![CDATA[${escapeXML(categoryName)}]]></wp:meta_value>
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
