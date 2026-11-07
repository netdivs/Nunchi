const ITEMS = [
  "Hair",
  "Makeup",
  "Skin",
  "Nails",
  "Bridal",
  "Beauty",
];

export default function Marquee() {
  const row = (
    <>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center gap-10 pr-10">
          <span
            className="whitespace-nowrap font-serif text-5xl font-medium italic tracking-tight text-transparent md:text-7xl"
            style={{ WebkitTextStroke: "1px rgba(174,138,79,0.35)" }}
          >
            {item}
          </span>
          <svg
            className="h-3 w-3 shrink-0 text-gold/70"
            viewBox="0 0 12 12"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6 0l1.6 4.4L12 6 7.6 7.6 6 12 4.4 7.6 0 6l4.4-1.6z" />
          </svg>
        </span>
      ))}
    </>
  );

  return (
    <section
      className="overflow-hidden border-y border-linen/70 bg-cream/60 py-10 md:py-14"
      aria-label="Our services"
    >
      <div className="flex w-max animate-marquee">
        <div className="flex items-center">{row}</div>
        <div className="flex items-center" aria-hidden="true">
          {row}
        </div>
      </div>
    </section>
  );
}
