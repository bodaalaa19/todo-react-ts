import "./TodoDetails.css";

interface TodoNotFoundProps {
  onBack: () => void;
}

function TodoNotFound({ onBack }: TodoNotFoundProps) {
  return (
    <main className="todo-details">
      <h1>Task not found</h1>
      <button className="back-btn" onClick={onBack}>
        Back to tasks
      </button>
    </main>
  );
}

export default TodoNotFound;
