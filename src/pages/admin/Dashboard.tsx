
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileVideo, Grid } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import AdminLayout from '@/components/layout/AdminLayout';

const Dashboard = () => {
  const [stats, setStats] = useState({
    artistCount: 0,
    categoryCount: 0,
    mediaCount: 0,
    featuredMediaCount: 0,
    categoriesData: [] as { name: string; value: number; color: string }[],
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A259FF', '#4BC0C0', '#FF6384'];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Nombre d'artistes
        const { count: artistCount } = await supabase
          .from('artists')
          .select('*', { count: 'exact', head: true });

        // Nombre de catégories
        const { count: categoryCount } = await supabase
          .from('categories')
          .select('*', { count: 'exact', head: true });

        // Nombre de médias
        const { count: mediaCount } = await supabase
          .from('media_contents')
          .select('*', { count: 'exact', head: true });

        // Nombre de médias en vedette
        const { count: featuredMediaCount } = await supabase
          .from('media_contents')
          .select('*', { count: 'exact', head: true })
          .eq('featured', true);

        // Médias par catégorie pour le graphique
        const { data: categoriesWithCount } = await supabase
          .from('categories')
          .select(`
            id,
            name,
            media_contents:media_contents(count)
          `);

        const categoriesData = categoriesWithCount?.map((category, index) => ({
          name: category.name,
          value: (category.media_contents as any)?.length || 0,
          color: COLORS[index % COLORS.length],
        })) || [];

        setStats({
          artistCount: artistCount || 0,
          categoryCount: categoryCount || 0,
          mediaCount: mediaCount || 0,
          featuredMediaCount: featuredMediaCount || 0,
          categoriesData: categoriesData.filter(c => c.value > 0),
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">Vue d'ensemble de votre plateforme BkoTube</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Artistes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.artistCount}</div>
              <p className="text-xs text-muted-foreground">
                Artistes enregistrés sur la plateforme
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Catégories</CardTitle>
              <Grid className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.categoryCount}</div>
              <p className="text-xs text-muted-foreground">
                Catégories de contenu disponibles
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Médias totaux</CardTitle>
              <FileVideo className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.mediaCount}</div>
              <p className="text-xs text-muted-foreground">
                Contenus médias sur la plateforme
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Médias en vedette</CardTitle>
              <FileVideo className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.featuredMediaCount}</div>
              <p className="text-xs text-muted-foreground">
                Médias mis en avant sur le site
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Répartition des médias par catégorie</CardTitle>
              <CardDescription>Distribution des contenus par type</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {stats.categoriesData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.categoriesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stats.categoriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-muted-foreground">Aucune donnée disponible</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>Les dernières modifications sur la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nouveau contenu ajouté</p>
                    <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Artiste mis à jour</p>
                    <p className="text-xs text-muted-foreground">Il y a 1 jour</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nouvelle catégorie créée</p>
                    <p className="text-xs text-muted-foreground">Il y a 3 jours</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Utilisateur enregistré</p>
                    <p className="text-xs text-muted-foreground">Il y a 1 semaine</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
