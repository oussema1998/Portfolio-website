type Service = {
  name: string;
  pitch: string;
  details: string;
  deliverables: string[];
  icon: JSX.Element;
};

const services: Service[] = [
  {
    name: "Architecture data & automatisation",
    pitch: "Structurer, fiabiliser et fluidifier vos flux de données.",
    details:
      "Mise en place de pipelines robustes, automatisation des traitements, centralisation des sources et fiabilisation des données pour soutenir vos opérations et vos décisions.",
    deliverables: ["Pipelines ETL/ELT", "Automatisation", "Data warehouse"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current" strokeWidth="1.8" aria-hidden="true">
        <rect x="4" y="4" width="6" height="6" rx="1.2" />
        <rect x="14" y="4" width="6" height="6" rx="1.2" />
        <rect x="9" y="14" width="6" height="6" rx="1.2" />
        <path d="M10 7h4" />
        <path d="M12 10v4" />
      </svg>
    ),
  },
  {
    name: "Data analysis & reporting",
    pitch: "Transformer les données en décisions lisibles et utiles.",
    details:
      "Création de tableaux de bord clairs, suivi des KPI, exploration des données et restitution orientée métier pour mieux piloter la performance.",
    deliverables: ["Dashboards KPI", "Reporting métier", "Analyse exploratoire"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current" strokeWidth="1.8" aria-hidden="true">
        <path d="M4 19V9" />
        <path d="M10 19V5" />
        <path d="M16 19v-7" />
        <path d="M22 19V3" />
      </svg>
    ),
  },
  {
    name: "Solutions d'intelligence artificielle",
    pitch: "Automatiser, assister et enrichir l'expérience utilisateur.",
    details:
      "Conception de solutions IA adaptées à vos cas d'usage: assistants intelligents, modèles prédictifs, classification, recommandations ou enrichissement des processus.",
    deliverables: ["Chatbots IA", "Prédiction", "Automatisation intelligente"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 4a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V8a4 4 0 0 1 4-4Z" />
        <path d="M6 20a6 6 0 0 1 12 0" />
        <circle cx="5" cy="9" r="1.5" />
        <circle cx="19" cy="9" r="1.5" />
      </svg>
    ),
  },
  {
    name: "Développement web",
    pitch: "Donner vie à des outils web performants et utiles.",
    details:
      "Développement d'applications et d'interfaces web modernes, pensées pour la clarté, la rapidité, la maintenabilité et l'usage réel côté client ou équipe interne.",
    deliverables: ["Applications métier", "Interfaces modernes", "APIs & intégration"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current" strokeWidth="1.8" aria-hidden="true">
        <path d="M4 5h16v11H4z" />
        <path d="M8 19h8" />
        <path d="M10 16v3m4-3v3" />
      </svg>
    ),
  },
];

export default function ServicesOfferSection() {
  return (
    <section className="w-full bg-[#151515] px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-[1480px] text-white">
        <div className="text-center">
          <span className="block text-xl font-bold uppercase tracking-[2.2px] text-[#FF1E27] md:text-2xl">
            Services
          </span>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Des solutions pensées pour vos besoins</h2>
          <p className="mx-auto mt-4 max-w-4xl text-base leading-8 text-white/80 md:text-lg">
            J&apos;accompagne les entreprises sur des problématiques data, pilotage,
            intelligence artificielle et applications web, avec une approche orientée
            impact, clarté et résultats concrets.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.name}
              className="flex h-full flex-col rounded-sm border border-white/10 bg-[#0E0E0E] px-6 py-7 shadow-[0_14px_40px_rgba(0,0,0,0.26)] transition-transform duration-300 hover:-translate-y-1 hover:border-[#FF1E27]/70"
            >
              <div className="grid h-14 w-14 place-items-center rounded-md border border-[#FF1E27]/50 bg-[#FF1E27]/10 text-[#FF1E27]">
                {service.icon}
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-white">{service.name}</h3>
              <p className="mt-3 text-base font-medium leading-7 text-[#FF1E27]">{service.pitch}</p>
              <p className="mt-4 flex-1 text-sm leading-7 text-white/78 md:text-[15px]">{service.details}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {service.deliverables.map((item) => (
                  <span
                    key={`${service.name}-${item}`}
                    className="inline-flex items-center rounded-sm border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[1px] text-white/82"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
