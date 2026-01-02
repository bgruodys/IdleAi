import { useState, useEffect, useRef } from 'react';

/**
 * Hook to create a countdown timer
 * @param intervalMs - The interval in milliseconds
 * @param active - Whether the timer is active
 * @returns The remaining time in milliseconds
 */
export function useCountdownTimer(intervalMs: number, active: boolean): number {
  const [timeRemaining, setTimeRemaining] = useState(intervalMs);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      setTimeRemaining(intervalMs);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      startTimeRef.current = null;
      return;
    }

    // Initialize start time
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
      setTimeRemaining(intervalMs);
    }

    // Update every 100ms for smooth countdown
    intervalRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = Date.now() - startTimeRef.current;
        const remaining = Math.max(0, intervalMs - elapsed);
        setTimeRemaining(remaining);

        // Reset when countdown reaches zero
        if (remaining === 0) {
          startTimeRef.current = Date.now();
          setTimeRemaining(intervalMs);
        }
      }
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [intervalMs, active]);

  return timeRemaining;
}

/**
 * Format milliseconds to MM:SS format
 */
export function formatTime(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

