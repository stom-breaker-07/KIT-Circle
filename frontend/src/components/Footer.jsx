import React from "react";
// import logo from "./assets/logo.png";

export default function Footer() {
  return (
    <footer className="relative bg-white dark:bg-gray-900 pt-20 pb-10 border-t border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">

      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 opacity-50 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-indigo-200/40 dark:bg-indigo-900/20 rounded-full blur-3xl -top-40 -left-40"></div>
        <div className="absolute w-[450px] h-[450px] bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-3xl -bottom-40 -right-40"></div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-14">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3">
            {/* <img src={logo} alt="logo" className="h-12 drop-shadow-md" /> */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">KIT MATRIX</h2>
          </div>
          <p className="mt-5 text-gray-700 dark:text-gray-300 max-w-sm leading-relaxed">
            A modern notes & assignments platform designed for KIT students to access materials easily.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Explore</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-base">
            <li><a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">About</a></li>
            <li><a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Features</a></li>
            <li><a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-base">
            <li>Email: <span className="font-medium text-gray-800 dark:text-gray-200">support@kitmatrix.com</span></li>
            <li>Location: Kalpataru Institute of Technology</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-14 pt-6 border-t border-gray-200 dark:border-gray-700">
        © {new Date().getFullYear()} KIT MATRIX — All Rights Reserved
      </div>
    </footer>
  );
}
