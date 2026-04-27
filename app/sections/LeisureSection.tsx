import Image from "next/image";

type Leisure = {
  id: string;
  category: string;
  title: string;
  period: string;
  image: string;
  description: string;
  imageClassName?: string;
};

const leisures: Leisure[] = [
  {
    id: "loisir-musculation",
    category: "Sport",
    title: "Musculation",
    period: "Depuis 2016",
    image: "/images/activites_transversales/musculation.jpg",
    imageClassName: "object-cover object-[center_15%]",
    description:
      "Pratique régulière depuis 2016, la musculation m'a appris la discipline, la constance et le goût de l'effort progressif. C'est un repère important dans mon équilibre personnel et une école de rigueur que je retrouve aussi dans mon travail.",
  },
  {
    id: "loisir-camping",
    category: "Outdoor",
    title: "Camping",
    period: "Plus de 10 campings",
    image: "/images/activites_transversales/camping.jpg",
    description:
      "Le camping occupe une place particulière dans mes loisirs. Il nourrit mon goût pour l'aventure, l'autonomie et la vie en groupe, tout en renforçant mon sens de l'adaptation, de l'organisation et du partage.",
  },
];

export default function LeisureSection() {
  return (
    <section className="w-full bg-[#151515] px-4 pb-20 pt-4 md:px-8 md:pb-24 md:pt-6">
      <div className="mx-auto w-full max-w-[1380px] text-white">
        <div className="text-center">
          <span className="block text-xl font-bold uppercase tracking-[2.2px] text-[#FF1E27] md:text-2xl">
            Loisirs
          </span>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Équilibre, énergie et plein air</h2>
        </div>

        <div className="mt-14 space-y-8">
          {leisures.map((leisure) => (
            <article
              key={`${leisure.title}-${leisure.period}`}
              id={leisure.id}
              className="overflow-hidden rounded-sm border border-white/10 bg-[#0E0E0E]"
            >
              <div className="grid lg:grid-cols-[1.08fr_1.22fr]">
                <div className="relative min-h-[320px] overflow-hidden md:min-h-[420px]">
                  <Image
                    src={leisure.image}
                    alt={leisure.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={leisure.imageClassName ?? "object-cover"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-xs font-semibold uppercase tracking-[1.3px] text-white/90 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-[#FF1E27]" />
                    {leisure.category}
                  </div>
                </div>

                <div className="flex flex-col justify-center px-6 py-7 md:px-9 md:py-10">
                  <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[1.5px] text-[#FF1E27]">
                        {leisure.category}
                      </p>
                      <h3 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
                        {leisure.title}
                      </h3>
                    </div>
                    <p className="text-sm font-semibold text-white/75 md:text-base">{leisure.period}</p>
                  </div>

                  <div className="mt-6 text-sm leading-7 text-white/80 md:text-base">
                    <p>{leisure.description}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
