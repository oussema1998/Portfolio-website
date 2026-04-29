"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import { useSitePreferences } from "../context/SitePreferencesContext";

type Stat = {
	value: number;
	unit?: string;
	label: string;
	icon: React.ReactNode;
};

const statsByLocale = {
	fr: [
		{
			value: 9,
			unit: "Millions",
			label: "lignes traitees",
			icon: (
				<svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="1.8">
					<rect x="3.5" y="4.5" width="17" height="15" rx="1.8" />
					<path d="M7 9h10" />
					<path d="M7 12h10" />
					<path d="M7 15h6" />
				</svg>
			),
		},
		{
			value: 25,
			label: "technologies maitrisees",
			icon: (
				<svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="1.8">
					<path d="M12 2.5 20 7v10l-8 4.5L4 17V7l8-4.5Z" />
					<path d="M12 8.5v7" />
					<path d="M8.5 10.5 12 12l3.5-1.5" />
				</svg>
			),
		},
		{
			value: 7,
			label: "projets Data & IA",
			icon: (
				<svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="1.8">
					<path d="M3 7.5h8v12H3z" />
					<path d="M13 4.5h8v15h-8z" />
					<path d="M6 10.5h2" />
					<path d="M16 8.5h2" />
				</svg>
			),
		},
	],
	en: [
		{
			value: 9,
			unit: "Million",
			label: "lines processed",
			icon: (
				<svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="1.8">
					<rect x="3.5" y="4.5" width="17" height="15" rx="1.8" />
					<path d="M7 9h10" />
					<path d="M7 12h10" />
					<path d="M7 15h6" />
				</svg>
			),
		},
		{
			value: 25,
			label: "technologies mastered",
			icon: (
				<svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="1.8">
					<path d="M12 2.5 20 7v10l-8 4.5L4 17V7l8-4.5Z" />
					<path d="M12 8.5v7" />
					<path d="M8.5 10.5 12 12l3.5-1.5" />
				</svg>
			),
		},
		{
			value: 7,
			label: "Data & AI projects",
			icon: (
				<svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="1.8">
					<path d="M3 7.5h8v12H3z" />
					<path d="M13 4.5h8v15h-8z" />
					<path d="M6 10.5h2" />
					<path d="M16 8.5h2" />
				</svg>
			),
		},
	],
} as const;

export default function ImpactStatsSection() {
	const { locale } = useSitePreferences();
	const isFrench = locale === "fr";
	const stats = statsByLocale[locale];
		const copy = isFrench
		? { kicker: "Impact en chiffres", title: "Resultats quantifiables" }
		: { kicker: "Impact by the numbers", title: "Measurable results" };
	const sectionRef = useRef<HTMLElement | null>(null);
	const [hasAnimated, setHasAnimated] = useState(false);
	const [displayValues, setDisplayValues] = useState<number[]>(stats.map(() => 0));

	useEffect(() => {
		const section = sectionRef.current;
		if (!section || hasAnimated) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries[0]?.isIntersecting) {
					return;
				}

				setHasAnimated(true);
				observer.disconnect();
			},
			{ threshold: 0.35 },
		);

		observer.observe(section);

		return () => observer.disconnect();
	}, [hasAnimated]);

	useEffect(() => {
		if (!hasAnimated) {
			return;
		}

		const duration = 1700;
		const start = performance.now();
		let frameId = 0;

		const animate = (now: number) => {
			const elapsed = now - start;
			const progress = Math.min(elapsed / duration, 1);
			const eased = 1 - (1 - progress) ** 3;

			setDisplayValues(stats.map((stat) => Math.round(stat.value * eased)));

			if (progress < 1) {
				frameId = requestAnimationFrame(animate);
			}
		};

		frameId = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(frameId);
	}, [hasAnimated]);

	return (
		<section
			ref={sectionRef}
			className="w-full bg-[#0A0A0A] px-4 pb-20 pt-14 md:px-8 md:pb-24 md:pt-16"
		>
			<div className="mx-auto w-full max-w-[1480px] text-white">
				<div className="text-center">
					<span className="block text-xl font-bold uppercase tracking-[2.2px] text-[#FF1E27] md:text-2xl">
						{copy.kicker}
					</span>
					<h2 className="mt-3 text-4xl font-semibold md:text-5xl">{copy.title}</h2>
				</div>

				<div className="mt-10 grid gap-5 md:grid-cols-3">
					{stats.map((stat, index) => (
						<article
							key={stat.label}
							className="rounded-xl border border-white/15 bg-[#0E0E0E] px-6 py-7 text-center shadow-[0_12px_36px_rgba(0,0,0,0.28)]"
						>
							<div className="mx-auto grid h-12 w-12 place-items-center rounded-md border border-[#FF1E27]/60 bg-[#FF1E27]/10 text-[#FF1E27]">
								{stat.icon}
							</div>
							<p className="text-4xl font-extrabold leading-none text-[#FF1E27] md:text-5xl">
							+{displayValues[index]}
							{"unit" in stat ? ` ${stat.unit}` : ""}
							</p>
							<p className="mt-3 text-sm uppercase tracking-[1.2px] text-white/80 md:text-base">
								{stat.label}
							</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}