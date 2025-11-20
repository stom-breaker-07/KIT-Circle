import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-24">
      <main className="flex-grow flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white shadow-xl border border-gray-200 rounded-2xl p-8">

          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Lecturer Login
          </h2>

          <div className="space-y-5">
            
            {/* Email */}
            <div>
              <label className="block mb-1 font-semibold text-gray-800">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter password"
              />
            </div>

            {/* Login Button */}
            <button
              onClick={() => navigate("/home")}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
            >
              Login
            </button>

            {/* Register Link */}
            <p className="text-center text-gray-700 mt-3">
              Don’t have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Register
              </button>
            </p>

            {/* Forgot Password Link */}
            <p className="text-center text-gray-700 mt-3">
              Forgot Password?{" "}
              <button
                onClick={() => navigate("/reset-password")}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Reset
              </button>
            </p>

          </div>
        </div>
      </main>
    </div>
  );
}
