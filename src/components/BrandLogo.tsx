import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export default function BrandLogo({
  className,
  onClick,
  compact = false,
}: {
  className?: string;
  onClick?: () => void;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("nc-brand", compact && "nc-brand--compact", className)}
      aria-label="Nunchi Salon by Naheed — home"
    >
      <Image
        src="/images/brand/nunchi-logo.png"
        alt=""
        width={800}
        height={785}
        priority={!compact}
        className="nc-brand-logo"
      />
    </Link>
  );
}
