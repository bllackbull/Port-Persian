import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function SearchPage({ darkMode, setDarkMode, language, setLanguage, cart, setCart, orderedCategories }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const navigateToSection = (cat) => {
    const id = cat.replace(/\s+/g, "-").toLowerCase();
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth >= 768) {
        navigate('/');
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [navigate]);

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} cart={cart} orderedCategories={orderedCategories} />
      <div
        className={
          darkMode
            ? "min-h-screen bg-gray-900 text-white pb-20 pt-20 md:pt-28"
            : "min-h-screen bg-gray-100 text-black pb-20 pt-20 md:pt-28"
        }
      >
        {/* Header */}
        <div className={`flex items-center p-4 ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow`}>
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className={`w-full px-4 py-2 rounded-xl border transition ${
                darkMode
                  ? "border-gray-700 bg-gray-800 text-white"
                  : "border-gray-300 bg-gray-100 text-black"
              }`}
              autoFocus
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" size={20} />
          </div>
        </div>

        {/* Tags / Categories */}
        <div className="p-4">
          <div className="flex flex-wrap gap-2">
            {Object.keys(orderedCategories).map((tag) => (
              <button
                key={tag}
                onClick={() => navigateToSection(tag)}
                className={`flex items-center px-3 py-2 rounded-full border border-blue-600 text-blue-600 text-sm hover:bg-blue-100 ${
                  darkMode ? "text-blue-300 border-blue-600" : ""
                }`}
              >
                <span className="mr-2">{orderedCategories[tag] && orderedCategories[tag].icon}</span>
                <span>{tag}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}

export default SearchPage;