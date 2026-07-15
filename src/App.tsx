import React from 'react'

import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import TodoList from './components/TodoList'
import { useState,useEffect } from 'react'
import type { Todo } from './types/todo'
import DateSidebar from './components/DateSidebar'
function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
});
const [selectedDate, setSelectedDate] = useState<string | null>(null);
const filteredTodos =
  selectedDate === null
    ? todos
    : todos.filter((todo) => todo.date === selectedDate);
useEffect(() => {
    console.log("Saving:", todos);

  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
  const onAddTodo = (text: string,date:string) => {
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    text: text,
    isCompleted: false,
    date
  };
  

  setTodos((prevTodos) => [...prevTodos, newTodo]);
};
const onDeleteTodo = (id: string) => {
  setTodos((prevTodos) =>
    prevTodos.filter((todo) => todo.id !== id)
  );
};
const onToggleCompleted = (id: string) => {
  setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo.id === id
        ? { ...todo, isCompleted: !todo.isCompleted }
        : todo
    )
  );
};
  return (
    <div className="app">
        <DateSidebar todos={todos} 
  onSelectDate={setSelectedDate}
        />

  <div className="todo-container">
    <h1>Todo List</h1>

    <TodoForm onAddTodo={onAddTodo} />

    <TodoList onDeleteTodo={onDeleteTodo} todos={filteredTodos}
    onToggleCompleted={onToggleCompleted}
 />
  </div>
</div>
  )
}

export default App