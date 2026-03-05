import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <h1 className="text-2xl font-bold text-green-900 mb-8">
        Admin Dashboard
      </h1>

      <div className="flex flex-col gap-4">
       
        <Link
          to="/admin/add"
          className="bg-white text-green-950 px-6 p-2 rounded-2xl   "
        >
          Add Product
        </Link>

       
        <Link
          to="/"
          className="bg-white text-green-950 px-6 p-2 rounded-2xl  "
        >
          View Products
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;