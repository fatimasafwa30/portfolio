import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/Hero";
import AboutSection from "@/components/sections/About";
import SkillsSection from "@/components/sections/Skills";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import ContactSection from "@/components/sections/Contact";
import AgentAnimationProvider from "@/components/animation/AgentAnimationProvider";
import AgentOverlay from "@/components/animation/AgentOverlay";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-zinc-100 relative">
      <AgentAnimationProvider>
        <AgentOverlay />
      </AgentAnimationProvider>
      <Header />
      <main
        id="main-content"
        className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      >
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
