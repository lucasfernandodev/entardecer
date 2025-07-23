import React from "react";
import ReactDOM from "react-dom/client";
import "../../styles/global.css";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { PopupPage } from ".";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<PopupPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
