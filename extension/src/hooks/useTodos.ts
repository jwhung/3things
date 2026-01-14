import { useState, useEffect } from "react";
import { Todo } from "../types";
import { loadAllData, saveDayData, getTodayString } from "../lib/storage";
import { trackTaskAdd, trackTaskComplete, trackTaskDelete } from "../lib/analytics";

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
    const loadData = async () => {
      const allData = await loadAllData();
      const today = getTodayString();
      const todayData = allData.find((d) => d.date === today);

      if (todayData) {
        setTodos(todayData.todos);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  // Save todos whenever they change
  useEffect(() => {
    if (!loading) {
      const saveData = async () => {
        const today = getTodayString();
        await saveDayData(today, todos);
      };

      saveData();
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

    const taskNumber = todos.length + 1;
    setTodos((prev) => [...prev, newTodo]);

    // Track task addition (fire and forget - don't await)
    trackTaskAdd(taskNumber).catch(err => console.error('Analytics error:', err));

    return true;
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          const newCompleted = !todo.completed;
          // Track completion (only when marking as complete)
          if (newCompleted && !todo.completed) {
            const taskNumber = prev.findIndex(t => t.id === id) + 1;
            trackTaskComplete(taskNumber).catch(err => console.error('Analytics error:', err));
          }
          return { ...todo, completed: newCompleted };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => {
      const todoToDelete = prev.find((todo) => todo.id === id);
      if (todoToDelete) {
        trackTaskDelete().catch(err => console.error('Analytics error:', err));
      }
      return prev.filter((todo) => todo.id !== id);
    });
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
