import TodoItem from "./TodoItem";

export default function TodoList({ todos, onDelete, onToggle }) {
  if (todos.length === 0) {
    return (
      <p className="text-center text-slate-500 py-8">
        No tasks yet. Add one above.
      </p>

    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          index={index}
        />
      ))}
    </ul>
  );
}
