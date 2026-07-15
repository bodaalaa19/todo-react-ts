import React from 'react'

import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import TodoList from './components/TodoList'
import { useState,useEffect } from 'react'
import type { Todo } from './types/todo'
import DateSidebar from './components/DateSidebar'
import "./App.css";
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
const [isDark, setIsDark] = useState<boolean>(() => {
  const storedTheme = localStorage.getItem("isDark");
  return storedTheme ? JSON.parse(storedTheme) : false;
});

useEffect(() => {
  localStorage.setItem("isDark", JSON.stringify(isDark));
}, [isDark]);


  return (
<div className={`app ${isDark ? "dark" : "light"}`}>        <DateSidebar todos={todos} 
  onSelectDate={setSelectedDate}
        />
<button
className='add-btn'
onClick={
  () => {
        console.log(isDark);

    setIsDark(!isDark)}}>
  {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>
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