// Math utilities for game calculations

/**
 * Calculate rank requirement using exponential scaling
 */
export const calculateRankRequirement = (rank: number): number => {
  return Math.floor(100 * Math.pow(1.8, rank - 1));
};

/**
 * Calculate reinforcements based on rank
 */
export const calculateReinforcementsPerMinute = (rank: number): number => {
  return 5 + (rank * 2);
};

/**
 * Calculate unit stats based on rank and base stats
 */
export const scaleUnitStats = (baseStats: any, rankLevel: number) => {
  return {
    maxHP: Math.floor(baseStats.maxHP * (1 + rankLevel * 0.1)),
    currentHP: Math.floor(baseStats.maxHP * (1 + rankLevel * 0.1)),
    attack: Math.floor(baseStats.attack * (1 + rankLevel * 0.08)),
    armor: baseStats.armor + Math.floor(rankLevel / 3),
    speed: baseStats.speed, // Speed remains constant
    range: baseStats.range,
    morale: Math.min(100, baseStats.morale + rankLevel * 2),
  };
};

/**
 * Calculate combat damage between two units
 */
export const calculateDamage = (attacker: any, defender: any): number => {
  const baseDamage = attacker.stats.attack;
  const armor = defender.stats.armor;
  const randomFactor = 0.8 + Math.random() * 0.4; // ±20% variance
  
  const damage = Math.max(1, Math.floor((baseDamage - armor) * randomFactor));
  return damage;
};

/**
 * Calculate distance between two positions
 */
export const calculateDistance = (pos1: { x: number; y: number }, pos2: { x: number; y: number }): number => {
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Calculate Manhattan distance (for grid-based movement)
 */
export const calculateManhattanDistance = (pos1: { x: number; y: number }, pos2: { x: number; y: number }): number => {
  return Math.abs(pos2.x - pos1.x) + Math.abs(pos2.y - pos1.y);
};

/**
 * Clamp a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Linear interpolation between two values
 */
export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * clamp(factor, 0, 1);
};

/**
 * Generate a random integer between min and max (inclusive)
 */
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generate a random float between min and max
 */
export const randomFloat = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Calculate percentage between current and max values
 */
export const calculatePercentage = (current: number, max: number): number => {
  if (max === 0) return 0;
  return (current / max) * 100;
};

/**
 * Round number to specified decimal places
 */
export const roundTo = (number: number, decimals: number): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(number * factor) / factor;
};

/**
 * Check if a point is within a rectangle
 */
export const isPointInRectangle = (
  point: { x: number; y: number },
  rect: { x: number; y: number; width: number; height: number }
): boolean => {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  );
};

/**
 * Get random element from array
 */
export const randomFromArray = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Weighted random selection from array
 */
export const weightedRandom = <T>(items: T[], weights: number[]): T => {
  if (items.length !== weights.length) {
    throw new Error('Items and weights arrays must have the same length');
  }
  
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return items[i];
    }
  }
  
  return items[items.length - 1];
};

/**
 * Convert milliseconds to human-readable time format
 */
export const formatTime = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  } else {
    return `${minutes.toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  }
};

/**
 * Format large numbers with appropriate suffixes
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
};

/**
 * Generate UUID v4
 */
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
