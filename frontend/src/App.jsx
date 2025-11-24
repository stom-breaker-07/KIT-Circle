import './App.css';
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from './components/Landing';
import Homepage from "./pages/Homepage";
import BranchPageWrapper from "./pages/BranchPageWrapper";

// Resource Pages
import Notes from './components/Notes';
import Assignments from './components/Assignments';
import QuestionPapers from './components/QuestionPapers';
import ModelPapers from './components/ModelPapers';
import Circulars from './components/Circulars';
import Syllabus from './components/Syllabus';

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";
import SetNewPassword from "./pages/SetNewPassword";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/new-password" element={<SetNewPassword />} />

        {/* Main App Pages */}
        <Route path="/home" element={<Homepage />} />
        <Route path="/branch/:code" element={<BranchPageWrapper />} />

        {/* Resource Pages - New Structure */}
        <Route
          path="/resources/:branch/notes"
          element={<Notes />}
        />
        <Route
          path="/resources/:branch/assignments"
          element={<Assignments />}
        />
        <Route
          path="/resources/:branch/qpapers"
          element={<QuestionPapers />}
        />
        <Route
          path="/resources/:branch/mpapers"
          element={<ModelPapers />}
        />
        <Route
          path="/resources/:branch/circulars"
          element={<Circulars />}
        />
        <Route
          path="/resources/:branch/syllabus"
          element={<Syllabus />}
        />

        {/* Unknown URLs */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </div>
  );
}

export default App;

