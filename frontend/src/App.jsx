import './App.css';
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from './components/Landing';
import Homepage from "./pages/Homepage";
import BranchPageWrapper from "./pages/BranchPageWrapper";

function App() {
  return (
    <div className="min-h-screen bg-white">
      
      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Homepage */}
        <Route path="/home" element={<Homepage />} />

        {/* Branch page */}
        <Route path="/branch/:code" element={<BranchPageWrapper />} />

        {/* Redirect any unknown URL */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

    </div>
  );
}

export default App;
