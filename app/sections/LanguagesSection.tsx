"use client";

import { useSitePreferences } from "../context/SitePreferencesContext";

type Language = {
	name: string;
	level: string;
	scoreLabel: string;
	score: number;
};

const languagesByLocale: Record<"fr" | "en", Language[]> = {
	fr: [
		{ name: "Anglais", level: "Avancée (C1)", scoreLabel: "4.5/5", score: 90 },
		{ name: "Français", level: "Avancée (C1)", scoreLabel: "4.5/5", score: 90 },
		{ name: "Arabe", level: "Native", scoreLabel: "5/5", score: 100 },
	],
	en: [
		{ name: "English", level: "Advanced (C1)", scoreLabel: "4.5/5", score: 90 },
		{ name: "French", level: "Advanced (C1)", scoreLabel: "4.5/5", score: 90 },
		{ name: "Arabic", level: "Native", scoreLabel: "5/5", score: 100 },
	],
};

export default function LanguagesSection() {
	const { locale } = useSitePreferences();
	const isFrench = locale === "fr";
	const languages = languagesByLocale[locale];
	const copy = isFrench
		? {
				kicker: "Langues",
				title: "Communication multilingue",
				description:
					"Des niveaux de maîtrise adaptés aux contextes techniques, professionnels et internationaux.",
		  }
		: {
				kicker: "Languages",
				title: "Multilingual communication",
				description:
					"Proficiency levels tailored to technical, professional, and international contexts.",
		  };

	return (
		<section className="w-full bg-[#151515] px-4 py-18 md:px-8 md:py-20">
			<div className="mx-auto w-full max-w-5xl text-white">
				<div className="text-center">
					<span className="block text-xl font-bold uppercase tracking-[2.2px] text-[#FF1E27] md:text-2xl">
						{copy.kicker}
					</span>
					<h2 className="mt-3 text-4xl font-semibold md:text-5xl">{copy.title}</h2>
					<p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/80 md:text-lg">
						{copy.description}
					</p>
				</div>

				<div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
					{languages.map((language) => (
						<div key={language.name} className="min-w-0">
							<div className="flex items-end justify-between gap-3">
								<div>
									<h3 className="text-xl font-semibold text-white md:text-2xl">{language.name}</h3>
									<p className="mt-1 text-sm text-white/70 md:text-[15px]">{language.level}</p>
								</div>
								<p className="shrink-0 text-sm font-semibold text-[#FF1E27] md:text-base">
									{language.scoreLabel}
								</p>
							</div>

							<div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
								<div
									className="h-full rounded-full bg-[#FF1E27]"
									style={{ width: `${language.score}%` }}
									aria-hidden="true"
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
