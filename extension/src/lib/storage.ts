/**
 * Chrome Storage utility functions for 3Things extension
 * Uses chrome.storage.sync for automatic cross-device synchronization
 */

import { DayData, Todo } from "../types";

const STORAGE_KEY = "3things-data";

/**
 * Load all data from Chrome synced storage
 */
export async function loadAllData(): Promise<DayData[]> {
  return new Promise((resolve) => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.get([STORAGE_KEY], (result) => {
        try {
          const data: DayData[] = result[STORAGE_KEY] || [];
          resolve(data);
        } catch (error) {
          console.error("Failed to load data:", error);
          resolve([]);
        }
      });
    } else {
      // Fallback to localStorage for development
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
          resolve([]);
          return;
        }
        const data: DayData[] = JSON.parse(saved);
        resolve(data);
      } catch (error) {
        console.error("Failed to load data:", error);
        resolve([]);
      }
    }
  });
}

/**
 * Get today's data
 */
export async function getTodayData(): Promise<DayData | null> {
  const allData = await loadAllData();
  const today = getTodayString();
  return allData.find((d) => d.date === today) || null;
}

/**
 * Save data for a specific date (with automatic sync)
 */
export async function saveDayData(date: string, todos: Todo[]): Promise<void> {
  return new Promise(async (resolve) => {
    const allData = await loadAllData();
    const todayIndex = allData.findIndex((d) => d.date === date);

    if (todayIndex >= 0) {
      allData[todayIndex].todos = todos;
    } else {
      allData.push({ date, todos });
    }

    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.set({ [STORAGE_KEY]: allData }, () => {
        if (chrome.runtime.lastError) {
          console.error("Failed to save data:", chrome.runtime.lastError);
        }
        resolve();
      });
    } else {
      // Fallback to localStorage for development
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
        resolve();
      } catch (error) {
        console.error("Failed to save data:", error);
        resolve();
      }
    }
  });
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
