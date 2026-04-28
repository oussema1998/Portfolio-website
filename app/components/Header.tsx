"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSitePreferences } from "../context/SitePreferencesContext";

export default function Header() {
  const pathname = usePathname();
  const { locale, setLocale } = useSitePreferences();
  const isFrench = locale === "fr";

  const navLinks = isFrench
    ? [
        { href: "/", label: "Accueil" },
        { href: "/projets", label: "Projets" },
        { href: "/activites", label: "Activites" },
        { href: "/services", label: "Services" },
        { href: "/contact", label: "Contact" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/projets", label: "Projects" },
        { href: "/activites", label: "Activities" },
        { href: "/services", label: "Services" },
        { href: "/contact", label: "Contact" },
      ];

  const languageOptions = [
    { value: "fr", shortLabel: "FR", label: "Français" },
    { value: "en", shortLabel: "EN", label: "English" },
  ] as const;

  return (
    <header className="absolute left-0 top-0 z-50 w-full bg-gradient-to-b from-black via-black/85 to-transparent px-4 pb-4 pt-2 md:px-8 md:pt-5">
      <div className="grid w-full grid-cols-[1fr_auto] items-center gap-4 pl-[5%] pr-4 md:pr-8 lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="inline-flex w-fit items-center">
          <Image
            src="/images/logo-oussema.png"
            alt="Mon Projet"
            width={170}
            height={40}
            priority
            className="h-auto w-[64px] object-contain md:w-[80px]"
          />
        </Link>

        <nav className="hidden items-center gap-12 lg:flex lg:justify-self-center">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative block py-2 text-[19px] font-semibold uppercase tracking-[1.2px] [font-family:var(--font-display)] transition-colors after:absolute after:left-0 after:top-[26px] after:h-px after:w-full after:-rotate-[20deg] after:bg-[#FF1E27] after:transition-opacity ${
                  isActive
                    ? "text-[#FF1E27] after:opacity-100"
                    : "text-white after:opacity-0 hover:text-[#FF1E27] hover:after:opacity-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <details className="relative ml-auto lg:hidden">
          <summary
            className="list-none cursor-pointer p-1 text-white"
            aria-label={isFrench ? "Ouvrir le menu" : "Open menu"}
          >
            <span className="sr-only">Menu</span>
            <span className="flex h-6 w-7 flex-col justify-between">
              <span className="block h-0.5 w-full bg-white" />
              <span className="block h-0.5 w-full bg-white" />
              <span className="block h-0.5 w-full bg-white" />
            </span>
          </summary>
          <nav className="absolute right-0 mt-3 grid min-w-44 gap-1 bg-[#1a1a1a] p-3 text-sm shadow-lg">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2 py-2 text-[17px] uppercase tracking-[1.1px] [font-family:var(--font-display)] transition-colors ${
                    isActive ? "text-[#FF1E27]" : "text-white hover:text-[#FF1E27]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-2 border-t border-white/10 pt-2">
              <p className="px-2 text-[11px] font-semibold uppercase tracking-[1.2px] text-white/70">
                {isFrench ? "Langue" : "Language"}
              </p>
              <div className="mt-1 grid gap-1">
                {languageOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setLocale(option.value)}
                    className={`flex items-center justify-between gap-2 px-2 py-2 text-[13px] font-semibold uppercase tracking-[1px] transition-colors ${
                      locale === option.value
                        ? "text-[#FF1E27]"
                        : "text-white hover:text-[#FF1E27]"
                    }`}
                    aria-label={isFrench ? `Passer en ${option.label}` : `Switch to ${option.label}`}
                  >
                    <span>{option.shortLabel}</span>
                    <span className="text-[10px] font-medium text-white/60">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </details>

        <div className="hidden lg:flex lg:items-center lg:justify-end lg:gap-4">
          <details className="relative">
            <summary
              className="list-none cursor-pointer rounded-sm border border-white/20 px-2 py-1 text-xs font-semibold uppercase tracking-[1.4px] text-white transition-colors hover:border-[#FF1E27]/70"
              aria-label={isFrench ? "Choisir la langue" : "Choose language"}
            >
              {isFrench ? "FR" : "EN"}
            </summary>
            <div className="absolute right-0 mt-2 grid min-w-28 gap-1 rounded-sm border border-white/10 bg-[#101010] p-2 text-xs shadow-lg">
              {languageOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setLocale(option.value)}
                  className={`flex items-center justify-between gap-2 rounded-sm px-2 py-2 text-xs font-semibold uppercase tracking-[1px] transition-colors ${
                    locale === option.value
                      ? "text-[#FF1E27]"
                      : "text-white hover:text-[#FF1E27]"
                  }`}
                  aria-label={isFrench ? `Passer en ${option.label}` : `Switch to ${option.label}`}
                >
                  <span>{option.shortLabel}</span>
                  <span className="text-[10px] font-medium text-white/60">{option.label}</span>
                </button>
              ))}
            </div>
          </details>
          <a
            href="mailto:belhaouene.oussema@esprit.tn"
            aria-label={isFrench ? "Envoyer un email" : "Send an email"}
            className="text-zinc-300 transition-colors hover:text-[#FF1E27]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm16 2H4v.2l8 5.33 8-5.33V7Zm0 10V9.6l-7.45 4.97a1 1 0 0 1-1.1 0L4 9.6V17h16Z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/oussema-belhou%C3%A9ne-710089224/"
            target="_blank"
            rel="noreferrer"
            aria-label={isFrench ? "Profil LinkedIn" : "LinkedIn profile"}
            className="text-zinc-300 transition-colors hover:text-[#FF1E27]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M6.94 8.5A1.56 1.56 0 1 1 6.9 5.4a1.56 1.56 0 0 1 .04 3.1ZM5.5 9.8h2.8V19H5.5V9.8Zm4.54 0h2.68v1.26h.04c.37-.7 1.28-1.45 2.63-1.45 2.81 0 3.33 1.85 3.33 4.25V19h-2.8v-4.57c0-1.09-.02-2.48-1.51-2.48-1.51 0-1.74 1.18-1.74 2.4V19h-2.8V9.8Z" />
            </svg>
          </a>
          <a
            href="https://github.com/oussema1998"
            target="_blank"
            rel="noreferrer"
            aria-label={isFrench ? "Profil GitHub" : "GitHub profile"}
            className="text-zinc-300 transition-colors hover:text-[#FF1E27]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.3 6.84 9.64.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.37-2.22-.26-4.56-1.15-4.56-5.1 0-1.13.39-2.05 1.03-2.78-.1-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.06A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.9-1.34 2.74-1.06 2.74-1.06.56 1.43.21 2.48.11 2.74.64.73 1.03 1.65 1.03 2.78 0 3.96-2.34 4.84-4.58 5.09.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
