import React, { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { OrderContext } from "../Context/OrderContext";
import { UserContext } from "../Context/UserContext";
import { ThemeContext } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { Cart, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const { user } = useContext(UserContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const total = Cart.reduce((a, b) => a + b.price * b.quantity, 0);

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phonenumber: "",
    payment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.city || !form.state || !form.pincode || !form.phonenumber || !form.payment) {
      alert("Please fill all fields");
      return;
    }
    if (!user) {
      alert("Please login to place an order");
      return;
    }
    if (Cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const order = {
      id: Date.now(),
      userId: user.id,
      username: user.username,
      items: Cart,
      total,
      payment: form.payment,
      ...form,
      date: new Date().toISOString(),
    };

    addOrder(order);
    clearCart();
    navigate("/success");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors
      ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      
      <form
        onSubmit={placeOrder}
        className={`w-full max-w-xl p-6 md:p-8 rounded-xl shadow-md border transition-colors
          ${darkMode ? " border" : "bg-white border-gray-200"}`}
      >
        <h2 className={`text-2xl font-bold mb-6 text-center
          ${darkMode ? "text-white" : "text-blue-950"}`}>
           Address
        </h2>

       
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className={`w-full mb-4 p-3 rounded-md outline-none border
            ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:border-amber-400"
                       : "border-gray-300 focus:border-cyan-700"}`}
        />

     
        <textarea
          name="address"
          placeholder="Full Address"
          value={form.address}
          onChange={handleChange}
          rows="3"
          className={`w-full mb-4 p-3 rounded-md outline-none resize-none border
            ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:border-amber-400"
                       : "border-gray-300 focus:border-cyan-700"}`}
        />

      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className={`p-3 rounded-md outline-none border
              ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className={`p-3 rounded-md outline-none border
              ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`}
          />
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input
            type="tel"
            name="phonenumber"
            placeholder="Phone Number"
            value={form.phonenumber}
            onChange={handleChange}
            className={`p-3 rounded-md outline-none border
              ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`}
          />
          <input
            type="number"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            className={`p-3 rounded-md outline-none border
              ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`}
          />
        </div>

  
        <div className="mt-6 border-t pt-4">
          <h3 className={`font-semibold mb-3 ${darkMode ? "text-green-400" : "text-green-400"}`}>
            Payment Method
          </h3>

          <label className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={form.payment === "COD"}
              onChange={handleChange}
              className="accent-amber-500"
            />
            <span>Cash on Delivery</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="UPI"
              checked={form.payment === "UPI"}
              onChange={handleChange}
              className="accent-amber-500"
            />
            <span>UPI / Online Payment</span>
          </label>
        </div>

      
        <div className="mt-6 flex justify-between items-center text-lg font-bold">
          <span>Total Amount</span>
          <span className="text-black">₹{total}</span>
        </div>

        <button
          type="submit"
          className={`mt-6 w-full p-3 rounded-lg font-semibold transition
            ${darkMode ? "bg-blue-950  text-white"
                       : "bg-green-950 hover:bg-green-700 text-amber-50"}`}
        >
          PLACE ORDER
        </button>
      </form>
    </div>
  );
};

export default Checkout;