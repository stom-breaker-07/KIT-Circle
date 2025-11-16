import { useState } from "react";

export default function NavbarLanding() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="
        fixed top-0 left-0 w-full
        px-6 md:px-10 py-5
        flex justify-between items-center
        backdrop-blur-md bg-white/40
        border-b border-white/40
        z-50
      "
    >
      {/* LOGO + NAME */}
      <div className="flex items-center gap-3">
        <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
          KIT MATRIX
        </span>
      </div>

      {/* DESKTOP NAV */}
      <nav className="hidden md:flex gap-10 text-gray-800 text-lg font-medium">
        <a href="#about" className="hover:text-indigo-600 transition">About</a>
        <a href="#features" className="hover:text-indigo-600 transition">Features</a>
        <a href="#contact" className="hover:text-indigo-600 transition">Contact</a>
      </nav>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-3xl text-gray-800"
      >
        {open ? "X" : "☰"}
      </button>

      {/* MOBILE MENU */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-md md:hidden">
          <nav className="flex flex-col text-center p-6 gap-6 text-lg font-medium text-gray-800">
            
            <a href="#about" onClick={() => setOpen(false)} className="hover:text-indigo-600 transition">
              About
            </a>
            <a href="#features" onClick={() => setOpen(false)} className="hover:text-indigo-600 transition">
              Features
            </a>
            <a href="#contact" onClick={() => setOpen(false)} className="hover:text-indigo-600 transition">
              Contact
            </a>

          </nav>
        </div>
      )}
    </header>
  );
}
