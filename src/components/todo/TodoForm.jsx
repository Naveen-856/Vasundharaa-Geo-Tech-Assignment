import { useState } from "react";
import { IoAdd } from "react-icons/io5";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onAdd(text, priority);
    setText("");
    setPriority("medium");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        placeholder="Add a new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        className="px-3 py-2 border rounded-md text-sm cursor-pointer"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        type="submit"
        className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-black/80 cursor-pointer"
      >
        Add
      </button>
    </form>

  );
}
