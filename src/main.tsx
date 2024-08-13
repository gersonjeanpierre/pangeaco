import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./globals.css";
import App from "./App";
import NetworkIncident from "./views/NetworkIncident";
import Index from "./views/Index";
import Reasigna from "./views/Reasigna";
import Timbrado from "./views/Timbrado";
const repo = "pangeaco";

const router = createBrowserRouter([
  {
    path: `/${repo}`,
    element: <App />,
    children: [
      {
        path: `/${repo}`,
        element: <Index />,
      },
      {
        path: `/${repo}/timbrados`,
        element: <Timbrado />,
      },
      {
        path: `/${repo}/ni`,
        element: <NetworkIncident />,
      },
      {
        path: `/${repo}/reasignacion`,
        element: <Reasigna />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
