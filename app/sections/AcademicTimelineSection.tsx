"use client";

import { useSitePreferences } from "../context/SitePreferencesContext";

export default function AcademicTimelineSection() {
  const { locale } = useSitePreferences();
  const isFrench = locale === "fr";

  const copy = isFrench
    ? {
        kicker: "Mon parcours académique",
        entries: [
          {
            period: "2022 - 2025",
            title: "Cycle ingénieur en informatique - Spécialité Business Intelligence",
            school: "ESPRIT",
          },
          {
            period: "2018 - 2022",
            title: "Licence appliquée en informatique",
            school: "ISET Charguiya",
          },
          {
            period: "2017",
            title: "Baccalauréat",
            school: "Lycée Ibn Abi Dhief, Mannouba",
          },
        ],
      }
    : {
        kicker: "My academic background",
        entries: [
          {
            period: "2022 - 2025",
            title: "Engineering degree in Computer Science - Business Intelligence specialization",
            school: "ESPRIT",
          },
          {
            period: "2018 - 2022",
            title: "Applied Bachelor's in Computer Science",
            school: "ISET Charguiya",
          },
          {
            period: "2017",
            title: "Baccalaureate",
            school: "Ibn Abi Dhief High School, Mannouba",
          },
        ],
      };

  return (
    <section className="w-full bg-[#151515] px-4 py-18 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-5xl text-white">
        <div className="text-center">
          <span className="block text-xl font-bold uppercase tracking-[2.2px] text-[#FF1E27] md:text-2xl">
            {copy.kicker}
          </span>
        </div>

        <div className="relative mt-10 space-y-8 pl-10 md:pl-14">
          <div className="absolute bottom-2 left-2 top-2 w-[2px] bg-white/15 md:left-3" aria-hidden="true" />

          {copy.entries.map((entry) => (
            <article
              key={`${entry.period}-${entry.title}`}
              className="relative rounded-sm border border-white/10 bg-[#0E0E0E] px-5 py-5 md:px-6"
            >
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
              <p className="text-xs font-semibold uppercase tracking-[1.3px] text-[#FF1E27]">{entry.period}</p>
              <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">{entry.title}</h3>
              <p className="mt-2 text-sm text-white/75 md:text-base">{entry.school}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
