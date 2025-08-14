/**
 * @fileoverview Space Marines unit definitions for IdleWarhammer40k
 * @author AI Assistant
 * @version 1.0.0
 */

import { Unit, UnitType, Faction } from '../../models/types/GameTypes';

export const SPACE_MARINE_UNITS: Omit<Unit, 'id' | 'position' | 'level' | 'experience' | 'isAlive' | 'lastAttackTime' | 'lastMoveTime'>[] = [
  {
    name: 'Tactical Marine',
    type: UnitType.INFANTRY,
    faction: Faction.SPACE_MARINES,
    stats: {
      health: 100,
      maxHealth: 100,
      attack: 15,
      defense: 10,
      speed: 5,
      range: 50
    }
  },
  {
    name: 'Assault Marine',
    type: UnitType.INFANTRY,
    faction: Faction.SPACE_MARINES,
    stats: {
      health: 120,
      maxHealth: 120,
      attack: 20,
      defense: 8,
      speed: 8,
      range: 30
    }
  },
  {
    name: 'Devastator Marine',
    type: UnitType.INFANTRY,
    faction: Faction.SPACE_MARINES,
    stats: {
      health: 90,
      maxHealth: 90,
      attack: 25,
      defense: 12,
      speed: 3,
      range: 80
    }
  },
  {
    name: 'Terminator',
    type: UnitType.INFANTRY,
    faction: Faction.SPACE_MARINES,
    stats: {
      health: 200,
      maxHealth: 200,
      attack: 30,
      defense: 25,
      speed: 2,
      range: 40
    }
  },
  {
    name: 'Dreadnought',
    type: UnitType.VEHICLE,
    faction: Faction.SPACE_MARINES,
    stats: {
      health: 300,
      maxHealth: 300,
      attack: 40,
      defense: 30,
      speed: 3,
      range: 60
    }
  },
  {
    name: 'Predator Tank',
    type: UnitType.VEHICLE,
    faction: Faction.SPACE_MARINES,
    stats: {
      health: 250,
      maxHealth: 250,
      attack: 35,
      defense: 20,
      speed: 4,
      range: 70
    }
  },
  {
    name: 'Land Raider',
    type: UnitType.VEHICLE,
    faction: Faction.SPACE_MARINES,
    stats: {
      health: 400,
      maxHealth: 400,
      attack: 45,
      defense: 35,
      speed: 3,
      range: 50
    }
  },
  {
    name: 'Thunderhawk Gunship',
    type: UnitType.FLYER,
    faction: Faction.SPACE_MARINES,
    stats: {
      health: 350,
      maxHealth: 350,
      attack: 50,
      defense: 15,
      speed: 10,
      range: 7
    }
  }
];

export const SPACE_MARINE_REINFORCEMENT_UNITS = [
  SPACE_MARINE_UNITS[0], // Tactical Marine (most common)
  SPACE_MARINE_UNITS[1], // Assault Marine
  SPACE_MARINE_UNITS[2], // Devastator Marine
];

export const SPACE_MARINE_ELITE_UNITS = [
  SPACE_MARINE_UNITS[3], // Terminator
  SPACE_MARINE_UNITS[4], // Dreadnought
  SPACE_MARINE_UNITS[5], // Predator Tank
];

export const SPACE_MARINE_HEAVY_UNITS = [
  SPACE_MARINE_UNITS[6], // Land Raider
  SPACE_MARINE_UNITS[7], // Thunderhawk Gunship
]; 