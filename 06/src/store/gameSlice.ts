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
  // Combat Units
  'Imperial Guardsman',
  'Heavy Weapons Specialist',
  'Sniper',
  'Commissar',
  'Stormtrooper',
  'Veteran Guardsman',
  'Scout',
  'Forward Scout',
  'Reconnaissance Scout',
  'Pathfinder',
  'Stealth Scout',
  'Urban Scout',
  'Desert Scout',
  'Jungle Scout',
  'Arctic Scout',
  'Mountain Scout',
  'Combat Scout',
  'Elite Scout',
  'Veteran Scout',
  'Scout Sniper',
  'Scout Marksman',
  'Scout Observer',
  'Scout Infiltrator',
  'Scout Saboteur',
  'Grenadier',
  'Flamer Specialist',
  'Plasma Gunner',
  'Melta Gunner',
  'Lasgun Trooper',
  'Autogun Trooper',
  'Shotgun Trooper',
  'Bayonet Fighter',
  'Close Combat Specialist',
  'Sergeant',
  'Corporal',
  'Officer',
  'Tank Commander',
  'Artillery Crewman',
  'Mortar Operator',
  'Missile Launcher Operator',
  'Heavy Bolter Gunner',
  'Lascannon Operator',
  'Autocannon Gunner',
  'Ratling Sniper',
  'Ogryn',
  'Bullgryn',
  'Rough Rider',
  'Cavalry Trooper',
  'Valkyrie Pilot',
  'Valkyrie Gunner',
  'Chimera Driver',
  'Leman Russ Driver',
  'Baneblade Crewman',
  'Sentinel Pilot',
  'Basilisk Crewman',
  'Manticore Operator',
  'Hydra Gunner',
  
  // Medical Personnel
  'Medicae',
  'Field Surgeon',
  'Apothecary',
  'Field Medic',
  'Combat Medic',
  'Trauma Surgeon',
  'Biologis Medicae',
  'Sanctioned Psyker Healer',
  'Medical Orderly',
  'Pharmaceutical Specialist',
  
  // Scientists & Researchers
  'Tech-Priest',
  'Biologis',
  'Chemist',
  'Researcher',
  'Xenobiologist',
  'Archaeologist',
  'Analyst',
  'Data Specialist',
  'Laboratory Technician',
  'Research Assistant',
  'Xenologist',
  'Genetor',
  'Magos Biologis',
  'Magos Physic',
  'Explorator',
  'Archmagos',
  
  // Engineers & Technicians
  'Enginseer',
  'Mechanic',
  'Technician',
  'Maintenance Worker',
  'Vehicle Mechanic',
  'Weaponsmith',
  'Armorer',
  'Munitions Specialist',
  'Explosives Expert',
  'Construction Engineer',
  'Structural Engineer',
  'Electrical Engineer',
  'Plasma Engineer',
  'Generator Technician',
  'Communications Technician',
  'Tech-Adept',
  'Servitor',
  'Cybernetics Specialist',
  
  // Workers & Laborers
  'Laborer',
  'Miner',
  'Construction Worker',
  'Factory Worker',
  'Refinery Worker',
  'Quarry Worker',
  'Lumberjack',
  'Farmer',
  'Harvester',
  'Cargo Loader',
  'Dock Worker',
  'Warehouse Worker',
  'Smelter',
  'Forge Worker',
  'Assembly Worker',
  'Quality Inspector',
  
  // Administrators & Support
  'Clerk',
  'Administrator',
  'Quartermaster',
  'Supply Officer',
  'Logistics Coordinator',
  'Records Keeper',
  'Accountant',
  'Scribe',
  'Archivist',
  'Messenger',
  'Courier',
  'Cook',
  'Chef',
  'Supply Clerk',
  'Inventory Manager',
  
  // Specialists
  'Navigator',
  'Astropath',
  'Sanctioned Psyker',
  'Interrogator',
  'Inquisitorial Acolyte',
  'Adept Arbites',
  'Enforcer',
  'Scout Driver',
  'Pilot',
  'Co-Pilot',
  'Gunner',
  'Communications Officer',
  'Intelligence Officer',
  'Interpreter',
  'Diplomat',
];

