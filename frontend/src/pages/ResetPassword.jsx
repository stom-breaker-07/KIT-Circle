import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendOtp = () => {
    if (email.trim() === "") {
      alert("Please enter your email");
      return;
    }
    // Frontend only → directly go to OTP page
    navigate("/verify-otp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">

        <h2 className="text-3xl font-bold text-center mb-6">Reset Password</h2>
        <p className="text-gray-600 text-center mb-5">
          Enter your email to receive a verification code.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 border rounded-lg mb-5 focus:ring-2 focus:ring-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={sendOtp}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
}
