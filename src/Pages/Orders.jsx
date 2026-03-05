import React, { useContext } from "react";
import { OrderContext } from "../Context/OrderContext";
import { UserContext } from "../Context/UserContext";
import { ThemeContext } from "../Context/ThemeContext";

const Orders = () => {
  const { orders, deleteOrder } = useContext(OrderContext);
  const { user } = useContext(UserContext);
  const { darkMode } = useContext(ThemeContext);

  if (!user) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-4 transition-colors
          ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}
      >
        <h2 className="text-center text-lg font-semibold opacity-80">
          Please login to view your orders
        </h2>
      </div>
    );
  }

  const userOrders = user.isAdmin
    ? orders
    : orders.filter((order) => order.userId === user.id);

  if (userOrders.length === 0) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-4 transition-colors
          ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}
      >
        <h2 className="text-center text-lg font-semibold opacity-80">
          No Orders Found
        </h2>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen px-4 py-10 transition-colors
        ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-3xl font-bold mb-8 ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          {user.isAdmin ? "All Orders" : "My Orders"}
        </h2>

        {userOrders.map((order) => {
          const totalItems = order.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          return (
            <div
              key={order.id}
              className={`mb-10 rounded-xl shadow-md border transition-colors
                ${darkMode ? "bg-blue-950" : "bg-white border-gray-300"}`}
            >
            
              <div
                className={`grid grid-cols-2 md:grid-cols-5 gap-4 p-5 text-sm font-semibold rounded-t-xl transition-colors
                  ${darkMode ? " text-gray-100" : " text-black"}`}
              >
                <div>
                  <p className="text-xs opacity-70">ORDER ID</p>
                  <p>{order.id}</p>
                </div>
                <div>
                  <p className="text-xs opacity-70">TOTAL</p>
                  <p>₹{order.total}</p>
                </div>
                <div>
                  <p className="text-xs opacity-70">ITEMS</p>
                  <p>{totalItems}</p>
                </div>
                <div>
                  <p className="text-xs opacity-70">PAYMENT</p>
                  <p>{order.payment}</p>
                </div>
                <div>
                  <p className="text-xs opacity-70">DATE</p>
                  <p>{new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>

             
              {user.isAdmin && (
                <div className="flex justify-end px-5 pt-4">
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm transition"
                  >
                    Delete Order
                  </button>
                </div>
              )}

             
              <div className="">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 gap-4"
                  >
                    <div>
                      <h4 className={`font-semibold ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
                        {item.title}
                      </h4>
                      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Price: ₹{item.price}
                      </p>
                    </div>
                    <div className={`flex gap-6 text-sm font-semibold ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
                      <span>Qty: {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>

             
              <div
                className={`px-5 py-4 flex justify-between items-center font-semibold rounded-b-xl transition-colors
                  ${darkMode ? " text-gray-100" : "bg-gray-100 text-gray-900"}`}
              >
                <span>Total Payable</span>
                <span className="text-lg ">₹{order.total}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;