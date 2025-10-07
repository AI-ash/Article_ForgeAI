import { ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-6 hover:border-cyan-500/50 transition-all hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-2">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <span className="text-xs px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">
          {project.type}
        </span>
      </div>

      <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span className="font-medium">View Project</span>
          <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
      )}
    </div>
  );
}
