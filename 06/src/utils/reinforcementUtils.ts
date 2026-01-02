import { Reinforcement } from '../store/gameSlice';

export interface ReinforcementByType {
  type: string;
  totalUnits: number;
  firstArrival: number; // timestamp of first arrival
  lastArrival: number; // timestamp of last arrival
}

/**
 * Aggregate reinforcements by type and calculate totals
 */
export function aggregateReinforcementsByType(reinforcements: Reinforcement[]): ReinforcementByType[] {
  const aggregated = new Map<string, ReinforcementByType>();

  reinforcements.forEach((reinforcement) => {
    const existing = aggregated.get(reinforcement.type);
    
    if (existing) {
      existing.totalUnits += reinforcement.unitCount;
      existing.firstArrival = Math.min(existing.firstArrival, reinforcement.arrivedAt);
      existing.lastArrival = Math.max(existing.lastArrival, reinforcement.arrivedAt);
    } else {
      aggregated.set(reinforcement.type, {
        type: reinforcement.type,
        totalUnits: reinforcement.unitCount,
        firstArrival: reinforcement.arrivedAt,
        lastArrival: reinforcement.arrivedAt,
      });
    }
  });

  // Convert to array and sort by type name
  return Array.from(aggregated.values()).sort((a, b) => a.type.localeCompare(b.type));
}

/**
 * Calculate total units across all reinforcements
 */
export function calculateTotalReinforcements(reinforcements: Reinforcement[]): number {
  return reinforcements.reduce((total, reinforcement) => total + reinforcement.unitCount, 0);
}

