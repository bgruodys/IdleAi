import {
  calculateRankRequirement,
  calculateReinforcementsPerMinute,
  calculateDistance,
  clamp,
  randomInt,
  formatTime,
  formatNumber,
  generateUUID,
} from '../mathUtils';

describe('Math Utilities', () => {
  describe('calculateRankRequirement', () => {
    it('calculates correct rank requirements', () => {
      expect(calculateRankRequirement(1)).toBe(100);
      expect(calculateRankRequirement(2)).toBe(180);
      expect(calculateRankRequirement(3)).toBe(324);
    });

    it('uses exponential scaling', () => {
      const rank1 = calculateRankRequirement(1);
      const rank2 = calculateRankRequirement(2);
      const rank3 = calculateRankRequirement(3);
      
      expect(rank2).toBeGreaterThan(rank1);
      expect(rank3).toBeGreaterThan(rank2);
    });
  });

  describe('calculateReinforcementsPerMinute', () => {
    it('calculates reinforcements based on rank', () => {
      expect(calculateReinforcementsPerMinute(1)).toBe(7);
      expect(calculateReinforcementsPerMinute(5)).toBe(15);
      expect(calculateReinforcementsPerMinute(10)).toBe(25);
    });
  });

  describe('calculateDistance', () => {
    it('calculates distance between two points', () => {
      const pos1 = { x: 0, y: 0 };
      const pos2 = { x: 3, y: 4 };
      expect(calculateDistance(pos1, pos2)).toBe(5);
    });

    it('handles same position', () => {
      const pos = { x: 5, y: 5 };
      expect(calculateDistance(pos, pos)).toBe(0);
    });
  });

  describe('clamp', () => {
    it('clamps values within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });
  });

  describe('randomInt', () => {
    it('generates integers within range', () => {
      for (let i = 0; i < 100; i++) {
        const value = randomInt(1, 10);
        expect(value).toBeGreaterThanOrEqual(1);
        expect(value).toBeLessThanOrEqual(10);
        expect(Number.isInteger(value)).toBe(true);
      }
    });
  });

  describe('formatTime', () => {
    it('formats time correctly', () => {
      expect(formatTime(1000)).toBe('00:01');
      expect(formatTime(60000)).toBe('01:00');
      expect(formatTime(3661000)).toBe('1:01:01');
    });
  });

  describe('formatNumber', () => {
    it('formats large numbers with suffixes', () => {
      expect(formatNumber(999)).toBe('999');
      expect(formatNumber(1000)).toBe('1.0K');
      expect(formatNumber(1500000)).toBe('1.5M');
      expect(formatNumber(2500000000)).toBe('2.5B');
    });
  });

  describe('generateUUID', () => {
    it('generates valid UUID format', () => {
      const uuid = generateUUID();
      const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(uuid).toMatch(uuidPattern);
    });

    it('generates unique UUIDs', () => {
      const uuid1 = generateUUID();
      const uuid2 = generateUUID();
      expect(uuid1).not.toBe(uuid2);
    });
  });
});
