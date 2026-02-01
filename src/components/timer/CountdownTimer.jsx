import { useEffect, useRef, useState } from "react";
import { IoPlay, IoPause, IoRefresh, IoPlaySkipForward } from "react-icons/io5";

const DEFAULT_TIME = 10;

export default function CountdownTimer() {
  const intervalRef = useRef(null);

  const [inputTime, setInputTime] = useState(DEFAULT_TIME);
  const [remaining, setRemaining] = useState(DEFAULT_TIME * 1000);
  const [status, setStatus] = useState("idle"); // idle | running | paused | completed
  const [endTime, setEndTime] = useState(null);

  /* ------------------ RESTORE FROM LOCAL STORAGE ------------------ */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("timer"));

    if (!saved) return;

    const { status, endTime, remaining } = saved;

    if (status === "running") {
      const diff = endTime - Date.now();
      if (diff > 0) {
        setRemaining(diff);
        setStatus("running");
        setEndTime(endTime);
      } else {
        setRemaining(0);
        setStatus("completed");
      }
    } else {
      setRemaining(remaining);
      setStatus(status);
    }
  }, []);

  /* ------------------ TIMER EFFECT ------------------ */
  useEffect(() => {
    if (status !== "running") return;

    intervalRef.current = setInterval(() => {
      const diff = endTime - Date.now();

      if (diff <= 0) {
        clearInterval(intervalRef.current);
        setRemaining(0);
        setStatus("completed");
        localStorage.removeItem("timer");
      } else {
        setRemaining(diff);
      }
    }, 10);

    return () => clearInterval(intervalRef.current);
  }, [status, endTime]);

  /* ------------------ PERSIST STATE ------------------ */
  useEffect(() => {
    if (status === "completed") return;

    localStorage.setItem(
      "timer",
      JSON.stringify({ status, remaining, endTime })
    );
  }, [status, remaining, endTime]);

  /* ------------------ CONTROLS ------------------ */
  const startTimer = () => {
    const end = Date.now() + inputTime * 1000;
    setEndTime(end);
    setRemaining(inputTime * 1000);
    setStatus("running");
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setStatus("paused");
  };

  const resumeTimer = () => {
    const end = Date.now() + remaining;
    setEndTime(end);
    setStatus("running");
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setRemaining(inputTime * 1000);
    setStatus("idle");
    setEndTime(null);
    localStorage.removeItem("timer");
  };

  /* ------------------ HELPERS ------------------ */
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);

    if (minutes > 0) {
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    }
    return `${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const progress = (remaining / (inputTime * 1000)) * 100;

  const getStatusConfig = () => {
    switch (status) {
      case "running":
        return { color: "text-emerald-400", bg: "bg-emerald-400/10", label: "Running" };
      case "paused":
        return { color: "text-amber-400", bg: "bg-amber-400/10", label: "Paused" };
      case "completed":
        return { color: "text-rose-400", bg: "bg-rose-400/10", label: "Completed" };
      default:
        return { color: "text-white/60", bg: "bg-white/5", label: "Ready" };
    }
  };

  const statusConfig = getStatusConfig();

  return (
  <div className="max-w-md mx-auto space-y-6">
    <h2 className="text-xl font-semibold text-slate-800 text-center">
      Countdown Timer
    </h2>

    {/* Time Display */}
    <div className="text-center">
      <p className="text-4xl font-mono font-semibold text-slate-800">
        {formatTime(remaining)}
      </p>
      <p className="text-sm text-slate-500 capitalize mt-1">
        Status: {status}
      </p>
    </div>

    {/* Progress Bar */}
    <div className="h-2 bg-slate-200 rounded">
      <div
        className="h-2 bg-blue-600 rounded transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>

    {/* Input */}
    <div>
      <label className="block text-sm text-slate-600 mb-1">
        Duration (seconds)
      </label>
      <input
        type="number"
        min="1"
        disabled={status === "running"}
        value={inputTime}
        onChange={(e) =>
          setInputTime(Math.max(1, Number(e.target.value)))
        }
        className="w-full px-3 py-2 border rounded-md text-sm"
      />
    </div>

    {/* Controls */}
    <div className="flex gap-2">
      {status !== "completed" && (
        <button
          onClick={startTimer}
          disabled={status !== "idle"}
          className="px-4 py-2 bg-black text-white text-sm rounded-md disabled:opacity-50 cursor-pointer"
        >
          Start
        </button>
      )}

      <button
        onClick={pauseTimer}
        disabled={status !== "running"}
        className="px-4 py-2 bg-slate-200 text-slate-700 text-sm rounded-md disabled:opacity-50 cursor-pointer"
      >
        Pause
      </button>

      <button
        onClick={resumeTimer}
        disabled={status !== "paused"}
        className="px-4 py-2 bg-slate-200 text-slate-700 text-sm rounded-md disabled:opacity-50 cursor-pointer"
      >
        Resume
      </button>

      <button
        onClick={resetTimer}
        className="px-4 py-2 border text-slate-700 text-sm rounded-md cursor-pointer"
      >
        Reset
      </button>
    </div>

    {status === "completed" && (
      <p className="text-center text-red-600 font-medium">
        Time’s up!
      </p>
    )}
  </div>
);

}
