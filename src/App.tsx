import React from "react";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Todo } from "./types/todo";
import DateSidebar from "./components/DateSidebar";
import TodoDetails from "./components/TodoDetails";
import { useCustomRouter } from "./hooks/useCustomRouter";
import "./App.css";
function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    if (!storedTodos) return [];

    try {
      const parsedTodos: unknown = JSON.parse(storedTodos);
      return Array.isArray(parsedTodos) ? parsedTodos : [];
    } catch {
      return [];
    }
  });
  const { route, navigate } = useCustomRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const filteredTodos = useMemo(
    () =>
      selectedDate === null
        ? todos
        : todos.filter((todo) => todo.date === selectedDate),
    [todos, selectedDate],
  );
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const onAddTodo = useCallback((text: string, description: string, date: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text,
      isCompleted: false,
      date,
      description,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, []);
  const onDeleteTodo = useCallback((id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);
  const onEditTodo = useCallback((
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
  }, []);
  const onToggleCompleted = useCallback((id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  }, []);
  const onViewTodo = useCallback(
    (id: string) => navigate(`/tasks/${id}`),
    [navigate],
  );
  const [isDark, setIsDark] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem("isDark");
    if (!storedTheme) return false;

    try {
      const parsedTheme: unknown = JSON.parse(storedTheme);
      return typeof parsedTheme === "boolean" ? parsedTheme : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  const selectedTodo = route.name === "task-details"
    ? todos.find((todo) => todo.id === route.taskId)
    : undefined;

  if (route.name === "task-details") {
    return (
      <div className={`app ${isDark ? "dark" : "light"}`}>
        <TodoDetails todo={selectedTodo} onBack={() => navigate("/")} />
      </div>
    );
  }

  return (
    <div className={`app ${isDark ? "dark" : "light"}`}>
      <DateSidebar todos={todos} onSelectDate={setSelectedDate} />
      <button
        className="theme-btn"
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
          onViewTodo={onViewTodo}
          todos={filteredTodos}
          onToggleCompleted={onToggleCompleted}
        />
      </div>
    </div>
  );
}

export default App;
