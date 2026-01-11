export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

export interface DayData {
  date: string;
  todos: Todo[];
}

const STORAGE_KEY = "3things-data";

export const getTodayString = (): string => {
  return new Date().toISOString().split("T")[0];
};

export const loadData = async (): Promise<DayData[]> => {
  return new Promise((resolve) => {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      if (result[STORAGE_KEY]) {
        try {
          const data: DayData[] = JSON.parse(result[STORAGE_KEY]);
          resolve(data);
        } catch (error) {
          console.error("Failed to parse data:", error);
          resolve([]);
        }
      } else {
        resolve([]);
      }
    });
  });
};

export const saveData = async (data: DayData[]): Promise<void> => {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEY]: JSON.stringify(data) }, () => {
      resolve();
    });
  });
};

export const getTodayData = async (): Promise<DayData | null> => {
  const allData = await loadData();
  const today = getTodayString();
  return allData.find((d) => d.date === today) || null;
};

export const saveTodayData = async (todos: Todo[]): Promise<void> => {
  const allData = await loadData();
  const today = getTodayString();
  const todayIndex = allData.findIndex((d) => d.date === today);

  if (todayIndex >= 0) {
    allData[todayIndex].todos = todos;
  } else {
    allData.push({ date: today, todos });
  }

  // 只保留最近30天的数据
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const filteredData = allData.filter(
    (d) => new Date(d.date) >= thirtyDaysAgo
  );

  await saveData(filteredData);
};

export const getHistory = async (): Promise<DayData[]> => {
  const allData = await loadData();
  const today = getTodayString();

  return allData
    .filter((d) => d.date !== today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
