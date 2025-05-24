'use client';

/**
 * Personalization Utils (JS)
 * Tracks user behavior for content recommendations
 */

const USER_PREFERENCES_KEY = 'renosolutions_user_preferences';
const MAX_TRACKED_PAGES = 10;

/**
 * Initialize default user preferences
 */
export function initUserPreferences() {
  if (typeof window === 'undefined') return {};

  const stored = localStorage.getItem(USER_PREFERENCES_KEY);
  if (stored) return JSON.parse(stored);

  const defaultPrefs = {
    renovationType: null,
    budgetRange: null,
    designStyle: null,
    lastVisitedPages: [],
    pageViewCount: {},
    firstVisitDate: new Date().toISOString(),
    lastVisitDate: new Date().toISOString(),
    visitCount: 1,
    location: null,
    referrer: document.referrer || null,
    device: navigator.userAgent,
  };

  localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(defaultPrefs));
  return defaultPrefs;
}

export function savePreferences(prefs) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(prefs));
  }
}

export function getPreferences() {
  if (typeof window === 'undefined') return {};
  return JSON.parse(localStorage.getItem(USER_PREFERENCES_KEY) || '{}');
}

export function trackPageVisit(pathname) {
  const prefs = getPreferences();
  prefs.lastVisitedPages = [pathname, ...(prefs.lastVisitedPages || [])].slice(0, MAX_TRACKED_PAGES);
  prefs.pageViewCount = prefs.pageViewCount || {};
  prefs.pageViewCount[pathname] = (prefs.pageViewCount[pathname] || 0) + 1;
  prefs.lastVisitDate = new Date().toISOString();
  prefs.visitCount = (prefs.visitCount || 0) + 1;
  savePreferences(prefs);
}
