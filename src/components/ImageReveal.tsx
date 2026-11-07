"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

type ImageRevealProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Image with a masked clip-path reveal and a gentle scale settle.
 */
export default function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  sizes,
  priority = false,
}: ImageRevealProps) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="relative h-full w-full"
        initial={
          reduce
            ? { clipPath: "inset(0% 0 0% 0)", scale: 1 }
            : { clipPath: "inset(16% 0 16% 0)", scale: 1.12 }
        }
        whileInView={{ clipPath: "inset(0% 0 0% 0)", scale: 1 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 1.3, ease: EASE }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
        />
      </motion.div>
    </div>
  );
}
