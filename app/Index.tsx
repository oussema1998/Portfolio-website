import HomeSlider from "./components/HomeSlider";
import AboutSection from "./sections/AboutSection";
import ActivitiesSection from "./sections/ActivitiesSection";
import AppointmentSection from "./sections/AppointmentSection";
import DomainsSection from "./sections/DomainsSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import TestimonialsSection from "./sections/TestimonialsSection";

export default function Index() {
  return (
    <>
      <HomeSlider />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <DomainsSection />
      <ActivitiesSection />
      <AppointmentSection />
      <TestimonialsSection />
    </>
  );
}
