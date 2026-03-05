import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (data) => {
    setProducts((prev) => [...prev, { id: Date.now(), ...data }]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, deleteProduct, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};