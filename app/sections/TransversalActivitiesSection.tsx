import Image from "next/image";

type Activity = {
  id: string;
  category: string;
  organization: string;
  title: string;
  period: string;
  image: string;
  logo?: string;
  logoFit?: "cover" | "contain";
  description: string[];
  detailsUrl?: string;
};

const activities: Activity[] = [
  {
    id: "activite-president-club",
    category: "Leadership associatif",
    organization: "Coexister Club ESPRIT",
    title: "Président du club",
    period: "10/2022 - 10/2024",
    image: "/images/activites_transversales/coexister_club.jpeg",
    logo: "/images/logo_organisations/activites/coexister_club_logo.png",
    logoFit: "cover",
    detailsUrl: "https://www.instagram.com/coexister.esprit/",
    description: [
      "Pendant mes deux mandats en tant que fondateur et président du Coexister Club à l'ESPRIT, un club universitaire, j'ai eu l'opportunité de bâtir quelque chose d'exceptionnel à partir de zéro. Étant nouvellement arrivé dans l'établissement, j'ai commencé sans connaître personne, mais j'ai rapidement découvert un réseau de personnes ambitieuses et talentueuses avec lesquelles j'ai pu collaborer sur divers projets.",
      "En tant que président, j'ai dirigé le club dans l'organisation d'événements culturels et sportifs qui ont suscité un grand intérêt et une participation active de la communauté estudiantine. J'ai également eu le privilège de travailler en étroite collaboration avec diverses parties prenantes, notamment des sponsors, l'administration de l'établissement, les enseignants et d'autres clubs. Cette expérience m'a permis de développer des compétences en leadership, en gestion de projet et en travail d'équipe, tout en contribuant de manière significative à la vie étudiante de l'établissement.",
    ],
  },
  {
    id: "activite-maitre-nageur",
    category: "Sécurité et secours",
    organization: "Protection Civile de Bizerte",
    title: "Maître-nageur sauveteur",
    period: "Étés 2019 et 2020",
    image: "/images/activites_transversales/lifeguard.jpg",
    logo: "/images/logo_organisations/activites/logo_protection_civile.svg",
    logoFit: "contain",
    description: [
      "Au sein de la Protection Civile de Bizerte, j'ai exercé en tant que maître-nageur sauveteur durant les deux saisons d'été 2019 et 2020. Cette expérience m'a placé dans un environnement exigeant, où la vigilance, la rapidité d'analyse et la capacité à garder son sang-froid étaient essentielles au quotidien.",
      "Au-delà de la surveillance des zones de baignade, cette mission m'a appris à assumer une responsabilité directe vis-à-vis de la sécurité des personnes, à intervenir avec discipline et à travailler en coordination avec les équipes présentes sur le terrain. Elle a renforcé chez moi le sens du devoir, la rigueur et la résilience dans des contextes à forte pression.",
    ],
  },
  {
    id: "activite-agent-telephonique",
    category: "Relation client",
    organization: "Active Contact",
    title: "Conseiller téléphonique",
    period: "Été 2022",
    image: "/images/activites_transversales/active_contact2.png",
    logo: "/images/logo_organisations/activites/active_contact_logo.png",
    logoFit: "contain",
    description: [
      "Pendant la saison estivale 2022, j'ai occupé le poste de conseiller téléphonique chez Active Contact dans le cadre du service après-vente d'un grand site e-commerce tunisien. Mon rôle consistait à répondre aux demandes des clients, traiter leurs réclamations et apporter des solutions claires, rapides et professionnelles.",
      "L'objectif hebdomadaire était de maintenir un taux de satisfaction supérieur à 95 %, un niveau que j'ai pu conserver tout au long de cette expérience grâce au travail d'équipe et à une approche centrée sur l'écoute. Cette mission a renforcé mes compétences en communication, en gestion du temps, en résolution de problèmes ainsi que mon sens de l'empathie et de la patience.",
    ],
  },
];

export default function TransversalActivitiesSection() {
  return (
    <section className="w-full bg-[#0A0A0A] px-4 py-18 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-[1380px] text-white">
        <div className="text-center">
          <span className="block text-xl font-bold uppercase tracking-[2.2px] text-[#FF1E27] md:text-2xl">
            Activités transversales
          </span>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Parcours associatif et humain</h2>
          <p className="mx-auto mt-4 max-w-4xl text-base leading-8 text-white/80 md:text-lg">
            Des expériences construites en dehors du cadre académique, avec un impact
            concret sur mon leadership, mon sens de l&apos;organisation et ma capacité à
            mobiliser un collectif.
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {activities.map((activity) => (
            <article
              key={`${activity.title}-${activity.period}`}
              id={activity.id}
              className="overflow-hidden rounded-sm border border-white/10 bg-[#0E0E0E]"
            >
              <div className="grid lg:grid-cols-[1.08fr_1.22fr]">
                <div className="relative min-h-[320px] overflow-hidden md:min-h-[420px]">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-xs font-semibold uppercase tracking-[1.3px] text-white/90 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-[#FF1E27]" />
                    {activity.category}
                  </div>
                </div>

                <div className="flex flex-col justify-center px-6 py-7 md:px-9 md:py-10">
                  <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-start gap-4">
                      {activity.logo ? (
                        <div className="relative mt-1 h-14 w-14 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white">
                          <Image
                            src={activity.logo}
                            alt={activity.organization}
                            fill
                            sizes="56px"
                            className={activity.logoFit === "contain" ? "object-contain p-1.5" : "object-cover"}
                          />
                        </div>
                      ) : null}

                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[1.5px] text-[#FF1E27]">
                          {activity.organization}
                        </p>
                        <h3 className="text-3xl font-semibold text-white md:text-4xl">
                          {activity.title}
                        </h3>
                        <p className="mt-1 text-sm text-white/65 md:text-base">{activity.category}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-white/75 md:text-base">{activity.period}</p>
                  </div>

                  <div className="mt-6 space-y-5 text-sm leading-7 text-white/80 md:text-base">
                    {activity.description.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {activity.detailsUrl ? (
                    <div className="mt-8 border-t border-white/10 pt-5">
                      <a
                        href={activity.detailsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[1.2px] text-white transition-colors hover:text-[#FF1E27]"
                      >
                        <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5">
                          <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4 fill-none stroke-current"
                            strokeWidth="1.9"
                            aria-hidden="true"
                          >
                            <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                            <circle cx="12" cy="12" r="4.1" />
                            <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
                          </svg>
                        </span>
                        <span>Détails</span>
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
