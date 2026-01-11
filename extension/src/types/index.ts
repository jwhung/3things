/**
 * Shared type definitions for 3Things extension
 */

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt?: number;
}

export interface DayData {
  date: string; // YYYY-MM-DD format
  todos: Todo[];
}

export interface DayHistory {
  date: string;
  todos: Array<{
    text: string;
    completed: boolean;
  }>;
}
