import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LeisureSection from "../sections/LeisureSection";
import TransversalActivitiesSection from "../sections/TransversalActivitiesSection";

export const metadata: Metadata = {
  title: "Activités",
};

export default function ActivitesPage() {
  return (
    <>
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[44vh] min-h-[320px] w-full md:h-[50vh] md:min-h-[380px]">
          <div className="absolute inset-0">
            <Image
              src="/images/slider_page_2.jpg"
              alt="Bannière Activités"
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
              <span className="text-[#FF1E27]">Activités</span>
            </nav>
          </div>
        </div>
      </section>
      <TransversalActivitiesSection />
      <LeisureSection />
    </>
  );
}
