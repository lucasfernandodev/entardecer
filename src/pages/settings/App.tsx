import React from "react";
import ReactDOM from "react-dom/client";
import { SettingPage } from ".";
import "../../styles/global.css";
import { Routes, Route, HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<SettingPage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
