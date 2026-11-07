"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

type AnimatedTextProps = {
  text: string;
  as?: keyof typeof tags;
  className?: string;
  italicWords?: number[];
  delay?: number;
  stagger?: number;
};

const tags = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  p: "p",
} as const;

/**
 * Staggered, masked word reveal for editorial headlines.
 */
export default function AnimatedText({
  text,
  as = "h2",
  className,
  italicWords = [],
  delay = 0,
  stagger = 0.055,
}: AnimatedTextProps) {
  const reduce = useReducedMotion();
  const Tag = tags[as];
  const words = text.split(" ");

  return (
    <Tag className={cn("text-balance", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.08em] align-bottom -mb-[0.08em]"
        >
          <motion.span
            className={cn(
              "inline-block will-change-transform",
              italicWords.includes(i) && "italic text-champagne"
            )}
            initial={reduce ? { y: 0 } : { y: "115%" }}
            whileInView={reduce ? { y: 0 } : { y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{
              duration: 0.85,
              ease: EASE,
              delay: delay + i * stagger,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
