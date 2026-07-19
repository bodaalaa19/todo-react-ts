import { memo, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { Todo } from "../types/todo";
import "./TodoItem.css";

interface TodoItemProps {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (
    id: string,
    text: string,
    description: string,
    date: string,
  ) => void;
  onToggleCompleted: (id: string) => void;
  onViewTodo: (id: string) => void;
}

const TodoItem = memo(function TodoItem({
  todo,
  onDeleteTodo,
  onEditTodo,
  onToggleCompleted,
  onViewTodo,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const [description, setDescription] = useState(todo.description ?? "");
  const [date, setDate] = useState(todo.date);

  const saveEdit = () => {
    if (!text.trim()) return;
    onEditTodo(todo.id, text.trim(), description.trim(), date);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setText(todo.text);
    setDescription(todo.description ?? "");
    setDate(todo.date);
    setIsEditing(false);
  };

  return (
    <article className={`todo-item ${isEditing ? "is-expanded" : ""}`}>
      <div className="todo-summary">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onToggleCompleted(todo.id)}
          aria-label={`Mark ${todo.text} as ${todo.isCompleted ? "incomplete" : "complete"}`}
        />
        <button
          className="todo-view-btn"
          onClick={() => onViewTodo(todo.id)}
          aria-label={`View details for ${todo.text}`}
        >
          <div className="todo-left">
            <p className={`todo-text ${todo.isCompleted ? "completed" : ""}`}>
              {todo.text}
            </p>
            <p className="todo-date">{todo.date || "No date"}</p>
          </div>
        </button>

        <button
          className="edit-btn"
          onClick={() => setIsEditing(true)}
          aria-label="Edit todo"
        >
          <FaEdit />
        </button>
      </div>

      {isEditing && (
        <section className="todo-edit-panel">
          <label>
            Task
            <input
              className="edit-input"
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </label>
          <label>
            Description
            <textarea
              className="edit-description-input"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
          <label>
            Date
            <input
              className="edit-date-input"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>
          <div className="todo-edit-actions">
            <button className="save-btn" onClick={saveEdit}>
              Save
            </button>
            <button className="cancel-btn" onClick={cancelEdit}>
              Cancel
            </button>
            <button
              className="delete-btn"
              onClick={() => onDeleteTodo(todo.id)}
              aria-label="Delete todo"
            >
              <FaTrash />
            </button>
          </div>
        </section>
      )}
    </article>
  );
});

export default TodoItem;
