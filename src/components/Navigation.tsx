import { Sparkles } from 'lucide-react';

interface NavigationProps {
  currentPage: 'portfolio' | 'ai4s';
  onNavigate: (page: 'portfolio' | 'ai4s') => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate('portfolio')}
          className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:from-cyan-300 hover:to-blue-400 transition-all"
        >
          Ashish Sharma
        </button>

        {currentPage === 'portfolio' ? (
          <div className="flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('work')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => onNavigate('ai4s')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg font-medium transition-all transform hover:scale-105"
            >
              <Sparkles size={18} />
              ArticleForgeAI App
            </button>
          </div>
        ) : (
          <button
            onClick={() => onNavigate('portfolio')}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
          >
            Back to Portfolio
          </button>
        )}
      </div>
    </nav>
  );
}
