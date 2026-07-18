import { createAsteroid, rateAfterUpgrade, upgradeCostKg } from './state.ts'
import type { GameState, UpgradePreview } from './types.ts'

/**
 * Advance simulation by `dtSeconds` of game time.
 * Conserves mass: ore mined equals mass removed from the asteroid.
 */
export function tick(state: GameState, dtSeconds: number): GameState {
  if (dtSeconds <= 0 || state.miningRateKgPerS <= 0) {
    return state
  }

  let remaining = state.asteroid.remainingKg
  let oreKg = state.oreKg
  let prospectIndex = state.prospectIndex
  let asteroid = state.asteroid

  let timeLeft = dtSeconds
  while (timeLeft > 0) {
    if (remaining <= 0) {
      prospectIndex += 1
      asteroid = createAsteroid(prospectIndex)
      remaining = asteroid.remainingKg
    }

    const mined = Math.min(state.miningRateKgPerS * timeLeft, remaining)
    if (mined <= 0) {
      break
    }

    remaining -= mined
    oreKg += mined
    timeLeft -= mined / state.miningRateKgPerS
  }

  return {
    ...state,
    oreKg,
    prospectIndex,
    asteroid: {
      ...asteroid,
      remainingKg: remaining,
    },
  }
}

export function previewUpgrade(state: GameState): UpgradePreview {
  const costKg = upgradeCostKg(state.minerLevel)
  return {
    level: state.minerLevel + 1,
    costKg,
    nextRateKgPerS: rateAfterUpgrade(state.minerLevel),
    affordable: state.oreKg >= costKg,
  }
}

export function buyUpgrade(state: GameState): GameState {
  const preview = previewUpgrade(state)
  if (!preview.affordable) {
    return state
  }

  return {
    ...state,
    oreKg: state.oreKg - preview.costKg,
    minerLevel: preview.level,
    miningRateKgPerS: preview.nextRateKgPerS,
  }
}
