/**
 * @fileoverview Ork unit definitions for IdleWarhammer40k
 * @author AI Assistant
 * @version 1.0.0
 */

import { Unit, UnitType, Faction } from '../../models/types/GameTypes';

export const ORK_UNITS: Omit<Unit, 'id' | 'position' | 'level' | 'experience' | 'isAlive' | 'lastAttackTime' | 'lastMoveTime'>[] = [
  {
    name: 'Ork Boy',
    type: UnitType.INFANTRY,
    faction: Faction.ORKS,
    stats: {
      health: 60,
      maxHealth: 60,
      attack: 12,
      defense: 6,
      speed: 4,
      range: 25
    }
  },
  {
    name: 'Nob',
    type: UnitType.INFANTRY,
    faction: Faction.ORKS,
    stats: {
      health: 80,
      maxHealth: 80,
      attack: 18,
      defense: 10,
      speed: 5,
      range: 30
    }
  },
  {
    name: 'Warboss',
    type: UnitType.INFANTRY,
    faction: Faction.ORKS,
    stats: {
      health: 120,
      maxHealth: 120,
      attack: 30,
      defense: 15,
      speed: 6,
      range: 35
    }
  },
  {
    name: 'Trukk',
    type: UnitType.VEHICLE,
    faction: Faction.ORKS,
    stats: {
      health: 100,
      maxHealth: 100,
      attack: 20,
      defense: 12,
      speed: 8,
      range: 40
    }
  },
  {
    name: 'Battlewagon',
    type: UnitType.VEHICLE,
    faction: Faction.ORKS,
    stats: {
      health: 150,
      maxHealth: 150,
      attack: 35,
      defense: 20,
      speed: 4,
      range: 45
    }
  },
  {
    name: 'Deff Dread',
    type: UnitType.VEHICLE,
    faction: Faction.ORKS,
    stats: {
      health: 180,
      maxHealth: 180,
      attack: 40,
      defense: 25,
      speed: 3,
      range: 50
    }
  },
  {
    name: 'Loota',
    type: UnitType.INFANTRY,
    faction: Faction.ORKS,
    stats: {
      health: 50,
      maxHealth: 50,
      attack: 25,
      defense: 4,
      speed: 3,
      range: 75
    }
  },
  {
    name: 'Stormboy',
    type: UnitType.INFANTRY,
    faction: Faction.ORKS,
    stats: {
      health: 65,
      maxHealth: 65,
      attack: 15,
      defense: 8,
      speed: 10,
      range: 20
    }
  }
];

export const ORK_ATTACK_UNITS = [
  ORK_UNITS[0], // Ork Boy (most common)
  ORK_UNITS[1], // Nob
  ORK_UNITS[6], // Loota
  ORK_UNITS[7], // Stormboy
];

export const ORK_ELITE_UNITS = [
  ORK_UNITS[2], // Warboss
  ORK_UNITS[3], // Trukk
  ORK_UNITS[4], // Battlewagon
  ORK_UNITS[5], // Deff Dread
]; 