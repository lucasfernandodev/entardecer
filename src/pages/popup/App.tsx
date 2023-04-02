import React from "react";
import ReactDOM from "react-dom/client";
import Popup from ".";
import "../../styles/global.css";
import {
  FormError,
  FormSuccess,
} from "../../Components/Template/popup/FormMessage";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Popup />} />
        <Route path="/success" element={<FormSuccess />} />
        <Route path="/error" element={<FormError />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
