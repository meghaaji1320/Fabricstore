import { createContext, useEffect, useState,useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
const { clearCart } = useContext(CartContext); 
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const logout = () => {
    setUser(null);
     clearCart(); 
    navigate("/");
    toast.success("Logged out");
  };

  const registerUsers = (data) => {
    setUsers((prev) => [
      ...prev,
      { id: Date.now(), ...data, isAdmin: false },
    ]);
    toast.success("Successfully registered");
    navigate("/login");
  };

  const loginUser = (data) => {
    const exist = users.find((x) => x.email === data.email);

    if (!exist) return toast.error("User does not exist");

    if (exist.password === data.password) {
      setUser(exist);
      toast.success("Logged in successfully");
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <UserContext.Provider
      value={{ registerUsers, loginUser, user, logout, users }}
    >
      {children}
    </UserContext.Provider>
  );
};