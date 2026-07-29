/**
 * Safe LocalStorage utility that gracefully handles QuotaExceededError
 * and prevents console errors or application crashes when storing large data.
 */

export function safeSetItem<T>(key: string, value: T): boolean {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (e: any) {
    if (
      e?.name === 'QuotaExceededError' ||
      e?.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
      e?.code === 22 ||
      e?.code === 1014
    ) {
      console.warn(`[Storage] LocalStorage quota exceeded for key "${key}". Clearing old cache...`);
      try {
        // Try cleaning up old items to free space
        localStorage.removeItem(key);
        // Attempt once more with stripped or current data
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (innerErr) {
        console.warn(`[Storage] Persistent cache skipped for "${key}" due to size limits.`);
        return false;
      }
    }
    console.warn(`[Storage] Failed to save key "${key}":`, e);
    return false;
  }
}

export function safeGetItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`[Storage] Failed to read key "${key}":`, e);
    return fallback;
  }
}
