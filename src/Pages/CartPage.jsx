import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { ThemeContext } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const { Cart, addtoCart, removeFromCart } = useContext(CartContext);
  const { darkMode } = useContext(ThemeContext);
  const total = Cart.reduce((a, b) => a + b.price * b.quantity, 0);

  return (
    <div
      className={`min-h-screen w-full transition-colors
        ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-green-900"}`}
    >
      <div className="max-w-7xl mx-auto px-4 pt-6">
        {Cart.length === 0 ? (
          <div className="mt-24 text-center text-2xl font-semibold opacity-70">
            🛒 Your cart is empty
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* CART TABLE */}
            <div className="flex-1 overflow-x-auto rounded-lg shadow-lg">
              <table
                className={`w-full border-collapse shadow-sm transition-colors
                  ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
              >
                <thead>
                  <tr
                    className={`text-sm uppercase tracking-wide
                      ${darkMode ? "bg-gray-700 text-gray-100" : "bg-green-950 text-amber-50"}`}
                  >
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-center"></th>
                    <th className="p-3 text-right">Price</th>
                  </tr>
                </thead>

                <tbody>
                  {Cart.map((item) => (
                    <tr
                      key={item.id}
                      className={`border-b transition
                        ${darkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-200 hover:bg-gray-50"}`}
                    >
                      <td className="p-4 flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 object-contain rounded"
                        />
                        <span className="font-medium">{item.title}</span>
                      </td>

                      <td className="p-4 text-center">
                        <div
                          className={`inline-flex items-center rounded border
                            ${darkMode ? "border-gray-600" : "border-gray-300"}`}
                        >
                          <button
                            onClick={() => removeFromCart(item)}
                            className={`px-3 py-1 font-bold transition
                              ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"}`}
                          >
                            -
                          </button>
                          <span className="px-4 py-1">{item.quantity}</span>
                          <button
                            onClick={() => addtoCart(item)}
                            className={`px-3 py-1 font-bold transition
                              ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"}`}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="p-4 text-right font-semibold">
                        ₹{item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          
            <div
              className={`w-full md:w-96 p-6 rounded-2xl shadow-lg transition-colors
                ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}
            >
              <h2 className="text-xl text-green-700 font-bold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-2 text-sm">
                <span>Items ({Cart.length})</span>
                <span>₹{total}</span>
              </div>

              <div className="flex justify-between mb-2 text-sm">
                <span>Delivery</span>
                <span className="text-green-500">Free</span>
              </div>

              <hr className={`my-3 ${darkMode ? "border-gray-700" : "border-gray-200"}`} />

              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total Amount</span>
                <span className="text-amber-500">₹{total}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className={`w-full py-3 rounded-lg font-semibold transition
                  ${darkMode ? "bg-blue-950  text-amber-50" : "bg-green-950 hover:bg-green-400 text-amber-50"}`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;