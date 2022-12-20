import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Public({ children }) {
  const { currentUser } = useSelector((state) => state.BrandReducer);
  return !currentUser ? <>{children}</> : <Navigate to="/collections-list" />;
}
