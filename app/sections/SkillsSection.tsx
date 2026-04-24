import Image from "next/image";

const skills = [
  {
    name: "SQL",
    logo: "/images/technologies_logos/sql_logo.png",
    description: "Conception et optimisation de requêtes pour la data analytics.",
  },
  {
    name: "Python",
    logo: "/images/technologies_logos/python.png",
    description: "Automatisation, ETL et développement data orienté production.",
  },
  {
    name: "Power BI",
    logo: "/images/technologies_logos/powerBI.png",
    description: "Visualisation claire des KPI pour une prise de décision rapide.",
  },
  {
    name: "PyTorch",
    logo: "/images/technologies_logos/PyTorch.png",
    description: "Deep learning pour modèles IA performants et adaptables.",
  },
];

export default function SkillsSection() {
  return (
    <section className="w-full bg-[#151515] px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-[1480px] text-center text-white">
        <span className="block text-xl font-bold uppercase tracking-[2.2px] text-[#FF1E27] md:text-2xl">
          Mes compétences
        </span>
        <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Technologies et expertises</h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {skills.map((skill) => (
            <article
              key={skill.name}
              className="rounded-xl border border-white/10 bg-[#101010] px-5 py-6 text-left shadow-[0_12px_36px_rgba(0,0,0,0.24)] transition-transform duration-300 hover:-translate-y-1 hover:border-[#FF1E27]/70"
            >
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
                  <Image
                    src={skill.logo}
                    alt={skill.name}
                    width={48}
                    height={48}
                    className={`h-12 w-12 object-contain ${
                      skill.name === "Python" ? "scale-125" : ""
                    }`}
                  />
                </div>
                <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/80 md:text-[15px]">
                {skill.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
