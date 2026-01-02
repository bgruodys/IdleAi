import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addReinforcement } from '../store/gameSlice';

const REINFORCEMENT_INTERVAL = 5000; // 5 seconds

export function useReinforcementTimer(gameStarted: boolean) {
  const dispatch = useAppDispatch();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!gameStarted) {
      return;
    }

    // Send first reinforcement immediately
    dispatch(addReinforcement());

    // Set up interval for subsequent reinforcements
    intervalRef.current = setInterval(() => {
      dispatch(addReinforcement());
    }, REINFORCEMENT_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [gameStarted, dispatch]);
}

