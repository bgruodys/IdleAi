import { GameState, calculateOfflineEarnings, Resources } from '../store/gameSlice';

const BASE_RATES = {
  credits: 100,
  munitions: 50,
  promethium: 25,
};

/**
 * Calculate offline earnings based on time away and player rank
 */
export function calculateOfflineEarningsForState(
  savedState: GameState,
  currentTime: number
): Resources {
  if (!savedState.player || !savedState.sessionInfo) {
    return {
      credits: 0,
      munitions: 0,
      promethium: 0,
      rawMaterials: 0,
      imperialFavor: 0,
    };
  }

  const timeAway = currentTime - savedState.sessionInfo.lastActiveTime;
  
  // Only calculate if player was away for at least 1 minute
  const MIN_OFFLINE_TIME = 60 * 1000;
  if (timeAway < MIN_OFFLINE_TIME) {
    return {
      credits: 0,
      munitions: 0,
      promethium: 0,
      rawMaterials: 0,
      imperialFavor: 0,
    };
  }

  return calculateOfflineEarnings(savedState.player.rank, timeAway, BASE_RATES);
}

/**
 * Calculate how many reinforcements should have arrived offline
 */
export function calculateOfflineReinforcements(
  lastReinforcementTime: number,
  currentTime: number
): number {
  const REINFORCEMENT_INTERVAL = 5000; // 5 seconds
  const timeAway = currentTime - lastReinforcementTime;
  
  if (timeAway < REINFORCEMENT_INTERVAL) {
    return 0;
  }
  
  return Math.floor(timeAway / REINFORCEMENT_INTERVAL);
}

