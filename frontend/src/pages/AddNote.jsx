import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SUBJECTS = {
  cse: ["Data Structures", "OOP", "DBMS", "Computer Networks", "Operating Systems"],
  ise: ["Java", "Web Technologies", "Python", "Software Engg", "Networks"],
  ece: ["EDC", "VLSI", "DSP", "Signals", "Networks"],
  aiml: ["Machine Learning", "Deep Learning", "AI Foundations", "Python", "Mathematics"],
  civil: ["SOM", "Fluid Mechanics", "Geotech", "Surveying", "Building Materials"],
  mech: ["Thermodynamics", "Mechanics of Materials", "SOM", "Manufacturing", "CAD/CAM"],
};

export default function AddNote() {
  const { branch } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, getToken } = useAuth();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");
  const [module, setModule] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const subjects = SUBJECTS[branch] || [];
  const modules = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5"];

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!branch || !year || !subject || !module || !title || !link) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const token = getToken();
      const res = await fetch("http://localhost:4000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ branch, year, subject, module, title, link }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save note");
      }

      setSuccess("Note added successfully.");
      setTitle("");
      setYear("");
      setSubject("");
      setModule("");
      setLink("");

      // Go back to notes page for this branch after a short delay
      setTimeout(() => {
        navigate(`/resources/${branch}/notes`);
      }, 800);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 px-6 flex justify-center">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Add Notes ({branch?.toUpperCase()})
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Fill the form to add a new notes resource for students.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
              Note Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Unit 1 Notes PDF"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                Module
              </label>
              <select
                value={module}
                onChange={(e) => setModule(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select module</option>
                {modules.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select subject</option>
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
              Link / URL to Notes
            </label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://..."
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              {success}
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold transition-colors"
            >
              {loading ? "Saving..." : "Save Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
