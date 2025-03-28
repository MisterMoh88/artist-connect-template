
import { escapeXML } from './helpers';

// Générer les widgets
export const generateWidgetsXML = (): string => {
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
