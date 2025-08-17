import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { GameState, PlayerState, GameTimers, GameSettings, GameStatus, BattlefieldState, GameStatistics, Unit } from '@/types/GameState';

/**
 * Enhanced Game Store with GameEngine integration
 * Uses Zustand with persistence and subscription middleware
 */
interface GameStore extends GameState {
  // Game lifecycle methods
  initializeGame: () => void;
  setGameStatus: (status: GameStatus) => void;
  updateGameTime: (deltaTime: number) => void;
  
  // Player state methods
  updatePlayer: (updates: Partial<PlayerState>) => void;
  addRankPoints: (points: number) => void;
  recordKill: () => void;
  promoteRank: () => void;
  
  // Battlefield methods
  updateBattlefield: (updates: Partial<BattlefieldState>) => void;
  addUnit: (unit: Unit) => void;
  removeUnit: (unitId: string) => void;
  updateUnit: (unitId: string, updates: Partial<Unit>) => void;
  clearDeadUnits: () => void;
  
  // Timer methods
  updateTimers: (updates: Partial<GameTimers>) => void;
  resetReinforcementTimer: () => void;
  resetAssaultTimer: () => void;
  
  // Settings methods
  updateSettings: (updates: Partial<GameSettings>) => void;
  
  // Statistics methods
  updateStatistics: (updates: Partial<GameStatistics>) => void;
  incrementStat: (stat: keyof GameStatistics, amount?: number) => void;
  
  // Utility methods
  pause: () => void;
  resume: () => void;
  reset: () => void;
  
  // Computed getters
  getReinforcementCount: () => number;
  getTimeToNextReinforcement: () => number;
  getTimeToNextAssault: () => number;
  getRankProgress: () => { current: number; required: number; percentage: number };
}

const defaultGameState: Omit<GameState, 'status' | 'gameTime'> = {
  player: {
    rank: 1,
    rankPoints: 0,
    totalKills: 0,
    defensesWon: 0,
    defensesLost: 0,
    playTime: 0,
    lastLogin: Date.now(),
    achievements: [],
    username: 'Commander',
  },
  battlefield: {
    width: 100,
    height: 100,
    units: [],
    enemies: [],
  },
  timers: {
    nextReinforcement: 60000, // 1 minute in ms
    nextAssault: 3600000, // 1 hour in ms
    lastSave: Date.now(),
    gameStarted: Date.now(),
    lastUpdate: Date.now(),
  },
  settings: {
    autoSave: true,
    autoSaveInterval: 30000,
    soundEnabled: true,
    musicEnabled: true,
    graphicsQuality: 'medium',
    showFPS: false,
    battleSpeed: 1.0,
    volume: {
      master: 0.8,
      sfx: 0.8,
      music: 0.6,
    },
  },
  statistics: {
    totalPlayTime: 0,
    unitsLost: 0,
    enemiesKilled: 0,
    defensesWon: 0,
    defensesLost: 0,
  },
  isInitialized: false,
  isPaused: false,
  isBackground: false,
  lastUpdate: Date.now(),
  version: '1.0.0',
};

// Rank requirements mapping
const RANK_REQUIREMENTS: Record<number, number> = {
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
  11: 65000,
  12: 100000,
  13: 150000,
  14: 250000,
  15: 400000,
  16: 650000,
  17: 1000000,
  18: 1500000,
  19: 2500000,
  20: 5000000,
};

