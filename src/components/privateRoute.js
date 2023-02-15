import { useContext, useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { loadData } from "./localStorage";

export const PrivateRoute = ({ children }) => {
  const type = loadData("token");

  if (type !== "foo" || type == null) {
    return <Navigate to={"/"} />;
  }
  return children;
};
