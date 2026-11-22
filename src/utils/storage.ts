/**
 * Safe storage wrapper with in-memory fallback protection against Private Browsing
 * restrictions, QuotaExceededError, SecurityError, or Node.js test environments.
 */

const memoryStorage = new Map<string, string>();

export function safeGetStorage(key: string, fallback: string = ''): string {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const val = window.localStorage.getItem(key);
      if (val !== null) return val;
    }
  } catch (err) {
    console.warn(`[SafeStorage] Unable to read localStorage key "${key}":`, err);
  }
  return memoryStorage.has(key) ? (memoryStorage.get(key) ?? fallback) : fallback;
}

export function safeSetStorage(key: string, value: string): boolean {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
      memoryStorage.set(key, value);
      return true;
    }
  } catch (err) {
    console.warn(`[SafeStorage] Unable to write localStorage key "${key}":`, err);
  }
  memoryStorage.set(key, value);
  return true;
}

export function safeRemoveStorage(key: string): boolean {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
      memoryStorage.delete(key);
      return true;
    }
  } catch (err) {
    console.warn(`[SafeStorage] Unable to remove localStorage key "${key}":`, err);
  }
  memoryStorage.delete(key);
  return true;
}
