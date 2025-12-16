import React, { useState } from "react";
import {
  ShoppingCart,
  User,
  Search,
  Globe,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Menu,
  Instagram,
  Twitter,
  Youtube,
  ChevronDown,
} from "lucide-react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [bannerIndex, setBannerIndex] = useState(0);

  const banners = [
    "https://via.placeholder.com/1400x400?text=Banner+1",
    "https://via.placeholder.com/1400x400?text=Banner+2",
    "https://via.placeholder.com/1400x400?text=Banner+3",
  ];

  const nextBanner = () => setBannerIndex((bannerIndex + 1) % banners.length);
  const prevBanner = () =>
    setBannerIndex((bannerIndex - 1 + banners.length) % banners.length);

  const categories = {
    "Most Popular": {
      icon: <ChevronRight />,
      items: Array.from({ length: 12 }, (_, i) => i + 1),
    },
    Electronics: {
      icon: <ShoppingCart />,
      items: Array.from({ length: 12 }, (_, i) => i + 13),
    },
    Clothing: {
      icon: <User />,
      items: Array.from({ length: 12 }, (_, i) => i + 25),
    },
  };

  return (
    <>
      <div
        className={
          darkMode
            ? "min-h-screen bg-gray-900 text-white"
            : "min-h-screen bg-gray-100 text-black"
        }
      >
        {/* Navbar */}
        <nav
          className={
            "fixed top-0 left-0 w-full shadow px-6 py-4 z-50 transition " +
            (darkMode ? "bg-gray-900 text-white" : "bg-white text-black")
          }
        >
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">My Shop</h1>

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
                onClick={() => setLanguage(language === "EN" ? "FA" : "EN")}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg border"
              >
                <Globe size={18} /> <span>{language}</span>
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg border"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button className="p-2 rounded-lg border">
                <User size={20} />
              </button>

              <button className="p-2 rounded-lg border">
                <ShoppingCart size={20} />
              </button>
            </div>
          </div>

          {/* Categories Row */}
          <div className="mt-4 flex items-center relative">
            <div className="relative group">
              <button className="flex items-center font-bold px-4 py-2 whitespace-nowrap">
                <Menu size={20} className="mr-2" /> All Categories{" "}
                <ChevronDown size={16} className="ml-1" />
              </button>
              {/* Dropdown on hover */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50">
                {Object.entries(categories).map(([cat]) => (
                  <div
                    key={cat}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-px h-6 bg-gray-400 mx-2" />

            <div className="flex space-x-1">
              {Object.entries(categories).map(([cat, data]) => (
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

        {/* Hero Banner */}
        <div className="pt-24 px-6">
          <div className="relative w-full max-w-full mx-auto rounded-2xl overflow-hidden shadow-lg">
            <img
              src={banners[bannerIndex]}
              alt="banner"
              className="w-full h-96 object-cover"
            />

            <button
              onClick={prevBanner}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 rounded-full"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>

            <button
              onClick={nextBanner}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 rounded-full"
            >
              <ChevronRight size={24} className="text-white" />
            </button>
          </div>
        </div>

        {/* Category Sections with Horizontal Scroll and Show More */}
        <div className="p-6 space-y-12">
          {Object.entries(categories).map(([category, data]) => {
            const sectionId = category.replace(/\s+/g, "-").toLowerCase();
            return (
              <section id={sectionId} key={category}>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold flex items-center">
                    {data.icon} <span className="ml-2">{category}</span>
                  </h2>
                  <button className="flex items-center text-blue-600 hover:underline">
                    Show More <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
                <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-none">
                  {data.items.map((item) => (
                    <div
                      key={item}
                      className={
                        "min-w-[200px] rounded-xl shadow p-4 flex flex-col justify-between transition h-80 " +
                        (darkMode
                          ? "bg-gray-800 text-white"
                          : "bg-white text-black")
                      }
                    >
                      <div
                        className={
                          "w-full h-44 rounded-lg mb-4 " +
                          (darkMode ? "bg-gray-700" : "bg-gray-300")
                        }
                      />
                      <h3 className="text-lg font-semibold mb-1">
                        Product {item}
                      </h3>
                      <div className="flex justify-between items-end">
                        <p className="text-lg font-bold">$19.99</p>
                        <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
                          <ShoppingCart
                            size={18}
                            className={darkMode ? "" : "text-white"}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer */}
        <footer
          className={
            "text-center py-8 mt-10 border-t " +
            (darkMode
              ? "border-gray-700 bg-gray-900"
              : "border-gray-300 bg-white")
          }
        >
          <h2 className="text-xl font-bold mb-2">My Shop</h2>
          <div className="flex justify-center space-x-6 mb-3">
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
          <p className="opacity-70 text-sm">
            © 2025 My Shop. All Rights Reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
