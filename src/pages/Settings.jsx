import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, User, Package, MapPin, Heart, CreditCard, Bell, HelpCircle, LogIn, Globe, Moon, Info } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function Settings({ darkMode, setDarkMode, language, setLanguage, cart, orderedCategories }) {
  const navigate = useNavigate();
  const isLoggedIn = false; // Placeholder for authentication state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const accountSections = [
    { icon: <Package size={20} />, label: "My Orders", disabled: !isLoggedIn },
    { icon: <MapPin size={20} />, label: "My Addresses", disabled: !isLoggedIn },
    { icon: <Heart size={20} />, label: "Wishlist", disabled: !isLoggedIn },
    { icon: <CreditCard size={20} />, label: "Payment Methods", disabled: !isLoggedIn },
  ];

  const otherSections = [
    { icon: <HelpCircle size={20} />, label: "Help & Support", disabled: false },
    { icon: <Info size={20} />, label: "About Us", disabled: false },
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
            ? "min-h-screen bg-gray-900 text-white pb-20 pt-26 md:pt-32 px-4 md:px-6"
            : "min-h-screen bg-white text-black pb-20 pt-26 md:pt-32 px-4 md:px-6"
        }
      >
        <div className="max-w-2xl mx-auto">
          {/* Account Section */}
          {loading ? (
            <div
              className={`rounded-xl p-4 md:p-6 mb-4 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full ${
                      darkMode ? "bg-gray-700 animate-pulse" : "bg-gray-300 animate-pulse"
                    }`}
                  />
                  <div>
                    <div className={`h-4 w-20 rounded mb-2 ${darkMode ? "bg-gray-700 animate-pulse" : "bg-gray-300 animate-pulse"}`} />
                    <div className={`h-3 w-24 rounded ${darkMode ? "bg-gray-700 animate-pulse" : "bg-gray-300 animate-pulse"}`} />
                  </div>
                </div>
                <div className={`h-10 w-20 rounded-lg ${darkMode ? "bg-gray-700 animate-pulse" : "bg-gray-300 animate-pulse"}`} />
              </div>
            </div>
          ) : (
            <div
              className={`rounded-xl p-4 md:p-6 mb-4 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    darkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  <User size={24} />
                </div>
                <div>
                  <p className="font-semibold">Guest</p>
                  <p className="text-sm text-gray-500">Not signed in</p>
                </div>
              </div>
              <button
                onClick={() => {/* Navigate to login */}}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                <LogIn size={18} />
                <span>Login</span>
              </button>
            </div>
            </div>
          )}

          {/* Account Options */}
          {loading ? (
            <div
              className={`rounded-xl p-2 mb-4 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              {[1, 2, 3, 4].map((_, idx) => (
                <div key={idx} className="p-4">
                  <div className={`h-5 w-32 rounded ${darkMode ? "bg-gray-700 animate-pulse" : "bg-gray-300 animate-pulse"}`} />
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`rounded-xl p-2 mb-4 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              {accountSections.map((section, idx) => (
              <button
                key={idx}
                disabled={section.disabled}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition ${
                  section.disabled
                    ? "opacity-40 cursor-not-allowed"
                    : darkMode
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  {section.icon}
                  <span>{section.label}</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            ))}
            </div>
          )}

          {/* App Settings */}
          {loading ? (
            <div
              className={`rounded-xl p-2 mb-4 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              {[1, 2].map((_, idx) => (
                <div key={idx} className="p-4">
                  <div className={`h-5 w-28 rounded ${darkMode ? "bg-gray-700 animate-pulse" : "bg-gray-300 animate-pulse"}`} />
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`rounded-xl p-2 mb-4 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              {/* Language */}
              <button
                onClick={() => navigate("/settings/language")}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Globe size={20} />
                  <span>Language</span>
                </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">{language}</span>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </button>

            {/* Dark Mode Toggle */}
            <div
              className={`w-full flex items-center justify-between p-4 rounded-lg ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <Moon size={20} />
                <span>Dark Mode</span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
                  darkMode ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    darkMode ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Notifications */}
            <button
              className={`w-full flex items-center justify-between p-4 rounded-lg transition ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center gap-3">
                <Bell size={20} />
                <span>Notifications</span>
              </span>
              <ChevronRight size={20} />
            </button>
            </div>
          )}

          {/* Other Options */}
          {loading ? (
            <div
              className={`rounded-xl p-2 mb-4 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <div className={`h-6 w-20 rounded mx-4 mt-3 mb-2 ${darkMode ? "bg-gray-700 animate-pulse" : "bg-gray-300 animate-pulse"}`} />
              {[1, 2, 3].map((_, idx) => (
                <div key={idx} className="p-4">
                  <div className={`h-5 w-36 rounded ${darkMode ? "bg-gray-700 animate-pulse" : "bg-gray-300 animate-pulse"}`} />
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`rounded-xl p-2 mb-4 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              {otherSections.map((section, idx) => (
              <button
                key={idx}
                disabled={section.disabled}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition ${
                  section.disabled
                    ? "opacity-40 cursor-not-allowed"
                    : darkMode
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  {section.icon}
                  <span>{section.label}</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            ))}
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:block">
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}
