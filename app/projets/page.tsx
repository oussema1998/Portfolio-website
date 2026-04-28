import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import AboutSection from "../sections/AboutSection";
import AllProjectsSection from "../sections/AllProjectsSection";
import AcademicTimelineSection from "../sections/AcademicTimelineSection";
import ImpactStatsSection from "../sections/ImpactStatsSection";
import LanguagesSection from "../sections/LanguagesSection";
import TechnologiesShowcaseSection from "../sections/TechnologiesShowcaseSection";

export const metadata: Metadata = {
  title: "Projets",
};

export default function ProjetsPage() {
  return (
    <>
      <PageHero
        image="/images/slider_page_1.jpg"
        alt={{ fr: "Bannière Projets", en: "Projects banner" }}
        currentLabel={{ fr: "Projets", en: "Projects" }}
        imageClassName="object-cover object-top"
      />

      <AboutSection />

      <AcademicTimelineSection />

      <ImpactStatsSection />

      <AllProjectsSection />

      <TechnologiesShowcaseSection />

      <LanguagesSection />
    </>
  );
}
