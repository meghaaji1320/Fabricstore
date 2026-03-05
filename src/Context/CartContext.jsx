import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [Cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [cartlength, setCartlength] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(Cart));
  }, [Cart]);

  useEffect(() => {
    const num = Cart.reduce((a, b) => a + b.quantity, 0);
    setCartlength(num);
  }, [Cart]);

  const addtoCart = (product) => {
    const exist = Cart.find((pro) => pro.id === product.id);

    if (!exist) {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    } else {
      setCart(
        Cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    }
  };

  const removeFromCart = (product) => {
    const exist = Cart.find((x) => x.id === product.id);

    if (exist.quantity > 1) {
      setCart(
        Cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setCart(Cart.filter((x) => x.id !== product.id));
    }
  };


  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        Cart,
        addtoCart,
        removeFromCart,
        cartlength,
        clearCart, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};