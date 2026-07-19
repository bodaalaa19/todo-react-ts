import React from "react";
import "./TodoForm.css";
import { useState } from "react";
interface TodoFormProps {
  onAddTodo: (text: string, description: string, date: string) => void;
}
function TodoForm({ onAddTodo }: TodoFormProps) {
  const [taskText, setTaskText] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    onAddTodo(taskText, description, date);
    resetInputs();
  };
const resetInputs=()=>{
setTaskText("");
    setDescription("");
    setDate("");
}
  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="todo-form-row">
        <input
          className="todo-input"
          type="text"
          placeholder="enter a task"
          onChange={(e) => setTaskText(e.target.value)}
          value={taskText}
        />
        <input
          className="date-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="add-btn">Add</button>
      </div>

      <label className="description-field">
        <span>
          Description <em>(optional)</em>
        </span>
        <textarea
          className="description-input"
          placeholder="Add details, notes, or anything you need to remember…"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </label>
    </form>
  );
}

export default TodoForm;
