import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-zinc-900/10 bg-zinc-950 px-4 py-10 text-zinc-200 md:px-6">
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-start gap-4">
          <Link href="/" aria-label="Retour à l'accueil" className="shrink-0">
            <Image
              src="/images/logo-oussema.png"
              alt="Logo Oussema"
              width={96}
              height={96}
              className="h-auto w-[76px] object-contain"
            />
          </Link>
          <div className="space-y-3">
            <p className="text-lg font-semibold tracking-wide text-white">Portfolio Oussema Belhaouene</p>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
              Portfolio moderne et epure, à pour but de presenter mes projets avec
              clarté et impact.
            </p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold uppercase tracking-wider text-zinc-300">Navigation</p>
          <div className="grid gap-2">
            <Link href="/" className="w-fit transition-colors hover:text-white">
              Accueil
            </Link>
            <Link href="/projets" className="w-fit transition-colors hover:text-white">
              Projets
            </Link>
            <Link href="/services" className="w-fit transition-colors hover:text-white">
              Services
            </Link>
            <Link href="/contact" className="w-fit transition-colors hover:text-white">
              Contact
            </Link>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold uppercase tracking-wider text-zinc-300">Services</p>
          <div className="grid gap-2">
            <Link href="/services#service-data-analysis" className="w-fit transition-colors hover:text-white">
              Business intelligence & data
            </Link>
            <Link href="/services#service-intelligence-artificielle" className="w-fit transition-colors hover:text-white">
              Intelligence artificielle
            </Link>
            <Link href="/services#service-developpement-web" className="w-fit transition-colors hover:text-white">
              Développement web
            </Link>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold uppercase tracking-wider text-zinc-300">Contact</p>
          <a
            href="mailto:belhaouene.oussema@esprit.tn"
            className="text-zinc-400 transition-colors hover:text-white"
          >
            belhaouene.oussema@esprit.tn
          </a>
          <a
            href="tel:+21692073061"
            className="block text-zinc-400 transition-colors hover:text-white"
          >
            +216 92 073 061
          </a>
          <div className="h-1 w-24 rounded-full bg-[#FF1E27]" />
          <div className="flex items-center gap-4 pt-1">
            <a
              href="mailto:belhaouene.oussema@esprit.tn"
              aria-label="Envoyer un email"
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
              aria-label="Profil LinkedIn"
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
              aria-label="Profil GitHub"
              className="text-zinc-300 transition-colors hover:text-[#FF1E27]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.3 6.84 9.64.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.37-2.22-.26-4.56-1.15-4.56-5.1 0-1.13.39-2.05 1.03-2.78-.1-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.06A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.9-1.34 2.74-1.06 2.74-1.06.56 1.43.21 2.48.11 2.74.64.73 1.03 1.65 1.03 2.78 0 3.96-2.34 4.84-4.58 5.09.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-6xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright 2026. Tous droits reserves.</p>
        <p>Charte graphique: noir, blanc et rouge #FF1E27</p>
      </div>
    </footer>
  );
}
