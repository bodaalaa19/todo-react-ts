import React from "react";
import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";

interface TodoListProps {
  todos: Todo[];
onDeleteTodo: (id: string) => void;
    onToggleCompleted: (id: string) => void;

}

function TodoList({ todos,onDeleteTodo ,onToggleCompleted}: TodoListProps) {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
        onDeleteTodo={onDeleteTodo}

         key={todo.id}
         todo={todo}
                 onToggleCompleted={onToggleCompleted}

         />
      ))}

    </div>
  );
}

export default TodoList;