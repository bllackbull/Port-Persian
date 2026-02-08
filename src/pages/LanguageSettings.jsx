import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Check } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function LanguageSettings({ darkMode, setDarkMode, language, setLanguage, cart, orderedCategories }) {
  const navigate = useNavigate();

  const languages = [
    { code: "EN", name: "English" },
    { code: "FA", name: "فارسی (Persian)" },
    { code: "AR", name: "العربية (Arabic)" },
    { code: "ES", name: "Español (Spanish)" },
    { code: "FR", name: "Français (French)" },
    { code: "DE", name: "Deutsch (German)" },
  ];

  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
        cart={cart}
        orderedCategories={orderedCategories}
      />
      <div
        className={
          darkMode
            ? "min-h-screen bg-gray-900 text-white pb-20 pt-24 md:pt-32 px-4 md:px-6"
            : "min-h-screen bg-white text-black pb-20 pt-24 md:pt-32 px-4 md:px-6"
        }
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate("/settings")}
              className={`p-2 rounded-lg border ${
                darkMode ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold">Language</h1>
          </div>

          <div
            className={`rounded-xl p-2 ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            {languages.map((lang, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setLanguage(lang.code);
                  setTimeout(() => navigate("/settings"), 300);
                }}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                } ${
                  language === lang.code
                    ? darkMode
                      ? "bg-black/40 text-blue-300 font-bold"
                      : "bg-blue-100 text-blue-600 font-bold"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium">{lang.name}</span>
                </div>
                {language === lang.code && (
                  <Check size={20} className={darkMode ? "text-blue-300" : "text-blue-600"} />
                )}
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
