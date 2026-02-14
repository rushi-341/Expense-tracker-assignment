import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If user is not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated → render protected content
  return children;
};

export default PrivateRoute;
