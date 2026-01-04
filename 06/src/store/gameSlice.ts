import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
export interface Resources {
  credits: number;
  munitions: number;
  promethium: number;
  rawMaterials: number;
  imperialFavor: number;
}

export interface Player {
  id: string;
  name: string;
  rank: number;
  rankTitle: string;
  experience: number;
  arrivedAt: number;
}

export interface Planet {
  id: string;
  name: string;
  discoveredAt: number;
}

// Reinforcements are now grouped by type with counts
// Format: { [type: string]: number } where number is the total unit count for that type
export type Reinforcements = Record<string, number>;

export interface SessionInfo {
  sessionId: string;
  lastActiveTime: number;
  lastSaveTime: number;
}

export interface GameState {
  player: Player | null;
  planet: Planet | null;
  reinforcements: Reinforcements; // Grouped by type: { "Imperial Guardsmen": 50, "Heavy Weapons Team": 20, ... }
  resources: Resources;
  gameStarted: boolean;
  lastReinforcementTime: number;
  sessionInfo: SessionInfo | null;
}

// Constants
export const REINFORCEMENT_TYPES_EXPORT = [
  'Imperial Guardsmen',
  'Heavy Weapons Team',
  'Scout Squad',
  'Veteran Squad',
  'Armored Support',
];

export interface RankData {
  rank: number;
  title: string;
  experienceRequired: number;
  multiplier: number;
  description: string;
}

export const RANK_DATA_EXPORT: RankData[] = [
  { rank: 1, title: 'Recruit', experienceRequired: 0, multiplier: 1.00, description: 'Fresh from the training grounds' },
  { rank: 2, title: 'Guardsman', experienceRequired: 100, multiplier: 1.15, description: 'Proven yourself in basic combat' },
  { rank: 3, title: 'Veteran Guardsman', experienceRequired: 250, multiplier: 1.30, description: 'Experienced in planetary warfare' },
  { rank: 4, title: 'Corporal', experienceRequired: 500, multiplier: 1.45, description: 'First step into leadership' },
  { rank: 5, title: 'Sergeant', experienceRequired: 1000, multiplier: 1.60, description: 'Leading small squads effectively' },
  { rank: 6, title: 'Staff Sergeant', experienceRequired: 1750, multiplier: 1.75, description: 'Senior non-commissioned officer' },
  { rank: 7, title: 'Master Sergeant', experienceRequired: 2750, multiplier: 1.90, description: 'Elite squad leadership' },
  { rank: 8, title: 'Sergeant Major', experienceRequired: 4000, multiplier: 2.05, description: 'Highest enlisted rank' },
  { rank: 9, title: 'Warrant Officer', experienceRequired: 5500, multiplier: 2.20, description: 'Specialized technical expertise' },
  { rank: 10, title: 'Chief Warrant Officer', experienceRequired: 7500, multiplier: 2.35, description: 'Master of specialized fields' },
  { rank: 11, title: 'Second Lieutenant', experienceRequired: 10000, multiplier: 2.50, description: 'First commissioned officer rank' },
  { rank: 12, title: 'Lieutenant', experienceRequired: 13500, multiplier: 2.65, description: 'Commanding platoon-level operations' },
  { rank: 13, title: 'First Lieutenant', experienceRequired: 18000, multiplier: 2.80, description: 'Senior platoon commander' },
  { rank: 14, title: 'Captain', experienceRequired: 24000, multiplier: 2.95, description: 'Battalion leadership achieved' },
  { rank: 15, title: 'Major', experienceRequired: 32000, multiplier: 3.10, description: 'Regimental command authority' },
  { rank: 16, title: 'Lieutenant Colonel', experienceRequired: 42000, multiplier: 3.25, description: 'Battalion command' },
  { rank: 17, title: 'Colonel', experienceRequired: 55000, multiplier: 3.40, description: 'Brigade-level strategic planning' },
  { rank: 18, title: 'Brigadier General', experienceRequired: 72000, multiplier: 3.55, description: 'Brigade command' },
  { rank: 19, title: 'Major General', experienceRequired: 95000, multiplier: 3.70, description: 'Division command' },
  { rank: 20, title: 'Lieutenant General', experienceRequired: 125000, multiplier: 3.85, description: 'Corps command' },
  { rank: 21, title: 'General', experienceRequired: 165000, multiplier: 4.00, description: 'Planetary theater command' },
  { rank: 22, title: 'Lord General', experienceRequired: 220000, multiplier: 4.15, description: "The Emperor's chosen commander" },
  { rank: 23, title: 'Warmaster', experienceRequired: 300000, multiplier: 4.30, description: 'Supreme military commander' },
  { rank: 24, title: 'High Marshal', experienceRequired: 400000, multiplier: 4.45, description: 'Master of multiple theaters' },
  { rank: 25, title: 'Grand Marshal', experienceRequired: 550000, multiplier: 4.60, description: 'Imperial military council member' },
  { rank: 26, title: 'Lord Marshal', experienceRequired: 750000, multiplier: 4.75, description: 'Sector-wide command authority' },
  { rank: 27, title: 'Imperial Marshal', experienceRequired: 1000000, multiplier: 4.90, description: 'Regional command of multiple sectors' },
  { rank: 28, title: 'Supreme Marshal', experienceRequired: 1350000, multiplier: 5.05, description: "One of the Emperor's finest" },
  { rank: 29, title: 'Marshal of the Imperium', experienceRequired: 1800000, multiplier: 5.20, description: 'Legendary commander' },
  { rank: 30, title: "Emperor's Champion", experienceRequired: 2500000, multiplier: 5.35, description: 'The ultimate honor, chosen by the Emperor Himself' },
];

