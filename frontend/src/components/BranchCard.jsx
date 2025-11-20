import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * BranchCard - clickable card that navigates to /branch/:code
 * Hover: subtle lift & shadow, transition
 */
export default function BranchCard({ title, code }) {
  const navigate = useNavigate();

  return (
    <div
      role="button"
      onClick={() => navigate(`/branch/${code}`)}
      className="cursor-pointer bg-white p-6 rounded-2xl border border-gray-200 shadow-sm
                 hover:shadow-lg hover:-translate-y-2 transition-transform duration-200 ease-out"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-700">Click to choose year, subject and resources.</p>

      <div className="mt-4 inline-flex items-center gap-2 text-indigo-600 font-medium">
        <span>Open</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="inline-block">
          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
