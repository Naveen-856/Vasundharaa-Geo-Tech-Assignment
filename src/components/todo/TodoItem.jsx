import { MdDelete } from "react-icons/md";

export default function TodoItem({ todo, onDelete, onToggle, index }) {

  return (
    <li className="flex items-center gap-3 p-3 border rounded-md bg-white">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />


      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <span
          className={`block text-base transition-all duration-300 ${todo.completed
            ? "line-through text-black/40"
            : "text-black"
            }`}
        >
          {todo.text}
        </span>
      </div>

      {/* Priority Badge */}
      <span className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded-md capitalize">
        {todo.priority}
      </span>


      {/* Delete Button */}
      <button
        onClick={() => onDelete(todo.id)}
        className="text-xl text-red-400 hover:underline cursor-pointer"
      >
        <MdDelete />
      </button>

    </li>
  );
}
