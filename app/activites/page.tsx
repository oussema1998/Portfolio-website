import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import LeisureSection from "../sections/LeisureSection";
import TransversalActivitiesSection from "../sections/TransversalActivitiesSection";

export const metadata: Metadata = {
  title: "Activités",
};

export default function ActivitesPage() {
  return (
    <>
      <PageHero
        image="/images/slider_page_2.jpg"
        alt={{ fr: "Bannière Activités", en: "Activities banner" }}
        currentLabel={{ fr: "Activités", en: "Activities" }}
      />
      <TransversalActivitiesSection />
      <LeisureSection />
    </>
  );
}