export interface RankData {
  rank: number;
  title: string;
  experienceRequired: number;
  multiplier: number;
  description: string;
}

export const RANK_DATA_EXPORT: RankData[] = [
  // Entry Level (Ranks 1-10) - Very low XP requirements for frequent early progression
  { rank: 1, title: 'Recruit', experienceRequired: 0, multiplier: 1.00, description: 'Fresh from the training grounds' },
  { rank: 2, title: 'Trainee', experienceRequired: 5, multiplier: 1.15, description: 'Learning the basics of Imperial service' },
  { rank: 3, title: 'Cadet', experienceRequired: 12, multiplier: 1.30, description: 'Completed initial training phase' },
  { rank: 4, title: 'Private', experienceRequired: 25, multiplier: 1.45, description: 'First assignment to active duty' },
  { rank: 5, title: 'Guardsman', experienceRequired: 45, multiplier: 1.60, description: 'Proven yourself in basic combat' },
  { rank: 6, title: 'Experienced Guardsman', experienceRequired: 75, multiplier: 1.75, description: 'Survived your first engagements' },
  { rank: 7, title: 'Battle-Tested Guardsman', experienceRequired: 115, multiplier: 1.90, description: 'Multiple successful missions completed' },
  { rank: 8, title: 'Veteran Guardsman', experienceRequired: 170, multiplier: 2.05, description: 'Experienced in planetary warfare' },
  { rank: 9, title: 'Hardened Guardsman', experienceRequired: 240, multiplier: 2.20, description: 'Seen combat across multiple battlefields' },
  { rank: 10, title: 'Elite Guardsman', experienceRequired: 330, multiplier: 2.35, description: 'Among the finest rank-and-file soldiers' },
  
  // Junior NCO (Ranks 11-20) - Leadership begins
  { rank: 11, title: 'Lance Corporal', experienceRequired: 440, multiplier: 2.50, description: 'First step into leadership responsibilities' },
  { rank: 12, title: 'Corporal', experienceRequired: 580, multiplier: 2.65, description: 'Leading small fire teams' },
  { rank: 13, title: 'Senior Corporal', experienceRequired: 750, multiplier: 2.80, description: 'Proven leadership in combat' },
  { rank: 14, title: 'Acting Sergeant', experienceRequired: 960, multiplier: 2.95, description: 'Temporary squad leadership' },
  { rank: 15, title: 'Sergeant', experienceRequired: 1210, multiplier: 3.10, description: 'Leading small squads effectively' },
  { rank: 16, title: 'Sergeant First Class', experienceRequired: 1510, multiplier: 3.25, description: 'Senior squad leader' },
  { rank: 17, title: 'Staff Sergeant', experienceRequired: 1870, multiplier: 3.40, description: 'Senior non-commissioned officer' },
  { rank: 18, title: 'Gunnery Sergeant', experienceRequired: 2300, multiplier: 3.55, description: 'Specialized weapons and tactics expert' },
  { rank: 19, title: 'Master Sergeant', experienceRequired: 2810, multiplier: 3.70, description: 'Elite squad leadership' },
  { rank: 20, title: 'First Sergeant', experienceRequired: 3410, multiplier: 3.85, description: 'Company-level senior NCO' },
  
  // Senior NCO (Ranks 21-30) - High-level enlisted leadership
  { rank: 21, title: 'Sergeant Major', experienceRequired: 4110, multiplier: 4.00, description: 'Highest enlisted rank' },
  { rank: 22, title: 'Command Sergeant Major', experienceRequired: 4930, multiplier: 4.15, description: 'Battalion-level senior enlisted advisor' },
  { rank: 23, title: 'Regimental Sergeant Major', experienceRequired: 5880, multiplier: 4.30, description: 'Regiment-level senior enlisted' },
  { rank: 24, title: 'Warrant Officer', experienceRequired: 6980, multiplier: 4.45, description: 'Specialized technical expertise' },
  { rank: 25, title: 'Chief Warrant Officer', experienceRequired: 8250, multiplier: 4.60, description: 'Master of specialized fields' },
  { rank: 26, title: 'Senior Chief Warrant Officer', experienceRequired: 9720, multiplier: 4.75, description: 'Elite technical specialist' },
  { rank: 27, title: 'Master Chief Warrant Officer', experienceRequired: 11420, multiplier: 4.90, description: 'Supreme technical authority' },
  { rank: 28, title: 'Second Lieutenant', experienceRequired: 13380, multiplier: 5.05, description: 'First commissioned officer rank' },
  { rank: 29, title: 'First Lieutenant', experienceRequired: 15630, multiplier: 5.20, description: 'Platoon command authority' },
  { rank: 30, title: 'Lieutenant', experienceRequired: 18200, multiplier: 5.35, description: 'Commanding platoon-level operations' },
  
  // Junior Officers (Ranks 31-40) - Commissioned officer ranks
  { rank: 31, title: 'Senior Lieutenant', experienceRequired: 21130, multiplier: 5.50, description: 'Experienced platoon commander' },
  { rank: 32, title: 'Captain', experienceRequired: 24460, multiplier: 5.65, description: 'Company command achieved' },
  { rank: 33, title: 'Senior Captain', experienceRequired: 28240, multiplier: 5.80, description: 'Veteran company commander' },
  { rank: 34, title: 'Major', experienceRequired: 32520, multiplier: 5.95, description: 'Battalion leadership achieved' },
  { rank: 35, title: 'Lieutenant Colonel', experienceRequired: 37360, multiplier: 6.10, description: 'Battalion command' },
  { rank: 36, title: 'Colonel', experienceRequired: 42820, multiplier: 6.25, description: 'Regimental command authority' },
  { rank: 37, title: 'Senior Colonel', experienceRequired: 48970, multiplier: 6.40, description: 'Elite regimental commander' },
  { rank: 38, title: 'Brigadier General', experienceRequired: 55880, multiplier: 6.55, description: 'Brigade command' },
  { rank: 39, title: 'Major General', experienceRequired: 63620, multiplier: 6.70, description: 'Division command' },
  { rank: 40, title: 'Lieutenant General', experienceRequired: 72270, multiplier: 6.85, description: 'Corps command' },
  
  // Senior Officers (Ranks 41-50) - High command
  { rank: 41, title: 'General', experienceRequired: 81920, multiplier: 7.00, description: 'Planetary theater command' },
  { rank: 42, title: 'Lord General', experienceRequired: 92660, multiplier: 7.15, description: "The Emperor's chosen commander" },
  { rank: 43, title: 'Warmaster', experienceRequired: 104600, multiplier: 7.30, description: 'Supreme military commander' },
  { rank: 44, title: 'High Marshal', experienceRequired: 118160, multiplier: 7.45, description: 'Master of multiple theaters' },
  { rank: 45, title: 'Grand Marshal', experienceRequired: 133380, multiplier: 7.60, description: 'Imperial military council member' },
  { rank: 46, title: 'Lord Marshal', experienceRequired: 150400, multiplier: 7.75, description: 'Sector-wide command authority' },
  { rank: 47, title: 'Imperial Marshal', experienceRequired: 169370, multiplier: 7.90, description: 'Regional command of multiple sectors' },
  { rank: 48, title: 'Supreme Marshal', experienceRequired: 190450, multiplier: 8.05, description: "One of the Emperor's finest" },
  { rank: 49, title: 'Marshal of the Imperium', experienceRequired: 213810, multiplier: 8.20, description: 'Legendary commander' },
  { rank: 50, title: "Emperor's Champion", experienceRequired: 239630, multiplier: 8.35, description: 'The ultimate honor, chosen by the Emperor Himself' },
];

