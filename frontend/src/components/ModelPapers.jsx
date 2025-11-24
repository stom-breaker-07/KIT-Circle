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

export default function ModelPapers() {
  const { branch } = useParams();
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  // Replace with Supabase data later
  const allModelPapers = [
    { title: "Model Paper Set 1", year: "1st Year", subject: "Data Structures" },
    { title: "Model Paper Set 2", year: "1st Year", subject: "OOP" },
    { title: "Model Paper Set 1", year: "2nd Year", subject: "DBMS" },
    { title: "Model Paper Set 3", year: "3rd Year", subject: "Computer Networks" },
    { title: "Model Paper Set 2", year: "2nd Year", subject: "Operating Systems" },
  ];

  const filtered = allModelPapers.filter((mp) => {
    const matchesSearch = mp.title.toLowerCase().includes(search.toLowerCase()) ||
                          mp.subject.toLowerCase().includes(search.toLowerCase());
    const matchesYear = !selectedYear || mp.year === selectedYear;
    return matchesSearch && matchesYear;
  });

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {BRANCH_LABELS[branch]} - Model Papers
        </h2>
        <p className="text-gray-700 mt-2">
          Access model and sample question papers for practice.
        </p>
      </header>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search model papers..."
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

      {/* Model Papers List */}
      <div className="space-y-4">
        {filtered.map((mp, index) => (
          <div
            key={index}
            className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{mp.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {mp.year} • {mp.subject}
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
            <p className="text-gray-600">No model papers found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
