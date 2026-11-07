export const GALLERY_CATEGORIES = [
  "All",
  "Bridal",
  "Hair",
  "Makeup",
  "Skin",
  "Nails",
  "Salon",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  category: Exclude<GalleryCategory, "All">;
  aspect: string;
};

/**
 * Curated gallery images. Bridal photographs live in /images/gallery so they
 * can be swapped or extended without touching the home page gallery.
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: "/images/gallery/barat-red-01.jpg",
    alt: "Nunchi bride in a classic red barat outfit with HD bridal makeup",
    caption: "Barat — classic red",
    category: "Bridal",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/golden-walima-01.jpg",
    alt: "Golden walima bridal makeup and hair by Nunchi Salon by Naheed",
    caption: "Walima — golden hour",
    category: "Bridal",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/barat-red-02.jpg",
    alt: "Heirloom red barat bride with jewelled bridal styling in Lahore",
    caption: "Barat — heirloom red",
    category: "Bridal",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/walima-soft-01.jpg",
    alt: "Soft glam walima bride with luminous makeup by Nunchi Salon",
    caption: "Walima — soft glam",
    category: "Bridal",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/mehndi-gareen-01.jpg",
    alt: "Mehndi bride with fresh floral styling and glowing makeup",
    caption: "Mehndi — garden glow",
    category: "Bridal",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/golden-walima-02.jpg",
    alt: "Golden walima bridal portrait with a warm, luminous finish",
    caption: "Walima — golden detail",
    category: "Bridal",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/bridal-classic-01.jpg",
    alt: "Signature bridal hair and makeup by Nunchi Salon by Naheed",
    caption: "Signature bridal",
    category: "Bridal",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/mehndi-gareen-02.jpg",
    alt: "Mehndi bride portrait with fresh florals and radiant skin",
    caption: "Mehndi — fresh florals",
    category: "Bridal",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/walima-soft-02.jpg",
    alt: "Elegant walima bride with soft, sculpted bridal makeup",
    caption: "Walima — quiet elegance",
    category: "Bridal",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/bridal-classic-02.jpg",
    alt: "Timeless bridal portrait styled at Nunchi Salon in Wapda Town",
    caption: "Bridal portrait",
    category: "Bridal",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/barat-kaya-01.jpg",
    alt: "Kaya in a barat bridal look by Nunchi Salon by Naheed",
    caption: "Barat — Kaya",
    category: "Bridal",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/walima-kaya-01.jpg",
    alt: "Kaya in a walima bridal look by Nunchi Salon by Naheed",
    caption: "Walima — Kaya",
    category: "Bridal",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/kaya-bridal.jpg",
    alt: "Signature Kaya bridal portrait from Nunchi Salon by Naheed",
    caption: "Kaya — signature look",
    category: "Bridal",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/studio.jpg",
    alt: "Editorial beauty portrait from Nunchi Salon by Naheed",
    caption: "Editorial portrait",
    category: "Bridal",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/bridal/bride1.jpg",
    alt: "Nunchi Salon bride in soft, timeless bridal makeup",
    caption: "Soft bridal",
    category: "Bridal",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/bridal/mehndi-glow.jpg",
    alt: "Mehndi bridal makeup with a fresh, luminous finish",
    caption: "Mehndi glow",
    category: "Bridal",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/styling.jpg",
    alt: "Hair stylist blow-drying and styling a client's hair at Nunchi Salon",
    caption: "Salon blow-dry finish",
    category: "Hair",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/hairwash.jpg",
    alt: "Restorative hair wash and treatment at Nunchi Salon",
    caption: "Restorative hair ritual",
    category: "Hair",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/images/brushes.jpg",
    alt: "Professional salon brushes and tools at Nunchi Salon",
    caption: "Tools of the craft",
    category: "Hair",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/makeup.jpg",
    alt: "Makeup artistry station with premium cosmetics at Nunchi Salon",
    caption: "Makeup artistry",
    category: "Makeup",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/makeupclose.jpg",
    alt: "Close-up of a soft glam makeup finish by Nunchi Salon",
    caption: "Soft glam finish",
    category: "Makeup",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/cosmetics.jpg",
    alt: "Curated premium cosmetics used at Nunchi Salon by Naheed",
    caption: "The beauty edit",
    category: "Makeup",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/skincare.jpg",
    alt: "Facial and skin care treatment at Nunchi Salon in Wapda Town",
    caption: "Facial ritual",
    category: "Skin",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/spa.jpg",
    alt: "Candles, towels and calm spa details at Nunchi Salon",
    caption: "Calm at the studio",
    category: "Skin",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/nails.jpg",
    alt: "Elegant gel manicure finished at Nunchi Salon",
    caption: "Gel manicure",
    category: "Nails",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/images/nails2.jpg",
    alt: "Nail art and colour details at Nunchi Salon by Naheed",
    caption: "Nail couture",
    category: "Nails",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/images/salon-1.jpg",
    alt: "Interior of Nunchi Salon by Naheed in Wapda Town, Lahore",
    caption: "The Wapda Town studio",
    category: "Salon",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/salon-2.jpg",
    alt: "Styling stations inside Nunchi Salon by Naheed",
    caption: "Styling stations",
    category: "Salon",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/salon3.jpg",
    alt: "Nunchi Salon beauty studio interior in Lahore",
    caption: "Inside Nunchi",
    category: "Salon",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/portrait.jpg",
    alt: "Client portrait after a Nunchi Salon beauty treatment",
    caption: "The Nunchi glow",
    category: "Salon",
    aspect: "aspect-[4/3]",
  },
];

export const GALLERY_BRIDAL = GALLERY_ITEMS.filter(
  (item) => item.category === "Bridal"
).slice(0, 9);
