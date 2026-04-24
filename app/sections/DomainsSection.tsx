export default function DomainsSection() {
  return (
    <section className="w-full bg-[#0A0A0A] px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-none text-center text-white">
        <span className="block text-xl font-bold uppercase tracking-[2.2px] text-[#FF1E27] md:text-2xl">
          Mes domaines
        </span>
        <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Construire, analyser et innover</h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          <article className="px-3">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-white/10 text-[#FF1E27] transition-colors duration-300 hover:bg-[#FF1E27] hover:text-white">
              <svg viewBox="0 0 24 24" className="h-11 w-11 fill-none stroke-current" strokeWidth="1.8" aria-hidden="true">
                <path d="M4 5h16v11H4z" />
                <path d="M8 19h8" />
                <path d="M10 16v3m4-3v3" />
              </svg>
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-white">Développement web</h3>
            <p className="mx-auto mt-4 max-w-sm text-[15px] leading-7 text-white/80">
              Création d&apos;applications web modernes, performantes et responsives,
              avec une architecture claire orientée qualité et expérience utilisateur.
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
            <h3 className="mt-6 text-2xl font-semibold text-white">Data analytics</h3>
            <p className="mx-auto mt-4 max-w-sm text-[15px] leading-7 text-white/80">
              Analyse des données, suivi des KPI et visualisation métier pour
              transformer les données brutes en décisions concrètes.
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
            <h3 className="mt-6 text-2xl font-semibold text-white">Intelligence artificielle</h3>
            <p className="mx-auto mt-4 max-w-sm text-[15px] leading-7 text-white/80">
              Développement de solutions IA et modèles prédictifs pour automatiser,
              anticiper et améliorer la performance des processus métiers.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
