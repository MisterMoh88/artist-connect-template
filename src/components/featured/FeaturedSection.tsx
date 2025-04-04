
import { useQuery } from '@tanstack/react-query';
import FeaturedMediaContent from './FeaturedMediaContent';
import { getFeaturedItems } from '@/services/featuredItemsService';
import SectionHeading from '@/components/ui/section-heading';

interface FeaturedSectionProps {
  title: string;
  subtitle: string;
}

const FeaturedSection = ({ title, subtitle }: FeaturedSectionProps) => {
  const { data: featuredItems = [], isLoading } = useQuery({
    queryKey: ['featuredItems'],
    queryFn: getFeaturedItems,
  });

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <SectionHeading
          title={title}
          description={subtitle}
          className="text-center mb-12"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div 
                key={index} 
                className="bg-muted rounded-xl overflow-hidden animate-pulse"
              >
                <div className="aspect-square w-full bg-muted-foreground/10"></div>
                <div className="p-4 space-y-2">
                  <div className="h-5 bg-muted-foreground/10 rounded w-3/4"></div>
                  <div className="h-4 bg-muted-foreground/10 rounded w-1/2"></div>
                </div>
              </div>
            ))
          ) : featuredItems.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Aucun contenu en vedette pour le moment.</p>
            </div>
          ) : (
            featuredItems.map((item) => (
              <FeaturedMediaContent 
                key={item.id}
                item={item}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
