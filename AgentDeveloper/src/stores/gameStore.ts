import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, PlayerState, GameTimers, GameSettings } from '@/types/GameState';

interface GameStore extends GameState {
  initializeGame: () => void;
  updatePlayer: (updates: Partial<PlayerState>) => void;
  updateTimers: (updates: Partial<GameTimers>) => void;
  updateSettings: (updates: Partial<GameSettings>) => void;
  addRankPoints: (points: number) => void;
  checkRankUp: () => boolean;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  save: () => void;
}

const defaultGameState: GameState = {
  player: {
    rank: 1,
    rankPoints: 0,
    totalKills: 0,
    defensesWon: 0,
    defensesLost: 0,
    playTime: 0,
    lastLogin: Date.now(),
    achievements: [],
  },
  timers: {
    nextReinforcement: Date.now() + 60000, // 1 minute
    nextAssault: Date.now() + 3600000, // 1 hour
    lastSave: Date.now(),
    gameStarted: Date.now(),
  },
  settings: {
    autoSave: true,
    soundEnabled: true,
    musicEnabled: true,
    graphicsQuality: 'medium',
    showFPS: false,
    battleSpeed: 1.0,
    volume: {
      master: 0.7,
      sfx: 0.8,
      music: 0.6,
    },
  },
  isInitialized: false,
  isPaused: false,
  isBackground: false,
  lastUpdate: Date.now(),
  version: '1.0.0',
};

// Rank progression formula
const getRankRequirement = (rank: number): number => {
  return Math.floor(100 * Math.pow(1.8, rank - 1));
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...defaultGameState,

      initializeGame: () => {
        const now = Date.now();
        set((state) => ({
          ...state,
          isInitialized: true,
          lastUpdate: now,
          timers: {
            ...state.timers,
            gameStarted: now,
          },
        }));
      },

      updatePlayer: (updates) => {
        set((state) => ({
          player: { ...state.player, ...updates },
          lastUpdate: Date.now(),
        }));
      },

      updateTimers: (updates) => {
        set((state) => ({
          timers: { ...state.timers, ...updates },
          lastUpdate: Date.now(),
        }));
      },

      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates },
          lastUpdate: Date.now(),
        }));
      },

      addRankPoints: (points) => {
        set((state) => {
          const newPoints = state.player.rankPoints + points;
          return {
            player: {
              ...state.player,
              rankPoints: newPoints,
            },
            lastUpdate: Date.now(),
          };
        });
        
        // Check for rank up after adding points
        get().checkRankUp();
      },

      checkRankUp: () => {
        const state = get();
        const currentRank = state.player.rank;
        const currentPoints = state.player.rankPoints;
        const requiredPoints = getRankRequirement(currentRank + 1);

        if (currentPoints >= requiredPoints) {
          set((state) => ({
            player: {
              ...state.player,
              rank: currentRank + 1,
            },
            lastUpdate: Date.now(),
          }));
          return true;
        }
        return false;
      },

      pause: () => {
        set({ isPaused: true, lastUpdate: Date.now() });
      },

      resume: () => {
        set({ isPaused: false, lastUpdate: Date.now() });
      },

      reset: () => {
        set({ ...defaultGameState, isInitialized: true });
      },

      save: () => {
        set((state) => ({
          timers: {
            ...state.timers,
            lastSave: Date.now(),
          },
          lastUpdate: Date.now(),
        }));
      },
    }),
    {
      name: 'idle-warhammer40k-game-state',
      version: 1,
    }
  )
);
