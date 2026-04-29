"use client";

import Image from "next/image";
import Link from "next/link";
import { useSitePreferences } from "../context/SitePreferencesContext";

const activitiesByLocale = {
  fr: [
    {
      category: "Leadership",
      title: "Président d'un club universitaire",
      image: "/images/activites_transversales/coexister_club.jpeg",
      cornerNote: "président du club: 2 mandats",
      targetId: "activite-president-club",
    },
    {
      category: "Sécurité",
      title: "Maître-nageur sauveteur",
      image: "/images/activites_transversales/lifeguard.jpg",
      cornerNote: "maître-nageur: 2 saisons d'été",
      targetId: "activite-maitre-nageur",
    },
    {
      category: "Sport",
      title: "Coach de musculation",
      image: "/images/activites_transversales/musculation.jpg",
      cornerNote: "musculation: +10 ans",
      targetId: "loisir-musculation",
    },
    {
      category: "Communication",
      title: "Agent téléphonique",
      image: "/images/activites_transversales/active_contact2.png",
      cornerNote: "agent téléphonique: + 4 mois",
      targetId: "activite-agent-telephonique",
    },
    {
      category: "Outdoor",
      title: "Campeur",
      image: "/images/activites_transversales/camping.jpg",
      cornerNote: "campeur: +10 campings",
      targetId: "loisir-camping",
    },
  ],
  en: [
    {
      category: "Leadership",
      title: "President of a university club",
      image: "/images/activites_transversales/coexister_club.jpeg",
      cornerNote: "club president: 2 terms",
      targetId: "activite-president-club",
    },
    {
      category: "Safety",
      title: "Lifeguard",
      image: "/images/activites_transversales/lifeguard.jpg",
      cornerNote: "lifeguard: 2 summer seasons",
      targetId: "activite-maitre-nageur",
    },
    {
      category: "Sport",
      title: "Strength coach",
      image: "/images/activites_transversales/musculation.jpg",
      cornerNote: "strength training: 10+ years",
      targetId: "loisir-musculation",
    },
    {
      category: "Communication",
      title: "Call center agent",
      image: "/images/activites_transversales/active_contact2.png",
      cornerNote: "call agent: 4+ months",
      targetId: "activite-agent-telephonique",
    },
    {
      category: "Outdoor",
      title: "Camper",
      image: "/images/activites_transversales/camping.jpg",
      cornerNote: "camper: 10+ trips",
      targetId: "loisir-camping",
    },
  ],
} as const;

export default function ActivitiesSection() {
  const { locale } = useSitePreferences();
  const isFrench = locale === "fr";
  const activities = activitiesByLocale[locale as keyof typeof activitiesByLocale];
  const copy = isFrench
    ? {
        kicker: "Autres activités",
        title: "activités transversales et loisirs",
        description:
          "En parallèle de mes études, je m'investis activement dans des activités associatives et sportives qui renforcent mon leadership, mon sens de l'organisation et ma discipline. Durant l'été, je réalise également des travaux saisonniers, une expérience qui développe mon adaptabilité, ma rigueur et mon sens des responsabilités.",
        viewLabel: "Voir",
      }
    : {
        kicker: "Other activities",
        title: "Cross-functional activities and hobbies",
        description:
          "Alongside my studies, I actively engage in community and sports activities that strengthen my leadership, organizational skills, and discipline. During the summer, I also take on seasonal work, an experience that develops my adaptability, rigor, and sense of responsibility.",
        viewLabel: "View",
      };

  return (
    <section className="w-full bg-[#151515] px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-none text-center text-white">
        <span className="block text-xl font-bold uppercase tracking-[2.2px] text-[#FF1E27] md:text-2xl">
          {copy.kicker}
        </span>
        <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
          {copy.title}
        </h2>

        <p className="mt-6 w-full text-base leading-8 text-white/80 md:text-lg">
          {copy.description}
        </p>

        <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-6">
          {activities.map((activity, index) => (
            <article
              key={activity.title}
              className={`group relative overflow-hidden rounded-sm border border-white/10 bg-[#111111] text-left shadow-[0_14px_38px_rgba(0,0,0,0.26)] ${
                index < 3 ? "xl:col-span-2" : "xl:col-span-3"
              }`}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  index < 3 ? "h-[260px] xl:h-[280px]" : "h-[300px] xl:h-[320px]"
                }`}
              >
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <p className="absolute right-4 top-4 z-20 rounded-sm bg-black/65 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.7px] text-white/95 md:text-[11px]">
                  {activity.cornerNote}
                </p>
                <div
                  className="absolute inset-x-0 bottom-0 min-h-[138px] bg-[#0a0a0a] px-6 pb-6 pt-10"
                  style={{
                    clipPath: "polygon(0 26%, 100% 0, 100% 100%, 0 100%)",
                    boxShadow: "inset 0 0 0 1px rgba(161, 161, 170, 0.6)",
                  }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[1.7px] text-[#FF1E27]">
                    {activity.category}
                  </p>
                  <h3 className="mt-2 pr-16 text-xl font-bold uppercase leading-tight text-white [font-family:var(--font-display)] md:text-2xl">
                    {activity.title}
                  </h3>
                  <Link
                    href={`/activites#${activity.targetId}`}
                    aria-label={`${copy.viewLabel} ${activity.title}`}
                    className="absolute bottom-5 right-6 grid h-10 w-10 place-items-center bg-white/10 text-2xl text-white transition-colors hover:bg-[#FF1E27]"
                  >
                    ›
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
