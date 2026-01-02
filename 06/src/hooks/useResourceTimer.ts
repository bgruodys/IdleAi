import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addOfflineEarnings, getRankMultiplier } from '../store/gameSlice';

const RESOURCE_INTERVAL = 60000; // 60 seconds (1 minute)
const BASE_RATES = {
  credits: 100,
  munitions: 50,
  promethium: 25,
};

/**
 * Hook to generate resources periodically based on player rank
 */
export function useResourceTimer(gameStarted: boolean) {
  const dispatch = useAppDispatch();
  const player = useAppSelector((state) => state.game.player);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!gameStarted || !player) {
      return;
    }

    // Set up interval for resource generation
    intervalRef.current = setInterval(() => {
      const multiplier = getRankMultiplier(player.rank);
      const hoursPerInterval = RESOURCE_INTERVAL / (1000 * 60 * 60); // Convert to hours
      
      const earnings = {
        credits: Math.floor(BASE_RATES.credits * multiplier * hoursPerInterval),
        munitions: Math.floor(BASE_RATES.munitions * multiplier * hoursPerInterval),
        promethium: Math.floor(BASE_RATES.promethium * multiplier * hoursPerInterval),
        rawMaterials: Math.floor((BASE_RATES.credits * multiplier * hoursPerInterval) * 0.5),
        imperialFavor: 0, // Only earned through combat
      };

      dispatch(addOfflineEarnings(earnings));
    }, RESOURCE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [gameStarted, player, dispatch]);
}

