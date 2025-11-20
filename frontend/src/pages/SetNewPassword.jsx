import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SetNewPassword() {
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const submit = () => {
    if (pass.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    if (pass !== confirm) {
      alert("Passwords do not match");
      return;
    }

    alert("Password successfully reset!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">

        <h2 className="text-3xl font-bold text-center mb-6">Create New Password</h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full px-4 py-3 border rounded-lg mb-5 focus:ring-2 focus:ring-indigo-500"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-3 border rounded-lg mb-6 focus:ring-2 focus:ring-indigo-500"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
        >
          Reset Password
        </button>

      </div>
    </div>
  );
}
