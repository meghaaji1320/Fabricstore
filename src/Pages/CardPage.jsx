import React, { useContext } from "react";
import { ProductContext } from "../Context/ProductContext.jsx";
import Card from "../Components/Card.jsx";

const CardPage = () => {
  const { products } = useContext(ProductContext);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-5">All Products</h1>
      <div className="flex flex-wrap gap-6">
        {products.length > 0 ? products.map(p => <Card key={p.id} product={p} />) : <p>No products found.</p>}
      </div>
    </div>
  );
};

export default CardPage;