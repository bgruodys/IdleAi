/** All masses and rates use SI: kilograms and kilograms per second. */

export interface Asteroid {
  id: string
  name: string
  /** Accessible ore remaining (kg). */
  remainingKg: number
  /** Original accessible ore at discovery (kg). */
  totalKg: number
}

export interface GameState {
  /** Stockpiled ore (kg). */
  oreKg: number
  /** Continuous mining throughput (kg/s). */
  miningRateKgPerS: number
  minerLevel: number
  asteroid: Asteroid
  /** Prospecting counter for naming successive fragments. */
  prospectIndex: number
}

export interface UpgradePreview {
  level: number
  costKg: number
  nextRateKgPerS: number
  affordable: boolean
}
