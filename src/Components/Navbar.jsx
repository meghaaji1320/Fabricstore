import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";
import { ThemeContext } from "../Context/ThemeContext.jsx";
import { CartContext } from "../Context/CartContext.jsx";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { cartlength } = useContext(CartContext);

  return (
    <nav
      className={`flex justify-between items-center px-4 md:px-6 py-3 shadow-md sticky top-0 z-50 transition-colors 
        ${darkMode ? "bg-blue-950 " : "bg-green-200 text-white"}`}
    >
     
      <div className={`font-bold text-xl md:text-2xl ${darkMode ? "text-amber-50" : "text-green-900"}`}>
        Fabric Store
      </div>

     
      <div className="flex gap-3 md:gap-5 items-center flex-wrap md:flex-nowrap">
        <Link
          to="/"
          className={`bg-white p-2 rounded-2xl ${darkMode ? "text-black" : "text-green-900"}`}
        >
          Dashboard
        </Link>

        {user?.isAdmin && (
          <>
            <Link
              to="/admin"
              className={`bg-white p-2 rounded-2xl ${darkMode ? "text-amber-50" : "text-green-900"}`}
            >
              Admin
            </Link>
            <Link
              to="/admin/orders"
              className={`bg-white p-2 rounded-2xl ${darkMode ? "text-amber-50" : "text-green-900"}`}
            >
              All Orders
            </Link>
          </>
        )}

        {user && !user.isAdmin && (
          <Link
            to="/orders"
            className={`bg-white p-2 rounded-2xl ${darkMode ? "text-amber-50" : "text-gray-700"}`}
          >
            My Orders
          </Link>
        )}

       
        {user ? (
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full font-semibold ${darkMode ? "bg-cyan-900 text-amber-50" : "bg-gray-100 text-green-800"}`}>
               {user.username}
            </span>
            <button
              onClick={logout}
              className="bg-green-900  text-white px-3 py-1.5 rounded-2xl "
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className={`bg-white p-2 rounded-2xl ${darkMode ? "text-black" : "text-green-900"}`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`bg-white p-2 rounded-2xl ${darkMode ? "text-black" : "text-green-900"}`}
            >
              Register
            </Link>
          </>
        )}

     
        <Link
          to="/cart"
          className="relative rounded-xl p-2 flex justify-center items-center"
        >
          <CiShoppingCart size={28} className={darkMode ? "text-amber-50" : "text-gray-800"} />
          {cartlength > 0 && (
            <div className="animate-bounce w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center absolute -top-1 -right-1">
              {cartlength}
            </div>
          )}
        </Link>

        <button
          onClick={toggleTheme}
          className={`px-3 py-2 rounded-lg border flex items-center gap-2 transition
            ${darkMode
              ? "border-amber-50 text-amber-50 hover:bg-amber-50 hover:text-cyan-950"
              : "border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white"
            }`}
        >
          {darkMode ? <BsSunFill /> : <BsMoonFill />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;