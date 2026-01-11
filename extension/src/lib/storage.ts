/**
 * LocalStorage utility functions for 3Things extension
 */

import { DayData, Todo } from "../types";

const STORAGE_KEY = "3things-data";

/**
 * Load all data from localStorage
 */
export function loadAllData(): DayData[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const data: DayData[] = JSON.parse(saved);
    return data;
  } catch (error) {
    console.error("Failed to load data:", error);
    return [];
  }
}

/**
 * Get today's data
 */
export function getTodayData(): DayData | null {
  const allData = loadAllData();
  const today = getTodayString();
  return allData.find((d) => d.date === today) || null;
}

/**
 * Save data for a specific date
 */
export function saveDayData(date: string, todos: Todo[]): void {
  const allData = loadAllData();
  const todayIndex = allData.findIndex((d) => d.date === date);

  if (todayIndex >= 0) {
    allData[todayIndex].todos = todos;
  } else {
    allData.push({ date, todos });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
}

/**
 * Get today's date string in YYYY-MM-DD format
 */
export function getTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
