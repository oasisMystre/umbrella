import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import "@solana/wallet-adapter-react-ui/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import HomePage from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App router={router} />
  </React.StrictMode>
);
