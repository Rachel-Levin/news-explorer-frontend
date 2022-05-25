import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, loggedIn }) => {
  return !loggedIn ? <Navigate replace to="/" /> : children;
};

export default ProtectedRoute;