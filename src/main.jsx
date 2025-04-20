import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { MTThemeProvider } from './configs/MTailwind';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MTThemeProvider>
      <App />
    </MTThemeProvider>
  </React.StrictMode>
);
