import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/footer/Footer";
import Axios from "axios";

export default function ProtectedRoutes({ children }) {
  const { currentUser } = useSelector((state) => state.BrandReducer);
  return currentUser ? (
    <>{children}</>
  ) : (
    <Navigate to="/bc-login/:email/:context" />
  );
}
