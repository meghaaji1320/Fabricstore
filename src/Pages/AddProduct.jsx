import React, { useContext, useState } from "react";
import { ProductContext } from "../Context/ProductContext.jsx";
import { UserContext } from "../Context/UserContext.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { user } = useContext(UserContext);
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ 
    title: "", 
    price: "", 
    image: "", 
    description: "", 
    category: "", 
  });

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitProduct = (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.image || !form.description) return toast.error("Fill all fields");
    addProduct(form);
    toast.success("Product added!");
    setForm({ title:"", price:"", image:"", description:"", category:"" });
    navigate("/products");
  };

  if (!user?.isAdmin) return <p className="text-center mt-10 text-red-500">Only Admin can add products.</p>;

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form onSubmit={submitProduct} className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-3 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center">Add Product</h1>
        <input name="title" type="text" value={form.title} placeholder="Title" onChange={handleInput} className="bg-green-100 border-amber-300 p-2 rounded-2xl"/>
        <input name="price" value={form.price} placeholder="Price" onChange={handleInput} className="bg-green-100 border-amber-300 p-2 rounded-2xl"/>
        <input name="image" type="text" value={form.image} placeholder="Image URL" onChange={handleInput} className="bg-green-100 border-amber-300 p-2 rounded-2xl"/>
        <select name="category" value={form.category} onChange={handleInput} className="bg-green-100 border-amber-300 p-2 rounded-2xl">
            <option value="Net Fabrics">net fabrics</option>
            <option value="Hakoba">hakoba</option>
            <option value="Hand Printed">hand printed</option>
            <option value=" Embroidery "> embroidery </option>
        </select>
        <textarea name="description" value={form.description} placeholder="Description" onChange={handleInput} className="bg-green-100 border-amber-300 p-2 rounded-2xl"/>
        <button className="bg-green-950 text-white py-2 rounded-2xl  ">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;