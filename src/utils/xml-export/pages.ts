
// Générer les pages statiques
export const generateStaticPagesXML = (): string => {
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
