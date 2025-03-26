
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading = ({
  title,
  subtitle,
  badge,
  centered = false,
  className,
}: SectionHeadingProps) => {
  return (
    <div className={cn(
      "space-y-3 max-w-3xl",
      centered && "text-center mx-auto",
      className
    )}>
      {badge && (
        <div className="inline-block animate-fade-in">
          <span className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-xs font-medium">
            {badge}
          </span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight animated-element">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-3xl animated-element">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
