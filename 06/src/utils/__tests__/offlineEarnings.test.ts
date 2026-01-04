import {
  calculateOfflineEarningsForState,
  calculateOfflineReinforcements,
} from '../offlineEarnings';
import { GameState } from '../../store/gameSlice';

describe('offlineEarnings', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('calculateOfflineEarningsForState', () => {
    it('should return zero earnings if player is null', () => {
      const gameState: GameState = {
        player: null,
        planet: null,
        reinforcements: {},
        resources: {
          credits: 0,
          munitions: 0,
          promethium: 0,
          rawMaterials: 0,
          imperialFavor: 0,
        },
        gameStarted: false,
        lastReinforcementTime: 0,
        sessionInfo: null,
      };

      const earnings = calculateOfflineEarningsForState(gameState, Date.now());
      expect(earnings.credits).toBe(0);
      expect(earnings.munitions).toBe(0);
      expect(earnings.promethium).toBe(0);
    });

    it('should return zero earnings if session info is null', () => {
      const gameState: GameState = {
        player: {
          id: 'player-1',
          name: 'Test',
          rank: 1,
          rankTitle: 'Recruit',
          experience: 0,
          arrivedAt: Date.now(),
        },
        planet: null,
        reinforcements: {},
        resources: {
          credits: 0,
          munitions: 0,
          promethium: 0,
          rawMaterials: 0,
          imperialFavor: 0,
        },
        gameStarted: false,
        lastReinforcementTime: 0,
        sessionInfo: null,
      };

      const earnings = calculateOfflineEarningsForState(gameState, Date.now());
      expect(earnings.credits).toBe(0);
    });

    it('should return zero earnings if time away is less than 1 minute', () => {
      const now = Date.now();
      const gameState: GameState = {
        player: {
          id: 'player-1',
          name: 'Test',
          rank: 1,
          rankTitle: 'Recruit',
          arrivedAt: now,
        },
        planet: null,
        reinforcements: {},
        resources: {
          credits: 0,
          munitions: 0,
          promethium: 0,
          rawMaterials: 0,
          imperialFavor: 0,
        },
        gameStarted: true,
        lastReinforcementTime: now,
        sessionInfo: {
          sessionId: 'session-1',
          lastActiveTime: now - 30000, // 30 seconds ago
          lastSaveTime: now,
        },
      };

      const earnings = calculateOfflineEarningsForState(gameState, now);
      expect(earnings.credits).toBe(0);
    });

    it('should calculate earnings for rank 1 after 1 hour', () => {
      const now = Date.now();
      const oneHourAgo = now - 60 * 60 * 1000;
      
      const gameState: GameState = {
        player: {
          id: 'player-1',
          name: 'Test',
          rank: 1,
          rankTitle: 'Recruit',
          arrivedAt: oneHourAgo,
        },
        planet: null,
        reinforcements: {},
        resources: {
          credits: 0,
          munitions: 0,
          promethium: 0,
          rawMaterials: 0,
          imperialFavor: 0,
        },
        gameStarted: true,
        lastReinforcementTime: oneHourAgo,
        sessionInfo: {
          sessionId: 'session-1',
          lastActiveTime: oneHourAgo,
          lastSaveTime: oneHourAgo,
        },
      };

      const earnings = calculateOfflineEarningsForState(gameState, now);
      
      // Rank 1 multiplier is 1.0, base rate is 100 credits/hour
      expect(earnings.credits).toBe(100);
      expect(earnings.munitions).toBe(50);
      expect(earnings.promethium).toBe(25);
      expect(earnings.rawMaterials).toBe(50); // 50% of credits
    });

    it('should calculate earnings for higher rank with multiplier', () => {
      const now = Date.now();
      const twoHoursAgo = now - 2 * 60 * 60 * 1000;
      
      const gameState: GameState = {
        player: {
          id: 'player-1',
          name: 'Test',
          rank: 5, // Sergeant, multiplier 1.6 (1.0 + 4*0.15)
          rankTitle: 'Sergeant',
          experience: 1000,
          arrivedAt: twoHoursAgo,
        },
        planet: null,
        reinforcements: {},
        resources: {
          credits: 0,
          munitions: 0,
          promethium: 0,
          rawMaterials: 0,
          imperialFavor: 0,
        },
        gameStarted: true,
        lastReinforcementTime: twoHoursAgo,
        sessionInfo: {
          sessionId: 'session-1',
          lastActiveTime: twoHoursAgo,
          lastSaveTime: twoHoursAgo,
        },
      };

      const earnings = calculateOfflineEarningsForState(gameState, now);
      
      // Rank 5 multiplier is 1.6 (1.0 + 4*0.15), base rate 100 credits/hour, 2 hours
      // 100 * 1.6 * 2 = 320 credits
      expect(earnings.credits).toBe(320);
      expect(earnings.munitions).toBe(160); // 50 * 1.6 * 2
      expect(earnings.promethium).toBe(80); // 25 * 1.6 * 2
    });
  });

  describe('calculateOfflineReinforcements', () => {
    it('should return 0 if time away is less than interval', () => {
      const now = Date.now();
      const lastTime = now - 3000; // 3 seconds ago
      
      const count = calculateOfflineReinforcements(lastTime, now);
      expect(count).toBe(0);
    });

    it('should calculate correct number of reinforcements', () => {
      const now = Date.now();
      const lastTime = now - 25000; // 25 seconds ago
      
      const count = calculateOfflineReinforcements(lastTime, now);
      // 25 seconds / 5 seconds = 5 reinforcements
      expect(count).toBe(5);
    });

    it('should handle large time differences', () => {
      const now = Date.now();
      const lastTime = now - 60 * 1000; // 1 minute ago
      
      const count = calculateOfflineReinforcements(lastTime, now);
      // 60 seconds / 5 seconds = 12 reinforcements
      expect(count).toBe(12);
    });
  });
});

