import React from "react";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useState, useEffect } from "react";
import type { Todo } from "./types/todo";
import DateSidebar from "./components/DateSidebar";
import TodoDetails from "./components/TodoDetails";
import "./App.css";
function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setPathname(path);
  };
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const filteredTodos =
    selectedDate === null
      ? todos
      : todos.filter((todo) => todo.date === selectedDate);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const onAddTodo = (text: string, description: string, date: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text,
      isCompleted: false,
      date,
      description,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };
  const onDeleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  const onEditTodo = (
    id: string,
    text: string,
    description: string,
    date: string,
  ) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text, description, date } : todo,
      ),
    );
  };
  const onToggleCompleted = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };
  const [isDark, setIsDark] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem("isDark");
    return storedTheme ? JSON.parse(storedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  const taskId = pathname.match(/^\/tasks\/([^/]+)$/)?.[1];
  const selectedTodo = taskId
    ? todos.find((todo) => todo.id === taskId)
    : undefined;

  if (taskId) {
    return (
      <div className={`app ${isDark ? "dark" : "light"}`}>
        <TodoDetails todo={selectedTodo} onBack={() => navigate("/")} />
      </div>
    );
  }

  return (
    <div className={`app ${isDark ? "dark" : "light"}`}>
      {" "}
      <DateSidebar todos={todos} onSelectDate={setSelectedDate} />
      <button
        className="add-btn"
        onClick={() => setIsDark(!isDark)}
      >
        {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <div className="todo-container">
        <h1>Todo List</h1>

        <TodoForm onAddTodo={onAddTodo} />

        <TodoList
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
          onViewTodo={(id) => navigate(`/tasks/${id}`)}
          todos={filteredTodos}
          onToggleCompleted={onToggleCompleted}
        />
      </div>
    </div>
  );
}

export default App;
