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

export default function Circulars() {
  const { branch } = useParams();
  const [search, setSearch] = useState("");

  // Replace with Supabase data later
  const allCirculars = [
    { title: "Exam Schedule Announcement", date: "2025-11-20", category: "Exams" },
    { title: "Holiday Notice", date: "2025-11-15", category: "General" },
    { title: "Workshop Registration", date: "2025-11-10", category: "Events" },
    { title: "Fee Payment Deadline", date: "2025-11-05", category: "Finance" },
    { title: "Library Timings Update", date: "2025-11-01", category: "General" },
  ];

  const filtered = allCirculars.filter((circular) =>
    circular.title.toLowerCase().includes(search.toLowerCase()) ||
    circular.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {BRANCH_LABELS[branch]} - Circulars
        </h2>
        <p className="text-gray-700 mt-2">
          View college circulars and important announcements.
        </p>
      </header>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search circulars..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Circulars List */}
      <div className="space-y-4">
        {filtered.map((circular, index) => (
          <div
            key={index}
            className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                    {circular.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(circular.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{circular.title}</h3>
              </div>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                View
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-8 text-center border border-dashed border-gray-300 rounded-xl">
            <p className="text-gray-600">No circulars found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
