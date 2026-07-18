import type { Asteroid, GameState } from './types.ts'

/** Small NEA fragment: ~100 t of accessible metal-rich ore (soft-sci-fi scale). */
export const INITIAL_ASTEROID_KG = 100_000

/** Starting drill rate — slow enough to feel incremental, fast enough to see. */
export const BASE_MINING_RATE_KG_PER_S = 2

/** Ore cost for level n → n+1. */
export function upgradeCostKg(currentLevel: number): number {
  return Math.round(40 * Math.pow(1.55, currentLevel - 1))
}

/** Mining rate after purchasing the next level. */
export function rateAfterUpgrade(currentLevel: number): number {
  return BASE_MINING_RATE_KG_PER_S + currentLevel * 1.5
}

export function createAsteroid(prospectIndex: number, massKg = INITIAL_ASTEROID_KG): Asteroid {
  return {
    id: `prospect-${prospectIndex}`,
    name: `Prospect A-${prospectIndex}`,
    remainingKg: massKg,
    totalKg: massKg,
  }
}

export function createInitialState(): GameState {
  return {
    oreKg: 0,
    miningRateKgPerS: BASE_MINING_RATE_KG_PER_S,
    minerLevel: 1,
    prospectIndex: 1,
    asteroid: createAsteroid(1),
  }
}
