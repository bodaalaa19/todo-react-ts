import React from 'react'
import "./TodoItem.css";
import { useState } from 'react';
import { FaTrash } from "react-icons/fa";
import type { Todo } from '../types/todo';
interface TodoItemProps {
  todo: Todo;
    onDeleteTodo: (id: string) => void;
        onToggleCompleted: (id: string) => void;


}
function TodoItem({ todo ,onDeleteTodo,onToggleCompleted}: TodoItemProps) {
  return (
    <div className="todo-item">
  <div className="todo-left">
<input
    type="checkbox"
    checked={todo.isCompleted}
    onChange={() => onToggleCompleted(todo.id)}
/>
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
 </div>

  <button
    className="delete-btn"
    onClick={() => onDeleteTodo(todo.id)}
  >
    <FaTrash />
  </button>
</div>
  )
}

export default TodoItem