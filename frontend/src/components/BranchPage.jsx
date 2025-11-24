import React from "react";
import { Link } from "react-router-dom";

/**
 * branch: one of ('cse','ise','ece','aiml','civil','mech')
 * This component shows resource cards directly without year/subject selection.
 */

const BRANCH_LABELS = {
  cse: "Computer Science (CSE)",
  ise: "Information Science (ISE)",
  ece: "Electronics & Communication (ECE)",
  aiml: "AI & ML",
  civil: "Civil Engineering",
  mech: "Mechanical Engineering",
};

export default function BranchPage({ branch }) {
  const resources = [
    {
      id: "notes",
      label: "Notes",
      desc: "Access notes from all years and subjects.",
      icon: "📚",
    },
    {
      id: "assignments",
      label: "Assignments",
      desc: "View and submit assignments by year and class.",
      icon: "📝",
    },
    {
      id: "qpapers",
      label: "Question Papers",
      desc: "Previous year question papers.",
      icon: "📄",
    },
    {
      id: "mpapers",
      label: "Model Papers",
      desc: "Model and sample question papers.",
      icon: "📋",
    },
    {
      id: "circulars",
      label: "Circulars",
      desc: "College circulars and announcements.",
      icon: "📢",
    },
    {
      id: "syllabus",
      label: "Syllabus",
      desc: "Download syllabus documents.",
      icon: "📖",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-10">
        <h2 className="text-4xl font-bold text-gray-900">
          {BRANCH_LABELS[branch] || branch}
        </h2>
        <p className="text-gray-700 mt-3 text-lg">
          Select the resource you need to access academic materials.
        </p>
      </header>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Link
            key={resource.id}
            to={`/resources/${branch}/${resource.id}`}
            className="cursor-pointer bg-white p-6 rounded-2xl border border-gray-200 shadow-sm
                       hover:shadow-xl hover:-translate-y-2 transform transition-all duration-200 block
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{resource.icon}</div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {resource.label}
                </h4>
                <p className="text-gray-600 text-sm">{resource.desc}</p>
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 text-indigo-600 font-medium text-sm">
              <span>Open</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-1"
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
          </Link>
        ))}
      </div>
    </section>
  );
}
