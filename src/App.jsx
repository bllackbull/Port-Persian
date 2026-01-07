import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
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
  Star,
  Shirt,
  Book,
  Home as HomeIcon,
  Dumbbell,
  Sparkles,
  Smartphone,
  Flame,
  Car,
  Heart,
  Gem,
  Gamepad2,
  Check,
} from "lucide-react";
import Cart from "./pages/Cart.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SearchPage from "./pages/Search.jsx";
import Settings from "./pages/Settings.jsx";
import LanguageSettings from "./pages/LanguageSettings.jsx";
import ProductDetail from "./pages/products/ProductDetail.jsx";

function Home({ darkMode, setDarkMode, language, setLanguage, cart, setCart, orderedCategories }) {
  const navigate = useNavigate();
  const [bannerIndex, setBannerIndex] = useState(0);
  const [addedItemId, setAddedItemId] = useState(null);

  // Loading state to simulate async data fetch and show skeletons
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800); // simulate network
    return () => clearTimeout(t);
  }, []);

  // Reusable skeleton card for product placeholders
  const SkeletonCard = ({ keyProp }) => (
    <div key={keyProp} className={
      "min-w-[120px] md:min-w-[200px] rounded-xl shadow p-2 md:p-4 flex flex-col justify-between transition h-56 md:h-80 " +
      (darkMode ? "bg-gray-800 text-white" : "bg-white text-black")
    }>
      <div className="relative">
        <div className={"w-full aspect-square rounded-lg mb-3 md:mb-4 " + (darkMode ? "bg-gray-700" : "bg-gray-300") + " animate-pulse"} />
      </div>
      <div className={"h-3 md:h-4 rounded mb-2 " + (darkMode ? "bg-gray-600" : "bg-gray-200") + " animate-pulse w-3/4"} />
      <div className={"h-3 md:h-4 rounded mb-3 md:mb-4 " + (darkMode ? "bg-gray-600" : "bg-gray-200") + " animate-pulse w-1/2"} />
      <div className="flex justify-between items-end mt-auto">
        <div className="flex flex-col justify-end h-[2.75rem] md:h-[3.5rem]">
          <div className={"h-3 md:h-5 w-20 rounded " + (darkMode ? "bg-gray-600" : "bg-gray-300") + " animate-pulse"} />
          <div className={"h-3 md:h-4 w-16 rounded mt-1 " + (darkMode ? "bg-gray-600" : "bg-gray-200") + " animate-pulse"} />
        </div>
        <div className={"h-6 md:h-8 w-16 md:w-20 rounded " + (darkMode ? "bg-gray-700" : "bg-gray-400") + " animate-pulse"} />
      </div>
    </div>
  );

  const addToCart = useCallback((item) => {
    setCart(prevCart => [...prevCart, item]);
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 2000);
  }, [setCart]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);


  const banners = [
    "https://via.placeholder.com/1400x400?text=Banner+1",
    "https://via.placeholder.com/1400x400?text=Banner+2",
    "https://via.placeholder.com/1400x400?text=Banner+3",
  ];

  const nextBanner = () => setBannerIndex((bannerIndex + 1) % banners.length);
  const prevBanner = () =>
    setBannerIndex((bannerIndex - 1 + banners.length) % banners.length);


  return (
    <>
      <div
        className={
          darkMode
            ? "min-h-screen bg-gray-900 text-white pb-20 md:pb-0"
            : "min-h-screen bg-gray-100 text-black pb-20 md:pb-0"
        }
      >
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} cart={cart} orderedCategories={orderedCategories} />

        {/* Hero Banner */}
        <div className="pt-28 md:pt-32 px-6">
          <div className="relative w-full max-w-full mx-auto rounded-2xl overflow-hidden shadow-lg">
            {loading ? (
              <div className={"w-full aspect-[3/1] rounded-2xl " + (darkMode ? "bg-gray-700 animate-pulse" : "bg-gray-300 animate-pulse")} />
            ) : (
              <img
                src={banners[bannerIndex]}
                alt="banner"
                className="w-full aspect-[3/1] object-cover"
              />
            )}

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
          {Object.entries(orderedCategories).map(([category, data]) => {
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
                <div className="flex overflow-x-auto space-x-4 pb-2 py-2 scrollbar-custom">
                  {loading ? (
                    Array.from({ length: (data.items && data.items.length) || 8 }).map((_, i) => <SkeletonCard key={i} keyProp={i} />)
                  ) : (
                    data.items.map((item) => {
                      return (
                        <div
                          key={item.id}
                          onClick={() => navigate(`/product/${item.id}`)}
                          className={
                            "min-w-[120px] md:min-w-[200px] rounded-xl shadow p-2 md:p-4 flex flex-col justify-between transition h-56 md:h-80 cursor-pointer hover:scale-105 " +
                            (darkMode
                              ? "bg-gray-800 text-white"
                              : "bg-white text-black")
                          }
                        >
                          <div className="relative">
                            <div
                              className={
                                "w-full aspect-square rounded-lg mb-4 " +
                                (darkMode ? "bg-gray-700" : "bg-gray-300")
                              }
                            >
                              {item.image && (
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              )}
                            </div>
                            {item.discount && (
                              <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                                -{item.discount}%
                              </span>
                            )}
                          </div>
                          <h3 className="text-xs md:text-base font-semibold mb-1 truncate min-h-[2rem] md:min-h-[2.5rem]">
                            {item.name}
                          </h3>
                          <div className="flex justify-between items-end">
                            <div className="flex flex-col justify-end h-[3.25rem] md:h-[3.75rem]">
                              <p className={`text-base md:text-lg font-bold ${item.discount ? 'text-red-500' : ''}`}>
                                ${item.price}
                              </p>
                              {item.discount ? (
                                <p className="text-xs md:text-sm text-gray-500 line-through">${item.originalPrice}</p>
                              ) : (
                                <p className="text-xs md:text-sm text-transparent">placeholder</p>
                              )}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(item);
                              }}
                              className={`self-end px-3 py-1 md:px-4 md:py-2 rounded transition ${item.id === addedItemId ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                              {item.id === addedItemId ? (
                                <Check size={18} className={darkMode ? "" : "text-white"} />
                              ) : (
                                <ShoppingCart
                                  size={18}
                                  className={darkMode ? "" : "text-white"}
                                />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer */}
        <div className="hidden md:block">
          <Footer darkMode={darkMode} />
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const orderedCategories = useMemo(() => {
    const categories = {};
    const allDiscounted = [];
    let idCounter = 1;

    // Define categories data
    const categoryData = {
      Electronics: {
        icon: <Smartphone size={20} />,
        subcategories: [
          { name: "Phones", subsubs: ["iPhone", "Samsung", "Google Pixel", "OnePlus"] },
          { name: "Laptops", subsubs: ["Dell", "HP", "MacBook", "Lenovo"] },
          { name: "Headphones", subsubs: ["Sony", "Bose", "Sennheiser", "JBL"] },
          { name: "Tablets", subsubs: ["iPad", "Samsung Galaxy Tab", "Amazon Fire", "Microsoft Surface"] },
          { name: "Gaming", subsubs: ["PlayStation", "Xbox", "Nintendo", "PC Gaming"] },
          { name: "Audio", subsubs: ["Speakers", "Amplifiers", "Microphones", "Headsets"] },
        ],
      },
      Clothing: {
        icon: <Shirt size={20} />,
        subcategories: [
          { name: "Men's Wear", subsubs: ["Shirts", "Pants", "Jackets", "Shoes"] },
          { name: "Women's Wear", subsubs: ["Dresses", "Tops", "Skirts", "Heels"] },
          { name: "Kids", subsubs: ["Boys", "Girls", "Baby", "Toddler"] },
          { name: "Accessories", subsubs: ["Belts", "Hats", "Scarves", "Gloves"] },
          { name: "Shoes", subsubs: ["Sneakers", "Boots", "Sandals", "Formal"] },
          { name: "Bags", subsubs: ["Handbags", "Backpacks", "Wallets", "Luggage"] },
        ],
      },
      "Home & Garden": {
        icon: <HomeIcon size={20} />,
        subcategories: [
          { name: "Furniture", subsubs: ["Sofas", "Tables", "Chairs", "Beds"] },
          { name: "Decor", subsubs: ["Paintings", "Vases", "Candles", "Mirrors"] },
          { name: "Kitchen", subsubs: ["Appliances", "Utensils", "Dinnerware", "Storage"] },
          { name: "Garden", subsubs: ["Tools", "Plants", "Outdoor Furniture", "Lighting"] },
          { name: "Bedding", subsubs: ["Sheets", "Pillows", "Blankets", "Mattresses"] },
          { name: "Bathroom", subsubs: ["Towels", "Shower", "Vanities", "Fixtures"] },
        ],
      },
      Books: {
        icon: <Book size={20} />,
        subcategories: [
          { name: "Fiction", subsubs: ["Romance", "Mystery", "Sci-Fi", "Fantasy"] },
          { name: "Non-Fiction", subsubs: ["Biography", "History", "Self-Help", "Cookbooks"] },
          { name: "Textbooks", subsubs: ["Math", "Science", "Language", "Business"] },
          { name: "Comics", subsubs: ["Marvel", "DC", "Manga", "Graphic Novels"] },
          { name: "Children's", subsubs: ["Picture Books", "Chapter Books", "Educational", "Activity"] },
          { name: "Audiobooks", subsubs: ["Fiction", "Non-Fiction", "Podcasts", "Language Learning"] },
        ],
      },
      Sports: {
        icon: <Dumbbell size={20} />,
        subcategories: [
          { name: "Fitness", subsubs: ["Weights", "Yoga Mats", "Treadmills", "Bikes"] },
          { name: "Outdoor", subsubs: ["Camping", "Hiking", "Fishing", "Cycling"] },
          { name: "Team Sports", subsubs: ["Soccer", "Basketball", "Baseball", "Football"] },
          { name: "Water Sports", subsubs: ["Swimming", "Surfing", "Kayaking", "Diving"] },
          { name: "Winter Sports", subsubs: ["Skiing", "Snowboarding", "Ice Skating", "Hockey"] },
          { name: "Racquet Sports", subsubs: ["Tennis", "Badminton", "Squash", "Table Tennis"] },
        ],
      },
      Beauty: {
        icon: <Sparkles size={20} />,
        subcategories: [
          { name: "Skincare", subsubs: ["Cleansers", "Moisturizers", "Serums", "Masks"] },
          { name: "Makeup", subsubs: ["Foundation", "Lipstick", "Eyeshadow", "Mascara"] },
          { name: "Hair Care", subsubs: ["Shampoos", "Conditioners", "Styling", "Treatments"] },
          { name: "Fragrances", subsubs: ["Perfumes", "Colognes", "Body Mists", "Candles"] },
          { name: "Nails", subsubs: ["Polish", "Tools", "Care", "Art"] },
          { name: "Tools", subsubs: ["Brushes", "Mirrors", "Tweezers", "Hair Dryers"] },
        ],
      },
      Toys: {
        icon: <Gamepad2 size={20} />,
        subcategories: [
          { name: "Action Figures", subsubs: ["Superheroes", "Dinosaurs", "Cars", "Robots"] },
          { name: "Board Games", subsubs: ["Strategy", "Party", "Puzzle", "Card Games"] },
          { name: "Educational", subsubs: ["STEM", "Language", "Arts", "Science"] },
          { name: "Outdoor Toys", subsubs: ["Balls", "Kites", "Scooters", "Playhouses"] },
          { name: "Dolls", subsubs: ["Fashion Dolls", "Baby Dolls", "Puppets", "Accessories"] },
          { name: "Building Sets", subsubs: ["LEGO", "Magnetic", "Wooden", "Plastic"] },
        ],
      },
      Health: {
        icon: <Heart size={20} />,
        subcategories: [
          { name: "Vitamins", subsubs: ["Multivitamins", "Vitamin C", "Vitamin D", "Minerals"] },
          { name: "Supplements", subsubs: ["Protein", "Collagen", "Omega-3", "Probiotics"] },
          { name: "Fitness Equipment", subsubs: ["Dumbbells", "Resistance Bands", "Yoga Blocks", "Mats"] },
          { name: "Personal Care", subsubs: ["Toothbrushes", "Deodorants", "Soaps", "Shampoos"] },
          { name: "Medical Supplies", subsubs: ["First Aid", "Thermometers", "Blood Pressure", "Masks"] },
          { name: "Wellness", subsubs: ["Massagers", "Aromatherapy", "Meditation", "Sleep Aids"] },
        ],
      },
      Automotive: {
        icon: <Car size={20} />,
        subcategories: [
          { name: "Car Parts", subsubs: ["Engine", "Brakes", "Tires", "Suspension"] },
          { name: "Accessories", subsubs: ["Seats", "Stereos", "Lights", "Mats"] },
          { name: "Tools", subsubs: ["Wrenches", "Jack", "Tool Kits", "Diagnostic"] },
          { name: "Maintenance", subsubs: ["Oil", "Filters", "Batteries", "Cleaners"] },
          { name: "Electronics", subsubs: ["GPS", "Dash Cams", "Chargers", "Speakers"] },
          { name: "Tires & Wheels", subsubs: ["All-Season", "Winter", "Performance", "Rims"] },
        ],
      },
      Jewelry: {
        icon: <Gem size={20} />,
        subcategories: [
          { name: "Necklaces", subsubs: ["Gold", "Silver", "Pearl", "Diamond"] },
          { name: "Rings", subsubs: ["Engagement", "Wedding Bands", "Fashion", "Stackable"] },
          { name: "Earrings", subsubs: ["Hoops", "Studs", "Drops", "Chandelier"] },
          { name: "Bracelets", subsubs: ["Bangles", "Chains", "Cuffs", "Anklets"] },
          { name: "Watches", subsubs: ["Analog", "Digital", "Smartwatches", "Luxury"] },
          { name: "Pendants", subsubs: ["Gold", "Silver", "Crystal", "Gemstone"] },
        ],
      },
    };

    // Generate items for each category with random discounts
    Object.entries(categoryData).forEach(([cat, data]) => {
      data.items = Array.from({ length: 12 }, (_, i) => {
        const discount = Math.random() > 0.4 ? Math.floor(Math.random() * 40) + 10 : null;
        const originalPrice = Math.floor(Math.random() * 100) + 10;
        const price = discount ? (originalPrice * (1 - discount / 100)).toFixed(2) : originalPrice;
        const item = { id: idCounter++, name: `${cat} Product ${i + 1}`, price: parseFloat(price), originalPrice, discount };
        if (discount) allDiscounted.push(item);
        return item;
      });
      categories[cat] = data;
    });

    // Add pearl necklace to Jewelry category
    if (categories["Jewelry"]) {
      const pearlNecklace = {
        id: 999,
        name: "Pearl Necklace",
        price: 89.99,
        originalPrice: 89.99,
        discount: null,
        image: "/images/IMG_0493.PNG",
        color: "Pink",
        category: "Jewelry",
        subcategory: "Necklaces",
        type: "Pearl"
      };
      categories["Jewelry"].items.unshift(pearlNecklace);
    }

    // Most Popular: select items from other categories
    const mostPopularItems = [];
    Object.values(categories).forEach(catData => {
      mostPopularItems.push(...catData.items.slice(0, 2)); // 2 from each
    });
    mostPopularItems.splice(12); // limit to 12

    categories["Most Popular"] = {
      icon: <Star size={20} />,
      subcategories: ["Trending", "Best Sellers", "New Arrivals"],
      items: mostPopularItems,
    };

    // Add Hot Deals as first category
    const orderedCategories = {
      "Hot Deals": {
        icon: <Flame size={20} />,
        subcategories: ["Flash Sales", "Clearance", "Limited Time"],
        items: allDiscounted,
      },
      "Most Popular": categories["Most Popular"],
      ...Object.fromEntries(Object.entries(categories).filter(([k]) => k !== "Most Popular")),
    };

    return orderedCategories;
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home key="home" darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} cart={cart} setCart={setCart} orderedCategories={orderedCategories} />} />
        <Route path="/search" element={<SearchPage key="search" darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} cart={cart} setCart={setCart} orderedCategories={orderedCategories} />} />
        <Route path="/cart" element={<Cart key="cart" cart={cart} setCart={setCart} darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} orderedCategories={orderedCategories} />} />
        <Route path="/settings" element={<Settings key="settings" darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} cart={cart} orderedCategories={orderedCategories} />} />
        <Route path="/settings/language" element={<LanguageSettings key="language" darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} cart={cart} orderedCategories={orderedCategories} />} />
        <Route path="/product/:id" element={<ProductDetail key="product" darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} cart={cart} setCart={setCart} orderedCategories={orderedCategories} />} />
      </Routes>
    </Router>
  );
}
