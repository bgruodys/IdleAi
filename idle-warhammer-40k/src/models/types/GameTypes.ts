/**
 * @fileoverview Core game types for IdleWarhammer40k
 * @author AI Assistant
 * @version 1.0.0
 */

export enum Faction {
  SPACE_MARINES = 'space_marines',
  ORKS = 'orks',
  ELDAR = 'eldar',
  NECRONS = 'necrons',
  TYRANIDS = 'tyranids',
  CHAOS = 'chaos'
}

export enum UnitType {
  INFANTRY = 'infantry',
  VEHICLE = 'vehicle',
  ARTILLERY = 'artillery',
  FLYER = 'flyer'
}

export enum CombatState {
  IDLE = 'idle',
  IN_COMBAT = 'in_combat',
  VICTORY = 'victory',
  DEFEAT = 'defeat'
}

export interface Position {
  x: number;
  y: number;
}

export interface UnitStats {
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  speed: number;
  range: number;
}

export interface Unit {
  id: string;
  name: string;
  type: UnitType;
  faction: Faction;
  stats: UnitStats;
  position: Position;
  level: number;
  experience: number;
  isAlive: boolean;
  lastAttackTime: number;
  lastMoveTime: number;
}

export interface GameState {
  playerFaction: Faction;
  playerUnits: Unit[];
  enemyUnits: Unit[];
  resources: {
    credits: number;
    materials: number;
    experience: number;
  };
  combatState: CombatState;
  gameTime: number;
  lastSaveTime: number;
  reinforcements: {
    nextReinforcementTime: number;
    reinforcementInterval: number;
  };
  attacks: {
    nextAttackTime: number;
    attackInterval: number;
  };
}

export interface GameConfig {
  reinforcementInterval: number; // in milliseconds
  attackInterval: number; // in milliseconds
  maxUnits: number;
  maxEnemyUnits: number;
  startingResources: {
    credits: number;
    materials: number;
    experience: number;
  };
}

export interface CombatResult {
  attacker: Unit;
  defender: Unit;
  damage: number;
  isCritical: boolean;
  timestamp: number;
}

export interface GameEvent {
  type: string;
  data: any;
  timestamp: number;
} 