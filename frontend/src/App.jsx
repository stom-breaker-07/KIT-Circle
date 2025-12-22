import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NavbarLanding from "./components/NavbarLanding";
import Footer from "./components/Footer";

import LandingPage from "./components/Landing";
import Homepage from "./pages/Homepage";
import BranchPageWrapper from "./pages/BranchPageWrapper";
import AboutCollege from "./pages/AboutCollege";


// Resource Pages
import Notes from "./components/Notes";
import Assignments from "./components/Assignments";
import QuestionPapers from "./components/QuestionPapers";
import ModelPapers from "./components/ModelPapers";
import Circulars from "./components/Circulars";
import Syllabus from "./components/Syllabus";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";
import SetNewPassword from "./pages/SetNewPassword";
import AddNote from "./pages/AddNote";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col overflow-x-hidden transition-colors duration-200">
      <NavbarLanding />

      <main className="flex-1 pt-24 md:pt-28">
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
          <Route path="/resources/:branch/notes" element={<Notes />} />
          <Route path="/resources/:branch/notes/add" element={<AddNote />} />
          <Route path="/resources/:branch/assignments" element={<Assignments />} />
          <Route path="/resources/:branch/qpapers" element={<QuestionPapers />} />
          <Route path="/resources/:branch/mpapers" element={<ModelPapers />} />
          <Route path="/resources/:branch/circulars" element={<Circulars />} />
          <Route path="/resources/:branch/syllabus" element={<Syllabus />} />
          <Route path="/about-college" element={<AboutCollege />} />


          {/* Unknown URLs */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

