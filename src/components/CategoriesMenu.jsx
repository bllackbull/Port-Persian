import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";

export default function CategoriesMenu({ darkMode, orderedCategories }) {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const closeTimeoutRef = useRef(null);

  if (location.pathname === "/search") return null;

  return (
    <div className="mt-4 flex items-center relative hidden md:flex">
      <div className="relative">
        <button
          onMouseEnter={() => {
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
            setDropdownOpen(true);
          }}
          onMouseLeave={() => {
            closeTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 200);
          }}
          className={`flex items-center font-bold px-4 py-2 whitespace-nowrap rounded-xl ${
            darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
        >
          <Menu size={20} className="mr-2" /> Categories{" "}
          <ChevronDown size={16} className="ml-1" />
        </button>
        {/* Dropdown on hover */}
        <div
          className={`fixed top-32 left-0 w-full ${
            darkMode ? "bg-gray-800" : "bg-white"
          } border ${
            darkMode ? "border-gray-700" : "border-gray-300"
          } rounded shadow-lg ${
            dropdownOpen ? "opacity-100" : "opacity-0"
          } transition-opacity ${
            dropdownOpen ? "pointer-events-auto" : "pointer-events-none"
          } z-50 flex`}
          onMouseEnter={() => {
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
          }}
          onMouseLeave={() => {
            closeTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 200);
          }}
        >
          <div className="w-1/4">
            {Object.keys(orderedCategories)
              .filter((cat) => cat !== "Hot Deals" && cat !== "Most Popular")
              .map((cat) => (
                <div
                  key={cat}
                  onMouseEnter={() => {
                    setHoveredCategory(cat);
                  }}
                  className={`font-bold flex items-center px-4 py-2 cursor-pointer w-full ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                  } min-h-10`}
                >
                  {orderedCategories[cat].icon} <span className="ml-2">{cat}</span>
                </div>
              ))}
          </div>
          <div className="w-3/4 border-l border-gray-300">
            {hoveredCategory && (
              <div>
                <div className="grid grid-cols-3 gap-4">
                  {orderedCategories[hoveredCategory].subcategories.map((sub) => (
                    <div key={sub.name} className="mb-2">
                      <div
                        className={`px-4 py-1 cursor-pointer ${
                          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                        } font-bold`}
                      >
                        {sub.name}
                      </div>
                      <div className="ml-4">
                        {sub.subsubs.map((subsub) => (
                          <div
                            key={subsub}
                            className={`px-4 py-1 cursor-pointer ${
                              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                            } text-sm`}
                          >
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
  );
}
