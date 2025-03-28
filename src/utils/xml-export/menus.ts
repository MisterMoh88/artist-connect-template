
import { generateSlug } from './helpers';

// Générer les menus de navigation
export const generateNavigationMenusXML = (): string => {
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