// Utility functions
export function getRankMultiplier(rank: number): number {
  return 1.0 + (rank - 1) * 0.15;
}

export function calculateOfflineEarnings(
  rank: number,
  timeAwayMs: number,
  baseRates: { credits: number; munitions: number; promethium: number }
): Resources {
  const multiplier = getRankMultiplier(rank);
  const hoursAway = timeAwayMs / (1000 * 60 * 60); // Convert milliseconds to hours
  
  // Formula: Base Rate × Rank Multiplier × Hours Away
  const credits = Math.floor(baseRates.credits * multiplier * hoursAway);
  const munitions = Math.floor(baseRates.munitions * multiplier * hoursAway);
  const promethium = Math.floor(baseRates.promethium * multiplier * hoursAway);
  const rawMaterials = Math.floor(credits * 0.5); // 50% of Credits generated
  
  return {
    credits,
    munitions,
    promethium,
    rawMaterials,
    imperialFavor: 0, // Only earned through combat (not implemented yet)
  };
}

// Helper functions
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generatePlanetName(): string {
  const prefixes = ['Krieg', 'Cadia', 'Valhalla', 'Catachan', 'Mordian', 'Tallarn', 'Vostroya', 'Armageddon'];
  const suffixes = ['Prime', 'Secundus', 'Tertius', 'IV', 'V', 'Alpha', 'Beta', 'Gamma'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return `${prefix} ${suffix}`;
}

// Initial state
const initialState: GameState = {
  player: null,
  planet: null,
  reinforcements: {}, // Empty object, reinforcements grouped by type
  resources: {
    credits: 0,
    munitions: 0,
    promethium: 0,
    rawMaterials: 0,
    imperialFavor: 0,
  },
  gameStarted: false,
  lastReinforcementTime: 0,
  sessionInfo: null,
};

// Redux slice
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<string>) => {
      const sessionId = action.payload;
      const now = Date.now();
      
      state.gameStarted = true;
      state.player = {
        id: generateId(),
        name: 'Imperial Commander',
        rank: 1,
        rankTitle: 'Recruit',
        experience: 0,
        arrivedAt: now,
      };
      state.planet = {
        id: generateId(),
        name: generatePlanetName(),
        discoveredAt: now,
      };
      state.lastReinforcementTime = now;
      state.sessionInfo = {
        sessionId,
        lastActiveTime: now,
        lastSaveTime: now,
      };
    },
    loadGame: (state, action: PayloadAction<GameState>) => {
      const loadedState = action.payload;
      state.player = loadedState.player;
      state.planet = loadedState.planet;
      // Handle migration from old array format to new grouped format
      if (Array.isArray(loadedState.reinforcements)) {
        // Migrate old format: convert array to grouped object
        state.reinforcements = {};
        (loadedState.reinforcements as any[]).forEach((reinforcement: any) => {
          if (reinforcement.type && reinforcement.unitCount) {
            state.reinforcements[reinforcement.type] = (state.reinforcements[reinforcement.type] || 0) + reinforcement.unitCount;
          }
        });
      } else {
        state.reinforcements = loadedState.reinforcements || {};
      }
      state.resources = loadedState.resources;
      state.gameStarted = loadedState.gameStarted;
      state.lastReinforcementTime = loadedState.lastReinforcementTime || Date.now();
      state.sessionInfo = loadedState.sessionInfo;
    },
    addOfflineEarnings: (state, action: PayloadAction<Resources>) => {
      state.resources.credits += action.payload.credits;
      state.resources.munitions += action.payload.munitions;
      state.resources.promethium += action.payload.promethium;
      state.resources.rawMaterials += action.payload.rawMaterials;
      state.resources.imperialFavor += action.payload.imperialFavor;
    },
    updateSession: (state) => {
      if (state.sessionInfo) {
        const now = Date.now();
        state.sessionInfo.lastActiveTime = now;
        state.sessionInfo.lastSaveTime = now;
      }
    },
    addReinforcement: (state) => {
      if (!state.gameStarted) return;
      
      const type = REINFORCEMENT_TYPES_EXPORT[Math.floor(Math.random() * REINFORCEMENT_TYPES_EXPORT.length)];
      const unitCount = Math.floor(Math.random() * 10) + 1;
      const now = Date.now();
      
      // Add to existing count or create new entry
      state.reinforcements[type] = (state.reinforcements[type] || 0) + unitCount;
      state.lastReinforcementTime = now;
    },
    resetGame: (state) => {
      state.player = null;
      state.planet = null;
      state.reinforcements = {};
      state.resources = {
        credits: 0,
        munitions: 0,
        promethium: 0,
        rawMaterials: 0,
        imperialFavor: 0,
      };
      state.gameStarted = false;
      state.lastReinforcementTime = 0;
      state.sessionInfo = null;
    },
  },
});

// Export reducer as default
export default gameSlice.reducer;

// Export actions
export const { startGame, loadGame, addOfflineEarnings, updateSession, addReinforcement, resetGame } = gameSlice.actions;
