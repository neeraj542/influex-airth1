import React from "react";
import { useRoutes } from "react-router-dom";
import InstagramLogin from "../components/InstagramLogin";
import InstagramRedirect from "../components/InstagramRedirect";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <InstagramLogin /> },
    { path: "/instagram-redirect", element: <InstagramRedirect /> },
  ]);

  return routes;
};

export default AppRoutes;
