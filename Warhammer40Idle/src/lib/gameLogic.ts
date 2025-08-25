import { GameState, Barracks, Soldier, OfflineProgress } from '@/types/game';

// Game constants
export const GAME_CONSTANTS = {
  BASE_TRAINING_SPEED: 1, // soldiers per second
  BASE_BARRACKS_CAPACITY: 10,
  SOLDIER_BASE_ATTACK: 10,
  SOLDIER_BASE_DEFENSE: 5,
  SOLDIER_BASE_HEALTH: 100,
  UPGRADE_COST_MULTIPLIER: 1.5,
  EXPERIENCE_PER_SOLDIER: 10,
};

// Generate a new soldier
export function generateSoldier(barracksLevel: number): Soldier {
  const baseMultiplier = 1 + (barracksLevel - 1) * 0.2;
  
  return {
    id: `soldier_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    level: 1,
    experience: 0,
    attack: Math.floor(GAME_CONSTANTS.SOLDIER_BASE_ATTACK * baseMultiplier),
    defense: Math.floor(GAME_CONSTANTS.SOLDIER_BASE_DEFENSE * baseMultiplier),
    health: Math.floor(GAME_CONSTANTS.SOLDIER_BASE_HEALTH * baseMultiplier),
    maxHealth: Math.floor(GAME_CONSTANTS.SOLDIER_BASE_HEALTH * baseMultiplier),
    createdAt: Date.now(),
  };
}

// Calculate offline progress
export function calculateOfflineProgress(gameState: GameState): OfflineProgress {
  const now = Date.now();
  const timeOffline = now - gameState.lastSaveTime;
  const secondsOffline = timeOffline / 1000;
  
  let totalSoldiersGained = 0;
  let totalExperienceGained = 0;
  
  gameState.barracks.forEach(barracks => {
    if (barracks.isTraining) {
      const soldiersGained = Math.floor(secondsOffline * barracks.trainingSpeed);
      const availableSpace = barracks.maxCapacity - barracks.soldiers.length;
      const actualSoldiersGained = Math.min(soldiersGained, availableSpace);
      
      totalSoldiersGained += actualSoldiersGained;
      totalExperienceGained += actualSoldiersGained * GAME_CONSTANTS.EXPERIENCE_PER_SOLDIER;
    }
  });
  
  return {
    timeOffline,
    soldiersGained: totalSoldiersGained,
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
  
  // Generate soldiers for each barracks
  updatedGameState.barracks = updatedGameState.barracks.map(barracks => {
    if (!barracks.isTraining) return barracks;
    
    const secondsOffline = offlineProgress.timeOffline / 1000;
    const soldiersGained = Math.floor(secondsOffline * barracks.trainingSpeed);
    const availableSpace = barracks.maxCapacity - barracks.soldiers.length;
    const actualSoldiersGained = Math.min(soldiersGained, availableSpace);
    
    const newSoldiers: Soldier[] = [];
    for (let i = 0; i < actualSoldiersGained; i++) {
      newSoldiers.push(generateSoldier(barracks.level));
    }
    
    return {
      ...barracks,
      soldiers: [...barracks.soldiers, ...newSoldiers],
      lastUpdate: now,
    };
  });
  
  updatedGameState.totalSoldiers += offlineProgress.soldiersGained;
  updatedGameState.lastSaveTime = now;
  
  return updatedGameState;
}

// Create initial game state
export function createInitialGameState(): GameState {
  const initialBarracks: Barracks = {
    id: 'barracks_1',
    level: 1,
    soldiers: [],
    maxCapacity: GAME_CONSTANTS.BASE_BARRACKS_CAPACITY,
    trainingSpeed: GAME_CONSTANTS.BASE_TRAINING_SPEED,
    lastUpdate: Date.now(),
    isTraining: true,
  };
  
  return {
    barracks: [initialBarracks],
    resources: {
      gold: 1000,
      experience: 0,
    },
    lastSaveTime: Date.now(),
    totalSoldiers: 0,
    totalExperience: 0,
  };
}

// Calculate upgrade cost for barracks
export function getBarracksUpgradeCost(barracks: Barracks): number {
  return Math.floor(100 * Math.pow(GAME_CONSTANTS.UPGRADE_COST_MULTIPLIER, barracks.level - 1));
}

// Upgrade barracks
export function upgradeBarracks(barracks: Barracks): Barracks {
  return {
    ...barracks,
    level: barracks.level + 1,
    maxCapacity: Math.floor(barracks.maxCapacity * 1.5),
    trainingSpeed: barracks.trainingSpeed * 1.2,
  };
}
