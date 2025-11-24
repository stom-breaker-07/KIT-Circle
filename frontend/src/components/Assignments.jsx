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

export default function Assignments() {
  const { branch } = useParams();
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const classes = ["Section A", "Section B", "Section C"];

  // Replace with Supabase data later
  const allAssignments = [
    { title: "Assignment 1 PDF", year: "1st Year", class: "Section A", dueDate: "2025-12-01" },
    { title: "Assignment 2 Questions", year: "1st Year", class: "Section B", dueDate: "2025-12-05" },
    { title: "Lab Assignment", year: "2nd Year", class: "Section A", dueDate: "2025-12-10" },
    { title: "Mini Project File", year: "3rd Year", class: "Section C", dueDate: "2025-12-15" },
    { title: "Final Assignment", year: "2nd Year", class: "Section B", dueDate: "2025-12-20" },
  ];

  const filtered = allAssignments.filter((assignment) => {
    const matchesSearch = assignment.title.toLowerCase().includes(search.toLowerCase());
    const matchesYear = !selectedYear || assignment.year === selectedYear;
    const matchesClass = !selectedClass || assignment.class === selectedClass;
    return matchesSearch && matchesYear && matchesClass;
  });

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {BRANCH_LABELS[branch]} - Assignments
        </h2>
        <p className="text-gray-700 mt-2">
          View and submit assignments organized by year and class.
        </p>
      </header>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search assignments..."
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

        {/* Class Filter */}
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Sections</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filtered.map((assignment, index) => (
          <div
            key={index}
            className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {assignment.year} • {assignment.class}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  View
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Submit
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-8 text-center border border-dashed border-gray-300 rounded-xl">
            <p className="text-gray-600">No assignments found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}

