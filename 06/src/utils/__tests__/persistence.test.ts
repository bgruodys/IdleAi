import {
  saveGameStateToStorage,
  loadGameStateFromStorage,
  clearGameStateFromStorage,
  checkActiveSession,
  setActiveSession,
  updateSessionActivity,
  clearSession,
} from '../persistence';
import { GameState } from '../../store/gameSlice';

describe('persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Game State Storage', () => {
    it('should save and load game state', () => {
      const gameState: GameState = {
        player: {
          id: 'player-1',
          name: 'Test Commander',
          rank: 3,
          rankTitle: 'Veteran Guardsman',
          arrivedAt: Date.now(),
        },
        planet: {
          id: 'planet-1',
          name: 'Test Planet',
          discoveredAt: Date.now(),
        },
        reinforcements: [],
        resources: {
          credits: 1000,
          munitions: 500,
          promethium: 250,
          rawMaterials: 100,
          imperialFavor: 10,
        },
        gameStarted: true,
        lastReinforcementTime: Date.now(),
        sessionInfo: {
          sessionId: 'session-1',
          lastActiveTime: Date.now(),
          lastSaveTime: Date.now(),
        },
      };

      saveGameStateToStorage(gameState);
      const loaded = loadGameStateFromStorage();

      expect(loaded).not.toBeNull();
      expect(loaded?.player?.id).toBe(gameState.player?.id);
      expect(loaded?.player?.rank).toBe(gameState.player?.rank);
      expect(loaded?.planet?.name).toBe(gameState.planet?.name);
      expect(loaded?.resources.credits).toBe(gameState.resources.credits);
      expect(loaded?.gameStarted).toBe(true);
    });

    it('should return null when no saved state exists', () => {
      const loaded = loadGameStateFromStorage();
      expect(loaded).toBeNull();
    });

    it('should clear game state', () => {
      const gameState: GameState = {
        player: {
          id: 'player-1',
          name: 'Test',
          rank: 1,
          rankTitle: 'Recruit',
          arrivedAt: Date.now(),
        },
        planet: {
          id: 'planet-1',
          name: 'Test',
          discoveredAt: Date.now(),
        },
        reinforcements: [],
        resources: {
          credits: 0,
          munitions: 0,
          promethium: 0,
          rawMaterials: 0,
          imperialFavor: 0,
        },
        gameStarted: true,
        lastReinforcementTime: Date.now(),
        sessionInfo: {
          sessionId: 'session-1',
          lastActiveTime: Date.now(),
          lastSaveTime: Date.now(),
        },
      };

      saveGameStateToStorage(gameState);
      clearGameStateFromStorage();
      const loaded = loadGameStateFromStorage();

      expect(loaded).toBeNull();
    });
  });

  describe('Session Management', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should check for active session', () => {
      const { isActive } = checkActiveSession();
      expect(isActive).toBe(false);
    });

    it('should set and check active session', () => {
      const sessionId = 'test-session-123';
      setActiveSession(sessionId);

      const { sessionId: activeSessionId, isActive } = checkActiveSession();
      expect(isActive).toBe(true);
      expect(activeSessionId).toBe(sessionId);
    });

    it('should consider session inactive after timeout', () => {
      const sessionId = 'test-session-123';
      setActiveSession(sessionId);

      // Advance time by 6 minutes (more than 5 minute timeout)
      jest.advanceTimersByTime(6 * 60 * 1000);

      const { isActive } = checkActiveSession();
      expect(isActive).toBe(false);
    });

    it('should update session activity', () => {
      const sessionId = 'test-session-123';
      setActiveSession(sessionId);

      jest.advanceTimersByTime(2 * 60 * 1000);
      updateSessionActivity(sessionId);

      const { isActive } = checkActiveSession();
      expect(isActive).toBe(true);
    });

    it('should clear session', () => {
      const sessionId = 'test-session-123';
      setActiveSession(sessionId);
      clearSession();

      const { isActive } = checkActiveSession();
      expect(isActive).toBe(false);
    });
  });
});

