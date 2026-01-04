import { GameState } from '../store/gameSlice';

const STORAGE_KEY = 'emperors-call-game-state';
const SESSION_KEY = 'emperors-call-session';
const FILE_NAME = 'emperors-call-save.json';

// Secret key for hash calculation (embedded in code to prevent casual tampering)
const HASH_SECRET = 'Emperor\'s Call - For the Imperium! 2024';

export interface SavedGameState extends GameState {
  savedAt: number;
  version: string;
  hash?: string; // SHA-256 hash for integrity verification
}

const GAME_VERSION = '1.0.0';

/**
 * Calculate SHA-256 hash of game state for integrity verification
 * Excludes hash, savedAt, and version fields from calculation
 */
async function calculateGameStateHash(state: GameState): Promise<string> {
  // Create a copy without metadata fields
  const stateToHash = {
    player: state.player,
    planet: state.planet,
    reinforcements: state.reinforcements,
    resources: state.resources,
    gameStarted: state.gameStarted,
    lastReinforcementTime: state.lastReinforcementTime,
    sessionInfo: state.sessionInfo,
  };
  
  // Stringify and add secret
  const dataString = JSON.stringify(stateToHash) + HASH_SECRET;
  
  // Calculate SHA-256 hash
  const encoder = new TextEncoder();
  const data = encoder.encode(dataString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convert to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify game state hash
 */
async function verifyGameStateHash(state: SavedGameState): Promise<boolean> {
  if (!state.hash) {
    // Old save files without hash - allow for backward compatibility
    return true;
  }
  
  // Calculate expected hash
  const expectedHash = await calculateGameStateHash(state);
  return state.hash === expectedHash;
}

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
export async function saveGameStateToStorage(state: GameState): Promise<void> {
  if (!isLocalStorageAvailable()) {
    return;
  }
  
  try {
    const hash = await calculateGameStateHash(state);
    const savedState: SavedGameState = {
      ...state,
      savedAt: Date.now(),
      version: GAME_VERSION,
      hash,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
  } catch (error) {
    console.error('Failed to save game state to localStorage:', error);
  }
}

/**
 * Load game state from localStorage
 */
export async function loadGameStateFromStorage(): Promise<SavedGameState | null> {
  if (!isLocalStorageAvailable()) {
    return null;
  }
  
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return null;
    }
    const parsed = JSON.parse(saved) as SavedGameState;
    
    // Verify hash if present
    const isValid = await verifyGameStateHash(parsed);
    if (!isValid) {
      console.warn('Game state hash verification failed - save file may have been tampered with');
      // Still return the state but log a warning
      // In production, you might want to reject it
    }
    
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
export async function saveGameStateToFile(state: GameState): Promise<void> {
  try {
    const hash = await calculateGameStateHash(state);
    const savedState: SavedGameState = {
      ...state,
      savedAt: Date.now(),
      version: GAME_VERSION,
      hash,
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
  return new Promise(async (resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content) as SavedGameState;
        
        // Verify hash if present
        const isValid = await verifyGameStateHash(parsed);
        if (!isValid) {
          reject(new Error('Save file integrity check failed. The file may have been tampered with.'));
          return;
        }
        
        resolve(parsed);
      } catch (error) {
        if (error instanceof Error) {
          reject(error);
        } else {
          reject(new Error('Invalid game save file'));
        }
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

