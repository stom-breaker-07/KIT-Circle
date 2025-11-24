import React from "react";
import BranchCard from "../components/BranchCard";
import Announcements from "../components/Announcements";

export default function Homepage() {
  const branches = [
    { name: "Computer Science (CSE)", code: "cse" },
    { name: "Information Science (ISE)", code: "ise" },
    { name: "Electronics & Communication (ECE)", code: "ece" },
    { name: "AI & ML", code: "aiml" },
    { name: "Civil Engineering", code: "civil" },
    { name: "Mechanical Engineering", code: "mech" },
  ];

  return (
    <main className="pt-24 pb-12">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            KIT MATRIX
            <span className="block text-indigo-600 text-2xl font-bold">
              Academic resources for KIT students
            </span>
          </h1>
          <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
            Choose your branch below to access Notes, Assignments, Question Papers, Model Papers,
            Circulars, and Syllabus documents.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {branches.map((b) => (
            <BranchCard key={b.code} title={b.name} code={b.code} />
          ))}
        </div>
      </section>

      <Announcements />
    </main>
  );
}
