import { useState, useEffect } from "react";
import { Todo } from "../types";
import { loadAllData, saveDayData, getTodayString } from "../lib/storage";

const MAX_TODOS_PER_DAY = 3;

/**
 * Custom hook to manage todos for today
 * Encapsulates data loading, saving, and business logic
 */
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // Load today's todos on mount
  useEffect(() => {
    const allData = loadAllData();
    const today = getTodayString();
    const todayData = allData.find((d) => d.date === today);

    if (todayData) {
      setTodos(todayData.todos);
    }

    setLoading(false);
  }, []);

  // Save todos whenever they change
  useEffect(() => {
    if (!loading) {
      const today = getTodayString();
      saveDayData(today, todos);
    }
  }, [todos, loading]);

  const addTodo = (text: string) => {
    if (todos.length >= MAX_TODOS_PER_DAY) {
      return false; // Maximum reached
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [...prev, newTodo]);
    return true;
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const remainingCount = MAX_TODOS_PER_DAY - todos.length;

  return {
    todos,
    loading,
    completedCount,
    remainingCount,
    maxTodos: MAX_TODOS_PER_DAY,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
