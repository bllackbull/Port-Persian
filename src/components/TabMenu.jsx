import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, ShoppingCart, User, Home as HomeIcon } from "lucide-react";

export default function TabMenu({ darkMode, cart, setMobilePanel, setMobileCategory }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
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
            location.pathname === "/" || location.pathname.startsWith("/product/")
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
        <button
          onClick={() => {
            setMobilePanel(null);
            navigate("/settings");
          }}
          className={`flex-1 flex flex-col items-center justify-center text-sm py-2 px-2 focus:outline-none focus-visible:text-blue-600 dark:focus-visible:text-blue-300 ${
            location.pathname.startsWith("/settings")
              ? darkMode
                ? "bg-black/40 text-blue-300 font-bold rounded-xl"
                : "bg-blue-100 text-blue-600 font-bold rounded-xl"
              : ""
          }`}
        >
          <User size={18} />
          <span className="text-xs mt-1">Settings</span>
        </button>
      </div>
    </div>
  );
}
