
import { Category } from '@/types/supabase-custom';
import { generateSlug } from './helpers';

// Générer le XML pour une catégorie
export const generateCategoryXML = (category: Category): string => {
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
