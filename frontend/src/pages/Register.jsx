import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-24">
      <main className="flex-grow flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white shadow-xl border border-gray-200 rounded-2xl p-8">

          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Lecturer Registration
          </h2>

          <div className="space-y-5">

            {/* Lecturer Name */}
            <div>
              <label className="block font-semibold text-gray-800 mb-1">
                Lecturer Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold text-gray-800 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-semibold text-gray-800 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Create password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Register Button */}
            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
            >
              Register
            </button>

            {/* Back to Login */}
            <p className="text-center text-gray-700 mt-3">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Login
              </button>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
