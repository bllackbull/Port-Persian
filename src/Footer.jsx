import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, Twitter, Youtube, ChevronUp } from 'lucide-react';

export default function Footer({ darkMode }) {
  const navigate = useNavigate();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={`mt-auto py-6 border-t ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-white'}`}>
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 onClick={() => navigate('/')} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold cursor-pointer">My Shop</h2>
        <div className="flex items-center justify-end">
          <button onClick={scrollToTop} aria-label="Back to top" title="Back to top" className={`p-2 rounded-lg border ${darkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-black'}`}>
            <ChevronUp size={20} />
          </button>
        </div>
      </div>

      <div className="flex justify-center space-x-6 my-4">
        <a href="#" className="opacity-70 hover:opacity-100">
          <Instagram size={24} />
        </a>
        <a href="#" className="opacity-70 hover:opacity-100">
          <Twitter size={24} />
        </a>
        <a href="#" className="opacity-70 hover:opacity-100">
          <Youtube size={24} />
        </a>
      </div>
      <p className="opacity-70 text-sm text-center">© 2025 My Shop. All Rights Reserved.</p>
    </footer>
  );
}