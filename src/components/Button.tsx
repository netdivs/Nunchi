import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "solid" | "outline" | "light" | "ghost";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  external?: boolean;
};

export default function Button({
  children,
  href,
  variant = "solid",
  className,
  type = "button",
  onClick,
  external,
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-3 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] transition-all duration-500";

  const variants: Record<string, string> = {
    solid:
      "bg-ink text-ivory hover:bg-cocoa hover:shadow-[0_16px_40px_-16px_rgba(33,27,19,0.55)]",
    outline:
      "border border-ink/25 text-ink hover:border-gold hover:text-gold hover:shadow-[0_16px_40px_-20px_rgba(174,138,79,0.7)]",
    light:
      "bg-ivory text-ink hover:bg-white hover:shadow-[0_16px_44px_-18px_rgba(33,27,19,0.5)]",
    ghost: "text-ink hover:text-gold",
  };

  const classes = cn(base, variants[variant], className);

  const arrow = (
    <svg
      className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M2 12h19M14 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
          {arrow}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
        {arrow}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
      {arrow}
    </button>
  );
}
