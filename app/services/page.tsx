import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[44vh] min-h-[320px] w-full md:h-[50vh] md:min-h-[380px]">
          <div className="absolute inset-x-0 -top-1/4 h-[150%]">
            <Image
              src="/images/slider_page_3.jpg"
              alt="Bannière Services"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl items-center justify-center px-6 text-center text-white">
            <nav
              aria-label="Fil d'ariane"
              className="text-sm font-semibold uppercase tracking-[1.5px] md:text-base"
            >
              <Link href="/" className="text-white/85 transition-colors hover:text-[#FF1E27]">
                Accueil
              </Link>
              <span className="mx-2 text-white/55">&gt;</span>
              <span className="text-[#FF1E27]">Services</span>
            </nav>
          </div>
        </div>
      </section>
      <DomainsSection />
      <ServicesOfferSection />
      <AppointmentSection />
      <TestimonialsSection />
    </>
  );
}
