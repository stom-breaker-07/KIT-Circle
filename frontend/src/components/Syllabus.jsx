import React, { useState } from "react";
import { useParams } from "react-router-dom";

const BRANCH_LABELS = {
  cse: "Computer Science (CSE)",
  ise: "Information Science (ISE)",
  ece: "Electronics & Communication (ECE)",
  aiml: "AI & ML",
  civil: "Civil Engineering",
  mech: "Mechanical Engineering",
};

export default function Syllabus() {
  const { branch } = useParams();
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  // Replace with Supabase data later
  const allSyllabus = [
    { title: "Data Structures Syllabus", year: "1st Year", semester: "Semester 1" },
    { title: "OOP Syllabus", year: "1st Year", semester: "Semester 2" },
    { title: "DBMS Syllabus", year: "2nd Year", semester: "Semester 3" },
    { title: "Computer Networks Syllabus", year: "3rd Year", semester: "Semester 5" },
    { title: "Operating Systems Syllabus", year: "2nd Year", semester: "Semester 4" },
  ];

  const filtered = allSyllabus.filter((syllabus) => {
    const matchesSearch = syllabus.title.toLowerCase().includes(search.toLowerCase());
    const matchesYear = !selectedYear || syllabus.year === selectedYear;
    return matchesSearch && matchesYear;
  });

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {BRANCH_LABELS[branch]} - Syllabus
        </h2>
        <p className="text-gray-700 mt-2">
          Download syllabus documents for all subjects.
        </p>
      </header>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search syllabus..."
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
      </div>

      {/* Syllabus List */}
      <div className="space-y-4">
        {filtered.map((syllabus, index) => (
          <div
            key={index}
            className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{syllabus.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {syllabus.year} • {syllabus.semester}
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
            <p className="text-gray-600">No syllabus documents found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
