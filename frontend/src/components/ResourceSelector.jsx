import React from "react";

/**
 * Shows resource cards for: Notes, Assignments, Question Papers, Model Papers, Syllabus Copy
 * Each card uses hover transition. Real action handlers are placeholders — integrate your APIs.
 */

export default function ResourceSelector({ branch, year, subject }) {
  const items = [
    { id: "notes", label: "Notes", desc: "Download well-organized lecture notes." },
    { id: "assignments", label: "Assignments", desc: "View and submit assignments." },
    { id: "qpapers", label: "Question Papers", desc: "Previous year question papers." },
    { id: "mpapers", label: "Model Papers", desc: "Model/sample question papers." },
    { id: "syllabus", label: "Syllabus Copy", desc: "Download syllabus for the subject." },
  ];

  const handleOpen = (id) => {
    // Placeholder: replace with actual router/modal/API hook
    alert(`${id.toUpperCase()} requested\nBranch: ${branch}\nYear: ${year}\nSubject: ${subject}`);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Resources — {subject} • {year}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it) => (
          <div
            key={it.id}
            onClick={() => handleOpen(it.id)}
            className="cursor-pointer bg-white p-6 rounded-2xl border border-gray-200 shadow-sm
                       hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-200"
            role="button"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{it.label}</h4>
                <p className="text-gray-600 mt-2">{it.desc}</p>
              </div>

              <div className="text-indigo-600 font-semibold text-sm">Open →</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
