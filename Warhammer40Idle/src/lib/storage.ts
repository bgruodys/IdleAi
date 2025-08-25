import { GameState, OfflineProgress } from '@/types/game';
import { calculateOfflineProgress, applyOfflineProgress, createInitialGameState } from './gameLogic';

const STORAGE_KEYS = {
  GAME_STATE: 'warhammer40idle_game_state',
  LAST_SAVE_TIME: 'warhammer40idle_last_save',
};

// Save game state to localStorage
export function saveGameState(gameState: GameState): void {
  if (typeof window === 'undefined') return; // Server-side rendering guard
  
  try {
    const stateToSave = {
      ...gameState,
      lastSaveTime: Date.now(),
    };
    
    localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(stateToSave));
    localStorage.setItem(STORAGE_KEYS.LAST_SAVE_TIME, Date.now().toString());
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
}

// Load game state from localStorage
export function loadGameState(): GameState {
  if (typeof window === 'undefined') {
    return createInitialGameState(); // Server-side rendering guard
  }
  
  try {
    const savedState = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
    
    if (!savedState) {
      return createInitialGameState();
    }
    
    const gameState: GameState = JSON.parse(savedState);
    
    // Check for offline progress
    const offlineProgress = calculateOfflineProgress(gameState);
    
    if (offlineProgress.timeOffline > 1000) { // More than 1 second offline
      const updatedState = applyOfflineProgress(gameState, offlineProgress);
      saveGameState(updatedState);
      return updatedState;
    }
    
    return gameState;
  } catch (error) {
    console.error('Failed to load game state:', error);
    return createInitialGameState();
  }
}

// Get offline progress without applying it
export function getOfflineProgress(): OfflineProgress | null {
  if (typeof window === 'undefined') return null; // Server-side rendering guard
  
  try {
    const savedState = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
    
    if (!savedState) {
      return null;
    }
    
    const gameState: GameState = JSON.parse(savedState);
    const offlineProgress = calculateOfflineProgress(gameState);
    
    if (offlineProgress.timeOffline > 1000) {
      return offlineProgress;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to get offline progress:', error);
    return null;
  }
}

// Clear saved game state
export function clearGameState(): void {
  if (typeof window === 'undefined') return; // Server-side rendering guard
  
  try {
    localStorage.removeItem(STORAGE_KEYS.GAME_STATE);
    localStorage.removeItem(STORAGE_KEYS.LAST_SAVE_TIME);
  } catch (error) {
    console.error('Failed to clear game state:', error);
  }
}

// Auto-save function
export function autoSave(gameState: GameState): void {
  if (typeof window === 'undefined') return; // Server-side rendering guard
  
  // Save every 30 seconds
  const now = Date.now();
  const lastSave = parseInt(localStorage.getItem(STORAGE_KEYS.LAST_SAVE_TIME) || '0');
  
  if (now - lastSave >= 30000) {
    saveGameState(gameState);
  }
}
