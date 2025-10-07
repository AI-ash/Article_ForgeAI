import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const scrollToWork = () => {
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-black to-blue-950/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="mb-8 inline-block">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-5xl font-bold shadow-2xl shadow-cyan-500/50">
            ASH
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent animate-gradient">
          Hey, I'm Ashish Sharma
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-4">
          An AI & Software Developer passionate about creating
        </p>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          intelligent, human-centered applications.
        </p>

        <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12">
          Exploring the edge of AI — from voice assistants and emotional companions
          to smart automation and education tech.
        </p>

        <button
          onClick={scrollToWork}
          className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg font-medium text-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30"
        >
          View My Work
        </button>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-gray-400" />
        </div>
      </div>
    </section>
  );
}
