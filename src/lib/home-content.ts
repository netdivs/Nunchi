export const HERO_SLIDES = [
  {
    subtitle: "Lahore's Beauty & Bridal Salon",
    title: "Feel Beautiful, Every",
    accent: "Day",
    text: "Hair, bridal makeup, skin and nails at our Wapda Town, Lahore salon.",
    image: "/images/original/hero-main.jpg",
    alt: "Bridal styling by Nunchi Salon by Naheed in Wapda Town, Lahore",
    watermarkTop: "Nunchi",
    watermarkBottom: "Salon",
  },
  {
    subtitle: "Signature Kaya Looks",
    title: "soft glam that",
    accent: "lasts",
    text: "Signature Kaya bridal artistry — styled with care at Nunchi Salon.",
    image: "/images/original/hero-kaya.jpg",
    alt: "Kaya bridal makeup look by Nunchi Salon by Naheed in Lahore",
    watermarkTop: "Nunchi",
    watermarkBottom: "Salon",
  },
  {
    subtitle: "Bridal Beauty in Lahore",
    title: "your golden walima",
    accent: "moment",
    text: "Bridal hair and makeup for mehndi, barat and walima — styled in Wapda Town.",
    image: "/images/original/hero-golden.jpg",
    alt: "Golden walima bridal hair and makeup at Nunchi Salon in Lahore",
    watermarkTop: "Hair",
    watermarkBottom: "Salon",
  },
] as const;

export const HOME_SERVICES = [
  {
    number: "01",
    title: "Bridal",
    text: "A complete bridal journey — consultation, trial and a calm, unhurried preparation on your most important day.",
    icon: "/images/ref/service_3_1.svg",
  },
  {
    number: "02",
    title: "Microblading",
    text: "Feather-light brow artistry that shapes and defines your features with a natural, lasting finish.",
    icon: "/images/ref/service_3_2.svg",
  },
  {
    number: "03",
    title: "Makeup",
    text: "From a soft everyday glow to full-glam party and event looks — built to feel weightless and photograph beautifully.",
    icon: "/images/ref/service_3_3.svg",
  },
  {
    number: "04",
    title: "Hair",
    text: "Precision cuts, luminous colour, keratin and restorative treatments, tailored to the way you live.",
    icon: "/images/ref/service_3_4.svg",
  },
  {
    number: "05",
    title: "Skin care",
    text: "Deep-cleansing facials, hydra-glow rituals and anti-ageing care that leave your skin calm and luminous.",
    icon: "/images/ref/service_3_5.svg",
  },
  {
    number: "06",
    title: "Nails",
    text: "Immaculate manicures, gel colour and hand-painted nail artistry — meticulous detail that completes the look.",
    icon: "/images/ref/service_3_6.svg",
  },
] as const;

// Real Google reviews from Nunchi Salon clients (kept in sync with
// src/lib/google-reviews-fallback.ts). Avatars are rendered as initials —
// no stock photos.
export const TESTIMONIALS = [
  {
    name: "Ash Bhatti",
    role: "Google review",
    text: "Saba did an exceptional job with my hair cut! She listened attentively to what I wanted and delivered outstanding results. Her quick service and expertise truly transformed my look, making me feel like a new person. Highly recommend!",
  },
  {
    name: "Sundas Tariq",
    role: "Google review",
    text: "I'm absolutely satisfied with my hair colour — it turned out exactly the way I wanted, rich and vibrant. The mani-pedi service was also so relaxing and professionally done. The staff was kind, attentive, and really made me feel pampered.",
  },
  {
    name: "Iqra Shahid",
    role: "Google review",
    text: "I had a wonderful experience with their professional makeup and hair cutting services. Miss Tahmeem, you did a great job. The staff was skilled, attentive, and made sure everything was done to perfection. I will definitely visit again soon.",
  },
] as const;
