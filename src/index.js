import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Import Router
import App from "./App"; // Import komponen App

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App /> {/* App dibungkus dengan Router */}
  </Router>
);
