import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Story from "@/components/about/Story";
import Philosophy from "@/components/about/Philosophy";
import Quote from "@/components/about/Quote";
import BookingCTA from "@/components/home/BookingCTA";

export const metadata: Metadata = {
  title: "About Our Lahore Salon",
  description:
    "Meet Nunchi Salon by Naheed — a premium beauty salon in Wapda Town, Lahore offering hair, bridal makeup, skin care and nails with quiet, considered care.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Nunchi"
        title="Where every visit begins with you."
        italicWords={[5]}
        description="Nunchi Salon by Naheed is a premium beauty salon in Wapda Town, Lahore — a quiet retreat for hair, makeup, skin and bridal styling, where care is measured in the smallest details."
      />
      <Story />
      <Philosophy />
      <Quote />
      <BookingCTA />
    </>
  );
}
