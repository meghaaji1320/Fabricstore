import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Context/ProductContext.jsx";
import { UserContext } from "../Context/UserContext.jsx";
import { ThemeContext } from "../Context/ThemeContext.jsx";
import Card from "../Components/Card.jsx"

const ListPage = () => {
  const { products } = useContext(ProductContext);
  const { user } = useContext(UserContext);
  const { darkMode } = useContext(ThemeContext);

  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setFiltered(products);
  }, [products]);

  useEffect(() => {
    let data = products;

    if (query.trim()) {
      data = data.filter((x) =>
        x.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category) {
      data = data.filter((x) => x.category === category);
    }

    setFiltered(data);
  }, [query, category, products]);

  return (
    <div
      className={`p-6 flex flex-col items-center min-h-screen
        ${darkMode ? "bg-black text-gray-100" : "bg-gray-50 text-gray-900"}`}
    >
      <h1
        className={`text-3xl font-bold mb-4
          ${darkMode ? "text-white" : "text-green-900"}`}
      >
        Product List
      </h1>

     
      <div className="flex gap-4 mb-4 flex-wrap justify-center">
        <input
          onInput={(e) => setQuery(e.target.value)}
          placeholder="Search here"
          className={`p-2 rounded-2xl outline-none border
            ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }`}
        />

       <select
  onChange={(e) => setCategory(e.target.value)}
  className={`p-2 rounded-2xl outline-none border
    ${
      darkMode
        ? "bg-gray-700 border-gray-600 text-white"
        : "bg-white border-gray-300"
    }`}
>
  <option value="">All Categories</option>
  <option value="Net Fabrics">Net Fabrics</option>
  <option value="Hakoba">Hakoba</option>
  <option value="Hand Printed">Hand Printed</option>
  <option value="Embroidery">Embroidery</option>
</select>
      </div>

    
      {filtered.length === 0 && (
        <h2 className="text-lg opacity-70">
          No Products Found
        </h2>
      )}

    
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {filtered.map((p) => (
          <Card key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default ListPage;