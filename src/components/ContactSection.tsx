import { Mail, Github, Linkedin } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Let's Build Something Intelligent Together
        </h2>

        <p className="text-gray-400 text-lg mb-12">
          Interested in collaborating on AI projects? Let's connect.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={() => window.location.href = 'mailto:ashishsharmadevil602@gmail.com'}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30 cursor-pointer"
          >
            <Mail size={20} />
            Email
          </button>

          <a
            href="https://github.com/AI-ash"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-medium transition-all transform hover:scale-105"
          >
            <Github size={20} />
            GitHub
          </a>

          <a
            href="https://linkedin.com/ashish-sharma-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-medium transition-all transform hover:scale-105"
          >
            <Linkedin size={20} />
            LinkedIn
          </a>
        </div>

        <footer className="text-gray-500 text-sm">
          © 2025 Ashish Sharma | Designed with Intelligence
        </footer>
      </div>
    </section>
  );
}
