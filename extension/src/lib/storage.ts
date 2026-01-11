/**
 * LocalStorage utility functions for 3Things extension
 */

import { DayData, Todo } from "../types";

const STORAGE_KEY = "3things-data";
const MAX_DAYS_TO_KEEP = 30;

/**
 * Load all data from localStorage
 */
export function loadAllData(): DayData[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const data: DayData[] = JSON.parse(saved);

    // Filter out old data (older than 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - MAX_DAYS_TO_KEEP);

    return data.filter((d) => new Date(d.date) >= thirtyDaysAgo);
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

  // Filter out old data before saving
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - MAX_DAYS_TO_KEEP);
  const filteredData = allData.filter(
    (d) => new Date(d.date) >= thirtyDaysAgo
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredData));
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
