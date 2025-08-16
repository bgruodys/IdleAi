import { useEffect, useState } from 'react';

interface UsePersistenceOptions<T> {
  key: string;
  defaultValue: T;
  serializer?: {
    serialize: (data: T) => string;
    deserialize: (data: string) => T;
  };
}

export const usePersistence = <T>({
  key,
  defaultValue,
  serializer = {
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  },
}: UsePersistenceOptions<T>) => {
  const [data, setData] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        const parsedData = serializer.deserialize(storedData);
        setData(parsedData);
      }
    } catch (error) {
      console.error(`Error loading data from localStorage for key "${key}":`, error);
    } finally {
      setIsLoading(false);
    }
  }, [key, serializer]);

  // Save data to localStorage
  const save = (newData: T) => {
    try {
      const serializedData = serializer.serialize(newData);
      localStorage.setItem(key, serializedData);
      setData(newData);
      return true;
    } catch (error) {
      console.error(`Error saving data to localStorage for key "${key}":`, error);
      return false;
    }
  };

  // Clear data from localStorage
  const clear = () => {
    try {
      localStorage.removeItem(key);
      setData(defaultValue);
      return true;
    } catch (error) {
      console.error(`Error clearing data from localStorage for key "${key}":`, error);
      return false;
    }
  };

  // Check if data exists in localStorage
  const exists = () => {
    return localStorage.getItem(key) !== null;
  };

  return {
    data,
    save,
    clear,
    exists,
    isLoading,
  };
};

// Auto-save hook
interface UseAutoSaveOptions<T> {
  data: T;
  key: string;
  delay?: number; // in milliseconds
  enabled?: boolean;
}

export const useAutoSave = <T>({
  data,
  key,
  delay = 5000, // 5 seconds default
  enabled = true,
}: UseAutoSaveOptions<T>) => {
  const [lastSaved, setLastSaved] = useState<number>(Date.now());
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const timeoutId = setTimeout(() => {
      setIsSaving(true);
      try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(key, serializedData);
        setLastSaved(Date.now());
      } catch (error) {
        console.error(`Auto-save failed for key "${key}":`, error);
      } finally {
        setIsSaving(false);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [data, key, delay, enabled]);

  return {
    lastSaved,
    isSaving,
  };
};

// Local storage helper functions
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue ?? null;
    } catch (error) {
      console.error(`Error getting item "${key}" from localStorage:`, error);
      return defaultValue ?? null;
    }
  },

  set: <T>(key: string, value: T): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item "${key}" in localStorage:`, error);
      return false;
    }
  },

  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item "${key}" from localStorage:`, error);
      return false;
    }
  },

  clear: (): boolean => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  exists: (key: string): boolean => {
    return localStorage.getItem(key) !== null;
  },

  size: (): number => {
    return localStorage.length;
  },

  keys: (): string[] => {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) keys.push(key);
    }
    return keys;
  },
};
