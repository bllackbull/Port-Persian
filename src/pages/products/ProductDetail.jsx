import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, ShoppingCart, Star, Heart, Share2, Check, Minus, Plus, Sparkles } from "lucide-react";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";

export default function ProductDetail({ darkMode, setDarkMode, language, setLanguage, cart, setCart, orderedCategories }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    // Find product by ID across all categories
    let foundProduct = null;
    let foundCategory = "";
    
    Object.entries(orderedCategories).forEach(([cat, data]) => {
      if (data.items) {
        const item = data.items.find(i => i.id === parseInt(id));
        if (item) {
          foundProduct = item;
          foundCategory = cat;
        }
      }
    });

    setProduct(foundProduct);
    setCategory(foundCategory);
    setTimeout(() => setLoading(false), 600);
  }, [id, orderedCategories]);

  const addToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        setCart(prev => [...prev, product]);
      }
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} cart={cart} orderedCategories={orderedCategories} />
        <div className={`min-h-screen pb-20 pt-28 md:pt-32 px-4 md:px-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb skeleton */}
            <div className={`h-4 w-48 rounded mb-8 mt-4 ${darkMode ? "bg-gray-700 animate-pulse" : "bg-gray-300 animate-pulse"}`} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Image skeleton */}
              <div className={`aspect-square rounded-xl ${darkMode ? "bg-gray-800 animate-pulse" : "bg-gray-200 animate-pulse"}`} />
              
              {/* Info skeleton */}
              <div className={`rounded-xl p-6 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg space-y-4`}>
                {/* Title */}
                <div className={`h-8 w-3/4 rounded ${darkMode ? "bg-gray-700 animate-pulse" : "bg-gray-300 animate-pulse"}`} />
                
                {/* Rating */}
                <div className={`h-5 w-32 rounded ${darkMode ? "bg-gray-700 animate-pulse" : "bg-gray-300 animate-pulse"}`} />
                
                {/* Key features grid */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`h-16 rounded-lg ${darkMode ? "bg-gray-900 animate-pulse" : "bg-gray-100 animate-pulse"}`} />
                  ))}
                </div>
                
                {/* Color circle */}
                <div className={`h-6 w-6 rounded-full mx-0 ${darkMode ? "bg-gray-700 animate-pulse" : "bg-gray-300 animate-pulse"}`} />
                
                {/* Price and quantity */}
                <div className="flex items-center justify-between mt-6">
                  <div className={`h-12 w-32 rounded ${darkMode ? "bg-gray-700 animate-pulse" : "bg-gray-300 animate-pulse"}`} />
                  <div className={`h-10 w-32 rounded-lg ${darkMode ? "bg-gray-700 animate-pulse" : "bg-gray-300 animate-pulse"}`} />
                </div>
                
                {/* Add to cart button */}
                <div className={`h-12 w-full rounded-lg mt-6 ${darkMode ? "bg-gray-700 animate-pulse" : "bg-gray-300 animate-pulse"}`} />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <Footer darkMode={darkMode} />
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} cart={cart} orderedCategories={orderedCategories} />
        <div className={`min-h-screen pb-20 pt-28 md:pt-32 px-4 md:px-6 flex items-center justify-center ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <button onClick={() => navigate("/")} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Back to Home
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <Footer darkMode={darkMode} />
        </div>
      </>
    );
  }

  const reviews = [
    { id: 1, author: "John Doe", rating: 5, comment: "Great product! Highly recommend.", date: "2 days ago" },
    { id: 2, author: "Jane Smith", rating: 4, comment: "Good quality, fast shipping.", date: "1 week ago" },
    { id: 3, author: "Mike Johnson", rating: 5, comment: "Exceeded my expectations!", date: "2 weeks ago" },
  ];

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} cart={cart} orderedCategories={orderedCategories} />
      <div className={`min-h-screen pb-20 pt-28 md:pt-32 px-4 md:px-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 mt-4 text-sm">
            <button onClick={() => navigate("/")} className="hover:text-blue-600">Home</button>
            <ChevronRight size={16} className="text-gray-400" />
            <button onClick={() => navigate("/")} className="hover:text-blue-600">{category}</button>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-gray-500">{product.name}</span>
          </nav>

          {/* Quick Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <img 
                src={product.image || "/images/IMG_0493.PNG"} 
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>

            {/* Quick Info */}
            <div className={`rounded-xl p-6 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(4.5 / 128 reviews)</span>
              </div>

              {/* Key Features Cards */}
              <div className="mb-40 grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-lg flex items-center gap-3 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
                  <Sparkles size={20} className={darkMode ? "text-gray-400" : "text-gray-600"} />
                  <span className="text-sm font-semibold">Premium Quality</span>
                </div>
                <div className={`p-3 rounded-lg flex items-center gap-3 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
                  <Heart size={20} className={darkMode ? "text-gray-400" : "text-gray-600"} />
                  <span className="text-sm font-semibold">Handpicked</span>
                </div>
                <div className={`p-3 rounded-lg flex items-center gap-3 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
                  <ShoppingCart size={20} className={darkMode ? "text-gray-400" : "text-gray-600"} />
                  <span className="text-sm font-semibold">Fast Delivery</span>
                </div>
                <div className={`p-3 rounded-lg flex items-center gap-3 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
                  <Check size={20} className={darkMode ? "text-gray-400" : "text-gray-600"} />
                  <span className="text-sm font-semibold">Guaranteed</span>
                </div>
              </div>

              {/* Color Selector */}
              {product.color && (
                <div className="mb-6 flex items-center">
                  <div className="group relative">
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-gray-400 cursor-pointer hover:scale-110 transition"
                      style={{ backgroundColor: product.color.toLowerCase() === "pink" ? "#ec4899" : product.color.toLowerCase() }}
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                      {product.color}
                    </div>
                  </div>
                </div>
              )}

              {/* Price and Quantity on same line */}
              <div className="flex items-center justify-between mb-6">
                {/* Price */}
                <div>
                  {product.discount ? (
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-bold text-red-500">${product.price}</span>
                        <span className="px-2 py-1 bg-red-500 text-white text-sm font-bold rounded">-{product.discount}%</span>
                      </div>
                      <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    </div>
                  ) : (
                    <span className="text-4xl font-bold">${product.price}</span>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`p-2 rounded-lg border ${darkMode ? "border-gray-700 bg-gray-900 hover:bg-gray-700" : "border-gray-300 bg-gray-100 hover:bg-gray-200"}`}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className={`p-2 rounded-lg border ${darkMode ? "border-gray-700 bg-gray-900 hover:bg-gray-700" : "border-gray-300 bg-gray-100 hover:bg-gray-200"}`}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-4">
                <button
                  onClick={addToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition ${
                    addedToCart ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  {addedToCart ? <Check size={20} /> : <ShoppingCart size={20} />}
                  {addedToCart ? "Added to Cart" : "Add to Cart"}
                </button>
                <button className={`p-3 rounded-lg border ${darkMode ? "border-gray-700 bg-gray-900 hover:bg-gray-700" : "border-gray-300 bg-gray-100 hover:bg-gray-200"}`}>
                  <Heart size={20} />
                </button>
                <button className={`p-3 rounded-lg border ${darkMode ? "border-gray-700 bg-gray-900 hover:bg-gray-700" : "border-gray-300 bg-gray-100 hover:bg-gray-200"}`}>
                  <Share2 size={20} />
                </button>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-green-500">In Stock</span>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className={`rounded-xl p-6 mb-8 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
            <h2 className="text-2xl font-bold mb-4">Product Description</h2>
            <div className={`space-y-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>

          {/* Specifications Section */}
          <div className={`rounded-xl p-6 mb-8 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
            <h2 className="text-2xl font-bold mb-4">Specifications</h2>
            <div className={`overflow-x-auto ${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-lg`}>
              <table className="w-full text-sm">
                <tbody>
                  <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <td className={`px-4 py-3 font-semibold border-r ${darkMode ? "text-white bg-gray-800 border-gray-700" : "text-black bg-gray-100 border-gray-300"}`}>Material</td>
                    <td className={`px-4 py-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>High-quality premium materials</td>
                  </tr>
                  <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <td className={`px-4 py-3 font-semibold border-r ${darkMode ? "text-white bg-gray-800 border-gray-700" : "text-black bg-gray-100 border-gray-300"}`}>Dimensions</td>
                    <td className={`px-4 py-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>10 x 8 x 5 inches</td>
                  </tr>
                  <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <td className={`px-4 py-3 font-semibold border-r ${darkMode ? "text-white bg-gray-800 border-gray-700" : "text-black bg-gray-100 border-gray-300"}`}>Weight</td>
                    <td className={`px-4 py-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>2.5 lbs</td>
                  </tr>
                  <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <td className={`px-4 py-3 font-semibold border-r ${darkMode ? "text-white bg-gray-800 border-gray-700" : "text-black bg-gray-100 border-gray-300"}`}>Color</td>
                    <td className={`px-4 py-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{product.color || "Various options available"}</td>
                  </tr>
                  <tr>
                    <td className={`px-4 py-3 font-semibold border-r ${darkMode ? "text-white bg-gray-800 border-gray-700" : "text-black bg-gray-100 border-gray-300"}`}>Brand</td>
                    <td className={`px-4 py-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Premium Brand</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Reviews Section */}
          <div className={`rounded-xl p-6 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            
            {/* Review Summary */}
            <div className="flex items-center gap-8 mb-8 pb-6 border-b border-gray-300 dark:border-gray-700">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">4.5</div>
                <div className="flex items-center justify-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className={i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                  ))}
                </div>
                <div className="text-sm text-gray-500">128 reviews</div>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-sm w-12">{stars} star</span>
                    <div className={`flex-1 h-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                      <div className="h-2 bg-yellow-400 rounded-full" style={{ width: `${stars * 20}%` }} />
                    </div>
                    <span className="text-sm text-gray-500 w-12">{stars * 20}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className={`p-4 rounded-lg ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}>
                        {review.author[0]}
                      </div>
                      <div>
                        <div className="font-semibold">{review.author}</div>
                        <div className="text-sm text-gray-500">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                      ))}
                    </div>
                  </div>
                  <p className={darkMode ? "text-gray-300" : "text-gray-700"}>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}
