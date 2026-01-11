import { useState, useEffect } from "react";
import { DayData } from "../types";
import { loadAllData, getTodayString } from "../lib/storage";
import { sortByDate } from "../lib/date-utils";

/**
 * Custom hook to manage historical data
 * Automatically loads and sorts all historical data
 */
export function useHistory(includeToday: boolean = true) {
  const [history, setHistory] = useState<DayData[]>([]);
  const [todayData, setTodayData] = useState<DayData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allData = loadAllData();
    const today = getTodayString();

    // Separate today's data from historical data
    const todayEntry = allData.find((d) => d.date === today);
    const historicalData = allData.filter((d) => d.date !== today && d.todos.length > 0);

    // Sort historical data by date (newest first)
    const sortedHistory = sortByDate(historicalData);

    setTodayData(todayEntry || null);
    setHistory(sortedHistory);
    setLoading(false);
  }, [includeToday]);

  // Calculate statistics
  const totalTodos = history.reduce((sum, day) => sum + day.todos.length, 0) +
                     (todayData?.todos.length || 0);
  const totalDays = history.length + (todayData && todayData.todos.length > 0 ? 1 : 0);
  const hasData = history.length > 0 || (todayData && todayData.todos.length > 0);

  return {
    history,
    todayData,
    loading,
    totalTodos,
    totalDays,
    hasData,
  };
}
