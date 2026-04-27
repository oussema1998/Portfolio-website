import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
};

const contactDetails = [
  {
    label: "Email",
    value: "belhaouene.oussema@esprit.tn",
    href: "mailto:belhaouene.oussema@esprit.tn",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
        <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm16 2H4v.2l8 5.33 8-5.33V7Zm0 10V9.6l-7.45 4.97a1 1 0 0 1-1.1 0L4 9.6V17h16Z" />
      </svg>
    ),
  },
  {
    label: "Téléphone",
    value: "+216 92 073 061",
    href: "tel:+21692073061",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="1.8" aria-hidden="true">
        <path d="M6.6 3.5h2.8l1.4 3.7-1.8 1.5a15.4 15.4 0 0 0 6.3 6.3l1.5-1.8 3.7 1.4v2.8c0 .8-.6 1.5-1.4 1.6-1 .1-2 .1-3 0A16.7 16.7 0 0 1 5 7.3c-.1-1-.1-2 0-3 .1-.8.8-1.4 1.6-1.4Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "Oussema Belhouéne",
    href: "https://www.linkedin.com/in/oussema-belhou%C3%A9ne-710089224/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
        <path d="M6.94 8.5A1.56 1.56 0 1 1 6.9 5.4a1.56 1.56 0 0 1 .04 3.1ZM5.5 9.8h2.8V19H5.5V9.8Zm4.54 0h2.68v1.26h.04c.37-.7 1.28-1.45 2.63-1.45 2.81 0 3.33 1.85 3.33 4.25V19h-2.8v-4.57c0-1.09-.02-2.48-1.51-2.48-1.51 0-1.74 1.18-1.74 2.4V19h-2.8V9.8Z" />
      </svg>
    ),
  },
  {
    label: "Localisation",
    value: "Tunisie",
    href: "https://www.google.com/maps/place/Tunisia",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 21s6-5.42 6-11a6 6 0 1 0-12 0c0 5.58 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[44vh] min-h-[320px] w-full md:h-[50vh] md:min-h-[380px]">
          <Image
            src="/images/rendez_vous_4.png"
            alt="Bannière Contact"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl items-center justify-center px-6 text-center text-white">
            <nav
              aria-label="Fil d'ariane"
              className="text-sm font-semibold uppercase tracking-[1.5px] md:text-base"
            >
              <Link href="/" className="text-white/85 transition-colors hover:text-[#FF1E27]">
                Accueil
              </Link>
              <span className="mx-2 text-white/55">&gt;</span>
              <span className="text-[#FF1E27]">Contact</span>
            </nav>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#0A0A0A] px-4 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid w-full max-w-[1480px] gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-sm border border-white/10 bg-[#0E0E0E] px-6 py-7 text-white md:px-8 md:py-9">
            <span className="block text-xl font-bold uppercase tracking-[2.2px] text-[#FF1E27] md:text-2xl">
              Contact
            </span>
            <h1 className="mt-3 text-4xl font-semibold md:text-5xl">Parlons de votre projet</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
              Que ce soit pour une mission data, un besoin en analyse, une solution IA
              ou une application web, je peux vous aider à cadrer, concevoir et faire
              avancer votre projet.
            </p>

            <div className="mt-10 space-y-4">
              {contactDetails.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-center gap-4 rounded-sm border border-white/10 bg-white/5 px-4 py-4 transition-colors hover:border-[#FF1E27]/60 hover:bg-white/[0.07]"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-[#FF1E27]/50 bg-[#FF1E27]/10 text-[#FF1E27]">
                    {item.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[1.3px] text-white/55">
                      {item.label}
                    </span>
                    <span className="mt-1 block truncate text-base font-medium text-white md:text-lg">
                      {item.value}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-white/10 bg-[#151515] px-6 py-7 text-white md:px-8 md:py-9">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <span className="block text-sm font-bold uppercase tracking-[1.8px] text-[#FF1E27]">
                  Formulaire
                </span>
                <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Envoyer un message</h2>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <section className="w-full bg-[#151515] px-4 pb-20 pt-4 md:px-8 md:pb-24 md:pt-6">
        <div className="mx-auto w-full max-w-[1480px] overflow-hidden rounded-sm border border-white/10 bg-[#0E0E0E] text-white">
          <div className="border-b border-white/10 px-6 py-6 md:px-8">
            <span className="block text-sm font-bold uppercase tracking-[1.8px] text-[#FF1E27]">
              Localisation
            </span>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Tunisie</h2>
          </div>

          <div className="h-[360px] w-full md:h-[460px]">
            <iframe
              title="Carte de la Tunisie"
              src="https://www.google.com/maps?q=Tunisia&z=6&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
