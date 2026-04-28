import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import AppointmentSection from "../sections/AppointmentSection";
import DomainsSection from "../sections/DomainsSection";
import ServicesOfferSection from "../sections/ServicesOfferSection";
import TestimonialsSection from "../sections/TestimonialsSection";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        image="/images/slider_page_3.jpg"
        alt={{ fr: "Bannière Services", en: "Services banner" }}
        currentLabel={{ fr: "Services", en: "Services" }}
        imageWrapperClassName="absolute inset-x-0 -top-1/4 h-[150%]"
      />
      <DomainsSection />
      <ServicesOfferSection />
      <AppointmentSection />
      <TestimonialsSection />
    </>
  );
}
