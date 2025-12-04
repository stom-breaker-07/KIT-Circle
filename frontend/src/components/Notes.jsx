import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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
  const navigate = useNavigate();
  const { isAuthenticated, getToken } = useAuth();

  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const subjects = SUBJECTS[branch] || [];
  const modules = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5"];

  const fetchNotes = async () => {
    if (!branch) return;

    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();
      params.set("branch", branch);
      if (selectedYear) params.set("year", selectedYear);
      if (selectedSubject) params.set("subject", selectedSubject);
      if (selectedModule) params.set("module", selectedModule);

      const res = await fetch(`http://localhost:4000/api/notes?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Failed to load notes");
      }
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error(err);
      setError("Could not load notes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [branch, selectedYear, selectedSubject, selectedModule]);

  const handleDelete = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      const token = getToken();
      const res = await fetch(`http://localhost:4000/api/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to delete note");
      }

      // Refresh notes list
      fetchNotes();
    } catch (err) {
      alert(err.message || "Failed to delete note");
    }
  };

  const filtered = notes.filter((note) => {
    const matchesSearch =
      !search || note.title.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-8 flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {BRANCH_LABELS[branch]} - Notes
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Access notes from all years and subjects. Use filters to find what you need.
          </p>
        </div>

        {/* Add Note Button - Only show if authenticated */}
        {isAuthenticated && (
          <Link
            to={`/resources/${branch}/notes/add`}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors whitespace-nowrap"
          >
            + Add Note
          </Link>
        )}
      </header>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Year Filter */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Subjects</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        {/* Module Filter */}
        <select
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
          className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Modules</option>
          {modules.map((module) => (
            <option key={module} value={module}>
              {module}
            </option>
          ))}
        </select>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {loading && (
          <div className="p-8 text-center border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
            <p className="text-gray-600 dark:text-gray-300">Loading notes...</p>
          </div>
        )}

        {error && !loading && (
          <div className="p-8 text-center border border-dashed border-red-300 rounded-xl">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {!loading &&
          !error &&
          filtered.map((note) => (
            <div
              key={note._id}
              className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {note.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {note.year} • {note.subject} • {note.module}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={note.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors whitespace-nowrap"
                  >
                    Open
                  </a>
                  {/* Delete Button - Only show if authenticated */}
                  {isAuthenticated && (
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors whitespace-nowrap"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

        {!loading && !error && filtered.length === 0 && (
          <div className="p-8 text-center border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
            <p className="text-gray-600 dark:text-gray-300">
              No notes found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
