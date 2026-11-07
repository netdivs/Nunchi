import { cn } from "@/lib/cn";

type StarsProps = {
  rating: number;
  size?: number;
  className?: string;
  label?: string;
};

const STAR_PATH =
  "M12 2.6l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.4l-5.8 3.06 1.11-6.46-4.7-4.58 6.49-.94L12 2.6Z";

/**
 * Accessible star rating with precise fractional fills.
 */
export default function Stars({
  rating,
  size = 16,
  className,
  label,
}: StarsProps) {
  const safeRating = Math.max(0, Math.min(5, rating));

  return (
    <span
      className={cn("nc-stars", className)}
      role="img"
      aria-label={label ?? `${safeRating.toFixed(1)} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.max(0, Math.min(1, safeRating - index));

        return (
          <span
            key={index}
            className="nc-star"
            style={{ width: size, height: size }}
            aria-hidden="true"
          >
            <svg
              className="nc-star-base"
              viewBox="0 0 24 24"
              width={size}
              height={size}
            >
              <path d={STAR_PATH} fill="currentColor" />
            </svg>
            <span
              className="nc-star-fill"
              style={{ width: `${fill * 100}%` }}
            >
              <svg viewBox="0 0 24 24" width={size} height={size}>
                <path d={STAR_PATH} fill="currentColor" />
              </svg>
            </span>
          </span>
        );
      })}
    </span>
  );
}
