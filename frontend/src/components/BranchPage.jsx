import React, { useState } from "react";
import ResourceSelector from "./ResourceSelector";

/**
 * branch: one of ('cse','ise','ece','aiml','civil','mech')
 * This component expects `branch` prop (lowercase code). It renders year & subject selectors.
 */

const SUBJECTS = {
  cse: ["Data Structures", "OOP", "DBMS", "Computer Networks", "Operating Systems"],
  ise: ["Java", "Web Technologies", "Python", "Software Engg", "Networks"],
  ece: ["EDC", "VLSI", "DSP", "Signals", "Networks"],
  aiml: ["Machine Learning", "Deep Learning", "AI Foundations", "Python", "Mathematics"],
  civil: ["SOM", "Fluid Mechanics", "Geotech", "Surveying", "Building Materials"],
  mech: ["Thermodynamics", "Mechanics of Materials", "SOM", "Manufacturing", "CAD/CAM"],
};

const BRANCH_LABELS = {
  cse: "Computer Science (CSE)",
  ise: "Information Science (ISE)",
  ece: "Electronics & Communication (ECE)",
  aiml: "AI & ML",
  civil: "Civil Engineering",
  mech: "Mechanical Engineering",
};

export default function BranchPage({ branch }) {
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const subjects = SUBJECTS[branch] || [];

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {BRANCH_LABELS[branch] || branch}
        </h2>
        <p className="text-gray-700 mt-2">
          Select your studying year and subject to continue to resources.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-3 rounded-xl border bg-gray-50"
          >
            <option value="">Choose your year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 rounded-xl border bg-gray-50"
            disabled={!year}
          >
            <option value="">{year ? "Choose subject" : "Select year first"}</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resource selector appears when both year & subject selected */}
      {year && subject ? (
        <ResourceSelector branch={branch} year={year} subject={subject} />
      ) : (
        <div className="p-6 rounded-2xl border border-dashed border-gray-200 text-gray-600">
          Please select both <strong>Year</strong> and <strong>Subject</strong> to view resources.
        </div>
      )}
    </section>
  );
}
