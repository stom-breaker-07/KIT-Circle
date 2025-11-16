import React from "react";
// import logo from "./assets/logo.png";

export default function Footer() {
  return (
    <footer className="relative bg-white pt-20 pb-10 border-t border-gray-200">

      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-3xl -top-40 -left-40"></div>
        <div className="absolute w-[450px] h-[450px] bg-purple-200/40 rounded-full blur-3xl -bottom-40 -right-40"></div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-14">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3">
            {/* <img src={logo} alt="logo" className="h-12 drop-shadow-md" /> */}
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">KIT MATRIX</h2>
          </div>
          <p className="mt-5 text-gray-700 max-w-sm leading-relaxed">
            A modern notes & assignments platform designed for KIT students to access materials easily.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Explore</h3>
          <ul className="space-y-2 text-gray-600 text-base">
            <li><a href="#about" className="hover:text-indigo-600 transition">About</a></li>
            <li><a href="#features" className="hover:text-indigo-600 transition">Features</a></li>
            <li><a href="#contact" className="hover:text-indigo-600 transition">Contact</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-600 text-base">
            <li>Email: <span className="font-medium text-gray-800">support@kitmatrix.com</span></li>
            <li>Location: Kalpataru Institute of Technology</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="text-center text-gray-500 text-sm mt-14 pt-6 border-t border-gray-200">
        © {new Date().getFullYear()} KIT MATRIX — All Rights Reserved
      </div>
    </footer>
  );
}
