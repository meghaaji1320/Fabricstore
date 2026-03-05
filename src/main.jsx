import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./Context/UserContext.jsx";
import { ProductProvider } from "./Context/ProductContext.jsx";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { OrderProvider } from "./Context/OrderContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <UserProvider>
            <ProductProvider>
              <OrderProvider>
                <App />
              </OrderProvider>
            </ProductProvider>
          </UserProvider>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
