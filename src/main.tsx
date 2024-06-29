import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./globals.css";
import App from "./App";
import NetworkIncident from "./views/NetworkIncident";
import Index from "./views/Index";
import Reasigna from "./views/Reasigna";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Index />,
      },
      {
        path: "ni",
        element: <NetworkIncident />,
      },
      {
        path: "reasigna",
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

