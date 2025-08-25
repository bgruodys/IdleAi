import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { GameEngine } from '@/systems/GameEngine';
import { GameState, GameStatus, GameConfig } from '@/types/GameState';

/**
 * GameEngine React Context for providing game engine instance throughout the app.
 * Implements React context pattern with proper TypeScript integration.
 */

interface GameEngineContextType {
  engine: GameEngine | null;
  gameState: GameState | null;
  isInitialized: boolean;
  error: string | null;
  
  // Game control methods
  startGame: () => void;
  pauseGame: () => void;
  stopGame: () => void;
  saveGame: () => Promise<boolean>;
  loadGame: () => Promise<boolean>;
  
  // Game actions
  recordKill: () => void;
  addRankPoints: (points: number) => void;
}

const GameEngineContext = createContext<GameEngineContextType | null>(null);

/**
 * Default game configuration
 */
const DEFAULT_CONFIG: GameConfig = {
  baseReinforcementRate: 2,
  baseRankPointsPerKill: 10,
  rankRequirements: {
    1: 100,
    2: 250,
    3: 500,
    4: 1000,
    5: 2000,
    6: 4000,
    7: 8000,
    8: 15000,
    9: 25000,
    10: 40000,
  },
  maxRank: 10,
  battlefieldSize: { width: 100, height: 100 },
  autoSaveInterval: 30000,
  tickRate: 60,
  TIMING: {
    REINFORCEMENT_INTERVAL: 10000,
    ASSAULT_INTERVAL: 3600000,
    GAME_TICK_RATE: 1000,
    AUTO_SAVE_INTERVAL: 30000,
  },
};

interface GameEngineProviderProps {
  children: ReactNode;
  config?: Partial<GameConfig>;
}

/**
 * GameEngine Provider component that manages the game engine lifecycle
 */
export const GameEngineProvider: React.FC<GameEngineProviderProps> = ({ 
  children, 
  config = {} 
}) => {
  const [engine, setEngine] = useState<GameEngine | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize game engine
  useEffect(() => {
    try {
      const mergedConfig = { ...DEFAULT_CONFIG, ...config };
      const gameEngine = GameEngine.getInstance(mergedConfig);
      
      // Subscribe to game state changes
      const unsubscribe = gameEngine.subscribe((newState: GameState) => {
        setGameState(newState);
      });
      
      setEngine(gameEngine);
      setGameState(gameEngine.getGameState());
      setIsInitialized(true);
      setError(null);
      
      // Cleanup subscription on unmount
      return () => {
        unsubscribe();
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize game engine');
      console.error('GameEngine initialization error:', err);
    }
  }, []);
  
  // Auto-load game on initialization
  useEffect(() => {
    if (engine && isInitialized) {
      engine.loadGame().catch((err) => {
        console.warn('Failed to load saved game:', err);
      });
    }
  }, [engine, isInitialized]);
  
  // Game control methods
  const startGame = () => {
    if (engine) {
      engine.start();
    }
  };
  
  const pauseGame = () => {
    if (engine) {
      engine.pause();
    }
  };
  
  const stopGame = () => {
    if (engine) {
      engine.stop();
    }
  };
  
  const saveGame = async (): Promise<boolean> => {
    if (engine) {
      return await engine.saveGame();
    }
    return false;
  };
  
  const loadGame = async (): Promise<boolean> => {
    if (engine) {
      return await engine.loadGame();
    }
    return false;
  };
  
  const recordKill = () => {
    if (engine) {
      engine.recordKill();
    }
  };
  
  const addRankPoints = (points: number) => {
    if (engine) {
      engine.addRankPoints(points);
    }
  };
  
  const contextValue: GameEngineContextType = {
    engine,
    gameState,
    isInitialized,
    error,
    startGame,
    pauseGame,
    stopGame,
    saveGame,
    loadGame,
    recordKill,
    addRankPoints,
  };
  
  return (
    <GameEngineContext.Provider value={contextValue}>
      {children}
    </GameEngineContext.Provider>
  );
};

/**
 * Hook to access the GameEngine context
 */
export const useGameEngine = (): GameEngineContextType => {
  const context = useContext(GameEngineContext);
  
  if (!context) {
    throw new Error('useGameEngine must be used within a GameEngineProvider');
  }
  
  return context;
};

/**
 * Hook to access only the game state (for read-only components)
 */
export const useGameState = (): GameState | null => {
  const { gameState } = useGameEngine();
  return gameState;
};

/**
 * Hook to check if game is running
 */
export const useIsGameRunning = (): boolean => {
  const { gameState } = useGameEngine();
  return gameState?.status === GameStatus.RUNNING;
};

/**
 * Hook for game controls
 */
export const useGameControls = () => {
  const { startGame, pauseGame, stopGame, saveGame, loadGame } = useGameEngine();
  
  return {
    start: startGame,
    pause: pauseGame,
    stop: stopGame,
    save: saveGame,
    load: loadGame,
  };
};

/**
 * Hook for game actions
 */
export const useGameActions = () => {
  const { recordKill, addRankPoints } = useGameEngine();
  
  return {
    recordKill,
    addRankPoints,
  };
};
