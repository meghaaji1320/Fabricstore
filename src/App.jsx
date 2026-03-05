import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ListPage from "./Pages/ListPage";
import AddProduct from "./Pages/AddProduct";
import AdminDashboard from "./Pages/AdminDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminPath from "./Components/AdminPath";
import CartPage from "./Pages/CartPage";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";
import Orders from "./Pages/Orders";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Navbar />
      <Toaster />

      <Routes>
      
        <Route path="/" element={<ListPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

     
        <Route
          path="/cart"
          element={<ProtectedRoute><CartPage /></ProtectedRoute>}
        />
        <Route
          path="/checkout"
          element={<ProtectedRoute><Checkout /></ProtectedRoute>}
        />
        <Route
          path="/success"
          element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>}
        />
        <Route
          path="/orders"
          element={<ProtectedRoute><Orders /></ProtectedRoute>}
        />

      
        <Route
          path="/admin"
          element={<AdminPath><AdminDashboard /></AdminPath>}
        />
        <Route
          path="/admin/add"
          element={<AdminPath><AddProduct /></AdminPath>}
        />
        <Route
          path="/admin/orders"
          element={<AdminPath><Orders /></AdminPath>}
        />
      </Routes>
    </>
  );
};

export default App;