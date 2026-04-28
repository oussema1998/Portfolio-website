"use client";

import Image from "next/image";
import Link from "next/link";
import { useSitePreferences } from "../context/SitePreferencesContext";

export default function AppointmentSection() {
  const { locale } = useSitePreferences();
  const isFrench = locale === "fr";
  const copy = isFrench
    ? {
        title: "Prendre rendez-vous",
        description:
          "Chaque projet commence par une discussion. Prenons 15 minutes pour échanger sur vos besoins.",
        cta: "Rendez vous",
        imageAlt: "Prendre rendez-vous",
      }
    : {
        title: "Book a meeting",
        description:
          "Every project starts with a conversation. Let's take 15 minutes to discuss your needs.",
        cta: "Book a meeting",
        imageAlt: "Book a meeting",
      };

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[480px] w-full md:h-[560px]">
        <Image
          src="/images/rendez_vous_4.png"
          alt={copy.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center px-6 text-center text-white">
          <h2 className="-mt-6 text-4xl font-bold uppercase [font-family:var(--font-display)] md:-mt-8 md:text-6xl">
            {copy.title}
          </h2>
          <p className="mt-6 max-w-5xl text-lg leading-8 text-white/90 md:text-2xl">
            {copy.description}
          </p>
          <Link href="/contact">
            <button
              type="button"
              className="mt-14 border border-white bg-transparent px-10 py-4 text-base font-semibold uppercase tracking-[1.4px] text-white transition-colors hover:bg-white hover:text-black"
            >
              {copy.cta}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
