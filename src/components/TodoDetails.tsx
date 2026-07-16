import type { Todo } from "../types/todo";
import "./TodoDetails.css";

interface TodoDetailsProps {
  todo?: Todo;
  onBack: () => void;
}

function TodoDetails({ todo, onBack }: TodoDetailsProps) {
  if (!todo) {
    return (
      <main className="todo-details">
        <h1>Task not found</h1>
        <button className="back-btn" onClick={onBack}>
          Back to tasks
        </button>
      </main>
    );
  }

  return (
    <main className="todo-details">
      <button className="back-btn" onClick={onBack}>
        ← Back to tasks
      </button>
      <h1>{todo.text}</h1>
      <dl>
        <div>
          <dt>Description</dt>
          <dd>{todo.description || "No description added."}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{todo.date || "No date set."}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{todo.isCompleted ? "Completed" : "Not completed"}</dd>
        </div>
      </dl>
    </main>
  );
}

export default TodoDetails;
