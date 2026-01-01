export interface Soldier {
  id: string;
  level: number;
  experience: number;
  attack: number;
  defense: number;
  health: number;
  maxHealth: number;
  createdAt: number;
}

export interface GameState {
  soldiers: Soldier[];
  resources: {
    gold: number;
    experience: number;
  };
  lastSaveTime: number;
  lastSoldierSpawn: number;
  totalSoldiers: number;
  totalExperience: number;
  battleField: BattleField;
  battleStats: {
    totalBattles: number;
    battlesWon: number;
    soldiersLost: number;
    orcsKilled: number;
  };
}

export interface OfflineProgress {
  timeOffline: number;
  soldiersGained: number;
  experienceGained: number;
}

export { BattleField, BattleUnit, BattleResult, BattleSettings } from './battle';
