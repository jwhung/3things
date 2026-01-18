/**
 * Date utility functions for 3Things extension
 */

/**
 * Format date to Chinese
 * Returns "今天", "昨天", or "月日" format
 */
export function formatDateToChinese(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "今天";
  if (date.toDateString() === yesterday.toDateString()) return "昨天";

  return date.toLocaleDateString("zh-CN", {
    month: "long",
    day: "numeric",
  });
}

/**
 * Calculate completion rate percentage
 */
export function getCompletionRate(todos: Array<{ completed: boolean }>): number {
  if (todos.length === 0) return 0;
  const completed = todos.filter((t) => t.completed).length;
  return Math.round((completed / todos.length) * 100);
}

/**
 * Sort data by date (newest first)
 */
export function sortByDate<T extends { date: string }>(data: T[]): T[] {
  return data.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
