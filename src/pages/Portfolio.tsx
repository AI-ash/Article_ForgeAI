import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import AnimatedBackground from '../components/AnimatedBackground';

export default function Portfolio() {
  return (
    <div className="bg-black text-white relative">
      <AnimatedBackground />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
