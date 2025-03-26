
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
  delay?: number;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className,
  iconClassName,
  delay = 0
}: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card p-6 group animated-element",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={cn(
        "inline-flex items-center justify-center p-3 rounded-lg bg-brand-100 text-brand-600 mb-4 transition-transform duration-300 group-hover:scale-110",
        iconClassName
      )}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
