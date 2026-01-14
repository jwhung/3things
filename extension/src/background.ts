/**
 * Background Service Worker for 3Things Extension
 * Handles extension lifecycle events
 */

// Version is inlined here to avoid ES6 imports in service worker
const VERSION = "1.0.0";

// Track extension installation
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    console.log('[3Things] Extension installed');

    // Track installation using analytics
    // We'll use chrome.storage to communicate with the content script
    chrome.storage.local.set({
      'analytics_install_pending': true,
      'analytics_install_version': VERSION,
    });

    // Open welcome page on first install
    chrome.tabs.create({ url: 'chrome://newtab' });
  } else if (details.reason === 'update') {
    console.log('[3Things] Extension updated to version:', VERSION);

    // Track update
    chrome.storage.local.set({
      'analytics_update_pending': true,
      'analytics_update_version': VERSION,
    });
  }
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getAnalyticsData') {
    chrome.storage.local.get(
      ['analytics_install_pending', 'analytics_install_version', 'analytics_update_pending', 'analytics_update_version'],
      (result) => {
        sendResponse(result);
      }
    );
    return true; // Keep message channel open for async response
  }

  if (request.action === 'clearAnalyticsData') {
    chrome.storage.local.remove([
      'analytics_install_pending',
      'analytics_install_version',
      'analytics_update_pending',
      'analytics_update_version',
    ], () => {
      sendResponse({ success: true });
    });
    return true;
  }
});

console.log('[3Things] Background service worker loaded');
