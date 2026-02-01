import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const [filter, setFilter] = useState(FILTERS.ALL);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, priority) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        completed: false,
        priority,
      },
    ]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === FILTERS.ACTIVE) return !t.completed;
    if (filter === FILTERS.COMPLETED) return t.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-slate-800 text-center">Add your Task</h1>
      {/* Add Task Form */}
      <TodoForm onAdd={addTodo} />

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
        {Object.values(FILTERS).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm capitalize transition-all duration-300 ${filter === f
              ? "bg-gradient-to-r from-black to-black text-white shadow-lg shadow-blue-500/25"
              : "text-black/60 hover:text-black hover:bg-black/5"
              }`}
          >
            {f}
            {f === "active" && (
              <span className="ml-1.5 text-xs opacity-70">
                ({todos.filter((t) => !t.completed).length})
              </span>
            )}
            {f === "completed" && (
              <span className="ml-1.5 text-xs opacity-70">
                ({completedCount})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Task List */}
      <TodoList
        todos={filteredTodos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
      />
    </div>
  );
}
