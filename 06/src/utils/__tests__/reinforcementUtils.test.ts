import { aggregateReinforcementsByType, calculateTotalReinforcements } from '../reinforcementUtils';
import { Reinforcements } from '../../store/gameSlice';

describe('reinforcementUtils', () => {
  describe('aggregateReinforcementsByType', () => {
    it('should return empty array for empty reinforcements', () => {
      const result = aggregateReinforcementsByType({});
      expect(result).toEqual([]);
    });

    it('should convert single reinforcement type to array', () => {
      const reinforcements: Reinforcements = {
        'Imperial Guardsmen': 5,
      };

      const result = aggregateReinforcementsByType(reinforcements);
      
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('Imperial Guardsmen');
      expect(result[0].totalUnits).toBe(5);
    });

    it('should convert multiple types to array', () => {
      const reinforcements: Reinforcements = {
        'Imperial Guardsmen': 16,
        'Heavy Weapons Team': 3,
        'Scout Squad': 4,
      };

      const result = aggregateReinforcementsByType(reinforcements);
      
      expect(result).toHaveLength(3);
      expect(result[0].type).toBe('Heavy Weapons Team');
      expect(result[0].totalUnits).toBe(3);
      
      expect(result[1].type).toBe('Imperial Guardsmen');
      expect(result[1].totalUnits).toBe(16);
      
      expect(result[2].type).toBe('Scout Squad');
      expect(result[2].totalUnits).toBe(4);
    });

    it('should sort by type alphabetically', () => {
      const reinforcements: Reinforcements = {
        'Zeta Squad': 1,
        'Alpha Squad': 1,
        'Beta Squad': 1,
      };

      const result = aggregateReinforcementsByType(reinforcements);
      
      expect(result).toHaveLength(3);
      expect(result[0].type).toBe('Alpha Squad');
      expect(result[1].type).toBe('Beta Squad');
      expect(result[2].type).toBe('Zeta Squad');
    });
  });

  describe('calculateTotalReinforcements', () => {
    it('should return 0 for empty object', () => {
      const result = calculateTotalReinforcements({});
      expect(result).toBe(0);
    });

    it('should calculate total for single type', () => {
      const reinforcements: Reinforcements = {
        'Imperial Guardsmen': 5,
      };

      const result = calculateTotalReinforcements(reinforcements);
      expect(result).toBe(5);
    });

    it('should calculate total for multiple types', () => {
      const reinforcements: Reinforcements = {
        'Imperial Guardsmen': 5,
        'Heavy Weapons Team': 3,
        'Scout Squad': 8,
      };

      const result = calculateTotalReinforcements(reinforcements);
      expect(result).toBe(16); // 5 + 3 + 8
    });
  });
});

