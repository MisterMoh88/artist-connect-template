
// Générer les options du site
export const generateSiteOptionsXML = (): string => {
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
export const generateThemeSettingsXML = (): string => {
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
export const generateActivePluginsXML = (): string => {
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
