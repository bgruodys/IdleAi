import { Reinforcements } from '../store/gameSlice';

export interface ReinforcementByType {
  type: string;
  totalUnits: number;
}

/**
 * Convert reinforcements object to array format for display
 * Reinforcements are already grouped by type, so we just need to convert to array
 */
export function aggregateReinforcementsByType(reinforcements: Reinforcements): ReinforcementByType[] {
  return Object.entries(reinforcements)
    .map(([type, totalUnits]) => ({
      type,
      totalUnits,
    }))
    .sort((a, b) => a.type.localeCompare(b.type));
}

/**
 * Calculate total units across all reinforcements
 */
export function calculateTotalReinforcements(reinforcements: Reinforcements): number {
  return Object.values(reinforcements).reduce((total, count) => total + count, 0);
}

