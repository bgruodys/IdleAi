import { useEffect, useRef, useCallback } from 'react';

interface UseGameLoopOptions {
  fps?: number;
  enabled?: boolean;
  onTick?: (deltaTime: number) => void;
}

export const useGameLoop = ({
  fps = 60,
  enabled = true,
  onTick,
}: UseGameLoopOptions) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const fpsInterval = 1000 / fps;
  const startTimeRef = useRef<number>(Date.now());
  const lastFrameTimeRef = useRef<number>(Date.now());

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      const elapsed = time - lastFrameTimeRef.current;

      // Only update if enough time has passed for target FPS
      if (elapsed >= fpsInterval) {
        onTick?.(deltaTime);
        lastFrameTimeRef.current = time - (elapsed % fpsInterval);
      }
    }
    
    previousTimeRef.current = time;
    if (enabled) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [enabled, fpsInterval, onTick]);

  useEffect(() => {
    if (enabled) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [enabled, animate]);

  const start = useCallback(() => {
    if (!requestRef.current) {
      startTimeRef.current = Date.now();
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const stop = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = undefined;
    }
  }, []);

  return { start, stop };
};

// Timer hook for game events
interface UseTimerOptions {
  duration: number; // in milliseconds
  onComplete?: () => void;
  autoStart?: boolean;
  repeat?: boolean;
}

export const useTimer = ({
  duration,
  onComplete,
  autoStart = false,
  repeat = false,
}: UseTimerOptions) => {
  const intervalRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>();
  const remainingRef = useRef<number>(duration);

  const start = useCallback(() => {
    startTimeRef.current = Date.now();
    remainingRef.current = duration;
    
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current!;
      remainingRef.current = Math.max(0, duration - elapsed);
      
      if (remainingRef.current <= 0) {
        onComplete?.();
        if (repeat) {
          start(); // Restart timer
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
          }
        }
      }
    }, 100); // Update every 100ms
  }, [duration, onComplete, repeat]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  const reset = useCallback(() => {
    stop();
    remainingRef.current = duration;
  }, [duration, stop]);

  const getRemaining = useCallback(() => {
    return remainingRef.current;
  }, []);

  const getProgress = useCallback(() => {
    return ((duration - remainingRef.current) / duration) * 100;
  }, [duration]);

  useEffect(() => {
    if (autoStart) {
      start();
    }

    return () => {
      stop();
    };
  }, [autoStart, start, stop]);

  return {
    start,
    stop,
    reset,
    getRemaining,
    getProgress,
    isRunning: !!intervalRef.current,
  };
};
