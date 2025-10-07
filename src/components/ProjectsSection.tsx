import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

export default function ProjectsSection() {
  return (
    <section id="work" className="py-24 relative">
      <div className="absolute inset-0 bg-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          What I've Built
        </h2>
        <p className="text-gray-400 text-center mb-16 text-lg">
          Intelligent systems that push the boundaries of AI interaction
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
