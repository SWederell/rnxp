import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { FirebaseContextProvider } from "./contexts/FirebaseContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeContextProvider>
      <FirebaseContextProvider>
        <App />
      </FirebaseContextProvider>
    </ThemeContextProvider>
  </BrowserRouter>,
);
