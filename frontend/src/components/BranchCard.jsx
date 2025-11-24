import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * BranchCard – Card UI to navigate to /branch/:code
 * Improved hover animation, better layout, accessible role/button,
 * and modern polished look.
 */
export default function BranchCard({ title, code }) {
  const navigate = useNavigate();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/branch/${code}`)}
      onKeyDown={(e) => (e.key === "Enter" ? navigate(`/branch/${code}`) : null)}
      className="
        cursor-pointer select-none
        bg-white
        p-6
        rounded-2xl
        border border-gray-200
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-2
        transform
        transition-all
        duration-200
        ease-out
        focus:outline-none
        focus:ring-2
        focus:ring-indigo-500
      "
    >
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>

      <p className="text-gray-600">
        Access notes, assignments, question papers & more academic resources.
      </p>

      <div className="mt-5 inline-flex items-center gap-2 text-indigo-600 font-medium">
        <span>Explore</span>

        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="group-hover:translate-x-1 transition-transform duration-200"
        >
          <path
            d="M5 12h14M13 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
