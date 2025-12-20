import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Globe, Sun, Moon, Menu, User, ShoppingCart, ChevronDown, Home as HomeIcon, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Navbar({ darkMode, setDarkMode, language, setLanguage, cart, orderedCategories }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [mobilePanel, setMobilePanel] = useState(null); // 'menu' | 'search' | null
  const [mobileCategory, setMobileCategory] = useState(null);
  const closeTimeoutRef = useRef(null);

  return (
    <>
    <nav
      className={
        "fixed top-0 left-0 w-full shadow px-6 py-4 z-50 transition " +
        (darkMode ? "bg-gray-900 text-white" : "bg-white text-black")
      }
    >
      <div className="flex items-center justify-between">
        <h1 onClick={() => navigate('/')} className="text-2xl font-bold cursor-pointer">My Shop</h1>

        {/* Search Bar */}
        <div className="flex-1 mx-6 hidden md:flex">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className={
                "w-full px-4 py-2 rounded-xl border transition " +
                (darkMode
                  ? "border-gray-700 bg-gray-800 text-white"
                  : "border-gray-300 bg-gray-100 text-black")
              }
            />
            <Search
              className="absolute right-3 top-2.5 text-gray-500"
              size={20}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <button className="md:hidden p-2 rounded-lg border relative z-[60]" onClick={() => setMobilePanel('menu')} aria-label="Open menu">
            <Menu size={20} />
          </button>

          <button
            onClick={() => setLanguage(language === "EN" ? "FA" : "EN")}
            className={`hidden md:flex items-center space-x-1 px-3 py-2 rounded-lg border ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            <Globe size={18} /> <span>{language}</span>
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`hidden md:inline p-2 rounded-lg border ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button className={`hidden md:inline p-2 rounded-lg border ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
            <User size={20} />
          </button>

          <button className={`hidden md:inline relative p-2 rounded-lg border ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`} onClick={() => { if (location.pathname !== '/cart') navigate('/cart'); }} aria-label="Open cart">
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>






      </div>

      {/* Categories Row */}
      <div className="mt-4 flex items-center relative hidden md:flex">
        <div className="relative">
          <button onMouseEnter={() => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); setDropdownOpen(true); }} onMouseLeave={() => { closeTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 200); }} className={`flex items-center font-bold px-4 py-2 whitespace-nowrap ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-full`}>
            <Menu size={20} className="mr-2" /> All Categories{" "}
            <ChevronDown size={16} className="ml-1" />
          </button>
          {/* Dropdown on hover */}
          <div className={`fixed top-32 left-0 w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} rounded shadow-lg ${dropdownOpen ? 'opacity-100' : 'opacity-0'} transition-opacity ${dropdownOpen ? 'pointer-events-auto' : 'pointer-events-none'} z-50 flex`} onMouseEnter={() => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); }} onMouseLeave={() => { closeTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 200); }}>
            <div className="w-1/4">
              {Object.keys(orderedCategories).filter(cat => cat !== "Hot Deals" && cat !== "Most Popular").map(cat => (
                <div key={cat} onMouseEnter={() => { setHoveredCategory(cat); }} className={`font-bold flex items-center px-4 py-2 cursor-pointer w-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} min-h-10`}>
                  {orderedCategories[cat].icon} <span className="ml-2">{cat}</span>
                </div>
              ))}
            </div>
            <div className="w-3/4 border-l border-gray-300">
              {hoveredCategory && (
                <div>
                  <div className="grid grid-cols-3 gap-4">
                    {orderedCategories[hoveredCategory].subcategories.map(sub => (
                      <div key={sub.name} className="mb-2">
                        <div className={`px-4 py-1 cursor-pointer ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} font-bold`}>
                          {sub.name}
                        </div>
                        <div className="ml-4">
                          {sub.subsubs.map(subsub => (
                            <div key={subsub} className={`px-4 py-1 cursor-pointer ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} text-sm`}>
                              {subsub}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-px h-6 bg-gray-400 mx-2" />

        <div className="flex space-x-1 overflow-x-auto">
          {Object.entries(orderedCategories).map(([cat, data]) => (
            <span
              key={cat}
              className="flex items-center px-2 py-1 rounded-full border border-blue-600 text-blue-600 cursor-pointer hover:bg-blue-100 whitespace-nowrap text-sm"
            >
              {data.icon} <span className="ml-1">{cat}</span>
            </span>
          ))}
        </div>
      </div>
    </nav>

    {/* Mobile menu panel (menu) - moved out of nav to ensure it's above the bottom tab bar */}
    {mobilePanel === 'menu' && (
      <div className={`fixed inset-0 z-[9999] ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobilePanel(null)} className="p-2 rounded-lg border" aria-label="Close menu">
              <X size={18} />
            </button>
            <span className="font-bold">Menu</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { setLanguage(language === 'EN' ? 'FA' : 'EN'); }} className="p-2 rounded-lg border"><Globe size={18} /></button>
          </div>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-full">
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Categories</h3>
            <ul className="space-y-2">
              {Object.entries(orderedCategories).map(([cat, data]) => (
                <li key={cat}>
                  <button onClick={() => { setMobileCategory(cat); }} className="w-full flex items-center justify-between p-3 rounded border">
                    <div className="flex items-center"><span className="mr-3">{data.icon}</span><span>{cat}</span></div>
                    <ChevronDown size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 space-y-3">
            <button className="w-full p-3 rounded border">Account</button>
          </div>
        </div>
      </div>
    )}

    {/* Mobile category overlay (layers above tab bar) - moved out so it can appear above tabs */}
    {mobileCategory && (
      <div className={`fixed inset-0 z-[10000] ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} p-4`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileCategory(null)} className="p-2 rounded-lg border">Back</button>
            <h3 className="font-bold">{mobileCategory}</h3>
          </div>
          <div />
        </div>
        <div className="overflow-y-auto">
          {orderedCategories[mobileCategory] && orderedCategories[mobileCategory].subcategories.map((sub, idx) => (
            <div key={idx} className="mb-3">
              <div className={`px-3 py-2 rounded border ${darkMode ? 'border-gray-700' : ''}`}>{sub.name}</div>
              <div className="ml-4 mt-2 space-y-1">
                {sub.subsubs.map(s => (
                  <button key={s} className="w-full text-left text-sm p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">{s}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Mobile search panel (layers under tab bar) */}
    {mobilePanel === 'search' && (
      <div className={`fixed inset-0 z-[9998] ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <div className="p-4 border-b">
          <input autoFocus className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-black'}`} placeholder="Search..." />
        </div>
        <div className="p-4">{/* empty full-screen body */}</div>
      </div>
    )}

    {/* Mobile bottom tab bar (visible on phones) */}
    <div className="fixed left-4 right-4 bottom-16 md:hidden z-50">
      <div className={`${darkMode ? 'bg-gray-900 text-white border' : 'bg-white text-black border'} rounded-xl shadow px-2 py-2 flex`}>
        <button onClick={() => navigate('/')} className={`flex-1 flex flex-col items-center justify-center text-sm ${location.pathname === '/' ? (darkMode ? 'bg-blue-900 text-white font-bold rounded-md' : 'bg-blue-100 text-blue-600 font-bold rounded-md') : ''}`}>
          <HomeIcon size={18} />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button onClick={() => setMobilePanel('search')} className="flex-1 flex flex-col items-center justify-center text-sm">
          <Search size={18} />
          <span className="text-xs mt-1">Search</span>
        </button>
        <button onClick={() => { if (location.pathname !== '/cart') navigate('/cart'); }} className={`flex-1 flex flex-col items-center justify-center text-sm relative ${location.pathname === '/cart' ? (darkMode ? 'bg-blue-900 text-white font-bold rounded-md' : 'bg-blue-100 text-blue-600 font-bold rounded-md') : ''}`}>
          <ShoppingCart size={18} />
          <span className="text-xs mt-1">Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cart.length}</span>
          )}
        </button>
        <button className="flex-1 flex flex-col items-center justify-center text-sm">
          <User size={18} />
          <span className="text-xs mt-1">Account</span>
        </button>
      </div>
    </div>
    </> 
  );
}
