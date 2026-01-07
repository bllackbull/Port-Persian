import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronLeft, CreditCard, Instagram, Twitter, Youtube, Trash2 } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function Cart({ cart, setCart, darkMode, setDarkMode, language, setLanguage, orderedCategories }) {
  const navigate = useNavigate();
  const totalOriginal = cart.reduce((sum, item) => sum + (item.originalPrice || item.price), 0);
  const totalDiscount = cart.reduce((sum, item) => sum + ((item.originalPrice || item.price) - item.price), 0);
  const finalTotal = totalOriginal - totalDiscount;

  // Loading state for cart page skeletons
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600); // simulate network
    return () => clearTimeout(t);
  }, []);

  const removeFromCart = (id) => {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const SkeletonCartItem = ({ keyProp }) => (
    <div key={keyProp} className={`flex items-center justify-between p-3 md:p-4 rounded-lg ${darkMode ? 'bg-gray-900 border-gray-700' : 'border bg-white'}`}>
      <div className="flex items-center space-x-3 md:space-x-4 w-full">
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`} />
        <div className="flex-1">
          <div className={`h-4 rounded mb-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} animate-pulse w-32 md:w-40`} />
          <div className={`h-3 rounded ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} animate-pulse w-24 md:w-28`} />
        </div>
        <div className={`h-6 w-16 md:w-20 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-400'} animate-pulse`} />
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} cart={cart} orderedCategories={orderedCategories} />

      <div className="flex-1 pt-28 md:pt-40 px-4 md:px-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          {loading ? (
            <div className="hidden md:flex items-center gap-4">
              <div className={`w-10 h-10 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`} />
              <div className={`h-8 w-56 rounded ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} animate-pulse`} />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button aria-label="Back" onClick={() => navigate(-1)} className={`hidden md:inline-flex p-2 rounded-lg border ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white hover:bg-gray-100 text-black'}`}>
                <ChevronLeft size={18} />
              </button>
              <h1 className="text-3xl font-bold hidden md:block">Shopping Cart</h1>
            </div>
          )}

          {/* right side spacer (keeps layout symmetrical) */}
          <div />
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          <div className={`flex-1 rounded-lg shadow p-4 max-h-[60vh] md:h-[calc(100vh-20rem)] overflow-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => <SkeletonCartItem key={i} keyProp={i} />)}
              </div>
            ) : cart.length === 0 ? (
              <div className="w-full h-64 flex flex-col items-center justify-center text-gray-500">
                <ShoppingCart size={56} className="opacity-40" />
                <p className="mt-4 text-sm">Your cart is empty.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className={`flex items-center justify-between p-3 md:p-4 rounded-lg ${darkMode ? 'bg-gray-900 border-gray-700' : 'border'}`}>
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                      <div>
                        <h3 className="font-semibold text-sm md:text-base">{item.name}</h3>
                        <p className={`text-xs md:text-sm ${item.discount ? 'line-through text-gray-400' : ''}`}>${item.originalPrice || item.price}</p>
                        {item.discount && (
                          <div className="flex items-center">
                            <p className="font-semibold text-red-500">${item.price}</p>
                            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold ml-2">-{item.discount}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} aria-label={`Delete ${item.name}`} className="text-red-500 hover:text-red-700 p-2">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className={`w-full md:w-80 rounded-lg shadow p-4 mt-4 md:mt-0 md:h-[calc(100vh-20rem)] flex flex-col justify-between ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            {loading ? (
              <div className="space-y-4">
                <div className={`h-4 rounded mb-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} animate-pulse`} />
                <div className={`h-4 rounded mb-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} animate-pulse`} />
                <div className={`h-10 rounded mb-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} animate-pulse`} />
              </div>
            ) : (
              <>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Total Price:</span>
                    <span>${totalOriginal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-600">Total Discount:</span>
                    <span className="text-green-600">-${totalDiscount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Final Price:</span>
                    <span className="text-lg font-bold">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
                <div>
                  <button disabled={loading || cart.length === 0} aria-disabled={loading || cart.length === 0} className={`w-full py-3 rounded-lg transition flex items-center justify-center ${loading || cart.length === 0 ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                    <CreditCard size={20} className="mr-2" />
                    Proceed to Payment
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
      <div className="hidden md:block">
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
}