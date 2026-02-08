import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Menu, User, ShoppingCart, ChevronRight, Globe, Package, MapPin, Heart, CreditCard, Bell, HelpCircle, Info, Moon, LogIn, ChevronLeft, Check } from "lucide-react";
import CategoriesMenu from "./CategoriesMenu";
import MobileMenu from "./MobileMenu";
import TabMenu from "./TabMenu";

export default function Navbar({
  darkMode,
  setDarkMode,
  language,
  setLanguage,
  cart,
  orderedCategories,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobilePanel, setMobilePanel] = useState(null);
  const [mobileCategory, setMobileCategory] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuView, setUserMenuView] = useState("root");
  const userMenuRef = useRef(null);
  const userButtonRef = useRef(null);
  const isLoggedIn = false; // Placeholder; wire to auth when available

  const languages = [
    { code: "EN", name: "English" },
    { code: "FA", name: "فارسی (Persian)" },
    { code: "AR", name: "العربية (Arabic)" },
    { code: "ES", name: "Español (Spanish)" },
    { code: "FR", name: "Français (French)" },
    { code: "DE", name: "Deutsch (German)" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(e.target)
      ) {
        setUserMenuOpen(false);
        setUserMenuView("root");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={
          "fixed top-0 left-0 w-full shadow px-6 py-4 z-50 transition " +
          (darkMode ? "bg-gray-900 text-white" : "bg-white text-black")
        }
      >
        <div className="flex items-center justify-between">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold cursor-pointer"
          >
            My Shop
          </h1>

          {/* Search Bar */}
          <div className="flex-1 mx-6 hidden md:flex justify-center">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                placeholder="Search products..."
                className={
                  "w-full px-4 py-2 rounded-xl border transition focus:outline-none " +
                  (darkMode
                    ? "border-gray-700 bg-gray-800 text-white hover:border-gray-500 hover:bg-gray-750"
                    : "border-gray-300 bg-gray-100 text-black hover:border-gray-400 hover:bg-gray-50")
                }
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={22}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <button
              className={`md:hidden p-3 rounded-xl border relative z-[60] text-base ${
                darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-100"
              }`}
              onClick={() => setMobilePanel("menu")}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Shopping Cart */}
            <button
              className={`hidden md:inline relative p-3 rounded-xl border text-base ${
                darkMode ? "border-gray-700 bg-gray-800 hover:bg-gray-700" : "border-gray-200 bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => {
                if (location.pathname !== "/cart") navigate("/cart");
              }}
              aria-label="Open cart"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Settings */}
            <div className="hidden md:block relative" ref={userMenuRef}>
              <button
                ref={userButtonRef}
                className={`p-3 rounded-xl border text-base ${
                  darkMode ? "border-gray-700 bg-gray-800 hover:bg-gray-700" : "border-gray-200 bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-label="User menu"
              >
                <User size={20} />
              </button>
              {userMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-64 rounded-xl border shadow-lg z-[9999] ${
                    darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-black"
                  }`}
                >
                  {/* Login Header */}
                  <div
                    className={`flex items-center justify-between px-4 py-3 rounded-t-xl ${
                      darkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                        <User size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Guest</p>
                        <p className="text-xs text-gray-500">Not signed in</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { setUserMenuOpen(false); /* navigate to login when ready */ }}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-sm"
                    >
                      <LogIn size={16} />
                      <span>Login</span>
                    </button>
                  </div>

                  {/* Root or Language view */}
                  {userMenuView === "root" ? (
                    <>
                      {/* Account options */}
                      {[
                        { icon: Package, label: "My Orders" },
                        { icon: MapPin, label: "My Addresses" },
                        { icon: Heart, label: "Wishlist" },
                        { icon: CreditCard, label: "Payment Methods" },
                      ].map(({ icon: Icon, label }, idx) => (
                        <button
                          key={label}
                          disabled={!isLoggedIn}
                          className={`w-full flex items-center justify-between px-4 py-3 ${
                            !isLoggedIn
                              ? "opacity-50 cursor-not-allowed"
                              : darkMode
                              ? "hover:bg-gray-800"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => {
                            if (!isLoggedIn) return;
                            navigate("/settings");
                          }}
                        >
                          <span className="flex items-center gap-3">
                            <Icon size={18} />
                            <span>{label}</span>
                          </span>
                          <ChevronRight size={16} className={!isLoggedIn ? "opacity-50" : ""} />
                        </button>
                      ))}

                      {/* Separator */}
                      <div className={`border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`} />

                      {/* App settings */}
                      <button
                        className={`w-full flex items-center justify-between px-4 py-3 ${
                          darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                        }`}
                        onClick={() => setUserMenuView("language")}
                      >
                        <span className="flex items-center gap-3">
                          <Globe size={18} />
                          <span>Language</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">{language}</span>
                          <ChevronRight size={16} />
                        </span>
                      </button>
                      <div
                        className={`w-full flex items-center justify-between px-4 py-3 ${
                          darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Moon size={18} />
                          <span>Dark Mode</span>
                        </span>
                        <button
                          aria-label="Toggle dark mode"
                          onClick={() => setDarkMode((v) => !v)}
                          className={`relative w-12 h-6 rounded-full transition ${
                            darkMode ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 ${darkMode ? "right-0.5" : "left-0.5"} w-5 h-5 rounded-full bg-white shadow transition`}
                          />
                        </button>
                      </div>
                      <button
                        className={`w-full flex items-center justify-between px-4 py-3 ${
                          darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                        }`}
                        onClick={() => {}}
                      >
                        <span className="flex items-center gap-3">
                          <Bell size={18} />
                          <span>Notifications</span>
                        </span>
                        <ChevronRight size={16} />
                      </button>

                      {/* Separator */}
                      <div className={`border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`} />

                      {/* Other */}
                      {[
                        { icon: HelpCircle, label: "Help & Support" },
                        { icon: Info, label: "About Us" },
                      ].map(({ icon: Icon, label }, idx) => (
                        <button
                          key={label}
                          className={`w-full flex items-center justify-between px-4 py-3 ${
                            darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                          }`}
                          onClick={() => {}}
                        >
                          <span className="flex items-center gap-3">
                            <Icon size={18} />
                            <span>{label}</span>
                          </span>
                          <ChevronRight size={16} />
                        </button>
                      ))}
                    </>
                  ) : (
                    <div>
                      {/* Language inner page */}
                      <div className={`flex items-center justify-between px-4 py-3 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                        <button
                          className={`p-2 rounded-lg border ${darkMode ? "border-gray-700" : "border-gray-300"}`}
                          onClick={() => setUserMenuView("root")}
                          aria-label="Back"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <h2 className="text-sm font-semibold">Language</h2>
                        <div />
                      </div>
                      <div className="p-2">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code);
                              setUserMenuView("root");
                            }}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition ${
                              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                            } ${
                              language === lang.code
                                ? darkMode
                                  ? "bg-black/40 text-blue-300 font-bold"
                                  : "bg-blue-100 text-blue-600 font-bold"
                                : ""
                            }`}
                          >
                            <span className="font-medium text-sm">{lang.name}</span>
                            {language === lang.code && (
                              <Check size={16} className={darkMode ? "text-blue-300" : "text-blue-600"} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <CategoriesMenu darkMode={darkMode} orderedCategories={orderedCategories} />
      </nav>

      <MobileMenu
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
        mobilePanel={mobilePanel}
        setMobilePanel={setMobilePanel}
        mobileCategory={mobileCategory}
        setMobileCategory={setMobileCategory}
        orderedCategories={orderedCategories}
      />

      <TabMenu
        darkMode={darkMode}
        cart={cart}
        setMobilePanel={setMobilePanel}
        setMobileCategory={setMobileCategory}
      />
    </>
  );
}
