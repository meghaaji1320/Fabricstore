import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;