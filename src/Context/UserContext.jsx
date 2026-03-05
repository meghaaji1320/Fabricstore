// import { createContext, useEffect, useState,useContext } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { CartContext } from "./CartContext";
// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const navigate = useNavigate();
// const { clearCart } = useContext(CartContext); 
//   const [users, setUsers] = useState(
//     JSON.parse(localStorage.getItem("users")) || []
//   );

//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );

//   useEffect(() => {
//     localStorage.setItem("users", JSON.stringify(users));
//   }, [users]);

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(user));
//   }, [user]);

//   const logout = () => {
//     setUser(null);
//      clearCart(); 
//     navigate("/");
//     toast.success("Logged out");
//   };

//   const registerUsers = (data) => {
//     setUsers((prev) => [
//       ...prev,
//       { id: Date.now(), ...data, isAdmin: false },
//     ]);
//     toast.success("Successfully registered");
//     navigate("/login");
//   };

//   const loginUser = (data) => {
//     const exist = users.find((x) => x.email === data.email);

//     if (!exist) return toast.error("User does not exist");

//     if (exist.password === data.password) {
//       setUser(exist);
//       toast.success("Logged in successfully");
//       navigate("/");
//     } else {
//       toast.error("Invalid credentials");
//     }
//   };

//   return (
//     <UserContext.Provider
//       value={{ registerUsers, loginUser, user, logout, users }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };


 import { createContext, useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { initialUsers } from "./Data";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  // Load users from localStorage or fallback to initialUsers
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");

    if (storedUsers) {
      const parsed = JSON.parse(storedUsers);

      // If stored users array is empty, use initialUsers
      if (parsed.length === 0) {
        return initialUsers;
      }

      return parsed;
    }

    return initialUsers;
  });

  // Logged in user
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Save users to localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Save logged in user
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // Register new user
  const registerUsers = (data) => {
    const exists = users.find((x) => x.email === data.email);

    if (exists) {
      toast.error("User already exists");
      return;
    }

    const newUser = {
      id: Date.now(),
      username: data.username,
      email: data.email,
      password: data.password,
      isAdmin: false,
    };

    setUsers((prev) => [...prev, newUser]);

    toast.success("Successfully registered");
    navigate("/login");
  };

  // Login user
  const loginUser = (data) => {
    const exist = users.find((x) => x.email === data.email);

    if (!exist) {
      toast.error("User does not exist");
      return;
    }

    if (exist.password == data.password) {
      setUser(exist);
      toast.success("Logged in successfully");
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    clearCart();
    navigate("/");
    toast.success("Logged out");
  };

  return (
    <UserContext.Provider
      value={{
        users,
        user,
        registerUsers,
        loginUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};