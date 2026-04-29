"use client";

import Image from "next/image";
import { useSitePreferences } from "../context/SitePreferencesContext";

export default function AboutSection() {
  const { locale } = useSitePreferences();
  const isFrench = locale === "fr";

  const content = isFrench
    ? {
        kicker: "Qui suis-je ?",
        title: "ingénieur en informatique",
        description:
          "Ingénieur en Business Intelligence et en Data, avec une expertise en pipelines de données, automatisation, modélisation prédictive et systèmes distribués. J'interviens également sur des projets d'intelligence artificielle, en concevant des solutions robustes et orientées impact. Spécialisé dans la conception d'architectures data fiables, performantes et scalables, intégrant ETL/ELT, machine learning, APIs et déploiement cloud. Leader naturel, actif, sportif et sociable, j'aime fédérer les équipes, collaborer efficacement et faire avancer les projets avec énergie et méthode.",
        btnFR: "Télécharger CV FR",
        btnEN: "Télécharger CV EN",
      }
    : {
        kicker: "Who am I?",
        title: "software engineer",
        description:
          "Business Intelligence and Data engineer with expertise in data pipelines, automation, predictive modeling, and distributed systems. I also work on AI projects, designing robust, impact-driven solutions. I specialize in building reliable, high-performance, and scalable data architectures that combine ETL/ELT, machine learning, APIs, and cloud deployment. A natural leader, active, athletic, and sociable, I enjoy uniting teams, collaborating effectively, and moving projects forward with energy and method.",
        btnFR: "Download Resume FR",
        btnEN: "Download Resume EN",
      };

  return (
    <section className="w-full bg-[#0A0A0A] px-4 pb-20 pt-14 md:px-8 md:pb-24 md:pt-16">
      <div className="mx-auto w-full max-w-none text-center text-white">
        <Image
          src="/images/logo-oussema.png"
          alt="Logo Oussema"
          width={144}
          height={144}
          className="mx-auto h-auto w-[116px] object-contain md:w-[144px]"
          priority
        />

        <span className="mt-3 block text-xl font-bold uppercase tracking-[2.2px] text-[#FF1E27] md:mt-4 md:text-2xl">
          {content.kicker}
        </span>

        <h2 className="mt-2 text-4xl font-semibold md:text-5xl">
          {content.title}
        </h2>

        <p className="mt-8 w-full text-base leading-8 text-white/90 md:text-lg">
          {content.description}
        </p>

        {/* 🔘 Buttons */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="/resume/Oussema_Belhaouene_DA_FR_w.pdf"
            download
            className="w-full sm:w-auto rounded-full border border-[#FF1E27] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#FF1E27]"
          >
            {content.btnFR}
          </a>

          <a
            href="/resume/Oussema_Belhaouene_DA_EN_w.pdf"
            download
            className="w-full sm:w-auto rounded-full bg-[#FF1E27] px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            {content.btnEN}
          </a>
        </div>
      </div>
    </section>
  );
}