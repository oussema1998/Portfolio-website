import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="w-full bg-[#0A0A0A] px-4 pb-20 pt-14 md:px-8 md:pb-24 md:pt-16">
      <div className="mx-auto w-full max-w-none text-center text-white">
        <Image
          src="/images/logo-oussema.png"
          alt="Logo Oussema"
          width={144}
          height={144}
          className="mx-auto h-auto w-[116px] object-contain md:w-[144px]"
          priority
        />
        <span className="mt-3 block text-xl font-bold uppercase tracking-[2.2px] text-[#FF1E27] md:mt-4 md:text-2xl">
          Qui suis-je ?
        </span>
        <h2 className="mt-2 text-4xl font-semibold md:text-5xl">ingénieur en informatique</h2>
        <p className="mt-8 w-full text-base leading-8 text-white/90 md:text-lg">
          Ingénieur en Business Intelligence et en Data, avec une expertise en
          pipelines de données, automatisation, modélisation prédictive et
          systèmes distribués. J'interviens également sur des projets
          d'intelligence artificielle, en concevant des solutions robustes et
          orientées impact. Spécialisé dans la conception d'architectures data
          fiables, performantes et scalables, intégrant ETL/ELT, machine
          learning, APIs et déploiement cloud. Leader naturel, actif,
          sportif et sociable, j'aime fédérer les équipes, collaborer
          efficacement et faire avancer les projets avec énergie et méthode.
        </p>
      </div>
    </section>
  );
}
