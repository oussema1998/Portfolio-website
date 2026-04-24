import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AboutSection from "../sections/AboutSection";
import AllProjectsSection from "../sections/AllProjectsSection";
import ImpactStatsSection from "../sections/ImpactStatsSection";
import LanguagesSection from "../sections/LanguagesSection";
import TechnologiesShowcaseSection from "../sections/TechnologiesShowcaseSection";

export const metadata: Metadata = {
  title: "Projets",
};

export default function ProjetsPage() {
  return (
    <>
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[44vh] min-h-[320px] w-full md:h-[50vh] md:min-h-[380px]">
          <Image
            src="/images/slider_page_1.jpg"
            alt="Bannière Projets"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl items-center justify-center px-6 text-center text-white">
            <nav aria-label="Fil d'ariane" className="text-sm font-semibold uppercase tracking-[1.5px] md:text-base">
              <Link href="/" className="text-white/85 transition-colors hover:text-[#FF1E27]">
                Accueil
              </Link>
              <span className="mx-2 text-white/55">&gt;</span>
              <span className="text-[#FF1E27]">Projets</span>
            </nav>
          </div>
        </div>
      </section>

      <AboutSection />

      <section className="w-full bg-[#151515] px-4 py-18 md:px-8 md:py-20">
        <div className="mx-auto w-full max-w-5xl text-white">
          <div className="text-center">
            <span className="block text-xl font-bold uppercase tracking-[2.2px] text-[#FF1E27] md:text-2xl">
              Mon parcours académique
            </span>
          </div>

          <div className="relative mt-10 space-y-8 pl-10 md:pl-14">
            <div className="absolute bottom-2 left-2 top-2 w-[2px] bg-white/15 md:left-3" aria-hidden="true" />

            <article className="relative rounded-sm border border-white/10 bg-[#0E0E0E] px-5 py-5 md:px-6">
              <span
                className="absolute -left-[38px] top-4 grid h-8 w-8 place-items-center rounded-full border border-[#FF1E27]/70 bg-[#151515] text-[#FF1E27] md:-left-[50px]"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8">
                  <path d="M2 9.5 12 5l10 4.5L12 14 2 9.5Z" />
                  <path d="M6 11.3v4.1c0 .8 2.5 2.6 6 2.6s6-1.8 6-2.6v-4.1" />
                  <path d="M22 9.5v5.2" />
                  <circle cx="22" cy="15.8" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <p className="text-xs font-semibold uppercase tracking-[1.3px] text-[#FF1E27]">
                2022 - 2025
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                Cycle ingénieur en informatique - Spécialité Business Intelligence
              </h3>
              <p className="mt-2 text-sm text-white/75 md:text-base">ESPRIT</p>
            </article>

            <article className="relative rounded-sm border border-white/10 bg-[#0E0E0E] px-5 py-5 md:px-6">
              <span
                className="absolute -left-[38px] top-4 grid h-8 w-8 place-items-center rounded-full border border-[#FF1E27]/70 bg-[#151515] text-[#FF1E27] md:-left-[50px]"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8">
                  <path d="M2 9.5 12 5l10 4.5L12 14 2 9.5Z" />
                  <path d="M6 11.3v4.1c0 .8 2.5 2.6 6 2.6s6-1.8 6-2.6v-4.1" />
                  <path d="M22 9.5v5.2" />
                  <circle cx="22" cy="15.8" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <p className="text-xs font-semibold uppercase tracking-[1.3px] text-[#FF1E27]">
                2018 - 2022
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                Licence appliquée en informatique
              </h3>
              <p className="mt-2 text-sm text-white/75 md:text-base">ISET Charguiya</p>
            </article>

            <article className="relative rounded-sm border border-white/10 bg-[#0E0E0E] px-5 py-5 md:px-6">
              <span
                className="absolute -left-[38px] top-4 grid h-8 w-8 place-items-center rounded-full border border-[#FF1E27]/70 bg-[#151515] text-[#FF1E27] md:-left-[50px]"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8">
                  <rect x="4" y="5" width="16" height="12" rx="1.8" />
                  <path d="M8 9h8" />
                  <path d="M8 12h5" />
                  <path d="M14 17v2.5" />
                  <path d="M14 19.5l-1.5 1" />
                  <path d="M14 19.5l1.5 1" />
                </svg>
              </span>
              <p className="text-xs font-semibold uppercase tracking-[1.3px] text-[#FF1E27]">2017</p>
              <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">Baccalauréat</h3>
              <p className="mt-2 text-sm text-white/75 md:text-base">Lycée Ibn Abi Dhief, Mannouba</p>
            </article>
          </div>
        </div>
      </section>

      <ImpactStatsSection />

      <AllProjectsSection />

      <TechnologiesShowcaseSection />

      <LanguagesSection />
    </>
  );
}
