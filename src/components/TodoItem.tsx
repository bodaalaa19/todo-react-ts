import React from 'react'
import "./TodoItem.css";
import { useState } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import type { Todo } from '../types/todo';
interface TodoItemProps {
  todo: Todo;
    onDeleteTodo: (id: string) => void;
    onEditTodo: (id: string, text: string, description: string, date: string) => void;
        onToggleCompleted: (id: string) => void;
        onViewTodo: (id: string) => void;


}
function TodoItem({ todo, onDeleteTodo, onEditTodo, onToggleCompleted, onViewTodo}: TodoItemProps) {
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
    <div className="todo-item" onClick={() => !isEditing && onViewTodo(todo.id)}>
  <div className="todo-left">
<input
    type="checkbox"
    checked={todo.isCompleted}
    onChange={() => onToggleCompleted(todo.id)}
    onClick={(event) => event.stopPropagation()}
/>
{isEditing ? (
  <>
    <input className="edit-input" type="text" value={text} onChange={(e) => setText(e.target.value)} aria-label="Edit task" />
    <textarea className="edit-description-input" value={description} onChange={(e) => setDescription(e.target.value)} aria-label="Edit description" />
    <input className="edit-date-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Edit date" />
  </>
) : (
  <>
<p
    className={`todo-text ${
        todo.isCompleted ? "completed" : ""
    }`}
>
    {todo.text}
</p> 
  <p className="todo-date">
    {todo.date}
  </p>
  </>
)}
 </div>

  <div className="todo-actions">
  {isEditing ? (
    <>
      <button className="save-btn" onClick={saveEdit}>Save</button>
      <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
    </>
  ) : (
    <button className="edit-btn" onClick={(event) => { event.stopPropagation(); setIsEditing(true); }} aria-label="Edit todo">
      <FaEdit />
    </button>
  )}
  <button
    className="delete-btn"
    onClick={(event) => { event.stopPropagation(); onDeleteTodo(todo.id); }}
  >
    <FaTrash />
  </button>
  </div>
</div>
  )
}

export default TodoItem
