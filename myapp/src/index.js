import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter

import App from "./App";

// Wrap the rendering with createRoot
const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <Router>
    <App />
  </Router>
);
