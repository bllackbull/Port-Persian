import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Globe,
  Sun,
  Moon,
  Menu,
  User,
  ShoppingCart,
  ChevronDown,
  ChevronRight,
  Home as HomeIcon,
  X,
  ArrowLeft,
} from "lucide-react";
import { useLocation } from "react-router-dom";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [mobilePanel, setMobilePanel] = useState(null); // 'menu' | 'search' | null
  const [mobileCategory, setMobileCategory] = useState(null);
  const closeTimeoutRef = useRef(null);
  const categoriesRef = useRef(null);
  const scrollLockRef = useRef(0);

  const navigateToSection = (cat) => {
    const id = cat.replace(/\s+/g, "-").toLowerCase();
    // close panels and navigate home, then scroll to section
    setMobilePanel(null);
    setMobileCategory(null);
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  // Robustly lock background scrolling when mobile overlays are open while still allowing the categories list to scroll
  useEffect(() => {
    const open = mobilePanel === "menu" || !!mobileCategory;

    const prevent = (e) => {
      // allow scroll if the event target is inside the categories list
      if (
        categoriesRef.current &&
        e.target &&
        categoriesRef.current.contains(e.target)
      )
        return;
      e.preventDefault();
    };

    if (open) {
      // save scroll position and lock body in place (better for mobile)
      scrollLockRef.current = window.scrollY || 0;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollLockRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      // block touch/wheel events except inside categories list
      document.addEventListener("touchmove", prevent, { passive: false });
      document.addEventListener("wheel", prevent, { passive: false });
    } else {
      // restore scroll
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollLockRef.current || 0);

      document.removeEventListener("touchmove", prevent);
      document.removeEventListener("wheel", prevent);
    }

    // cleanup
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.removeEventListener("touchmove", prevent);
      document.removeEventListener("wheel", prevent);
    };
  }, [mobilePanel, mobileCategory]);

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
            <button
              className={`md:hidden p-2 rounded-lg border relative z-[60] ${
                darkMode ? "border-gray-800" : ""
              }`}
              onClick={() => setMobilePanel("menu")}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            <button
              onClick={() => setLanguage(language === "EN" ? "FA" : "EN")}
              className={`hidden md:flex items-center space-x-1 px-3 py-2 rounded-lg border ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            >
              <Globe size={18} /> <span>{language}</span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`hidden md:inline p-2 rounded-lg border ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              className={`hidden md:inline p-2 rounded-lg border ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            >
              <User size={20} />
            </button>

            <button
              className={`hidden md:inline relative p-2 rounded-lg border ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
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
          </div>
        </div>

        {/* Categories Row */}
        {location.pathname !== "/search" && (
          <div className="mt-4 flex items-center relative hidden md:flex">
            <div className="relative">
              <button
                onMouseEnter={() => {
                  if (closeTimeoutRef.current)
                    clearTimeout(closeTimeoutRef.current);
                  setDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  closeTimeoutRef.current = setTimeout(
                    () => setDropdownOpen(false),
                    200
                  );
                }}
                className={`flex items-center font-bold px-4 py-2 whitespace-nowrap ${
                  darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                } rounded-full`}
              >
                <Menu size={20} className="mr-2" /> All Categories{" "}
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
                  if (closeTimeoutRef.current)
                    clearTimeout(closeTimeoutRef.current);
                }}
                onMouseLeave={() => {
                  closeTimeoutRef.current = setTimeout(
                    () => setDropdownOpen(false),
                    200
                  );
                }}
              >
                <div className="w-1/4">
                  {Object.keys(orderedCategories)
                    .filter(
                      (cat) => cat !== "Hot Deals" && cat !== "Most Popular"
                    )
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
                        {orderedCategories[cat].icon}{" "}
                        <span className="ml-2">{cat}</span>
                      </div>
                    ))}
                </div>
                <div className="w-3/4 border-l border-gray-300">
                  {hoveredCategory && (
                    <div>
                      <div className="grid grid-cols-3 gap-4">
                        {orderedCategories[hoveredCategory].subcategories.map(
                          (sub) => (
                            <div key={sub.name} className="mb-2">
                              <div
                                className={`px-4 py-1 cursor-pointer ${
                                  darkMode
                                    ? "hover:bg-gray-700"
                                    : "hover:bg-gray-200"
                                } font-bold`}
                              >
                                {sub.name}
                              </div>
                              <div className="ml-4">
                                {sub.subsubs.map((subsub) => (
                                  <div
                                    key={subsub}
                                    className={`px-4 py-1 cursor-pointer ${
                                      darkMode
                                        ? "hover:bg-gray-700"
                                        : "hover:bg-gray-200"
                                    } text-sm`}
                                  >
                                    {subsub}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        )}
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
        )}
      </nav>

      {/* Mobile menu panel (menu) - moved out of nav to ensure it's above the bottom tab bar */}
      {mobilePanel === "menu" && (
        <div
          className={`fixed inset-0 z-[99999] md:hidden ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
          style={{ touchAction: "none", isolation: "isolate" }}
        >
          <div
            className={`p-4 flex items-center justify-between border-b ${
              darkMode ? "border-gray-800" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobilePanel(null)}
                className={`p-2 rounded-lg border ${
                  darkMode ? "border-gray-800" : ""
                }`}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
              <span className="font-bold">Categories</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                }}
                className={`p-2 rounded-lg border ${
                  darkMode ? "border-gray-800" : ""
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => {
                  setLanguage(language === "EN" ? "FA" : "EN");
                }}
                className={`p-2 rounded-lg border ${
                  darkMode ? "border-gray-800" : ""
                }`}
              >
                <Globe size={18} />
              </button>
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div
              ref={categoriesRef}
              className="p-4 flex-1 overflow-y-auto overscroll-contain mobile-categories-scroll"
              style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
            >
              <div className="mt-4">
                <ul className="space-y-2">
                  {Object.entries(orderedCategories)
                    .filter(
                      ([cat]) => cat !== "Hot Deals" && cat !== "Most Popular"
                    )
                    .map(([cat, data]) => (
                      <li key={cat}>
                        <button
                          onClick={() => {
                            setMobileCategory(cat);
                          }}
                          className={`w-full flex items-center justify-between p-4 rounded-lg border ${
                            darkMode ? "border-gray-800" : ""
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="mr-3">{data.icon}</span>
                            <span>{cat}</span>
                          </div>
                          <ChevronRight size={16} />
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="p-4 border-t flex items-center justify-between">
              <div />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setDarkMode(!darkMode);
                  }}
                  className="p-2 rounded-lg border"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={() => {
                    setLanguage(language === "EN" ? "FA" : "EN");
                  }}
                  className="p-2 rounded-lg border"
                >
                  <Globe size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile category overlay (layers above tab bar) - moved out so it can appear above tabs */}
      {mobileCategory && (
        <div
          className={`fixed inset-0 z-[100000] md:hidden ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
          } p-4`}
          style={{ isolation: "isolate" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                aria-label="Back"
                onClick={() => setMobileCategory(null)}
                className={`p-2 rounded-lg border ${
                  darkMode ? "border-gray-800" : ""
                }`}
              >
                <ArrowLeft size={18} />
              </button>
              <h3 className="font-bold">{mobileCategory}</h3>
            </div>
            <div />
          </div>
          <div className="overflow-y-auto">
            {orderedCategories &&
            orderedCategories[mobileCategory] &&
            Array.isArray(orderedCategories[mobileCategory].subcategories) ? (
              orderedCategories[mobileCategory].subcategories.map(
                (sub, idx) => (
                  <div key={idx} className="mb-3">
                    <div
                      className={`px-4 py-3 rounded-lg border ${
                        darkMode ? "border-gray-800" : ""
                      }`}
                    >
                      {sub.name}
                    </div>
                    <div className="ml-4 mt-2 space-y-1">
                      {Array.isArray(sub.subsubs)
                        ? sub.subsubs.map((s) => (
                            <button
                              key={s}
                              className="w-full text-left text-sm p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              {s}
                            </button>
                          ))
                        : null}
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="text-sm text-gray-500">No categories found.</div>
            )}
          </div>
        </div>
      )}

      <div className="fixed left-4 right-4 bottom-6 md:hidden z-50">
        <div
          className={`${
            darkMode
              ? "bg-gray-900 text-white border border-gray-800"
              : "bg-white text-black border"
          } rounded-xl shadow px-2 py-2 flex`}
        >
          <button
            onClick={() => {
              setMobilePanel(null);
              navigate("/");
            }}
            className={`flex-1 flex flex-col items-center justify-center text-sm py-2 px-2 focus:outline-none focus-visible:text-blue-600 dark:focus-visible:text-blue-300 ${
              location.pathname === "/"
                ? darkMode
                  ? "bg-black/40 text-blue-300 font-bold rounded-xl"
                  : "bg-blue-100 text-blue-600 font-bold rounded-xl"
                : ""
            }`}
          >
            <HomeIcon size={18} />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            onClick={() => navigate("/search")}
            className={`flex-1 flex flex-col items-center justify-center text-sm py-2 px-2 focus:outline-none focus-visible:text-blue-600 dark:focus-visible:text-blue-300 ${
              location.pathname === "/search"
                ? darkMode
                  ? "bg-black/40 text-blue-300 font-bold rounded-xl"
                  : "bg-blue-100 text-blue-600 font-bold rounded-xl"
                : ""
            }`}
          >
            <Search size={18} />
            <span className="text-xs mt-1">Search</span>
          </button>
          <button
            onClick={() => {
              setMobilePanel(null);
              setMobileCategory(null);
              if (location.pathname !== "/cart") navigate("/cart");
            }}
            className={`flex-1 flex flex-col items-center justify-center text-sm py-2 px-2 relative focus:outline-none focus-visible:text-blue-600 dark:focus-visible:text-blue-300 ${
              location.pathname === "/cart"
                ? darkMode
                  ? "bg-black/40 text-blue-300 font-bold rounded-xl"
                  : "bg-blue-100 text-blue-600 font-bold rounded-xl"
                : ""
            }`}
          >
            <div className="relative">
              <ShoppingCart size={18} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 text-sm flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">Cart</span>
          </button>
          <button className="flex-1 flex flex-col items-center justify-center text-sm py-2 px-2 focus:outline-none focus-visible:text-blue-600 dark:focus-visible:text-blue-300">
            <User size={18} />
            <span className="text-xs mt-1">Settings</span>
          </button>
        </div>
      </div>
    </>
  );
}
