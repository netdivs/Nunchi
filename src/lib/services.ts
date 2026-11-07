export type Service = {
  name: string;
  price: string;
};

export type ServiceCategory = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  alt: string;
  services: Service[];
};

export const SERVICES: ServiceCategory[] = [
  {
    id: "hair",
    title: "Hair",
    tagline: "Cut, colour & care",
    description:
      "Precision cutting, luminous colour and restorative treatments, tailored to your features and the way you live.",
    image: "/images/styling.jpg",
    alt: "Hair stylist blow-drying a client's hair at Nunchi Salon",
    services: [
      { name: "Signature Cut & Style", price: "RS 2,500" },
      { name: "Blow-Dry & Finish", price: "RS 1,500" },
      { name: "Luxury Colour & Gloss", price: "RS 6,000" },
      { name: "Balayage & Highlights", price: "RS 9,000" },
      { name: "Keratin Smoothing", price: "RS 15,000" },
      { name: "Hair Spa & Repair Ritual", price: "RS 3,500" },
    ],
  },
  {
    id: "makeup",
    title: "Makeup",
    tagline: "Skin-first artistry",
    description:
      "From a soft everyday glow to full-glam editorial looks, every application is built to feel weightless and photograph beautifully.",
    image: "/images/bridal/golden-walima.jpg",
    alt: "Golden bridal makeup look created at Nunchi Salon by Naheed",
    services: [
      { name: "Everyday Glow", price: "RS 3,000" },
      { name: "Soft Glam", price: "RS 4,500" },
      { name: "Full Glam & Event", price: "RS 7,000" },
      { name: "Makeup Lesson", price: "RS 8,000" },
      { name: "Lashes (Strip / Volume)", price: "RS 1,500" },
    ],
  },
  {
    id: "skin",
    title: "Facial & Skin",
    tagline: "Restore & refine",
    description:
      "Deep-cleansing facials and skin rituals that leave your complexion calm, luminous and visibly renewed.",
    image: "/images/skincare.jpg",
    alt: "Facial treatment at Nunchi Salon spa studio",
    services: [
      { name: "Signature Facial", price: "RS 4,000" },
      { name: "Deep Cleanse & Polish", price: "RS 5,000" },
      { name: "Hydra-Glow Facial", price: "RS 6,500" },
      { name: "Anti-Ageing Ritual", price: "RS 7,500" },
      { name: "Eye & Lip Treatment", price: "RS 2,000" },
    ],
  },
  {
    id: "nails",
    title: "Nails",
    tagline: "Finishing details",
    description:
      "Immaculate manicures, gel colour and nail artistry — meticulous detail that completes every look.",
    image: "/images/nails.jpg",
    alt: "Elegant gel manicure being finished at Nunchi Salon",
    services: [
      { name: "Classic Manicure", price: "RS 1,500" },
      { name: "Gel & Sculpted Nails", price: "RS 3,500" },
      { name: "Luxury Pedicure", price: "RS 2,500" },
      { name: "Nail Art & Design", price: "from RS 500" },
      { name: "Paraffin Hand Ritual", price: "RS 2,000" },
    ],
  },
  {
    id: "bridal",
    title: "Bridal",
    tagline: "Your most important day",
    description:
      "A complete bridal journey — consultation, trials and a calm, unhurried preparation on your big day.",
    image: "/images/bridal/bridal-classic.jpg",
    alt: "Bridal hair and makeup by Nunchi Salon by Naheed",
    services: [
      { name: "Bridal Consultation", price: "Complimentary" },
      { name: "Bridal Hair & Makeup", price: "by quotation" },
      { name: "Bridal Trial Session", price: "RS 8,000" },
      { name: "Engagement & Mehndi Looks", price: "RS 12,000" },
      { name: "Family & Dholki Makeup", price: "RS 5,000" },
    ],
  },
  {
    id: "beauty",
    title: "Beauty & Body",
    tagline: "Little luxuries",
    description:
      "Brow sculpture, lash care and full-body treatments — small rituals with a generous sense of calm.",
    image: "/images/spa.jpg",
    alt: "Candles and towels prepared for a spa treatment at Nunchi Salon",
    services: [
      { name: "Brow Sculpture & Tint", price: "RS 1,200" },
      { name: "Lash Lift & Tint", price: "RS 3,000" },
      { name: "Threading & Waxing", price: "from RS 300" },
      { name: "Body Polish & Scrub", price: "RS 4,500" },
      { name: "Relaxing Body Massage", price: "RS 5,000" },
    ],
  },
];
