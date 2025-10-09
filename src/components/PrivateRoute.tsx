import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_APP_SECRET_KEY;

const PrivateRoute = () => {
  const location = useLocation();
  const encryptedToken = localStorage.getItem("authToken");
  let token: string | null = null;

  if (encryptedToken) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
      token = bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Error decrypting token:", error);
      token = null;
    }
  }

  const isPublicRoute =
    location.pathname === "/login" || location.pathname === "/forgot-password";


  if (isPublicRoute) {
    return <Outlet />;
  }

  
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
