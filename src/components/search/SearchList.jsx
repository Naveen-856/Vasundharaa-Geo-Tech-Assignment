import { useState } from "react";
import { IoSearch, IoClose } from "react-icons/io5";

const NAMES = [
  "Salmon Khan",
  "Shah Rukh Khan",
  "Aamir Khan",
  "Aishwarya Rai",
  "Deepika Padukone",
];

export default function SearchList() {
  const [query, setQuery] = useState("");

  const filteredNames = NAMES.filter((name) =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  const highlightText = (text, highlight) => {
    if (!highlight) return text;

    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="bg-amber-400/30 text-amber-300 px-0.5 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
  <div className="max-w-md mx-auto space-y-4">
    <h2 className="text-xl font-semibold text-slate-800 text-center">
      Live Search
    </h2>

    {/* Input */}
    <input
      type="text"
      placeholder="Search names..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full px-3 py-2 border rounded-md text-sm"
    />

    {/* Count */}
    <p className="text-sm text-slate-600 font-semibold">
      {filteredNames.length} result(s)
    </p>

    {/* Results */}
    {filteredNames.length === 0 ? (
      <p className="text-sm text-slate-500">
        No matches found
      </p>
    ) : (
      <ul className="border rounded-md divide-y">
        {filteredNames.map((name, index) => (
          <li key={index} className="px-3 py-2 text-sm font-semibold">
            {highlightText(name, query)}
          </li>
        ))}
      </ul>
    )}
  </div>
);

}
