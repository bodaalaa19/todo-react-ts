import React from "react";
import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";

interface TodoListProps {
  todos: Todo[];
onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string, text: string, description: string, date: string) => void;
    onToggleCompleted: (id: string) => void;
    onViewTodo: (id: string) => void;

}

function TodoList({ todos,onDeleteTodo, onEditTodo, onToggleCompleted, onViewTodo}: TodoListProps) {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
        onDeleteTodo={onDeleteTodo}
        onEditTodo={onEditTodo}
        onViewTodo={onViewTodo}

         key={todo.id}
         todo={todo}
                 onToggleCompleted={onToggleCompleted}

         />
      ))}

    </div>
  );
}

export default TodoList;