export const useGameStore = create<GameStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // Initial state
        ...defaultGameState,
        status: GameStatus.STOPPED,
        gameTime: 0,
        
        // Game lifecycle methods
        initializeGame: () => set((state) => ({
          ...state,
          isInitialized: true,
          timers: {
            ...state.timers,
            gameStarted: Date.now(),
            lastUpdate: Date.now(),
          }
        })),
        
        setGameStatus: (status: GameStatus) => set({ status }),
        
        updateGameTime: (deltaTime: number) => set((state) => ({
          gameTime: state.gameTime + deltaTime,
          statistics: {
            ...state.statistics,
            totalPlayTime: state.statistics.totalPlayTime + deltaTime,
          },
          timers: {
            ...state.timers,
            lastUpdate: Date.now(),
          }
        })),
        
        // Player state methods
        updatePlayer: (updates: Partial<PlayerState>) => set((state) => ({
          player: { ...state.player, ...updates }
        })),
        
        addRankPoints: (points: number) => set((state) => {
          const newRankPoints = state.player.rankPoints + points;
          const requiredPoints = RANK_REQUIREMENTS[state.player.rank];
          
          if (requiredPoints && newRankPoints >= requiredPoints) {
            // Rank up!
            return {
              player: {
                ...state.player,
                rank: state.player.rank + 1,
                rankPoints: newRankPoints - requiredPoints,
              }
            };
          }
          
          return {
            player: {
              ...state.player,
              rankPoints: newRankPoints,
            }
          };
        }),
        
        recordKill: () => set((state) => ({
          player: {
            ...state.player,
            totalKills: state.player.totalKills + 1,
          },
          statistics: {
            ...state.statistics,
            enemiesKilled: state.statistics.enemiesKilled + 1,
          }
        })),
        
        promoteRank: () => set((state) => ({
          player: {
            ...state.player,
            rank: state.player.rank + 1,
          }
        })),
        
        // Battlefield methods
        updateBattlefield: (updates: Partial<BattlefieldState>) => set((state) => ({
          battlefield: { ...state.battlefield, ...updates }
        })),
        
        addUnit: (unit: Unit) => set((state) => ({
          battlefield: {
            ...state.battlefield,
            units: [...state.battlefield.units, unit],
          }
        })),
        
        removeUnit: (unitId: string) => set((state) => ({
          battlefield: {
            ...state.battlefield,
            units: state.battlefield.units.filter(unit => unit.id !== unitId),
            enemies: state.battlefield.enemies.filter(unit => unit.id !== unitId),
          }
        })),
        
        updateUnit: (unitId: string, updates: Partial<Unit>) => set((state) => ({
          battlefield: {
            ...state.battlefield,
            units: state.battlefield.units.map(unit =>
              unit.id === unitId ? { ...unit, ...updates } : unit
            ),
            enemies: state.battlefield.enemies.map(unit =>
              unit.id === unitId ? { ...unit, ...updates } : unit
            ),
          }
        })),
        
        clearDeadUnits: () => set((state) => ({
          battlefield: {
            ...state.battlefield,
            units: state.battlefield.units.filter(unit => unit.isAlive),
            enemies: state.battlefield.enemies.filter(unit => unit.isAlive),
          }
        })),
        
        // Timer methods
        updateTimers: (updates: Partial<GameTimers>) => set((state) => ({
          timers: { ...state.timers, ...updates }
        })),
        
        resetReinforcementTimer: () => set((state) => ({
          timers: {
            ...state.timers,
            nextReinforcement: 60000, // Reset to 1 minute
          }
        })),
        
        resetAssaultTimer: () => set((state) => ({
          timers: {
            ...state.timers,
            nextAssault: 3600000, // Reset to 1 hour
          }
        })),
        
        // Settings methods
        updateSettings: (updates: Partial<GameSettings>) => set((state) => ({
          settings: { ...state.settings, ...updates }
        })),
        
        // Statistics methods
        updateStatistics: (updates: Partial<GameStatistics>) => set((state) => ({
          statistics: { ...state.statistics, ...updates }
        })),
        
        incrementStat: (stat: keyof GameStatistics, amount = 1) => set((state) => ({
          statistics: {
            ...state.statistics,
            [stat]: state.statistics[stat] + amount,
          }
        })),
        
        // Utility methods
        pause: () => set({ isPaused: true, status: GameStatus.PAUSED }),
        resume: () => set({ isPaused: false, status: GameStatus.RUNNING }),
        reset: () => set({ ...defaultGameState, status: GameStatus.STOPPED, gameTime: 0 }),
        
        // Computed getters
        getReinforcementCount: () => {
          const state = get();
          return Math.floor(state.player.rank * 2); // Base reinforcement rate
        },
        
        getTimeToNextReinforcement: () => {
          const state = get();
          return Math.max(0, state.timers.nextReinforcement);
        },
        
        getTimeToNextAssault: () => {
          const state = get();
          return Math.max(0, state.timers.nextAssault);
        },
        
        getRankProgress: () => {
          const state = get();
          const required = RANK_REQUIREMENTS[state.player.rank] || 0;
          const current = state.player.rankPoints;
          const percentage = required > 0 ? (current / required) * 100 : 100;
          
          return {
            current,
            required,
            percentage: Math.min(100, percentage),
          };
        },
      }),
      {
        name: 'idle-warhammer40k-game-store',
        version: 1,
        // Only persist certain fields to avoid bloating localStorage
        partialize: (state) => ({
          player: state.player,
          settings: state.settings,
          statistics: state.statistics,
          isInitialized: state.isInitialized,
          version: state.version,
        }),
      }
    )
  )
);

// Subscribe to specific state changes for logging/analytics
useGameStore.subscribe(
  (state) => state.player.rank,
  (rank) => {
    console.log(`Player promoted to rank ${rank}!`);
  }
);

useGameStore.subscribe(
  (state) => state.status,
  (status) => {
    console.log(`Game status changed to: ${status}`);
  }
);
