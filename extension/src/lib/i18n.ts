/**
 * Chrome Extension i18n utility
 * Uses chrome.i18n API for internationalization
 */

/**
 * Get localized message by key
 * Falls back to the key itself if translation is missing
 */
export function t(key: string): string {
  if (typeof chrome !== 'undefined' && chrome.i18n && chrome.i18n.getMessage) {
    const message = chrome.i18n.getMessage(key);
    if (message) {
      return message;
    }
  }

  // Fallback for development (return Chinese by default)
  const fallbacks: Record<string, string> = {
    appName: '3things',
    extensionDescription: '每天只需要关注三件最重要的事情',
    tagline: '三事如仪 · 日日是好',
    taglinePopup: '日日是好',
    todayProgress: '今日进度',
    allCompleted: '✨ 今日三事已成，不负韶华时光',
    history: '历史记录',
    addTask: '添加今天的任务...',
    add: '添加',
    maxTasksReached: '每天最多只能添加 3 个任务',
    historyTitle: '历史记录',
    emptyHistory: '还没有历史记录',
    today: '今天',
    close: '关闭',
    download: '下载',
    historyDescription: '查看过去的任务记录和完成情况',
    openInNewTab: '在新标签页打开',
  };

  return fallbacks[key] || key;
}

/**
 * Get current UI language
 * Returns 'zh', 'en', etc.
 */
export function getCurrentLanguage(): string {
  if (typeof chrome !== 'undefined' && chrome.i18n && chrome.i18n.getUILanguage) {
    return chrome.i18n.getUILanguage();
  }

  // Fallback to browser language
  const lang = navigator.language || navigator.languages?.[0] || 'zh';
  return lang;
}

/**
 * Check if current language is Chinese
 */
export function isChinese(): boolean {
  const lang = getCurrentLanguage();
  return lang.startsWith('zh');
}
