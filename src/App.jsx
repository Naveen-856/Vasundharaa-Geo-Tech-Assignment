import { useState } from "react";

import TodoApp from "./components/todo/TodoApp";
import UserForm from "./components/form/UserForm";
import ProgressBar from "./components/progress/ProgressBar";
import CountdownTimer from "./components/timer/CountdownTimer";
import SearchList from "./components/search/SearchList";

const TABS = [
  { id: "todo", label: "Todo App" },
  { id: "form", label: "Form" },
  { id: "progress", label: "Progress Bar" },
  { id: "timer", label: "Timer" },
  { id: "search", label: "Live Search" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("todo");

  const renderTab = () => {
    switch (activeTab) {
      case "todo":
        return <TodoApp />;
      case "form":
        return <UserForm />;
      case "progress":
        return <ProgressBar />;
      case "timer":
        return <CountdownTimer />;
      case "search":
        return <SearchList />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-black shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-xl md:text-2xl font-semibold text-white text-center">
            TODO App
          </h1>
        </div>
      </header>

      {/* Tabs */}
      <nav className="bg-white shadow-lg mt-4 rounded-lg display: inline">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap gap-2 justify-center">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors cursor-pointer
                ${
                  activeTab === tab.id
                    ? "bg-black text-white border-black"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl p-6">
          {renderTab()}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-slate-500 py-6">
        Built with React & Tailwind CSS
      </footer>
    </div>
  );
}
