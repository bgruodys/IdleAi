import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addOfflineEarnings, getRankMultiplier, Resources } from '../store/gameSlice';

const RESOURCE_INTERVAL = 60000; // 60 seconds

// Base rates per hour at Rank 1
const BASE_RATES_PER_HOUR = {
  credits: 100,
  munitions: 50,
  promethium: 25,
  rawMaterials: 50, // 50% of Credits
};

/**
 * Calculate resources generated per 60-second cycle
 * Formula: Base Rate × Rank Multiplier × (60 seconds / 3600 seconds)
 */
function calculateResourcesPerCycle(rank: number): Resources {
  const multiplier = getRankMultiplier(rank);
  const cycleMultiplier = 60 / 3600; // 60 seconds / 3600 seconds = 1/60
  
  return {
    credits: Math.floor(BASE_RATES_PER_HOUR.credits * multiplier * cycleMultiplier),
    munitions: Math.floor(BASE_RATES_PER_HOUR.munitions * multiplier * cycleMultiplier),
    promethium: Math.floor(BASE_RATES_PER_HOUR.promethium * multiplier * cycleMultiplier),
    rawMaterials: Math.floor(BASE_RATES_PER_HOUR.rawMaterials * multiplier * cycleMultiplier),
    imperialFavor: 0, // Only earned through combat (not implemented yet)
  };
}

export function useResourceTimer(gameStarted: boolean) {
  const dispatch = useAppDispatch();
  const player = useAppSelector((state) => state.game.player);
  const playerRankRef = useRef<number>(player?.rank || 1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Update player rank ref whenever player changes
  useEffect(() => {
    if (player) {
      playerRankRef.current = player.rank;
    }
  }, [player]);

  useEffect(() => {
    if (!gameStarted || !player) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Generate resources immediately on start
    const resources = calculateResourcesPerCycle(player.rank);
    dispatch(addOfflineEarnings(resources));

    // Set up interval for subsequent resource generation
    intervalRef.current = setInterval(() => {
      // Use the ref to get the current rank (which updates when player changes)
      const cycleResources = calculateResourcesPerCycle(playerRankRef.current);
      dispatch(addOfflineEarnings(cycleResources));
    }, RESOURCE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [gameStarted, player, dispatch]);
}
