import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, CreditCard } from 'lucide-react';

export default function Cart({ cart, setCart, darkMode }) {
  const navigate = useNavigate();
  const totalOriginal = cart.reduce((sum, item) => sum + (item.originalPrice || item.price), 0);
  const totalDiscount = cart.reduce((sum, item) => sum + ((item.originalPrice || item.price) - item.price), 0);
  const finalTotal = totalOriginal - totalDiscount;

  const removeFromCart = (id) => {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full shadow px-6 py-4 z-50 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Shop</h1>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/')} className={`p-2 rounded-lg border ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
              <ArrowLeft size={20} />
            </button>
            <button className={`p-2 rounded-lg border ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Content */}
      <div className="pt-24 px-6">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className={`flex items-center justify-between p-4 rounded-xl shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className={`text-sm ${item.discount ? 'line-through text-gray-500' : ''}`}>${item.originalPrice || item.price}</p>
                    {item.discount && (
                      <div className="flex items-center">
                        <p className="font-semibold text-red-500">${item.price}</p>
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold ml-2">-{item.discount}%</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className={`p-4 rounded-xl shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-2">
                <span>Total Original:</span>
                <span>${totalOriginal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-600">Total Discount:</span>
                <span className="text-green-600">-${totalDiscount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Final Total:</span>
                <span className="text-lg font-bold">${finalTotal.toFixed(2)}</span>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
                <CreditCard size={20} className="mr-2" />
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}