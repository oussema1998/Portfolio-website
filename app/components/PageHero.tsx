"use client";

import Image from "next/image";
import Link from "next/link";
import { useSitePreferences } from "../context/SitePreferencesContext";

type LocalizedText = {
  fr: string;
  en: string;
};

type PageHeroProps = {
  image: string;
  alt: LocalizedText;
  currentLabel: LocalizedText;
  overlayClassName?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
};

export default function PageHero({
  image,
  alt,
  currentLabel,
  overlayClassName = "bg-black/45",
  imageWrapperClassName = "absolute inset-0",
  imageClassName = "object-cover",
}: PageHeroProps) {
  const { locale } = useSitePreferences();
  const isFrench = locale === "fr";

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[44vh] min-h-[320px] w-full md:h-[50vh] md:min-h-[380px]">
        <div className={imageWrapperClassName}>
          <Image
            src={image}
            alt={isFrench ? alt.fr : alt.en}
            fill
            priority
            sizes="100vw"
            className={imageClassName}
          />
        </div>
        <div className={`absolute inset-0 ${overlayClassName}`} />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl items-center justify-center px-6 text-center text-white">
          <nav
            aria-label={isFrench ? "Fil d'ariane" : "Breadcrumb"}
            className="text-sm font-semibold uppercase tracking-[1.5px] md:text-base"
          >
            <Link href="/" className="text-white/85 transition-colors hover:text-[#FF1E27]">
              {isFrench ? "Accueil" : "Home"}
            </Link>
            <span className="mx-2 text-white/55">&gt;</span>
            <span className="text-[#FF1E27]">{isFrench ? currentLabel.fr : currentLabel.en}</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
