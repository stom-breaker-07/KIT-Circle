import React from "react";
import AnnouncementCard from "./AnnouncementCard";

/**
 * Announcements layout inspired by vtucircle.com (card list of circulars & updates).
 * You should replace `ANNOUNCEMENTS_DATA` with API data later.
 */

const ANNOUNCEMENTS_DATA = [
  {
    id: 1,
    title: "VTU Exam Timetable — Nov/Dec 2025",
    summary: "VTU released the exam timetable for Nov/Dec 2025 session. Check details and download PDF.",
    date: "Nov 10, 2025",
    type: "University",
  },
  {
    id: 2,
    title: "Internal Assessment Schedule - 3rd Sem",
    summary: "Internal assessment schedule for 3rd semester students has been published by KIT.",
    date: "Nov 6, 2025",
    type: "College",
  },
  {
    id: 3,
    title: "Result Publication Notice",
    summary: "Results for partial assessments are now available on the student portal.",
    date: "Nov 3, 2025",
    type: "College",
  },
];

export default function Announcements() {
  return (
    <section id="announcements" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Announcements</h2>
          <p className="text-gray-600">Latest updates from college & university</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ANNOUNCEMENTS_DATA.map((a) => (
            <AnnouncementCard key={a.id} {...a} />
          ))}
        </div>

        <div className="mt-8 text-right">
          <a
            href="https://vtucircle.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 font-medium"
          >
            View more announcements ↗
          </a>
        </div>
      </div>
    </section>
  );
}
