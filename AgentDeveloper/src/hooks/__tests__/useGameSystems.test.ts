import { renderHook, act } from '@testing-library/react';
import { useGameStore } from '@/stores/gameStore';
import { 
  usePlayerState, 
  useBattlefield, 
  useGameTimers, 
  useGameLifecycle,
  useGameStatistics,
  useGameSettings,
  useRankProgression,
  useGameState
} from '@/hooks/useGameSystems';
import { GameStatus } from '@/types/GameState';

/**
 * Test suite for custom React hooks for game systems
 * Tests all game system hooks for proper functionality and state management
 */

// Mock zustand store for testing
jest.mock('@/stores/gameStore', () => ({
  useGameStore: jest.fn(),
}));

const mockUseGameStore = useGameStore as jest.MockedFunction<typeof useGameStore>;

describe('Game System Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('usePlayerState', () => {
    it('should return player state and methods', () => {
      const mockPlayer = {
        rank: 1,
        rankPoints: 0,
        totalKills: 0,
        defensesWon: 0,
        defensesLost: 0,
        playTime: 0,
        lastLogin: Date.now(),
        achievements: [],
        username: 'Commander',
      };

      const mockUpdatePlayer = jest.fn();
      const mockAddRankPoints = jest.fn();
      const mockRecordKill = jest.fn();
      const mockPromoteRank = jest.fn();

      mockUseGameStore
        .mockReturnValueOnce(mockPlayer)
        .mockReturnValueOnce(mockUpdatePlayer)
        .mockReturnValueOnce(mockAddRankPoints)
        .mockReturnValueOnce(mockRecordKill)
        .mockReturnValueOnce(mockPromoteRank);

      const { result } = renderHook(() => usePlayerState());

      expect(result.current.player).toEqual(mockPlayer);
      expect(result.current.updatePlayer).toBe(mockUpdatePlayer);
      expect(result.current.addRankPoints).toBe(mockAddRankPoints);
      expect(result.current.recordKill).toBe(mockRecordKill);
      expect(result.current.promoteRank).toBe(mockPromoteRank);
    });
  });

  describe('useBattlefield', () => {
    it('should return battlefield state and methods', () => {
      const mockBattlefield = {
        width: 100,
        height: 100,
        units: [],
        enemies: [],
      };

      const mockUpdateBattlefield = jest.fn();
      const mockAddUnit = jest.fn();
      const mockRemoveUnit = jest.fn();
      const mockUpdateUnit = jest.fn();
      const mockClearDeadUnits = jest.fn();

      mockUseGameStore
        .mockReturnValueOnce(mockBattlefield)
        .mockReturnValueOnce(mockUpdateBattlefield)
        .mockReturnValueOnce(mockAddUnit)
        .mockReturnValueOnce(mockRemoveUnit)
        .mockReturnValueOnce(mockUpdateUnit)
        .mockReturnValueOnce(mockClearDeadUnits);

      const { result } = renderHook(() => useBattlefield());

      expect(result.current.battlefield).toEqual(mockBattlefield);
      expect(result.current.updateBattlefield).toBe(mockUpdateBattlefield);
      expect(result.current.addUnit).toBe(mockAddUnit);
      expect(result.current.removeUnit).toBe(mockRemoveUnit);
      expect(result.current.updateUnit).toBe(mockUpdateUnit);
      expect(result.current.clearDeadUnits).toBe(mockClearDeadUnits);
    });

    it('should provide utility methods for multiple operations', () => {
      const mockAddUnit = jest.fn();
      const mockRemoveUnit = jest.fn();

      mockUseGameStore
        .mockReturnValueOnce({ width: 100, height: 100, units: [], enemies: [] })
        .mockReturnValueOnce(jest.fn())
        .mockReturnValueOnce(mockAddUnit)
        .mockReturnValueOnce(mockRemoveUnit)
        .mockReturnValueOnce(jest.fn())
        .mockReturnValueOnce(jest.fn());

      const { result } = renderHook(() => useBattlefield());

      const testUnits = [
        { 
          id: '1', 
          type: 'space_marine',
          x: 10, 
          y: 10, 
          health: 100, 
          maxHealth: 100, 
          damage: 25,
          speed: 5,
          faction: 'imperial' as const,
          isAlive: true 
        },
        { 
          id: '2', 
          type: 'scout',
          x: 20, 
          y: 20, 
          health: 100, 
          maxHealth: 100, 
          damage: 15,
          speed: 8,
          faction: 'imperial' as const,
          isAlive: true 
        },
      ];

      act(() => {
        result.current.addMultipleUnits(testUnits);
      });

      expect(mockAddUnit).toHaveBeenCalledTimes(2);
      expect(mockAddUnit).toHaveBeenCalledWith(testUnits[0]);
      expect(mockAddUnit).toHaveBeenCalledWith(testUnits[1]);

      act(() => {
        result.current.removeMultipleUnits(['1', '2']);
      });

      expect(mockRemoveUnit).toHaveBeenCalledTimes(2);
      expect(mockRemoveUnit).toHaveBeenCalledWith('1');
      expect(mockRemoveUnit).toHaveBeenCalledWith('2');
    });
  });

  describe('useGameTimers', () => {
    it('should return timer state and utility methods', () => {
      const mockTimers = {
        nextReinforcement: 60000,
        nextAssault: 3600000,
        lastSave: Date.now(),
        gameStarted: Date.now(),
        lastUpdate: Date.now(),
      };

      const mockUpdateTimers = jest.fn();
      const mockResetReinforcementTimer = jest.fn();
      const mockResetAssaultTimer = jest.fn();
      const mockGetTimeToNextReinforcement = jest.fn().mockReturnValue(45000);
      const mockGetTimeToNextAssault = jest.fn().mockReturnValue(1800000);

      mockUseGameStore
        .mockReturnValueOnce(mockTimers)
        .mockReturnValueOnce(mockUpdateTimers)
        .mockReturnValueOnce(mockResetReinforcementTimer)
        .mockReturnValueOnce(mockResetAssaultTimer)
        .mockReturnValueOnce(mockGetTimeToNextReinforcement)
        .mockReturnValueOnce(mockGetTimeToNextAssault);

      const { result } = renderHook(() => useGameTimers());

      expect(result.current.timers).toEqual(mockTimers);
      expect(result.current.getRemainingReinforcementTime()).toBe(45); // Converted to seconds
      expect(result.current.getRemainingAssaultTime()).toBe(1800); // Converted to seconds
    });

    it('should format time correctly', () => {
      mockUseGameStore
        .mockReturnValue(jest.fn().mockReturnValue(0));

      const { result } = renderHook(() => useGameTimers());

      expect(result.current.formatTime(90)).toBe('1:30'); // 1 minute 30 seconds
      expect(result.current.formatTime(3661)).toBe('1:01:01'); // 1 hour 1 minute 1 second
      expect(result.current.formatTime(30)).toBe('0:30'); // 30 seconds
    });
  });

  describe('useGameLifecycle', () => {
    it('should return game lifecycle state and methods', () => {
      const mockSetGameStatus = jest.fn();
      const mockInitializeGame = jest.fn();
      const mockPause = jest.fn();
      const mockResume = jest.fn();
      const mockReset = jest.fn();

      mockUseGameStore
        .mockReturnValueOnce(GameStatus.STOPPED)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(mockInitializeGame)
        .mockReturnValueOnce(mockSetGameStatus)
        .mockReturnValueOnce(mockPause)
        .mockReturnValueOnce(mockResume)
        .mockReturnValueOnce(mockReset);

      const { result } = renderHook(() => useGameLifecycle());

      expect(result.current.status).toBe(GameStatus.STOPPED);
      expect(result.current.isPaused).toBe(false);
      expect(result.current.isInitialized).toBe(false);

      act(() => {
        result.current.startGame();
      });

      expect(mockInitializeGame).toHaveBeenCalledTimes(1);
      expect(mockSetGameStatus).toHaveBeenCalledWith(GameStatus.RUNNING);
    });

    it('should handle pause/resume toggle correctly', () => {
      const mockPause = jest.fn();
      const mockResume = jest.fn();

      // First call - game is not paused
      mockUseGameStore
        .mockReturnValueOnce(GameStatus.RUNNING)
        .mockReturnValueOnce(false) // isPaused
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(jest.fn())
        .mockReturnValueOnce(jest.fn())
        .mockReturnValueOnce(mockPause)
        .mockReturnValueOnce(mockResume)
        .mockReturnValueOnce(jest.fn());

      const { result } = renderHook(() => useGameLifecycle());

      act(() => {
        result.current.togglePause();
      });

      expect(mockPause).toHaveBeenCalledTimes(1);
    });
  });

  describe('useGameStatistics', () => {
    it('should return statistics and computed values', () => {
      const mockStatistics = {
        totalPlayTime: 3600000, // 1 hour in ms
        unitsLost: 10,
        enemiesKilled: 100,
        defensesWon: 8,
        defensesLost: 2,
      };

      const mockUpdateStatistics = jest.fn();
      const mockIncrementStat = jest.fn();

      mockUseGameStore
        .mockReturnValueOnce(mockStatistics)
        .mockReturnValueOnce(mockUpdateStatistics)
        .mockReturnValueOnce(mockIncrementStat);

      const { result } = renderHook(() => useGameStatistics());

      expect(result.current.statistics).toEqual(mockStatistics);
      expect(result.current.getKillRate()).toBe(100); // 100 kills per hour
      expect(result.current.getWinRate()).toBe(80); // 8/10 * 100 = 80%
      expect(result.current.getSurvivalRate()).toBeCloseTo(90.91); // (110-10)/110 * 100
    });
  });

  describe('useGameSettings', () => {
    it('should return settings and convenience methods', () => {
      const mockSettings = {
        autoSave: true,
        autoSaveInterval: 30000,
        soundEnabled: true,
        musicEnabled: true,
        graphicsQuality: 'medium' as const,
        showFPS: false,
        battleSpeed: 1.0,
        volume: {
          master: 0.8,
          sfx: 0.8,
          music: 0.6,
        },
      };

      const mockUpdateSettings = jest.fn();

      mockUseGameStore
        .mockReturnValueOnce(mockSettings)
        .mockReturnValueOnce(mockUpdateSettings);

      const { result } = renderHook(() => useGameSettings());

      expect(result.current.settings).toEqual(mockSettings);

      act(() => {
        result.current.toggleSound();
      });

      expect(mockUpdateSettings).toHaveBeenCalledWith({ soundEnabled: false });

      act(() => {
        result.current.setVolume('master', 0.5);
      });

      expect(mockUpdateSettings).toHaveBeenCalledWith({
        volume: { ...mockSettings.volume, master: 0.5 }
      });
    });

    it('should clamp volume values between 0 and 1', () => {
      const mockSettings = {
        volume: { master: 0.8, sfx: 0.8, music: 0.6 },
      };
      const mockUpdateSettings = jest.fn();

      mockUseGameStore
        .mockReturnValueOnce(mockSettings)
        .mockReturnValueOnce(mockUpdateSettings);

      const { result } = renderHook(() => useGameSettings());

      act(() => {
        result.current.setVolume('master', 1.5); // Should clamp to 1.0
      });

      expect(mockUpdateSettings).toHaveBeenCalledWith({
        volume: { ...mockSettings.volume, master: 1.0 }
      });

      act(() => {
        result.current.setVolume('sfx', -0.5); // Should clamp to 0.0
      });

      expect(mockUpdateSettings).toHaveBeenCalledWith({
        volume: { ...mockSettings.volume, sfx: 0.0 }
      });
    });
  });

  describe('useRankProgression', () => {
    it('should return rank progression data', () => {
      const mockPlayer = { rank: 5, rankPoints: 750, totalKills: 50, username: 'TestCommander' };
      const mockGetRankProgress = jest.fn().mockReturnValue({
        current: 750,
        required: 1000,
        percentage: 75,
      });
      const mockGetReinforcementCount = jest.fn().mockReturnValue(10);

      mockUseGameStore
        .mockReturnValueOnce(mockPlayer)
        .mockReturnValueOnce(mockGetRankProgress)
        .mockReturnValueOnce(mockGetReinforcementCount);

      const { result } = renderHook(() => useRankProgression());

      expect(result.current.player).toEqual(mockPlayer);
      expect(result.current.progress.percentage).toBe(75);
      expect(result.current.reinforcementCount).toBe(10);
      expect(result.current.getRankTitle(5)).toBe('Staff Sergeant');
      expect(result.current.getProgressPercentage()).toBe(75);
      expect(result.current.isMaxRank()).toBe(false);
    });

    it('should identify max rank correctly', () => {
      const mockPlayer = { rank: 20 };
      mockUseGameStore.mockReturnValueOnce(mockPlayer);

      const { result } = renderHook(() => useRankProgression());

      expect(result.current.isMaxRank()).toBe(true);
    });
  });

  describe('useGameState', () => {
    it('should return combined game state from all systems', () => {
      const mockGameTime = 60000;
      const mockUpdateGameTime = jest.fn();
      const mockLastUpdate = Date.now();
      const mockVersion = '1.0.0';

      mockUseGameStore
        .mockReturnValueOnce(mockGameTime)
        .mockReturnValueOnce(mockUpdateGameTime)
        .mockReturnValueOnce(mockLastUpdate)
        .mockReturnValueOnce(mockVersion);

      // Mock all the sub-hooks (this is a simplified version)
      jest.doMock('@/hooks/useGameSystems', () => ({
        usePlayerState: () => ({ player: { rank: 1 } }),
        useBattlefield: () => ({ battlefield: { width: 100, height: 100 } }),
        useGameTimers: () => ({ timers: { nextReinforcement: 60000 } }),
        useGameLifecycle: () => ({ status: GameStatus.RUNNING }),
        useGameStatistics: () => ({ statistics: { totalPlayTime: 0 } }),
        useGameSettings: () => ({ settings: { soundEnabled: true } }),
        useRankProgression: () => ({ player: { rank: 1 }, progress: { percentage: 0 } }),
      }));

      const { result } = renderHook(() => useGameState());

      expect(result.current.gameTime).toBe(mockGameTime);
      expect(result.current.updateGameTime).toBe(mockUpdateGameTime);
      expect(result.current.lastUpdate).toBe(mockLastUpdate);
      expect(result.current.version).toBe(mockVersion);
      expect(result.current.player).toBeDefined();
      expect(result.current.battlefield).toBeDefined();
      expect(result.current.timers).toBeDefined();
      expect(result.current.lifecycle).toBeDefined();
      expect(result.current.statistics).toBeDefined();
      expect(result.current.settings).toBeDefined();
      expect(result.current.rank).toBeDefined();
    });
  });
});
