import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { ThemeContext } from "../Context/ThemeContext";

const OrderSuccess = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors
        ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}
    >
      <div
        className={`shadow-md rounded-xl p-8 text-center max-w-md w-full transition-colors
          ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-sm mb-6 opacity-70">
          Your order has been placed succesfully!
        </p>
        <Link
          to="/orders"
          className={`block py-3 rounded-lg font-semibold transition
            ${darkMode
              ? "bg-black  text-white"
              : "bg-green-900  text-amber-50"}`}
        >
          View  Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;