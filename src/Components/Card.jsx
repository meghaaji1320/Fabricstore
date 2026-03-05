
import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../Context/ProductContext.jsx";
import { CartContext } from "../Context/CartContext.jsx";
import { UserContext } from "../Context/UserContext.jsx";
import { ThemeContext } from "../Context/ThemeContext.jsx";
import { useNavigate } from "react-router-dom";

const Card = ({ product }) => {
  const [qty, setQty] = useState(0);
  const { deleteProduct, updateProduct } = useContext(ProductContext);
  const { addtoCart, removeFromCart, Cart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { darkMode } = useContext(ThemeContext); // added ThemeContext
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ ...product });

  const navigate = useNavigate();

  useEffect(() => {
    const item = Cart.find((x) => x.id === product.id);
    setQty(item?.quantity || 0);
  }, [Cart, product.id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    updateProduct(product.id, form);
    setIsEditing(false);
  };

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add to cart");
      navigate("/login");
      return;
    }
    addtoCart(product);
  };

  const handleRemoveFromCart = () => {
    if (!user) {
      alert("Please login to modify cart");
      navigate("/login");
      return;
    }
    removeFromCart(product);
  };

  return (
    <div
      className={`shadow-lg rounded-xl p-4 cursor-pointer transform transition duration-300
        ${darkMode ? "bg-gray-800 text-gray-100 hover:shadow-2xl" : "bg-white text-gray-900 hover:shadow-2xl hover:scale-105"}
      `}
    >
      {isEditing ? (
        <div className="flex flex-col gap-3">
          <input
            name="title"
            value={form.title}
            onChange={handleInput}
            placeholder="Product Title"
            className={`border p-2 rounded ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 bg-white text-gray-900"}`}
          />
          <input
            name="price"
            value={form.price}
            onChange={handleInput}
            placeholder="Price"
            className={`border p-2 rounded ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 bg-white text-gray-900"}`}
          />
          <input
            name="image"
            value={form.image}
            onChange={handleInput}
            placeholder="Image URL"
            className={`border p-2 rounded ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 bg-white text-gray-900"}`}
          />
          <select
            name="category"
            value={form.category}
            onChange={handleInput}
            className={`border p-2 rounded ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 bg-white text-gray-900"}`}
          >
            <option value="Net Fabrics">net fabrics</option>
            <option value="Hakoba">hakoba</option>
            <option value="Hand Printed">hand printed</option>
            <option value="Embroidery">embroidery</option>
          </select>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInput}
            placeholder="Description"
            className={`border p-2 rounded ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 bg-white text-gray-900"}`}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded w-full "
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded w-full hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-52 object-cover rounded-xl mb-3"
            />
          ) : (
            <div className={`w-full h-52 rounded-xl mb-3 flex items-center justify-center ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-400"}`}>
              No Image
            </div>
          )}

          <h2 className="text-xl font-bold text-center mb-1">{product.title}</h2>
          <p className={`font-semibold text-center mb-1 ${darkMode ? "text-green-400" : "text-green-700"}`}>₹ {product.price}</p>
          <p className="text-center mb-2">{product.category}</p>
          <p className="text-sm text-center mb-2">{product.description}</p>

          {user?.isAdmin ? (
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-green-400 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() =>
                  window.confirm("Delete this product?") && deleteProduct(product.id)
                }
                className="bg-green-950 text-white px-4 py-2 rounded w-full  "
              >
                Delete
              </button>
            </div>
          ) : (
            qty > 0 ? (
              <div className="flex gap-3 justify-center items-center">
                <button
                  onClick={handleRemoveFromCart}
                  className={`px-2 rounded border ${darkMode ? "border-red-400" : "border-red-300"}`}
                >
                  -
                </button>
                {qty}
                <button
                  onClick={handleAddToCart}
                  className={`px-2 rounded border ${darkMode ? "border-green-400" : "border-green-300"}`}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className={`w-full p-2 rounded-sm ${darkMode ? "bg-amber-100 text-gray-900" : "bg-green-900 text-white"}`}
              >
                Add to cart
              </button>
            )
          )}
        </>
      )}
    </div>
  );
};

export default Card;