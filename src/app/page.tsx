import Hero from "@/components/home/Hero";
import OfferBanner from "@/components/home/OfferBanner";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import Gallery from "@/components/home/Gallery";
import OffersSection from "@/components/home/OffersSection";
import LocalSection from "@/components/home/LocalSection";
import InstagramSection from "@/components/home/InstagramSection";
import GoogleReviewsSection from "@/components/home/GoogleReviewsSection";

// Keep the CMS-backed offers fresh so expired packages disappear on their own.
export const revalidate = 300;

export default function Home() {
  return (
    <>
      <Hero />
      <OfferBanner />
      <AboutSection />
      <ServicesSection />
      <Gallery />
      <OffersSection />
      <LocalSection />
      <InstagramSection />
      <GoogleReviewsSection />
    </>
  );
}
