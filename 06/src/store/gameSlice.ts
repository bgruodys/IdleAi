import { createSlice } from '@reduxjs/toolkit';

export interface Player {
  id: string;
  name: string;
  rank: number;
  rankTitle: string;
  arrivedAt: number; // timestamp
}

export interface Reinforcement {
  id: string;
  type: string;
  unitCount: number;
  arrivedAt: number; // timestamp
}

export interface Planet {
  id: string;
  name: string;
  discoveredAt: number; // timestamp
}

export interface Resources {
  credits: number;
  munitions: number;
  promethium: number;
  rawMaterials: number;
  imperialFavor: number;
}

export interface SessionInfo {
  sessionId: string;
  lastActiveTime: number;
  lastSaveTime: number;
}

export interface GameState {
  player: Player | null;
  planet: Planet | null;
  reinforcements: Reinforcement[];
  resources: Resources;
  gameStarted: boolean;
  lastReinforcementTime: number;
  sessionInfo: SessionInfo | null;
}

const initialResources: Resources = {
  credits: 0,
  munitions: 0,
  promethium: 0,
  rawMaterials: 0,
  imperialFavor: 0,
};

const initialState: GameState = {
  player: null,
  planet: null,
  reinforcements: [],
  resources: initialResources,
  gameStarted: false,
  lastReinforcementTime: 0,
  sessionInfo: null,
};

const RANK_TITLES = [
  'Recruit',
  'Guardsman',
  'Veteran Guardsman',
  'Sergeant',
  'Lieutenant',
  'Captain',
  'Major',
  'Colonel',
  'General',
  'Lord General',
];

const REINFORCEMENT_TYPES = [
  'Imperial Guardsmen',
  'Heavy Weapons Team',
  'Scout Squad',
  'Veteran Squad',
  'Armored Support',
];

const PLANET_NAMES = [
  'Xenon Prime',
  'Deathwatch Outpost',
  'Forbidden Sector 7',
  'Emperor\'s Reach',
  'Unknown Frontier',
];

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateReinforcement(): Reinforcement {
  return {
    id: generateId(),
    type: getRandomElement(REINFORCEMENT_TYPES),
    unitCount: Math.floor(Math.random() * 10) + 1,
    arrivedAt: Date.now(),
  };
}

function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getRankMultiplier(rank: number): number {
  const multipliers = [1.0, 1.2, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0, 7.0, 10.0];
  return multipliers[Math.min(rank - 1, multipliers.length - 1)] || 1.0;
}

function calculateOfflineEarnings(
  rank: number,
  timeAwayMs: number,
  baseRates: { credits: number; munitions: number; promethium: number }
): Resources {
  const multiplier = getRankMultiplier(rank);
  const hoursAway = timeAwayMs / (1000 * 60 * 60);
  
  return {
    credits: Math.floor(baseRates.credits * multiplier * hoursAway),
    munitions: Math.floor(baseRates.munitions * multiplier * hoursAway),
    promethium: Math.floor(baseRates.promethium * multiplier * hoursAway),
    rawMaterials: Math.floor((baseRates.credits * multiplier * hoursAway) * 0.5),
    imperialFavor: 0, // Only earned through combat
  };
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: {
      reducer: (state, action: { payload: { sessionId?: string } }) => {
        const now = Date.now();
        const planetName = getRandomElement(PLANET_NAMES);
        const sessionId = action.payload.sessionId || generateSessionId();
        
        state.gameStarted = true;
        state.planet = {
          id: generateId(),
          name: planetName,
          discoveredAt: now,
        };
        state.player = {
          id: generateId(),
          name: 'Imperial Commander',
          rank: 1,
          rankTitle: RANK_TITLES[0],
          arrivedAt: now,
        };
        state.lastReinforcementTime = now;
        state.resources = { ...initialResources };
        state.sessionInfo = {
          sessionId,
          lastActiveTime: now,
          lastSaveTime: now,
        };
      },
      prepare: (sessionId?: string) => ({
        payload: { sessionId },
      }),
    },
    addReinforcement: (state) => {
      const now = Date.now();
      const reinforcement = generateReinforcement();
      state.reinforcements.push(reinforcement);
      state.lastReinforcementTime = now;
      if (state.sessionInfo) {
        state.sessionInfo.lastActiveTime = now;
      }
    },
    loadGame: (_state, action: { payload: GameState }) => {
      return action.payload;
    },
    updateSession: (state) => {
      if (state.sessionInfo) {
        const now = Date.now();
        state.sessionInfo.lastActiveTime = now;
        state.sessionInfo.lastSaveTime = now;
      }
    },
    addOfflineEarnings: (state, action: { payload: Resources }) => {
      state.resources.credits += action.payload.credits;
      state.resources.munitions += action.payload.munitions;
      state.resources.promethium += action.payload.promethium;
      state.resources.rawMaterials += action.payload.rawMaterials;
      state.resources.imperialFavor += action.payload.imperialFavor;
    },
    resetGame: () => {
      return initialState;
    },
  },
});

export const { 
  startGame, 
  addReinforcement, 
  loadGame, 
  updateSession, 
  addOfflineEarnings, 
  resetGame 
} = gameSlice.actions;

export { calculateOfflineEarnings, getRankMultiplier, generateSessionId };
export default gameSlice.reducer;

