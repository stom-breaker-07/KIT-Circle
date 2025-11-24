import React, { useState } from "react";
import { useParams } from "react-router-dom";

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

export default function Notes() {
  const { branch } = useParams();
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const subjects = SUBJECTS[branch] || [];

  // Replace with Supabase results later
  const allNotes = [
    { title: "Unit 1 Notes PDF", year: "1st Year", subject: "Data Structures" },
    { title: "Unit 2 Summary", year: "1st Year", subject: "OOP" },
    { title: "Complete Syllabus Notes", year: "2nd Year", subject: "DBMS" },
    { title: "Important Questions Notes", year: "3rd Year", subject: "Computer Networks" },
    { title: "Exam Prep Notes", year: "2nd Year", subject: "Data Structures" },
  ];

  const filtered = allNotes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase());
    const matchesYear = !selectedYear || note.year === selectedYear;
    const matchesSubject = !selectedSubject || note.subject === selectedSubject;
    return matchesSearch && matchesYear && matchesSubject;
  });

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {BRANCH_LABELS[branch]} - Notes
        </h2>
        <p className="text-gray-700 mt-2">
          Access notes from all years and subjects. Use filters to find what you need.
        </p>
      </header>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Year Filter */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Subject Filter */}
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Subjects</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {filtered.map((note, index) => (
          <div
            key={index}
            className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {note.year} • {note.subject}
                </p>
              </div>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Download
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-8 text-center border border-dashed border-gray-300 rounded-xl">
            <p className="text-gray-600">No notes found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}

