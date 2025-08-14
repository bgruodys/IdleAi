/**
 * @fileoverview Mathematical utilities for IdleWarhammer40k
 * @author AI Assistant
 * @version 1.0.0
 */

/**
 * Generate a random integer between min and max (inclusive)
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random integer
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random float between min and max
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random float
 */
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Calculate damage between two units
 * @param attacker - Attacking unit
 * @param defender - Defending unit
 * @param criticalHitChance - Chance of critical hit (0-1)
 * @param criticalHitMultiplier - Damage multiplier for critical hits
 * @returns Damage calculation result
 */
export function calculateDamage(
  attackerAttack: number,
  defenderDefense: number,
  criticalHitChance: number = 0.1,
  criticalHitMultiplier: number = 2.0
): { damage: number; isCritical: boolean } {
  const isCritical = Math.random() < criticalHitChance;
  // Make combat more lethal - defense reduces damage less
  const baseDamage = Math.max(8, attackerAttack - defenderDefense * 0.2);
  const damage = isCritical ? baseDamage * criticalHitMultiplier : baseDamage;
  
  return {
    damage: Math.floor(damage),
    isCritical
  };
}

/**
 * Calculate distance between two positions
 * @param pos1 - First position
 * @param pos2 - Second position
 * @returns Distance
 */
export function calculateDistance(pos1: { x: number; y: number }, pos2: { x: number; y: number }): number {
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Check if two positions are within range
 * @param pos1 - First position
 * @param pos2 - Second position
 * @param range - Maximum range
 * @returns True if within range
 */
export function isWithinRange(
  pos1: { x: number; y: number },
  pos2: { x: number; y: number },
  range: number
): boolean {
  return calculateDistance(pos1, pos2) <= range;
}

/**
 * Clamp a value between min and max
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values
 * @param start - Start value
 * @param end - End value
 * @param t - Interpolation factor (0-1)
 * @returns Interpolated value
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Generate a unique ID
 * @returns Unique ID string
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Calculate experience required for next level
 * @param currentLevel - Current level
 * @returns Experience required for next level
 */
export function getExperienceForLevel(currentLevel: number): number {
  return Math.floor(100 * Math.pow(1.5, currentLevel - 1));
}

/**
 * Calculate level from total experience
 * @param totalExperience - Total experience points
 * @returns Current level
 */
export function getLevelFromExperience(totalExperience: number): number {
  let level = 1;
  let experienceNeeded = 0;
  
  while (totalExperience >= experienceNeeded) {
    experienceNeeded += getExperienceForLevel(level);
    level++;
  }
  
  return level - 1;
} 