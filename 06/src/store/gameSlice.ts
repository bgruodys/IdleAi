import { createSlice } from '@reduxjs/toolkit';

export interface Player {
  id: string;
  name: string;
  rank: number;
  rankTitle: string;
  experience: number; // total experience points
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

export interface RankInfo {
  rank: number;
  title: string;
  requiredExperience: number;
  description: string;
}

const RANK_DATA: RankInfo[] = [
  { rank: 1, title: 'Recruit', requiredExperience: 0, description: 'Fresh from the training grounds' },
  { rank: 2, title: 'Guardsman', requiredExperience: 100, description: 'Proven yourself in basic combat' },
  { rank: 3, title: 'Veteran Guardsman', requiredExperience: 250, description: 'Experienced in planetary warfare' },
  { rank: 4, title: 'Corporal', requiredExperience: 500, description: 'First step into leadership' },
  { rank: 5, title: 'Sergeant', requiredExperience: 1000, description: 'Leading small squads effectively' },
  { rank: 6, title: 'Staff Sergeant', requiredExperience: 1750, description: 'Senior non-commissioned officer' },
  { rank: 7, title: 'Master Sergeant', requiredExperience: 2750, description: 'Elite squad leadership' },
  { rank: 8, title: 'Sergeant Major', requiredExperience: 4000, description: 'Highest enlisted rank' },
  { rank: 9, title: 'Warrant Officer', requiredExperience: 5500, description: 'Specialized technical expertise' },
  { rank: 10, title: 'Chief Warrant Officer', requiredExperience: 7500, description: 'Master of specialized fields' },
  { rank: 11, title: 'Second Lieutenant', requiredExperience: 10000, description: 'First commissioned officer rank' },
  { rank: 12, title: 'Lieutenant', requiredExperience: 13500, description: 'Commanding platoon-level operations' },
  { rank: 13, title: 'First Lieutenant', requiredExperience: 18000, description: 'Senior platoon commander' },
  { rank: 14, title: 'Captain', requiredExperience: 24000, description: 'Battalion leadership achieved' },
  { rank: 15, title: 'Major', requiredExperience: 32000, description: 'Regimental command authority' },
  { rank: 16, title: 'Lieutenant Colonel', requiredExperience: 42000, description: 'Battalion command' },
  { rank: 17, title: 'Colonel', requiredExperience: 55000, description: 'Brigade-level strategic planning' },
  { rank: 18, title: 'Brigadier General', requiredExperience: 72000, description: 'Brigade command' },
  { rank: 19, title: 'Major General', requiredExperience: 95000, description: 'Division command' },
  { rank: 20, title: 'Lieutenant General', requiredExperience: 125000, description: 'Corps command' },
  { rank: 21, title: 'General', requiredExperience: 165000, description: 'Planetary theater command' },
  { rank: 22, title: 'Lord General', requiredExperience: 220000, description: 'The Emperor\'s chosen commander' },
  { rank: 23, title: 'Warmaster', requiredExperience: 300000, description: 'Supreme military commander' },
  { rank: 24, title: 'High Marshal', requiredExperience: 400000, description: 'Master of multiple theaters' },
  { rank: 25, title: 'Grand Marshal', requiredExperience: 550000, description: 'Imperial military council member' },
  { rank: 26, title: 'Lord Marshal', requiredExperience: 750000, description: 'Sector-wide command authority' },
  { rank: 27, title: 'Imperial Marshal', requiredExperience: 1000000, description: 'Regional command of multiple sectors' },
  { rank: 28, title: 'Supreme Marshal', requiredExperience: 1350000, description: 'One of the Emperor\'s finest' },
  { rank: 29, title: 'Marshal of the Imperium', requiredExperience: 1800000, description: 'Legendary commander' },
  { rank: 30, title: 'Emperor\'s Champion', requiredExperience: 2500000, description: 'The ultimate honor, chosen by the Emperor Himself' },
];

const RANK_TITLES = RANK_DATA.map(r => r.title);

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

/**
 * Get rank multiplier based on rank number (for resource generation)
 * Uses logarithmic scaling for smoother progression
 */
function getRankMultiplier(rank: number): number {
  if (rank <= 1) return 1.0;
  // Logarithmic scaling: base multiplier increases with rank
  return Math.max(1.0, 1.0 + (rank - 1) * 0.15);
}

/**
 * Get rank information by rank number
 */
function getRankInfo(rank: number): RankInfo | null {
  return RANK_DATA.find(r => r.rank === rank) || null;
}

/**
 * Get rank information by experience points
 */
function getRankByExperience(experience: number): RankInfo {
  // Find the highest rank the player qualifies for
  for (let i = RANK_DATA.length - 1; i >= 0; i--) {
    if (experience >= RANK_DATA[i].requiredExperience) {
      return RANK_DATA[i];
    }
  }
  return RANK_DATA[0]; // Default to rank 1
}

/**
 * Calculate experience needed for next rank
 */
function getExperienceToNextRank(currentRank: number): number | null {
  const nextRank = RANK_DATA.find(r => r.rank === currentRank + 1);
  if (!nextRank) return null; // Already at max rank
  const currentRankInfo = getRankInfo(currentRank);
  if (!currentRankInfo) return null;
  return nextRank.requiredExperience - currentRankInfo.requiredExperience;
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
        const initialRank = getRankByExperience(0);
        state.player = {
          id: generateId(),
          name: 'Imperial Commander',
          rank: initialRank.rank,
          rankTitle: initialRank.title,
          experience: 0,
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

export { 
  calculateOfflineEarnings, 
  getRankMultiplier, 
  generateSessionId,
  getRankInfo,
  getRankByExperience,
  getExperienceToNextRank
};
export const RANK_DATA_EXPORT = RANK_DATA;
export const RANK_TITLES_EXPORT = RANK_TITLES;
export const REINFORCEMENT_TYPES_EXPORT = REINFORCEMENT_TYPES;
export default gameSlice.reducer;

