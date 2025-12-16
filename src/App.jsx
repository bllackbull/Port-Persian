import React, { useState, useEffect, useMemo, useRef } from "react";
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
  Home,
  Dumbbell,
  Sparkles,
  Smartphone,
  Flame,
  Car,
  Heart,
  Gem,
  Gamepad2,
} from "lucide-react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [bannerIndex, setBannerIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const closeTimeoutRef = useRef(null);

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
        icon: <Home size={20} />,
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
        const item = { id: idCounter++, discount };
        if (discount) allDiscounted.push(item);
        return item;
      });
      categories[cat] = data;
    });

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
                className="flex items-center space-x-1 px-3 py-2 rounded-lg border hover:bg-gray-100"
              >
                <Globe size={18} /> <span>{language}</span>
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg border hover:bg-gray-100"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button className="p-2 rounded-lg border hover:bg-gray-100">
                <User size={20} />
              </button>

              <button className="p-2 rounded-lg border hover:bg-gray-100">
                <ShoppingCart size={20} />
              </button>
            </div>
          </div>

          {/* Categories Row */}
          <div className="mt-4 flex items-center relative">
            <div className="relative">
              <button onMouseEnter={() => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); setDropdownOpen(true); }} onMouseLeave={() => { closeTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 200); }} className="flex items-center font-bold px-4 py-2 whitespace-nowrap hover:bg-gray-100 rounded-full">
                <Menu size={20} className="mr-2" /> All Categories{" "}
                <ChevronDown size={16} className="ml-1" />
              </button>
              {/* Dropdown on hover */}
              <div className={`fixed top-32 left-0 w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} rounded shadow-lg ${dropdownOpen ? 'opacity-100' : 'opacity-0'} transition-opacity pointer-events-auto z-50 flex`} onMouseEnter={() => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); }} onMouseLeave={() => setDropdownOpen(false)}>
                <div className="w-1/4">
                  {Object.keys(orderedCategories).filter(cat => cat !== "Hot Deals" && cat !== "Most Popular").map(cat => (
                    <div key={cat} onMouseEnter={() => { setHoveredCategory(cat); }} className={`font-bold flex items-center px-4 py-2 cursor-pointer w-full hover:bg-gray-200 min-h-10`}>
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
                            <div className={`px-4 py-1 cursor-pointer hover:bg-gray-200 font-bold`}>
                              {sub.name}
                            </div>
                            <div className="ml-4">
                              {sub.subsubs.map(subsub => (
                                <div key={subsub} className={`px-4 py-1 cursor-pointer hover:bg-gray-200 text-sm`}>
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
                <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-custom">
                  {data.items.map((item) => {
                    const originalPrice = 19.99;
                    const discountedPrice = item.discount ? (originalPrice * (1 - item.discount / 100)).toFixed(2) : originalPrice;
                    return (
                      <div
                        key={item.id}
                        className={
                          "min-w-[200px] rounded-xl shadow p-4 flex flex-col justify-between transition h-80 " +
                          (darkMode
                            ? "bg-gray-800 text-white"
                            : "bg-white text-black")
                        }
                      >
                        <div className="relative">
                          <div
                            className={
                              "w-full h-44 rounded-lg mb-4 " +
                              (darkMode ? "bg-gray-700" : "bg-gray-300")
                            }
                          />
                          {item.discount && (
                            <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                              -{item.discount}%
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-1">
                          Product {item.id}
                        </h3>
                        <div className="flex justify-between items-end min-h-[3rem]">
                          <div>
                            <p className={`text-lg font-bold ${item.discount ? 'text-red-500' : ''}`}>
                              ${discountedPrice}
                            </p>
                            {item.discount && (
                              <p className="text-sm text-gray-500 line-through">${originalPrice}</p>
                            )}
                          </div>
                          <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
                            <ShoppingCart
                              size={18}
                              className={darkMode ? "" : "text-white"}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}
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
