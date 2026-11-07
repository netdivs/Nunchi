import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ServiceCategory } from "@/lib/services";

type ServiceCardProps = {
  category: ServiceCategory;
  aspect?: string;
  showDescription?: boolean;
  className?: string;
};

export default function ServiceCard({
  category,
  aspect = "aspect-[4/5]",
  showDescription = false,
  className,
}: ServiceCardProps) {
  return (
    <Link
      href="/services"
      className={cn(
        "group relative block overflow-hidden bg-ink",
        aspect,
        className
      )}
      aria-label={`Explore ${category.title} services`}
    >
      <Image
        src={category.image}
        alt={category.alt}
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/5 transition-opacity duration-700 group-hover:opacity-95"
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-7 md:p-9">
        <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-champagne">
          {category.tagline}
        </span>
        <h3 className="mt-2 font-serif text-3xl font-medium text-ivory md:text-4xl">
          {category.title}
        </h3>

        {showDescription && (
          <p className="mt-3 max-w-md text-[13px] leading-relaxed text-ivory/75">
            {category.description}
          </p>
        )}

        <span className="mt-5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-ivory/90 transition-colors duration-500 group-hover:text-champagne">
          Explore
          <span
            className="inline-block transition-transform duration-500 group-hover:translate-x-1.5"
            aria-hidden="true"
          >
            &rarr;
          </span>
          <span
            aria-hidden="true"
            className="h-px w-8 bg-champagne/60 transition-all duration-500 group-hover:w-12"
          />
        </span>
      </div>
    </Link>
  );
}
