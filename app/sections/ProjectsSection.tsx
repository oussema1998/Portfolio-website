"use client";

import Image from "next/image";
import Link from "next/link";
import { useSitePreferences } from "../context/SitePreferencesContext";

const featuredProjectsByLocale = {
  fr: [
    {
      title: "Collection et nettoyage de donnees",
      context: "projet freelance",
      organization: "@Elyssa-call",
      duration: "(1 mois)",
      logo: "/images/logo_organisations/Elyssa_call.png",
      url: "https://www.linkedin.com/in/khouani-farid-c-e-o-d%E2%80%99elyssa-call-494082279/",
      tags: ["data cleaning", "web scrapping"],
      description:
        "Collecte automatisee de donnees d'infirmiers liberaux en France depuis une source unique, avec gestion des CAPTCHA. Nettoyage, normalisation et structuration des informations afin de fournir une base fiable, exploitable et orientee prospection.",
    },
    {
      title: "Devhotel: Analyse intelligente des offres de sejours",
      context: "stage fin d'etudes",
      organization: "@Devoteam",
      duration: "(6 mois)",
      logo: "/images/logo_organisations/devoteam.png",
      url: "https://www.devoteam.com/",
      tags: ["web scraping", "ETL", "data visualization", "agentic RAG", "machine learning"],
      description:
        "Realisation d'une chaine data de bout en bout: collecte et preparation des donnees hotellerie, conception d'un data warehouse, developpement des flux ETL, creation de dashboards Power BI, modeles de prediction, chatbot RAG et application web metier.",
    },
    {
      title: "Assistant FAQ intelligent",
      context: "projet test technique",
      organization: "@north human solutions",
      duration: "(1 mois)",
      logo: "/images/logo_organisations/north_human.jpg",
      url: "https://northhumans.ca/en/",
      tags: ["Web backend", "RAG", "generative AI"],
      description:
        "Conception d'un assistant conversationnel intelligent pour e-commerce, capable de repondre aux FAQ a partir d'une base de connaissance, afin d'ameliorer la qualite de reponse et l'experience client.",
    },
  ],
  en: [
    {
      title: "Data collection and cleaning",
      context: "freelance project",
      organization: "@Elyssa-call",
      duration: "(1 month)",
      logo: "/images/logo_organisations/Elyssa_call.png",
      url: "https://www.linkedin.com/in/khouani-farid-c-e-o-d%E2%80%99elyssa-call-494082279/",
      tags: ["data cleaning", "web scrapping"],
      description:
        "Automated collection of French freelance nurse data from a single source with CAPTCHA handling. Cleaning, normalization, and structuring to deliver a reliable, prospecting-ready dataset.",
    },
    {
      title: "Devhotel: Intelligent analysis of travel offers",
      context: "final-year internship",
      organization: "@Devoteam",
      duration: "(6 months)",
      logo: "/images/logo_organisations/devoteam.png",
      url: "https://www.devoteam.com/",
      tags: ["web scraping", "ETL", "data visualization", "agentic RAG", "machine learning"],
      description:
        "End-to-end data chain: hotel data collection and preparation, data warehouse design, ETL flows, Power BI dashboards, prediction models, RAG chatbot, and a business web app.",
    },
    {
      title: "Intelligent FAQ assistant",
      context: "technical test project",
      organization: "@north human solutions",
      duration: "(1 month)",
      logo: "/images/logo_organisations/north_human.jpg",
      url: "https://northhumans.ca/en/",
      tags: ["Web backend", "RAG", "generative AI"],
      description:
        "Design of an intelligent conversational assistant for e-commerce, able to answer FAQs from a knowledge base to improve response quality and customer experience.",
    },
  ],
} as const;

export default function ProjectsSection() {
  const { locale } = useSitePreferences();
  const isFrench = locale === "fr";
const featuredProjects = featuredProjectsByLocale[locale as keyof typeof featuredProjectsByLocale];
  const copy = isFrench
    ? {
        kicker: "Mes projets",
        title: "Projets et missions réalisées",
        description:
          "Une selection de realisations orientees impact, alliant data, architecture logicielle et intelligence artificielle.",
        viewMore: "Voir plus",
        openLabel: "Ouvrir",
      }
    : {
        kicker: "My projects",
        title: "Projects and delivered missions",
        description:
          "A selection of impact-driven work combining data, software architecture, and artificial intelligence.",
        viewMore: "See more",
        openLabel: "Open",
      };

  return (
    <section className="w-full bg-[#151515] px-4 pb-1 pt-18 md:px-8 md:pb-1 md:pt-20">
      <div className="mx-auto w-full max-w-[1480px] text-white">
        <div className="flex flex-col gap-4 text-center md:items-center">
          <span className="block text-xl font-bold uppercase tracking-[2.2px] text-[#FF1E27] md:text-2xl">
            {copy.kicker}
          </span>
          <h2 className="text-4xl font-semibold md:text-5xl">{copy.title}</h2>
          <p className="mx-auto max-w-4xl text-base leading-8 text-white/80 md:text-lg">
            {copy.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <article
              key={project.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-white/10 bg-[#0E0E0E] px-6 py-7 shadow-[0_14px_40px_rgba(0,0,0,0.26)] transition-transform duration-300 hover:-translate-y-1 hover:border-[#FF1E27]/70"
            >
              <div className="flex items-start gap-4">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-zinc-300/40 bg-white/5 transition-colors hover:border-[#FF1E27]/70 hover:bg-[#FF1E27]/10"
                  aria-label={`${copy.openLabel} ${project.organization}`}
                >
                  <Image
                    src={project.logo}
                    alt={project.organization}
                    width={44}
                    height={44}
                    className="h-10 w-10 object-contain"
                  />
                </a>
                <h3 className="text-2xl font-bold uppercase leading-tight text-[#FF1E27] [font-family:var(--font-display)]">
                  {project.title}
                </h3>
              </div>
              <p className="mt-2 text-xs leading-6 text-white/80 md:text-[13px]">
                {project.context}{" "}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-[#FF1E27]"
                >
                  {project.organization}
                </a>
                {" "}
                <span className="text-white/70">{project.duration}</span>
              </p>
              <p className="mt-3 flex-1 text-sm leading-6 text-white/75 md:text-[15px]">
                {project.description}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <Link
                  href="/projets#tous-mes-projets"
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[1.2px] text-white transition-colors group-hover:text-[#FF1E27]"
                >
                  {copy.viewMore}
                </Link>
                <Link
                  href="/projets#tous-mes-projets"
                  aria-label={`${copy.viewMore} ${project.organization}`}
                  className="grid h-10 w-10 place-items-center bg-white/10 text-2xl text-white transition-colors hover:bg-[#FF1E27]"
                >
                  ›
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={`${project.title}-${tag}`}
                    className="inline-flex items-center rounded-sm border border-[#3d6ea8]/40 bg-[#10233a]/55 px-2 py-1 text-[11px] font-medium text-[#a8d2ff]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/projets#tous-mes-projets"
            className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[1px] text-white transition-colors hover:text-[#FF1E27]"
          >
            {copy.viewMore}
            <span aria-hidden="true">&gt;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
