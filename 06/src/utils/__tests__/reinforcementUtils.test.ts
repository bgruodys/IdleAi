import { aggregateReinforcementsByType, calculateTotalReinforcements } from '../reinforcementUtils';
import { Reinforcement } from '../../store/gameSlice';

describe('reinforcementUtils', () => {
  describe('aggregateReinforcementsByType', () => {
    it('should return empty array for empty reinforcements', () => {
      const result = aggregateReinforcementsByType([]);
      expect(result).toEqual([]);
    });

    it('should aggregate single reinforcement', () => {
      const reinforcements: Reinforcement[] = [
        {
          id: '1',
          type: 'Imperial Guardsmen',
          unitCount: 5,
          arrivedAt: 1000,
        },
      ];

      const result = aggregateReinforcementsByType(reinforcements);
      
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('Imperial Guardsmen');
      expect(result[0].totalUnits).toBe(5);
      expect(result[0].firstArrival).toBe(1000);
      expect(result[0].lastArrival).toBe(1000);
    });

    it('should aggregate multiple reinforcements of same type', () => {
      const reinforcements: Reinforcement[] = [
        {
          id: '1',
          type: 'Imperial Guardsmen',
          unitCount: 5,
          arrivedAt: 1000,
        },
        {
          id: '2',
          type: 'Imperial Guardsmen',
          unitCount: 8,
          arrivedAt: 2000,
        },
        {
          id: '3',
          type: 'Imperial Guardsmen',
          unitCount: 3,
          arrivedAt: 1500,
        },
      ];

      const result = aggregateReinforcementsByType(reinforcements);
      
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('Imperial Guardsmen');
      expect(result[0].totalUnits).toBe(16); // 5 + 8 + 3
      expect(result[0].firstArrival).toBe(1000);
      expect(result[0].lastArrival).toBe(2000);
    });

    it('should aggregate multiple different types', () => {
      const reinforcements: Reinforcement[] = [
        {
          id: '1',
          type: 'Imperial Guardsmen',
          unitCount: 5,
          arrivedAt: 1000,
        },
        {
          id: '2',
          type: 'Heavy Weapons Team',
          unitCount: 3,
          arrivedAt: 2000,
        },
        {
          id: '3',
          type: 'Imperial Guardsmen',
          unitCount: 8,
          arrivedAt: 3000,
        },
        {
          id: '4',
          type: 'Scout Squad',
          unitCount: 4,
          arrivedAt: 4000,
        },
      ];

      const result = aggregateReinforcementsByType(reinforcements);
      
      expect(result).toHaveLength(3);
      expect(result[0].type).toBe('Heavy Weapons Team');
      expect(result[0].totalUnits).toBe(3);
      
      expect(result[1].type).toBe('Imperial Guardsmen');
      expect(result[1].totalUnits).toBe(13); // 5 + 8
      expect(result[1].firstArrival).toBe(1000);
      expect(result[1].lastArrival).toBe(3000);
      
      expect(result[2].type).toBe('Scout Squad');
      expect(result[2].totalUnits).toBe(4);
    });

    it('should sort by type alphabetically', () => {
      const reinforcements: Reinforcement[] = [
        {
          id: '1',
          type: 'Zeta Squad',
          unitCount: 1,
          arrivedAt: 1000,
        },
        {
          id: '2',
          type: 'Alpha Squad',
          unitCount: 1,
          arrivedAt: 2000,
        },
        {
          id: '3',
          type: 'Beta Squad',
          unitCount: 1,
          arrivedAt: 3000,
        },
      ];

      const result = aggregateReinforcementsByType(reinforcements);
      
      expect(result).toHaveLength(3);
      expect(result[0].type).toBe('Alpha Squad');
      expect(result[1].type).toBe('Beta Squad');
      expect(result[2].type).toBe('Zeta Squad');
    });
  });

  describe('calculateTotalReinforcements', () => {
    it('should return 0 for empty array', () => {
      const result = calculateTotalReinforcements([]);
      expect(result).toBe(0);
    });

    it('should calculate total for single reinforcement', () => {
      const reinforcements: Reinforcement[] = [
        {
          id: '1',
          type: 'Imperial Guardsmen',
          unitCount: 5,
          arrivedAt: 1000,
        },
      ];

      const result = calculateTotalReinforcements(reinforcements);
      expect(result).toBe(5);
    });

    it('should calculate total for multiple reinforcements', () => {
      const reinforcements: Reinforcement[] = [
        {
          id: '1',
          type: 'Imperial Guardsmen',
          unitCount: 5,
          arrivedAt: 1000,
        },
        {
          id: '2',
          type: 'Heavy Weapons Team',
          unitCount: 3,
          arrivedAt: 2000,
        },
        {
          id: '3',
          type: 'Scout Squad',
          unitCount: 8,
          arrivedAt: 3000,
        },
      ];

      const result = calculateTotalReinforcements(reinforcements);
      expect(result).toBe(16); // 5 + 3 + 8
    });
  });
});

