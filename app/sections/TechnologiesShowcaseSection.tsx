"use client";

import Image from "next/image";
import { useSitePreferences } from "../context/SitePreferencesContext";

type Technology = {
	name: string;
	logo: string;
	lightCircle?: boolean;
};

const technologies: Technology[] = [
	{ name: "Apache Airflow", logo: "/images/technologies_logos/Apache%20Airflow.png" },
	{ name: "Apache Spark", logo: "/images/technologies_logos/Apache%20Spark.png" },
	{ name: "Docker", logo: "/images/technologies_logos/Docker_logo_PNG15.png" },
	{ name: "Elasticsearch", logo: "/images/technologies_logos/Elastic%20Search.png" },
	{ name: "Fabric", logo: "/images/technologies_logos/fabric.png" },
	{ name: "FastAPI", logo: "/images/technologies_logos/fastapi.svg" },
	{ name: "GitHub", logo: "/images/technologies_logos/GitHub.png", lightCircle: true },
	{ name: "HTML5", logo: "/images/technologies_logos/HTML5.png" },
	{ name: "Java", logo: "/images/technologies_logos/Java_Logo.svg.png" },
	{ name: "Kibana", logo: "/images/technologies_logos/Kibana.png" },
	{ name: "LangChain", logo: "/images/technologies_logos/langchain_logo.png" },
	{
		name: "Microsoft SQL Server",
		logo: "/images/technologies_logos/Microsoft%20SQL%20Server.png",
		lightCircle: true,
	},
	{ name: "SSMS", logo: "/images/technologies_logos/MSSQL_SSMS_21_icon.png" },
	{ name: "MySQL", logo: "/images/technologies_logos/MySQL.png" },
	{ name: "Node.js", logo: "/images/technologies_logos/node_logo.png" },
	{ name: "PostgreSQL", logo: "/images/technologies_logos/PostgresSQL.png" },
	{ name: "Power BI", logo: "/images/technologies_logos/powerBI.png" },
	{ name: "Python", logo: "/images/technologies_logos/python.png" },
	{ name: "PyTorch", logo: "/images/technologies_logos/PyTorch.png" },
	{ name: "React", logo: "/images/technologies_logos/React.png" },
	{ name: "Scikit-learn", logo: "/images/technologies_logos/Scikit_learn_logo_small.svg.png" },
	{ name: "SQL", logo: "/images/technologies_logos/sql_logo.png" },
	{ name: "Talend", logo: "/images/technologies_logos/talend.png" },
	{ name: "TensorFlow", logo: "/images/technologies_logos/tensorflow.png" },
];

export default function TechnologiesShowcaseSection() {
	const { locale } = useSitePreferences();
	const isFrench = locale === "fr";
	const copy = isFrench
		? {
				kicker: "Technologies",
				title: "Stack data, backend et IA",
				description:
					"Un socle technique polyvalent, mobilisé pour concevoir des solutions performantes, robustes et orientées impact.",
		  }
		: {
				kicker: "Technologies",
				title: "Data, backend, and AI stack",
				description:
					"A versatile technical foundation used to design high-performing, robust, and impact-driven solutions.",
		  };

	return (
		<section id="mes-competences" className="w-full scroll-mt-28 bg-[#0A0A0A] px-4 py-18 md:px-8 md:py-20">
			<div className="mx-auto w-full max-w-[1480px] text-white">
				<div className="text-center">
					<span className="block text-xl font-bold uppercase tracking-[2.2px] text-[#FF1E27] md:text-2xl">
						{copy.kicker}
					</span>
					<h2 className="mt-3 text-4xl font-semibold md:text-5xl">{copy.title}</h2>
					<p className="mx-auto mt-4 max-w-4xl text-base leading-8 text-white/80 md:text-lg">
						{copy.description}
					</p>
				</div>

				<div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
					{technologies.map((technology) => (
						<article
							key={technology.name}
							className="flex flex-col items-center rounded-sm border border-white/10 bg-[#0E0E0E] px-4 py-5 text-center transition-colors duration-300 hover:border-[#FF1E27]/70"
						>
							<div
								className={`relative flex h-16 w-16 items-center justify-center md:h-20 md:w-20 ${
									technology.lightCircle ? "rounded-full bg-white" : ""
								}`}
							>
								<Image
									src={technology.logo}
									alt={technology.name}
									fill
									sizes="80px"
									className={`object-contain ${technology.lightCircle ? "p-1" : ""}`}
								/>
							</div>
							<p className="mt-4 text-sm font-semibold text-white md:text-[15px]">{technology.name}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
