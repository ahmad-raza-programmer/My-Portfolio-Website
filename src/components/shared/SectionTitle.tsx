import { cn } from "@/src/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
}

export function SectionTitle({ title, subtitle, className, titleClassName }: SectionTitleProps) {
  return (
    <div className={cn("text-center mb-16", className)}>
      <h2 className={cn("text-3xl md:text-4xl font-bold text-text-primary mb-4 relative inline-flex flex-col items-center", titleClassName)}>
        {title}
        <div className="flex items-center gap-2 mt-3">
          <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-accent-primary rounded-full" />
          <div className="w-2 h-2 rounded-full bg-accent-primary shadow-[0_0_10px_rgba(0,210,255,0.8)]" />
          <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-accent-primary rounded-full" />
        </div>
      </h2>
      {subtitle && <p className="text-text-secondary mt-4">{subtitle}</p>}
    </div>
  );
}
