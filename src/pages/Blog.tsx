
import { useState } from 'react';
import { Calendar, Tag, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeading from '@/components/ui/section-heading';

// Exemple d'articles de blog
const blogPosts = [
  {
    id: 1,
    title: "Comment optimiser votre présence sur TikTok en 2023",
    excerpt: "Découvrez les meilleures stratégies pour développer votre audience sur TikTok et maximiser l'engagement de vos fans.",
    image: "/images/blog-tiktok.jpg",
    date: "15 juin 2023",
    tags: ["Réseaux sociaux", "TikTok", "Stratégie"],
    slug: "optimiser-presence-tiktok-2023"
  },
  {
    id: 2,
    title: "5 façons de monétiser votre musique en dehors du streaming",
    excerpt: "Le streaming n'est qu'une partie de l'équation. Explorez d'autres sources de revenus pour soutenir votre carrière musicale.",
    image: "/images/blog-monetisation.jpg",
    date: "28 mai 2023",
    tags: ["Monétisation", "Business", "Revenus"],
    slug: "monetiser-musique-hors-streaming"
  },
  {
    id: 3,
    title: "L'importance d'une stratégie de contenu cohérente pour les artistes",
    excerpt: "Pourquoi une approche cohérente du contenu est essentielle pour renforcer votre image de marque et fidéliser votre public.",
    image: "/images/blog-content.jpg",
    date: "12 mai 2023",
    tags: ["Marketing", "Contenu", "Branding"],
    slug: "strategie-contenu-coherente-artistes"
  },
  {
    id: 4,
    title: "Comment préparer efficacement la sortie de votre prochain single",
    excerpt: "Guide étape par étape pour maximiser l'impact du lancement de votre prochain titre et atteindre un public plus large.",
    image: "/images/blog-release.jpg",
    date: "3 mai 2023",
    tags: ["Sortie", "Promotion", "Single"],
    slug: "preparer-sortie-single"
  },
  {
    id: 5,
    title: "Les tendances de l'industrie musicale à surveiller en 2023",
    excerpt: "Un aperçu des évolutions et innovations qui façonnent l'industrie musicale cette année et comment s'y adapter.",
    image: "/images/blog-trends.jpg",
    date: "22 avril 2023",
    tags: ["Tendances", "Industrie", "Innovation"],
    slug: "tendances-industrie-musicale-2023"
  },
  {
    id: 6,
    title: "Comment collaborer efficacement avec d'autres artistes à distance",
    excerpt: "Conseils pratiques pour mener à bien des collaborations musicales à distance et maximiser leur impact promotionnel.",
    image: "/images/blog-collab.jpg",
    date: "10 avril 2023",
    tags: ["Collaboration", "Production", "Networking"],
    slug: "collaborations-artistes-distance"
  }
];

// Liste des catégories
const categories = [
  "Tous les articles",
  "Marketing Digital",
  "Réseaux Sociaux",
  "Production",
  "Business",
  "Promotion",
  "Tendances"
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("Tous les articles");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filtre les articles en fonction de la catégorie et de la recherche
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "Tous les articles" || post.tags.some(tag => 
      tag.toLowerCase() === activeCategory.toLowerCase()
    );
    
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
  
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-brand-50/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block animate-fade-in">
              <span className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-xs font-medium">
                Blog & Actualités
              </span>
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight animated-element">
              Ressources et conseils pour artistes
            </h1>
            <p className="mt-4 text-xl text-muted-foreground animated-element">
              Découvrez nos articles, guides pratiques et actualités pour développer votre carrière musicale.
            </p>
          </div>
        </div>
      </section>
      
      {/* Blog Content */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4 space-y-8">
              {/* Search */}
              <div className="glass-card p-4">
                <h3 className="text-lg font-semibold mb-4">Rechercher</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Rechercher un article..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Categories */}
              <div className="glass-card p-4">
                <h3 className="text-lg font-semibold mb-4">Catégories</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          activeCategory === category
                            ? "bg-brand-100 text-brand-800 font-medium"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Popular Posts */}
              <div className="glass-card p-4">
                <h3 className="text-lg font-semibold mb-4">Articles populaires</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post, index) => (
                    <Link 
                      key={index} 
                      to={`/blog/${post.slug}`}
                      className="flex items-start gap-3 group"
                    >
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-brand-100">
                        {post.image && (
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium leading-tight group-hover:text-brand-600 transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {post.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:w-3/4">
              <SectionHeading 
                title={activeCategory}
                subtitle={activeCategory === "Tous les articles" 
                  ? "Découvrez tous nos articles et actualités" 
                  : `Articles liés à la catégorie ${activeCategory}`
                }
              />
              
              {/* Blog Grid */}
              <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, index) => (
                    <article 
                      key={post.id} 
                      className="glass-card overflow-hidden group animated-element"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        {post.image ? (
                          <img 
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-brand-100 flex items-center justify-center">
                            <span className="text-brand-600">Image non disponible</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Tag className="mr-1 h-3 w-3" />
                            <span>{post.tags[0]}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2 transition-colors group-hover:text-brand-600">
                          <Link to={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        
                        <p className="text-muted-foreground mb-4">
                          {post.excerpt}
                        </p>
                        
                        <Button variant="link" asChild className="p-0 group/btn">
                          <Link to={`/blog/${post.slug}`} className="flex items-center text-brand-600">
                            Lire l'article
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <h3 className="text-xl font-medium mb-2">Aucun article trouvé</h3>
                    <p className="text-muted-foreground mb-6">
                      Aucun article ne correspond à votre recherche ou au filtre sélectionné.
                    </p>
                    <Button onClick={() => {
                      setActiveCategory("Tous les articles");
                      setSearchQuery("");
                    }}>
                      Réinitialiser les filtres
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Pagination */}
              {filteredPosts.length > 0 && (
                <div className="mt-12 flex justify-center">
                  <div className="flex">
                    <Button variant="outline" size="sm" disabled className="rounded-r-none">
                      Précédent
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-none bg-brand-50">
                      1
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-none">
                      2
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-none">
                      3
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-l-none">
                      Suivant
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-brand-900 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <SectionHeading
              title="Restez informé"
              subtitle="Inscrivez-vous à notre newsletter pour recevoir nos derniers articles et actualités directement dans votre boîte mail."
              badge="Newsletter"
              centered
              className="text-white [&_p]:text-white/70"
            />
            
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Votre adresse email" 
                className="bg-brand-800/60 border-brand-700/40 text-white placeholder:text-white/50"
              />
              <Button className="bg-white text-brand-900 hover:bg-white/90">
                S'inscrire
              </Button>
            </div>
            
            <p className="mt-4 text-sm text-white/60">
              En vous inscrivant, vous acceptez de recevoir nos emails et confirmez avoir lu notre{" "}
              <Link to="/privacy" className="underline text-white/80 hover:text-white">
                politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
