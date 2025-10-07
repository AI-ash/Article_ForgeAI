import { useState } from 'react';
import Navigation from './components/Navigation';
import Portfolio from './pages/Portfolio';
import AI4s from './pages/AI4s';

function App() {
  const [currentPage, setCurrentPage] = useState<'portfolio' | 'article'>('portfolio');

  return (
    <div className="min-h-screen bg-black">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      {currentPage === 'portfolio' ? <Portfolio /> : <AI4s />}
    </div>
  );
}

export default App;
