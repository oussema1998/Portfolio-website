"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { allProjects, type ProjectMedia } from "../data/projects";

type ActiveMedia = {
	projectTitle: string;
	media: ProjectMedia;
};

export default function AllProjectsSection() {
	const [activeMedia, setActiveMedia] = useState<ActiveMedia | null>(null);

	const mediaTitle = useMemo(() => {
		if (!activeMedia) {
			return "";
		}

		return `${activeMedia.projectTitle} - ${activeMedia.media.label}`;
	}, [activeMedia]);

	return (
		<>
			<section className="w-full bg-[#151515] px-4 py-18 md:px-8 md:py-20">
				<div className="mx-auto w-full max-w-[1480px] text-white">
					<div className="flex flex-col gap-4 text-center md:items-center">
						<span className="block text-xl font-bold uppercase tracking-[2.2px] text-[#FF1E27] md:text-2xl">
							Tous mes projets
						</span>
						<h2 className="text-4xl font-semibold md:text-5xl">Portfolio complet</h2>
						<p className="mx-auto max-w-4xl text-base leading-8 text-white/80 md:text-lg">
							L'ensemble des projets realises, du freelance aux stages, avec leurs
							ressources et demonstrations.
						</p>
					</div>

					<div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
						{allProjects.map((project) => (
							<article
								key={project.title}
								className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-white/10 bg-[#0E0E0E] px-6 py-7 shadow-[0_14px_40px_rgba(0,0,0,0.26)] transition-transform duration-300 hover:-translate-y-1 hover:border-[#FF1E27]/70"
							>
								<div className="flex items-start gap-4">
									<a
										href={project.url}
										target="_blank"
										rel="noreferrer"
										className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-zinc-300/40 bg-white/5 transition-colors hover:border-[#FF1E27]/70 hover:bg-[#FF1E27]/10"
										aria-label={`Ouvrir ${project.organization}`}
									>
										<Image
											src={project.logo}
											alt={project.organization}
											width={44}
											height={44}
											className="h-10 w-10 object-contain"
										/>
									</a>
									<h3 className="text-2xl font-bold uppercase leading-tight text-[#FF1E27] [font-family:var(--font-display)]">
										{project.title}
									</h3>
								</div>

								<p className="mt-2 text-xs leading-6 text-white/80 md:text-[13px]">
									{project.context}{" "}
									<a
										href={project.url}
										target="_blank"
										rel="noreferrer"
										className="font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-[#FF1E27]"
									>
										{project.organization}
									</a>{" "}
									<span className="text-white/70">{project.duration}</span>
								</p>

								<p className="mt-3 flex-1 text-sm leading-6 text-white/75 md:text-[15px]">
									{project.description}
								</p>

								{project.medias.length > 0 ? (
									<div className="mt-6">
										<p className="text-sm font-semibold uppercase tracking-[1.2px] text-white/90">
											Medias
										</p>
										<div className="mt-3 flex flex-wrap gap-2">
											{project.medias.map((media) => (
												<button
													key={`${project.title}-${media.href}`}
													type="button"
													onClick={() => setActiveMedia({ projectTitle: project.title, media })}
													className="inline-flex items-center rounded-sm border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-[#FF1E27]/70 hover:text-[#FF1E27]"
												>
													{media.label}
												</button>
											))}
										</div>
									</div>
								) : null}

								{project.githubUrl ? (
									<div className="mt-6 flex justify-end">
										<a
											href={project.githubUrl}
											target="_blank"
											rel="noreferrer"
											aria-label={`Ouvrir le repository GitHub de ${project.title}`}
											className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/20 bg-white/5 text-white transition-colors hover:border-[#FF1E27]/70 hover:text-[#FF1E27]"
										>
											<svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
												<path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.41-4.04-1.41-.55-1.38-1.34-1.75-1.34-1.75-1.09-.75.08-.74.08-.74 1.21.08 1.84 1.22 1.84 1.22 1.07 1.82 2.81 1.29 3.5.99.11-.77.42-1.29.76-1.59-2.67-.3-5.48-1.32-5.48-5.86 0-1.29.47-2.34 1.23-3.17-.12-.3-.53-1.53.12-3.2 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.28-1.53 3.29-1.21 3.29-1.21.66 1.67.25 2.9.12 3.2.77.83 1.23 1.88 1.23 3.17 0 4.55-2.81 5.55-5.49 5.86.43.37.82 1.09.82 2.2v3.26c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
											</svg>
										</a>
									</div>
								) : null}

								<div className="mt-4 flex flex-wrap gap-2">
									{project.tags.map((tag) => (
										<span
											key={`${project.title}-${tag}`}
											className="inline-flex items-center rounded-sm border border-[#3d6ea8]/40 bg-[#10233a]/55 px-2 py-1 text-[11px] font-medium text-[#a8d2ff]"
										>
											#{tag}
										</span>
									))}
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			{activeMedia ? (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
					<div className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-md border border-white/15 bg-[#090909]">
						<div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-white">
							<h3 className="pr-10 text-sm font-semibold uppercase tracking-[1px] text-white/85 md:text-base">
								{mediaTitle}
							</h3>
							<button
								type="button"
								onClick={() => setActiveMedia(null)}
								className="grid h-9 w-9 place-items-center rounded-sm border border-white/25 text-lg text-white transition-colors hover:border-[#FF1E27] hover:text-[#FF1E27]"
								aria-label="Fermer la fenetre media"
							>
								x
							</button>
						</div>

						<div className="max-h-[82vh] overflow-auto p-3 md:p-4">
							{activeMedia.media.type === "image" ? (
								<img
									src={activeMedia.media.href}
									alt={activeMedia.media.label}
									className="h-auto max-h-[78vh] w-full rounded-sm object-contain"
								/>
							) : null}

							{activeMedia.media.type === "video" ? (
								<video
									src={activeMedia.media.href}
									controls
									className="h-auto max-h-[78vh] w-full rounded-sm bg-black"
								/>
							) : null}

							{activeMedia.media.type === "pdf" ? (
								<iframe
									src={activeMedia.media.href}
									title={activeMedia.media.label}
									className="h-[78vh] w-full rounded-sm border border-white/10"
								/>
							) : null}
						</div>
					</div>
					<button
						type="button"
						className="absolute inset-0 -z-10"
						onClick={() => setActiveMedia(null)}
						aria-label="Fermer la fenetre media"
					/>
				</div>
			) : null}
		</>
	);
}
