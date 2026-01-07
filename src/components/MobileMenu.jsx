import React, { useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";

export default function MobileMenu({
  darkMode,
  setDarkMode,
  language,
  setLanguage,
  mobilePanel,
  setMobilePanel,
  mobileCategory,
  setMobileCategory,
  orderedCategories,
}) {
  const navigate = useNavigate();
  const categoriesRef = useRef(null);
  const scrollLockRef = useRef(0);

  const scrollToCategoryButton = useCallback((cat) => {
    const catId = cat.replace(/\s+/g, "-").toLowerCase();
    requestAnimationFrame(() => {
      const btn = document.getElementById(`mobile-cat-${catId}`);
      const container = categoriesRef.current;
      if (btn && container) {
        const offset = btn.offsetTop - container.offsetTop;
        container.scrollTo({ top: Math.max(offset - 8, 0), behavior: "auto" });
      }
    });
  }, []);

  const navigateToSection = (cat) => {
    const id = cat.replace(/\s+/g, "-").toLowerCase();
    setMobilePanel(null);
    setMobileCategory(null);
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  useEffect(() => {
    const open = mobilePanel === "menu" || !!mobileCategory;

    const prevent = (e) => {
      if (categoriesRef.current && e.target && categoriesRef.current.contains(e.target))
        return;
      e.preventDefault();
    };

    if (open) {
      scrollLockRef.current = window.scrollY || 0;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollLockRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", prevent, { passive: false });
      document.addEventListener("wheel", prevent, { passive: false });
    } else {
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

  if (mobilePanel !== "menu") return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] md:hidden ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
      style={{ touchAction: "none", isolation: "isolate" }}
    >
      <div className="px-5 pt-6 pb-4 flex items-center justify-between">
        <span className="font-bold text-xl">Categories</span>
        <button
          onClick={() => setMobilePanel(null)}
          className={`p-3 rounded-xl border text-base ${
            darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-100"
          }`}
          aria-label="Close menu"
        >
          <X size={22} />
        </button>
      </div>

      <div className="flex flex-col h-full min-h-0">
        <div
          ref={categoriesRef}
          className="px-5 pb-24 flex-1 min-h-0 overflow-y-auto overscroll-contain mobile-categories-scroll"
          style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
        >
          <div className="mt-4">
            <ul className="space-y-2">
              {Object.entries(orderedCategories)
                .filter(([cat]) => cat !== "Hot Deals" && cat !== "Most Popular")
                .map(([cat, data]) => {
                  const isOpen = mobileCategory === cat;
                  const catId = cat.replace(/\s+/g, "-").toLowerCase();
                  return (
                    <li key={cat}>
                      <div
                        className={`rounded-xl border ${
                          darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-100"
                        } transition-all`}
                      >
                        <button
                          id={`mobile-cat-${catId}`}
                          aria-expanded={isOpen}
                          onClick={() => {
                            setMobileCategory((prev) => {
                              const next = prev === cat ? null : cat;
                              if (next) scrollToCategoryButton(next);
                              return next;
                            });
                          }}
                          className="w-full flex items-center justify-between p-5 rounded-xl text-base"
                        >
                          <div className="flex items-center">
                            <span className="mr-3">{data.icon}</span>
                            <span>{cat}</span>
                          </div>
                          <ChevronDown
                            size={16}
                            className={`${isOpen ? "rotate-180" : ""} transition-transform`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-2 pb-2 space-y-2">
                            {Array.isArray(data.subcategories) &&
                              data.subcategories.map((sub) => (
                                <div
                                  key={sub.name}
                                  className={`rounded-lg border ${
                                    darkMode ? "border-gray-700 bg-gray-700" : "border-gray-200 bg-gray-50"
                                  }`}
                                >
                                  <button
                                    className={`w-full text-left px-3 py-2 font-semibold ${
                                      darkMode ? "text-white" : "text-black"
                                    }`}
                                    onClick={() => navigateToSection(cat)}
                                  >
                                    {sub.name}
                                  </button>
                                  {Array.isArray(sub.subsubs) && (
                                    <div className="px-3 pb-2 space-y-1">
                                      {sub.subsubs.map((s) => (
                                        <button
                                          key={s}
                                          className={`w-full text-left text-sm px-2 py-1 rounded ${
                                            darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
                                          }`}
                                          onClick={() => navigateToSection(cat)}
                                        >
                                          {s}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
