export type ProjectMedia = {
	label: string;
	href: string;
	type: "image" | "video" | "pdf";
};

export type Project = {
	title: string;
	context: string;
	organization: string;
	duration: string;
	logo: string;
	url: string;
	githubUrl?: string;
	tags: string[];
	description: string;
	medias: ProjectMedia[];
};

const getProjectEndDateValue = (duration: string): number => {
	const match = duration.match(/-\s*(\d{1,2})\/(\d{4})\)/);
	if (!match) {
		return Number.NEGATIVE_INFINITY;
	}

	const month = Number(match[1]);
	const year = Number(match[2]);
	return year * 100 + month;
};

const projects: Project[] = [
	{
		title: "Collection et nettoyage de donnees",
		context: "projet freelance",
		organization: "@Elyssa-call",
		duration: "(2/2026 - 3/2026)",
		logo: "/images/logo_organisations/Elyssa_call.png",
		url: "https://www.linkedin.com/in/khouani-farid-c-e-o-d%E2%80%99elyssa-call-494082279/",
		githubUrl: "https://github.com/oussema1998/Elyssa-call-scrapping_and_cleaning",
		tags: ["data cleaning", "web scrapping"],
		description:
			"Collecte automatisee de donnees d'infirmiers liberaux en France depuis une source unique, avec gestion des CAPTCHA. Nettoyage, normalisation et structuration des informations afin de fournir une base fiable, exploitable et orientee prospection.",
		medias: [],
	},
	{
		title: "Devhotel: Analyse intelligente des offres de sejours",
		context: "stage fin d'etudes",
		organization: "@Devoteam",
		duration: "(3/2025 - 9/2025)",
		logo: "/images/logo_organisations/devoteam.png",
		url: "https://www.devoteam.com/",
		tags: ["web scraping", "ETL", "data visualization", "agentic RAG", "machine learning"],
		description:
			"Realisation d'une chaine data de bout en bout: collecte et preparation des donnees hotellerie, conception d'un data warehouse, developpement des flux ETL, creation de dashboards Power BI, modeles de prediction, chatbot RAG et application web metier.",
		medias: [
			{
				label: "Video commerciale",
				href: "https://www.youtube.com/watch?v=9r0d8kWnfSY",
				type: "video",
			},
			{
				label: "Rapport PFE",
				href: "/images/projects_ressources/devhotel/PFE_DEVOTEAM%20(1).pdf",
				type: "pdf",
			},
		],
	},
	{
		title: "Assistant FAQ intelligent",
		context: "projet test technique",
		organization: "@north human solutions",
		duration: "(3/2026 - 4/2026)",
		logo: "/images/logo_organisations/north_human.jpg",
		url: "https://northhumans.ca/en/",
		githubUrl: "https://github.com/oussema1998/FAQ-agent-ai",
		tags: ["Web backend", "RAG", "generative AI"],
		description:
			"Conception d'un assistant conversationnel intelligent pour e-commerce, capable de repondre aux FAQ a partir d'une base de connaissance, afin d'ameliorer la qualite de reponse et l'experience client.",
		medias: [
			{
				label: "Video demonstrative",
				href: "https://www.youtube.com/watch?v=mQggdGgLxDg",
				type: "video",
			},
		],
	},
	{
		title: "Analyse des provisions de bourse et automatisation ETL",
		context: "stage",
		organization: "@BVMT",
		duration: "(7/2024 - 9/2024)",
		logo: "/images/logo_organisations/BVMT.png",
		url: "https://www.linkedin.com/company/tunisstockexchange/",
		githubUrl: "https://github.com/oussema1998/BVMT",
		tags: ["ETL Talend", "automatisation", "Power BI", "KPI", "machine learning"],
		description:
			"Contribution a un projet d'analyse des donnees de bourse quotidiennes: mise en place d'un pipeline ETL avec Talend, automatisation de l'execution quotidienne, creation de tableaux de bord et KPI sur Power BI, puis developpement de modeles de prediction en machine learning.",
		medias: [
			{
				label: "Dashboard Power BI",
				href: "/images/projects_ressources/bvmt/dashboardBI.png",
				type: "image",
			},
			{
				label: "Vue Angular BI",
				href: "/images/projects_ressources/bvmt/angularBI.png",
				type: "image",
			},
			{
				label: "Rapport de stage",
				href: "/images/projects_ressources/bvmt/Rapport_de_stage.pdf",
				type: "pdf",
			},
		],
	},
	{
		title: "Animal10 Classifier - computer vision",
		context: "projet academique",
		organization: "@ESPRIT",
		duration: "(1/2026 - 2/2026)",
		logo: "/images/logo_organisations/ESPRIT.png",
		url: "https://www.esprit.tn/",
		githubUrl: "https://www.kaggle.com/code/oussemabelhaouane/animal10-classifier",
		tags: ["python", "computer vision", "classification", "machine learning"],
		description:
			"Developpement d'un classifieur d'animaux en Python: l'utilisateur envoie une image d'animal et le modele predit automatiquement sa classe. Notebook du projet disponible sur Kaggle.",
		medias: [],
	},
	{
		title: "Pipeline Big Data Bitcoin",
		context: "projet academique",
		organization: "@ESPRIT",
		duration: "(12/2025 - 1/2026)",
		logo: "/images/logo_organisations/ESPRIT.png",
		url: "https://www.esprit.tn/",
		tags: ["Kafka", "Spark", "Elasticsearch", "Kibana", "Airflow", "Docker"],
		description:
			"Conception d'un pipeline Big Data pour des donnees Bitcoin avec ingestion via Kafka, traitement avec Spark, indexation dans Elasticsearch, visualisation sur Kibana et orchestration des jobs avec Airflow. L'integration complete a ete realisee et deployee avec Docker pour assurer un environnement reproductible et automatiser l'execution des composants.",
		medias: [
			{
				label: "Rapport du projet",
				href: "/images/projects_ressources/bitcoin_BigData/rendu2.pdf",
				type: "pdf",
			},
		],
	},
	{
		title: "Gestion intelligente de flotte de vehicules et chauffeurs",
		context: "projet académique",
		organization: "@SPN",
		duration: "(1/2024 - 5/2024)",
		logo: "/images/logo_organisations/SPN_logo.png",
		url: "https://www.swisspremiumnegoce.com/",
		githubUrl: "https://github.com/oussema1998/SPN_WEB",
		tags: ["web scraping", "excel", "ETL Talend", "power bi", "chatbot"],
		description:
			"Realisation d'une solution de gestion intelligente de flotte et chauffeurs: collecte de donnees par scraping et fichiers Excel, pipeline ETL avec Talend, visualisation et suivi des KPI sur Power BI, puis creation d'un chatbot repondant aux questions metier.",
		medias: [
			{
				label: "Video demonstrative",
				href: "https://www.youtube.com/watch?v=qNLugSRi8zM&t=41s",
				type: "video",
			},
		],
	},
];

export const allProjects: Project[] = [...projects].sort(
	(a, b) => getProjectEndDateValue(b.duration) - getProjectEndDateValue(a.duration),
);
