import React from "react";

/**
 * Simple announcement card. Hover behavior matches rest of the UI.
 * `type` can be "College" or "University" to display a small tag.
 */

export default function AnnouncementCard({ title, summary, date, type }) {
  return (
    <article
      className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md
                 hover:-translate-y-1 transition-transform cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-50 text-indigo-600">
          {type}
        </span>
      </div>

      <p className="text-gray-600 mt-3 text-sm">{summary}</p>

      <div className="mt-4 text-sm text-gray-500">{date}</div>
    </article>
  );
}
