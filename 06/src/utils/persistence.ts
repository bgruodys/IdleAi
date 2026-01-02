import { GameState } from '../store/gameSlice';

const STORAGE_KEY = 'emperors-call-game-state';
const SESSION_KEY = 'emperors-call-session';
const FILE_NAME = 'emperors-call-save.json';

export interface SavedGameState extends GameState {
  savedAt: number;
  version: string;
}

const GAME_VERSION = '1.0.0';

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Save game state to localStorage
 */
export function saveGameStateToStorage(state: GameState): void {
  if (!isLocalStorageAvailable()) {
    return;
  }
  
  try {
    const savedState: SavedGameState = {
      ...state,
      savedAt: Date.now(),
      version: GAME_VERSION,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
  } catch (error) {
    console.error('Failed to save game state to localStorage:', error);
  }
}

/**
 * Load game state from localStorage
 */
export function loadGameStateFromStorage(): SavedGameState | null {
  if (!isLocalStorageAvailable()) {
    return null;
  }
  
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return null;
    }
    const parsed = JSON.parse(saved) as SavedGameState;
    return parsed;
  } catch (error) {
    console.error('Failed to load game state from localStorage:', error);
    return null;
  }
}

/**
 * Clear game state from localStorage
 */
export function clearGameStateFromStorage(): void {
  if (!isLocalStorageAvailable()) {
    return;
  }
  
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Failed to clear game state from localStorage:', error);
  }
}

/**
 * Save game state to file (download)
 */
export function saveGameStateToFile(state: GameState): void {
  try {
    const savedState: SavedGameState = {
      ...state,
      savedAt: Date.now(),
      version: GAME_VERSION,
    };
    const dataStr = JSON.stringify(savedState, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = FILE_NAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to save game state to file:', error);
    throw error;
  }
}

/**
 * Load game state from file (upload)
 */
export function loadGameStateFromFile(file: File): Promise<SavedGameState> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content) as SavedGameState;
        resolve(parsed);
      } catch (error) {
        reject(new Error('Invalid game save file'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsText(file);
  });
}

/**
 * Session management - check if another session is active
 * Note: This only checks localStorage. For real-time detection of other tabs,
 * use the sessionManager with BroadcastChannel.
 */
export function checkActiveSession(): { sessionId: string | null; isActive: boolean } {
  if (!isLocalStorageAvailable()) {
    return { sessionId: null, isActive: false };
  }
  
  try {
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (!sessionData) {
      return { sessionId: null, isActive: false };
    }
    
    const { sessionId, lastActiveTime } = JSON.parse(sessionData);
    const now = Date.now();
    const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes
    
    // If session is older than timeout, consider it inactive
    if (now - lastActiveTime > SESSION_TIMEOUT) {
      // Clear expired session
      localStorage.removeItem(SESSION_KEY);
      return { sessionId: null, isActive: false };
    }
    
    return { sessionId, isActive: true };
  } catch (error) {
    console.error('Failed to check active session:', error);
    return { sessionId: null, isActive: false };
  }
}

/**
 * Set active session
 */
export function setActiveSession(sessionId: string): void {
  if (!isLocalStorageAvailable()) {
    return;
  }
  
  try {
    const sessionData = {
      sessionId,
      lastActiveTime: Date.now(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  } catch (error) {
    console.error('Failed to set active session:', error);
  }
}

/**
 * Update session activity
 */
export function updateSessionActivity(sessionId: string): void {
  if (!isLocalStorageAvailable()) {
    return;
  }
  
  try {
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (sessionData) {
      const parsed = JSON.parse(sessionData);
      if (parsed.sessionId === sessionId) {
        parsed.lastActiveTime = Date.now();
        localStorage.setItem(SESSION_KEY, JSON.stringify(parsed));
      }
    }
  } catch (error) {
    console.error('Failed to update session activity:', error);
  }
}

/**
 * Clear session
 */
export function clearSession(): void {
  if (!isLocalStorageAvailable()) {
    return;
  }
  
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Failed to clear session:', error);
  }
}

