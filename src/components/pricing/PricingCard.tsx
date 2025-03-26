
import { Check, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface PricingFeature {
  text: string;
  included: boolean;
  tooltip?: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
  delay?: number;
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  popular = false,
  buttonText = "Commencer",
  buttonLink = "/contact",
  className,
  delay = 0
}: PricingCardProps) => {
  return (
    <div
      className={cn(
        "glass-card flex flex-col border border-border p-6 relative animated-element",
        popular && "border-brand-500/50 shadow-lg shadow-brand-500/10",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs font-medium py-1 px-3 rounded-full">
          Populaire
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-3xl font-bold">{price}</span>
          {price !== 'Sur mesure' && <span className="text-muted-foreground">/mois</span>}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <div className="mt-0.5">
              <Check 
                className={cn(
                  "h-4 w-4",
                  feature.included ? "text-brand-600" : "text-muted-foreground opacity-40"
                )} 
              />
            </div>
            <span className={cn(!feature.included && "text-muted-foreground opacity-60")}>
              {feature.text}
              {feature.tooltip && (
                <Tooltip>
                  <TooltipTrigger className="inline-flex">
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground ml-1 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[250px] p-3">
                    <p className="text-xs">{feature.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </span>
          </li>
        ))}
      </ul>
      
      <Button 
        asChild
        className={cn("mt-auto", popular && "bg-brand-600 hover:bg-brand-700")}
        variant={popular ? "default" : "outline"}
      >
        <Link to={buttonLink}>
          {buttonText}
        </Link>
      </Button>
    </div>
  );
};

export default PricingCard;