// Utility functions
export function getRankMultiplier(rank: number): number {
  return 1.0 + (rank - 1) * 0.15;
}

/**
 * Determine if a unit type is an Infantry unit (should have higher weight)
 */
function isInfantryUnit(type: string): boolean {
  const lowerType = type.toLowerCase();
  return lowerType.includes('guardsman') || 
         lowerType.includes('trooper') || 
         lowerType.includes('grenadier') ||
         lowerType.includes('bayonet fighter') ||
         lowerType.includes('close combat specialist') ||
         (lowerType.includes('sniper') && !lowerType.includes('scout') && !lowerType.includes('ratling'));
}

/**
 * Determine if a unit type is a Scout unit (should have lower weight)
 */
function isScoutUnit(type: string): boolean {
  const lowerType = type.toLowerCase();
  return lowerType.includes('scout') || 
         lowerType.includes('pathfinder') || 
         lowerType.includes('observer') ||
         lowerType.includes('infiltrator') ||
         lowerType.includes('saboteur') ||
         lowerType.includes('reconnaissance');
}

/**
 * Get weighted random reinforcement type
 * Infantry units have 10x weight compared to scouts
 */
function getWeightedRandomType(availableTypes: string[]): string {
  // Build weighted array: Infantry = 10, Scouts = 1, Others = 1
  const weightedArray: string[] = [];
  
  for (const type of availableTypes) {
    if (isInfantryUnit(type)) {
      // Add infantry 10 times
      for (let i = 0; i < 10; i++) {
        weightedArray.push(type);
      }
    } else if (isScoutUnit(type)) {
      // Add scout once
      weightedArray.push(type);
    } else {
      // Add other units once
      weightedArray.push(type);
    }
  }
  
  // Randomly select from weighted array
  return weightedArray[Math.floor(Math.random() * weightedArray.length)];
}

