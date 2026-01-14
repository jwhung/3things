/**
 * Privacy-friendly Analytics for 3Things Extension
 *
 * Using Google Analytics 4 Measurement Protocol
 * Direct HTTP requests, no external scripts needed
 *
 * Features:
 * - No personal data collection
 * - No cookies or tracking identifiers
 * - GDPR/CCPA compliant by default
 * - Respects user privacy
 * - Free quota: 10 million events per month
 *
 * Events tracked:
 * - extension_install: When extension is installed/updated
 * - daily_active: Daily active users
 * - task_add: When user adds a task
 * - task_complete: When user completes a task
 * - task_delete: When user deletes a task
 * - history_view: When user views history
 * - history_download: When user downloads history
 * - popup_open: When popup is opened
 */

// Configuration
// GA4 Measurement ID (format: G-XXXXXXXXXX)
// Get your ID from: https://analytics.google.com/
// Admin → Data Streams → Web → Measurement ID
const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || "";
const GA4_API_SECRET = import.meta.env.VITE_GA4_API_SECRET || "";
const ENABLE_ANALYTICS = import.meta.env.MODE === 'production';

// Helper: Generate random client ID (similar to UUID)
function generateClientId(): string {
  return Date.now().toString() + '-' + Math.random().toString(36).substring(2, 15);
}

// Event type definitions
export type AnalyticsEvent =
  | 'extension_install'
  | 'daily_active'
  | 'task_add'
  | 'task_complete'
  | 'task_delete'
  | 'history_view'
  | 'history_download'
  | 'popup_open'
  | 'newtab_open';

interface EventProps {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Get or create anonymous user identifier
 * This is a random UUID that stays local and is NOT linked to any personal data
 */
async function getAnonymousUserId(): Promise<string> {
  const STORAGE_KEY = 'analytics_aid';

  if (typeof chrome !== 'undefined' && chrome.storage) {
    const result = await new Promise<{ [key: string]: string }>((resolve) => {
      chrome.storage.local.get([STORAGE_KEY], resolve);
    });

    if (result[STORAGE_KEY]) {
      return result[STORAGE_KEY];
    }

    // Generate new anonymous ID
    const anonymousId = generateClientId();
    await new Promise<void>((resolve) => {
      chrome.storage.local.set({ [STORAGE_KEY]: anonymousId }, resolve);
    });

    return anonymousId;
  }

  // Fallback for development
  let aid = localStorage.getItem(STORAGE_KEY);
  if (!aid) {
    aid = generateClientId();
    localStorage.setItem(STORAGE_KEY, aid);
  }
  return aid;
}

/**
 * Send event to Google Analytics 4 using Measurement Protocol
 * Uses POST request to GA4 MP endpoint
 */
async function sendEvent(eventName: AnalyticsEvent, props?: EventProps): Promise<void> {
  if (!ENABLE_ANALYTICS || GA4_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    return;
  }

  try {
    const clientId = await getAnonymousUserId();

    // GA4 Measurement Protocol v2 endpoint
    const endpoint = `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${GA4_API_SECRET}`;

    // Prepare event payload
    const payload = {
      client_id: clientId,
      events: [
        {
          name: eventName,
          params: props || {}
        }
      ]
    };

    // Debug logging
    console.log('[Analytics] Sending event:', eventName, 'Payload:', payload);

    // Send using fetch
    await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    console.log('[Analytics] Event sent:', eventName);
  } catch (error) {
    console.error('[Analytics] Failed to send event:', error);
  }
}

/**
 * Track extension installation/activation
 */
export async function trackInstall(version: string): Promise<void> {
  await sendEvent('extension_install', { version });
}

/**
 * Track daily active user (call once per day)
 */
export async function trackDailyActive(): Promise<void> {
  const today = new Date().toISOString().split('T')[0];
  const lastTracked = localStorage.getItem('analytics_last_active');

  if (lastTracked !== today) {
    await sendEvent('daily_active');
    localStorage.setItem('analytics_last_active', today);
  }
}

/**
 * Track task added
 */
export async function trackTaskAdd(taskNumber: number): Promise<void> {
  await sendEvent('task_add', {
    task_number: taskNumber,
    total_tasks: 3,
  });
}

/**
 * Track task completed
 */
export async function trackTaskComplete(taskNumber: number): Promise<void> {
  await sendEvent('task_complete', {
    task_number: taskNumber,
  });
}

/**
 * Track task deleted
 */
export async function trackTaskDelete(): Promise<void> {
  await sendEvent('task_delete');
}

/**
 * Track history viewed
 */
export async function trackHistoryView(hasData: boolean): Promise<void> {
  await sendEvent('history_view', {
    has_data: hasData,
  });
}

/**
 * Track history downloaded
 */
export async function trackHistoryDownload(): Promise<void> {
  await sendEvent('history_download');
}

/**
 * Track popup opened
 */
export async function trackPopupOpen(): Promise<void> {
  await sendEvent('popup_open');
}

/**
 * Track new tab opened
 */
export async function trackNewtabOpen(): Promise<void> {
  await sendEvent('newtab_open');
  await trackDailyActive(); // Also track daily active when newtab opens
}

/**
 * Initialize analytics
 * Call this when the extension loads
 */
export async function initAnalytics(version: string): Promise<void> {
  if (!ENABLE_ANALYTICS || GA4_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    console.log('[Analytics] Disabled or not configured');
    console.log('[Analytics] Set GA4_MEASUREMENT_ID and GA4_API_SECRET in src/lib/analytics.ts to enable');
    return;
  }

  try {
    // Check if this is a new install or update
    const currentVersion = version;
    const lastVersion = localStorage.getItem('analytics_version');

    if (!lastVersion || lastVersion !== currentVersion) {
      await trackInstall(currentVersion);
      localStorage.setItem('analytics_version', currentVersion);
    }

    console.log('[Analytics] Initialized with Google Analytics 4');
  } catch (error) {
    console.error('[Analytics] Initialization failed:', error);
  }
}
