import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ScrollTop from "@/components/ScrollTop";
import { SITE } from "@/lib/site";
import "./globals.css";
import "./nunchi.css";
import "./sections.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  style: ["normal", "italic"],
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_TITLE = "Nunchi Salon by Naheed — Beauty Salon in Lahore";
const SITE_DESCRIPTION =
  "Nunchi Salon by Naheed is a premium beauty salon in Wapda Town, Lahore for hair, bridal makeup, facials, nails and party styling. Open daily 11am–8pm. Book your appointment today.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE_TITLE,
    template: "%s — Nunchi Salon by Naheed",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE.name,
  keywords: [
    "Nunchi Salon by Naheed",
    "beauty salon in Lahore",
    "beauty salon in Wapda Town",
    "salon in Wapda Town Lahore",
    "bridal makeup in Lahore",
    "bridal makeup artist Lahore",
    "hair salon in Lahore",
    "party makeup Lahore",
    "facial in Lahore",
    "nail salon Lahore",
    "ladies salon Wapda Town",
    "premium salon Lahore",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE_TITLE,
    description:
      "A premium beauty salon in Wapda Town, Lahore for hair, bridal makeup, facials, nails and party styling. Where beauty meets elegance.",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      "A premium beauty salon in Wapda Town, Lahore for hair, bridal makeup, facials, nails and party styling.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  other: {
    "geo.region": "PK-PB",
    "geo.placename": "Lahore",
    "geo.position": `${SITE.geo.latitude};${SITE.geo.longitude}`,
    ICBM: `${SITE.geo.latitude}, ${SITE.geo.longitude}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": `${SITE.url}/#salon`,
  name: SITE.name,
  alternateName: SITE.shortName,
  slogan: SITE.tagline,
  foundingDate: "2023",
  founder: {
    "@type": "Person",
    name: "Naheed",
  },
  description:
    "Nunchi Salon by Naheed is a full-service beauty salon in Wapda Town, Lahore offering hair cutting and colour, bridal and party makeup, facials, skin care, nails and beauty treatments.",
  url: SITE.url,
  image: [
    `${SITE.url}/images/salon-1.jpg`,
    `${SITE.url}/images/bridal/bride1.jpg`,
    `${SITE.url}/images/bridal/kaya.jpg`,
  ],
  logo: `${SITE.url}/images/brand/nunchi-logo.png`,
  priceRange: "$$",
  telephone: SITE.phone,
  email: SITE.email,
  currenciesAccepted: "PKR",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.addressParts.street,
    addressLocality: SITE.addressParts.locality,
    addressRegion: SITE.addressParts.region,
    postalCode: SITE.addressParts.postalCode,
    addressCountry: SITE.addressParts.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.geo.latitude,
    longitude: SITE.geo.longitude,
  },
  hasMap: SITE.mapUrl,
  areaServed: SITE.areaServed.map((name) => ({
    "@type": name === "Lahore" ? "City" : "Place",
    name: name === "Lahore" ? "Lahore" : `${name}, Lahore`,
  })),
  knowsAbout: [
    "Bridal makeup",
    "Party makeup",
    "Hair cutting and colour",
    "Balayage and highlights",
    "Facials and skin care",
    "Manicure and pedicure",
    "Waxing and threading",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Beauty services in Wapda Town, Lahore",
    itemListElement: [
      "Bridal hair and makeup",
      "Party and event makeup",
      "Hair cut, colour and treatments",
      "Facials and skin care",
      "Manicure, pedicure and nail art",
      "Waxing, threading and lash services",
    ].map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service },
    })),
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "11:00",
    closes: "20:00",
  },
  sameAs: SITE.socials.map((s) => s.href),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ivory text-cocoa font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <ScrollTop />
      </body>
    </html>
  );
}
