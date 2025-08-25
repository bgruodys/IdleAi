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

export interface Barracks {
  id: string;
  level: number;
  soldiers: Soldier[];
  maxCapacity: number;
  trainingSpeed: number; // soldiers per second
  lastUpdate: number;
  isTraining: boolean;
}

export interface GameState {
  barracks: Barracks[];
  resources: {
    gold: number;
    experience: number;
  };
  lastSaveTime: number;
  totalSoldiers: number;
  totalExperience: number;
}

export interface OfflineProgress {
  timeOffline: number;
  soldiersGained: number;
  experienceGained: number;
}
