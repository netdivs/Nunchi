import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import BookingCTA from "@/components/home/BookingCTA";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { GALLERY_ITEMS } from "@/lib/gallery";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bridal & Salon Gallery",
  description:
    "Browse the Nunchi Salon by Naheed gallery — bridal makeup, hair, skin, nails and salon moments captured in Wapda Town, Lahore.",
  alternates: {
    canonical: "/gallery",
  },
};

const galleryJsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Nunchi Salon by Naheed — Bridal & Salon Gallery",
  description:
    "Bridal makeup, hair styling, facials and nail artistry at Nunchi Salon by Naheed in Wapda Town, Lahore.",
  url: `${SITE.url}/gallery`,
  image: GALLERY_ITEMS.slice(0, 16).map((item) => `${SITE.url}${item.src}`),
  about: {
    "@type": "BeautySalon",
    "@id": `${SITE.url}/#salon`,
    name: SITE.name,
  },
};

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <PageHeader
        eyebrow="Gallery"
        title="A closer look at our craft."
        italicWords={[5]}
        description="Real brides, real finishes and the quiet details in between — a curated look at the hair, makeup, skin and nail work created at our Wapda Town, Lahore salon."
      />

      <section className="pb-24 md:pb-32" aria-labelledby="gallery-title">
        <Container>
          <h2 id="gallery-title" className="nc-sr-only">
            Bridal and salon gallery
          </h2>
          <GalleryGrid items={GALLERY_ITEMS} />
        </Container>
      </section>

      <BookingCTA />
    </>
  );
}
