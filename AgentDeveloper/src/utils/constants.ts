// Game constants
export const GAME_CONFIG = {
  BATTLEFIELD: {
    WIDTH: 100,
    HEIGHT: 100,
    CELL_SIZE: 6, // pixels per cell
    MAX_UNITS: 200,
  },
  
  TIMING: {
    REINFORCEMENT_INTERVAL: 60000, // 1 minute in milliseconds
    ASSAULT_INTERVAL: 3600000, // 1 hour in milliseconds
    GAME_TICK_RATE: 1000, // 1 second
    AUTO_SAVE_INTERVAL: 30000, // 30 seconds
  },
  
  RANKS: {
    MAX_RANK: 20,
    BASE_REQUIREMENT: 100,
    SCALING_FACTOR: 1.8,
  },
  
  UNITS: {
    BASE_REINFORCEMENTS: 5,
    REINFORCEMENTS_PER_RANK: 2,
    MAX_HEALTH: 100,
    BASE_ATTACK: 10,
    BASE_ARMOR: 5,
    BASE_SPEED: 1,
  },
  
  DISPLAY: {
    FPS_TARGET: 60,
    ANIMATION_DURATION: 300,
    TOAST_DURATION: 3000,
  },
} as const;

// Imperial rank names
export const IMPERIAL_RANKS = [
  'Trooper',
  'Lance Corporal', 
  'Corporal',
  'Sergeant',
  'Staff Sergeant',
  'Lieutenant',
  'Captain',
  'Major',
  'Lieutenant Colonel',
  'Colonel',
  'Brigadier',
  'Major General',
  'Lieutenant General',
  'General',
  'Marshal',
  'Lord Marshal',
  'Warmaster',
  'Lord Commander',
  'Lord General',
  'High Lord',
] as const;

// Unit type definitions
export const UNIT_TYPES = {
  GUARDSMAN: {
    name: 'Imperial Guardsman',
    baseStats: {
      maxHP: 25,
      attack: 8,
      armor: 2,
      speed: 1,
      range: 2,
      morale: 50,
    },
    cost: 0,
    description: 'Standard infantry of the Astra Militarum',
    sprite: 'guardsman',
    unlockRank: 1,
  },
  
  SERGEANT: {
    name: 'Sergeant',
    baseStats: {
      maxHP: 40,
      attack: 12,
      armor: 4,
      speed: 1,
      range: 2,
      morale: 70,
    },
    cost: 0,
    description: 'Experienced leader providing morale bonuses',
    sprite: 'sergeant',
    unlockRank: 3,
  },
  
  HEAVY_WEAPONS: {
    name: 'Heavy Weapons Team',
    baseStats: {
      maxHP: 35,
      attack: 20,
      armor: 3,
      speed: 1,
      range: 4,
      morale: 60,
    },
    cost: 0,
    description: 'Specialized anti-armor support',
    sprite: 'heavy_weapons',
    unlockRank: 6,
  },
  
  COMMISSAR: {
    name: 'Commissar',
    baseStats: {
      maxHP: 50,
      attack: 15,
      armor: 6,
      speed: 1,
      range: 3,
      morale: 100,
    },
    cost: 0,
    description: 'Political officer ensuring loyalty and discipline',
    sprite: 'commissar',
    unlockRank: 10,
  },
  
  OGRYN: {
    name: 'Ogryn',
    baseStats: {
      maxHP: 80,
      attack: 25,
      armor: 8,
      speed: 1,
      range: 1,
      morale: 80,
    },
    cost: 0,
    description: 'Massive abhuman shock troops',
    sprite: 'ogryn',
    unlockRank: 15,
  },
  
  SPACE_MARINE: {
    name: 'Space Marine',
    baseStats: {
      maxHP: 100,
      attack: 30,
      armor: 12,
      speed: 2,
      range: 3,
      morale: 100,
    },
    cost: 0,
    description: 'The Emperor\'s finest warriors',
    sprite: 'space_marine',
    unlockRank: 20,
  },
} as const;

// Enemy factions and types
export const ENEMY_TYPES = {
  // Ork faction
  ORK_BOY: {
    name: 'Ork Boy',
    faction: 'ork',
    stats: { maxHP: 30, attack: 10, armor: 3, speed: 1, range: 1 },
    rankPoints: 1,
    spawnWeight: 50,
  },
  
  ORK_NOB: {
    name: 'Ork Nob',
    faction: 'ork',
    stats: { maxHP: 60, attack: 18, armor: 6, speed: 1, range: 1 },
    rankPoints: 3,
    spawnWeight: 20,
  },
  
  // Chaos faction
  CHAOS_CULTIST: {
    name: 'Chaos Cultist',
    faction: 'chaos',
    stats: { maxHP: 20, attack: 8, armor: 1, speed: 1, range: 2 },
    rankPoints: 1,
    spawnWeight: 45,
  },
  
  CHAOS_MARINE: {
    name: 'Chaos Space Marine',
    faction: 'chaos',
    stats: { maxHP: 90, attack: 25, armor: 10, speed: 2, range: 3 },
    rankPoints: 5,
    spawnWeight: 10,
  },
  
  // Tyranid faction
  GENESTEALER: {
    name: 'Genestealer',
    faction: 'tyranid',
    stats: { maxHP: 25, attack: 15, armor: 2, speed: 3, range: 1 },
    rankPoints: 2,
    spawnWeight: 30,
  },
  
  TYRANID_WARRIOR: {
    name: 'Tyranid Warrior',
    faction: 'tyranid',
    stats: { maxHP: 70, attack: 20, armor: 8, speed: 2, range: 3 },
    rankPoints: 4,
    spawnWeight: 15,
  },
} as const;

// UI Colors for different contexts
export const UI_COLORS = {
  FACTIONS: {
    imperial: '#DAA520', // Imperial Gold
    chaos: '#8B0000',    // Deep Red
    ork: '#228B22',      // Success Green
    tyranid: '#4B0082',  // Indigo
  },
  
  UNIT_STATUS: {
    idle: '#6B7280',     // Gray
    moving: '#3B82F6',   // Blue
    combat: '#EF4444',   // Red
    dead: '#1F2937',     // Dark Gray
  },
  
  ALERTS: {
    low: '#10B981',      // Green
    medium: '#F59E0B',   // Amber
    high: '#EF4444',     // Red
    critical: '#DC2626', // Dark Red
  },
} as const;

// Audio settings
export const AUDIO_CONFIG = {
  MASTER_VOLUME: 0.7,
  SFX_VOLUME: 0.8,
  MUSIC_VOLUME: 0.6,
  
  SOUNDS: {
    UNIT_SPAWN: 'unit_spawn.wav',
    UNIT_DEATH: 'unit_death.wav',
    COMBAT_HIT: 'combat_hit.wav',
    RANK_UP: 'rank_up.wav',
    REINFORCEMENTS: 'reinforcements.wav',
    ASSAULT_WARNING: 'assault_warning.wav',
    VICTORY: 'victory.wav',
    DEFEAT: 'defeat.wav',
  },
} as const;
