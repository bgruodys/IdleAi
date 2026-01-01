import { GameState, Soldier, OfflineProgress } from '@/types/game';
import { createBattleField } from './battleLogic';

// Game constants
export const GAME_CONSTANTS = {
  SOLDIER_SPAWN_INTERVAL: 10000, // 10 seconds
  SOLDIER_BASE_ATTACK: 10,
  SOLDIER_BASE_DEFENSE: 5,
  SOLDIER_BASE_HEALTH: 100,
  EXPERIENCE_PER_SOLDIER: 10,
};

// Generate a new soldier
export function generateSoldier(): Soldier {
  return {
    id: `soldier_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    level: 1,
    experience: 0,
    attack: GAME_CONSTANTS.SOLDIER_BASE_ATTACK,
    defense: GAME_CONSTANTS.SOLDIER_BASE_DEFENSE,
    health: GAME_CONSTANTS.SOLDIER_BASE_HEALTH,
    maxHealth: GAME_CONSTANTS.SOLDIER_BASE_HEALTH,
    createdAt: Date.now(),
  };
}

// Calculate offline progress
export function calculateOfflineProgress(gameState: GameState): OfflineProgress {
  const now = Date.now();
  const timeOffline = now - gameState.lastSaveTime;
  const secondsOffline = timeOffline / 1000;
  
  // Calculate soldiers that would have spawned during offline time
  const soldiersGained = Math.floor(secondsOffline / 10); // One soldier every 10 seconds
  const totalExperienceGained = soldiersGained * GAME_CONSTANTS.EXPERIENCE_PER_SOLDIER;
  
  return {
    timeOffline,
    soldiersGained,
    experienceGained: totalExperienceGained,
  };
}

// Apply offline progress to game state
export function applyOfflineProgress(gameState: GameState, offlineProgress: OfflineProgress): GameState {
  const updatedGameState = { ...gameState };
  const now = Date.now();
  
  // Add experience
  updatedGameState.resources.experience += offlineProgress.experienceGained;
  updatedGameState.totalExperience += offlineProgress.experienceGained;
  
  // Generate soldiers for offline time
  const newSoldiers: Soldier[] = [];
  for (let i = 0; i < offlineProgress.soldiersGained; i++) {
    newSoldiers.push(generateSoldier());
  }
  
  updatedGameState.soldiers = [...updatedGameState.soldiers, ...newSoldiers];
  updatedGameState.totalSoldiers += offlineProgress.soldiersGained;
  updatedGameState.lastSaveTime = now;
  updatedGameState.lastSoldierSpawn = now;
  
  return updatedGameState;
}

// Create initial game state
export function createInitialGameState(): GameState {
  return {
    soldiers: [],
    resources: {
      gold: 1000,
      experience: 0,
    },
    lastSaveTime: Date.now(),
    lastSoldierSpawn: Date.now(),
    totalSoldiers: 0,
    totalExperience: 0,
    battleField: createBattleField(),
    battleStats: {
      totalBattles: 0,
      battlesWon: 0,
      soldiersLost: 0,
      orcsKilled: 0,
    },
  };
}

// Check if it's time to spawn a new soldier
export function shouldSpawnSoldier(gameState: GameState): boolean {
  const now = Date.now();
  return now - gameState.lastSoldierSpawn >= GAME_CONSTANTS.SOLDIER_SPAWN_INTERVAL;
}

// Spawn a new soldier if it's time
export function spawnSoldierIfReady(gameState: GameState): GameState {
  if (!shouldSpawnSoldier(gameState)) {
    return gameState;
  }
  
  const newSoldier = generateSoldier();
  const now = Date.now();
  
  return {
    ...gameState,
    soldiers: [...gameState.soldiers, newSoldier],
    lastSoldierSpawn: now,
    totalSoldiers: gameState.totalSoldiers + 1,
    totalExperience: gameState.totalExperience + GAME_CONSTANTS.EXPERIENCE_PER_SOLDIER,
    resources: {
      ...gameState.resources,
      experience: gameState.resources.experience + GAME_CONSTANTS.EXPERIENCE_PER_SOLDIER,
    },
  };
}
