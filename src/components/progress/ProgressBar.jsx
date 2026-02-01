import { useState } from "react";

export default function ProgressBar() {
  const [values, setValues] = useState([30, 60, 90]);

  const clamp = (num) => Math.min(100, Math.max(0, num));

  const handleChange = (index, value) => {
    const updated = [...values];
    updated[index] = clamp(Number(value) || 0);
    setValues(updated);
  };

  const average =
    values.reduce((sum, v) => sum + v, 0) / values.length;

  const getColor = (val) => {
    if (val < 40) return { bg: "bg-rose-500", glow: "shadow-rose-500/30", text: "text-rose-400" };
    if (val > 70) return { bg: "bg-emerald-500", glow: "shadow-emerald-500/30", text: "text-emerald-400" };
    return { bg: "bg-amber-500", glow: "shadow-amber-500/30", text: "text-amber-400" };
  };

  const getGradient = (val) => {
    if (val < 40) return "from-rose-500 to-red-600";
    if (val > 70) return "from-emerald-500 to-green-600";
    return "from-amber-500 to-orange-500";
  };

  return (
  <div className="max-w-lg mx-auto space-y-6">
    <h2 className="text-xl font-semibold text-slate-800 text-center">
      Progress Tracker
    </h2>

    {/* Overall Progress */}
    <div>
      <div className="flex justify-between text-sm text-slate-600 mb-1">
        <span>Overall Progress</span>
        <span>{Math.round(average)}%</span>
      </div>
      <div className="h-2 bg-slate-200 rounded">
        <div
          className="h-2 bg-blue-600 rounded transition-all"
          style={{ width: `${average}%` }}
        />
      </div>
    </div>

    {/* Inputs */}
    <div className="space-y-4">
      {values.map((val, i) => (
        <div key={i} className="flex items-center gap-3">
          <label className="w-20 text-sm text-slate-600">
            Input {i + 1}
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={val}
            onChange={(e) => handleChange(i, e.target.value)}
            className="w-24 px-2 py-1 border rounded-md text-sm"
          />
          <div className="flex-1 h-2 bg-slate-200 rounded">
            <div
              className="h-2 bg-blue-500 rounded transition-all"
              style={{ width: `${val}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

}
