"use client";

import Link from "next/link";
import { useSitePreferences } from "../context/SitePreferencesContext";

export default function DomainsSection() {
  const { locale } = useSitePreferences();
  const isFrench = locale === "fr";
  const copy = isFrench
    ? {
        kicker: "Mes domaines",
        title: "Construire, analyser et innover",
        webTitle: "Développement web",
        webDescription:
          "Création d'applications web modernes, performantes et responsives, avec une architecture claire orientée qualité et expérience utilisateur.",
        dataTitle: "Data analytics",
        dataDescription:
          "Analyse des données, suivi des KPI et visualisation métier pour transformer les données brutes en décisions concrètes.",
        aiTitle: "Intelligence artificielle",
        aiDescription:
          "Développement de solutions IA et modèles prédictifs pour automatiser, anticiper et améliorer la performance des processus métiers.",
        linkLabel: "Ce que je propose",
      }
    : {
        kicker: "My domains",
        title: "Build, analyze, and innovate",
        webTitle: "Web development",
        webDescription:
          "Building modern, high-performance, and responsive web applications with a clear architecture focused on quality and user experience.",
        dataTitle: "Data analytics",
        dataDescription:
          "Data analysis, KPI tracking, and business visualization to turn raw data into concrete decisions.",
        aiTitle: "Artificial intelligence",
        aiDescription:
          "Developing AI solutions and predictive models to automate, anticipate, and improve business process performance.",
        linkLabel: "What I offer",
      };

  return (
    <section className="w-full bg-[#0A0A0A] px-4 pb-1 pt-20 md:px-8 md:pb-1 md:pt-24">
      <div className="mx-auto w-full max-w-none text-center text-white">
        <span className="block text-xl font-bold uppercase tracking-[2.2px] text-[#FF1E27] md:text-2xl">
          {copy.kicker}
        </span>
        <h2 className="mt-3 text-4xl font-semibold md:text-5xl">{copy.title}</h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          <article className="px-3">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-white/10 text-[#FF1E27] transition-colors duration-300 hover:bg-[#FF1E27] hover:text-white">
              <svg viewBox="0 0 24 24" className="h-11 w-11 fill-none stroke-current" strokeWidth="1.8" aria-hidden="true">
                <path d="M4 5h16v11H4z" />
                <path d="M8 19h8" />
                <path d="M10 16v3m4-3v3" />
              </svg>
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-white">{copy.webTitle}</h3>
            <p className="mx-auto mt-4 max-w-sm text-[15px] leading-7 text-white/80">
              {copy.webDescription}
            </p>
          </article>

          <article className="px-3">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-white/10 text-[#FF1E27] transition-colors duration-300 hover:bg-[#FF1E27] hover:text-white">
              <svg viewBox="0 0 24 24" className="h-11 w-11 fill-none stroke-current" strokeWidth="1.8" aria-hidden="true">
                <path d="M4 19V9" />
                <path d="M10 19V5" />
                <path d="M16 19v-7" />
                <path d="M22 19V3" />
              </svg>
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-white">{copy.dataTitle}</h3>
            <p className="mx-auto mt-4 max-w-sm text-[15px] leading-7 text-white/80">
              {copy.dataDescription}
            </p>
          </article>

          <article className="px-3">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-white/10 text-[#FF1E27] transition-colors duration-300 hover:bg-[#FF1E27] hover:text-white">
              <svg viewBox="0 0 24 24" className="h-11 w-11 fill-none stroke-current" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 4a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V8a4 4 0 0 1 4-4Z" />
                <path d="M6 20a6 6 0 0 1 12 0" />
                <circle cx="5" cy="9" r="1.5" />
                <circle cx="19" cy="9" r="1.5" />
              </svg>
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-white">{copy.aiTitle}</h3>
            <p className="mx-auto mt-4 max-w-sm text-[15px] leading-7 text-white/80">
              {copy.aiDescription}
            </p>
          </article>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/services#mes-services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[1px] text-white transition-colors hover:text-[#FF1E27]"
          >
            {copy.linkLabel}
            <span aria-hidden="true">&gt;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