/**
 * Get available reinforcement types based on player rank
 * Entry Level (Ranks 1-10): Only Imperial Guardsman and Scout
 * Higher ranks gradually unlock more types
 */
export function getAvailableReinforcementTypes(rank: number): string[] {
  // Entry Level (Ranks 1-10): Only basic units
  if (rank <= 10) {
    return ['Imperial Guardsman', 'Scout'];
  }
  
  // Junior NCO (Ranks 11-20): Add basic combat units and more scout types
  if (rank <= 20) {
    return [
      'Imperial Guardsman',
      'Scout',
      'Forward Scout',
      'Reconnaissance Scout',
      'Veteran Guardsman',
      'Lasgun Trooper',
      'Autogun Trooper',
      'Shotgun Trooper',
      'Grenadier',
      'Sniper',
      'Medicae',
      'Field Medic',
      'Laborer',
      'Miner',
      'Clerk',
    ];
  }
  
  // Senior NCO (Ranks 21-30): Add specialists and support units
  if (rank <= 30) {
    return [
      ...getAvailableReinforcementTypes(20), // Include previous tier
      'Heavy Weapons Specialist',
      'Flamer Specialist',
      'Plasma Gunner',
      'Melta Gunner',
      'Pathfinder',
      'Stealth Scout',
      'Urban Scout',
      'Desert Scout',
      'Jungle Scout',
      'Combat Scout',
      'Sergeant',
      'Corporal',
      'Field Surgeon',
      'Combat Medic',
      'Enginseer',
      'Mechanic',
      'Technician',
      'Construction Worker',
      'Factory Worker',
      'Administrator',
      'Quartermaster',
    ];
  }
  
  // Junior Officers (Ranks 31-40): Add elite units and vehicles
  if (rank <= 40) {
    return [
      ...getAvailableReinforcementTypes(30), // Include previous tier
      'Stormtrooper',
      'Commissar',
      'Elite Scout',
      'Veteran Scout',
      'Scout Sniper',
      'Scout Marksman',
      'Arctic Scout',
      'Mountain Scout',
      'Close Combat Specialist',
      'Officer',
      'Artillery Crewman',
      'Mortar Operator',
      'Heavy Bolter Gunner',
      'Lascannon Operator',
      'Apothecary',
      'Trauma Surgeon',
      'Tech-Priest',
      'Biologis',
      'Researcher',
      'Vehicle Mechanic',
      'Weaponsmith',
      'Armorer',
      'Refinery Worker',
      'Supply Officer',
      'Logistics Coordinator',
    ];
  }
  
  // Senior Officers (Ranks 41-50): All units available
  return REINFORCEMENT_TYPES_EXPORT;
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
      if (!state.gameStarted || !state.player) return;
      
      // Get available types based on rank
      const availableTypes = getAvailableReinforcementTypes(state.player.rank);
      // Use weighted random selection (Infantry 10x more likely than Scouts)
      const type = getWeightedRandomType(availableTypes);
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
