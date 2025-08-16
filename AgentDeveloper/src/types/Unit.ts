export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export enum UnitType {
  GUARDSMAN = 'guardsman',
  SERGEANT = 'sergeant',
  HEAVY_WEAPONS = 'heavy_weapons',
  COMMISSAR = 'commissar',
  OGRYN = 'ogryn',
  SPACE_MARINE = 'space_marine',
}

export enum Faction {
  IMPERIAL = 'imperial',
  CHAOS = 'chaos',
  ORK = 'ork',
  TYRANID = 'tyranid',
}

export enum UnitBehavior {
  AGGRESSIVE = 'aggressive',
  DEFENSIVE = 'defensive',
  PATROL = 'patrol',
}

export enum UnitStatus {
  IDLE = 'idle',
  MOVING = 'moving',
  COMBAT = 'combat',
  DEAD = 'dead',
}

export interface UnitStats {
  maxHP: number;
  currentHP: number;
  attack: number;
  armor: number;
  speed: number;
  range: number;
  morale: number;
}

export interface UnitAI {
  target: string | null;
  behavior: UnitBehavior;
  lastAction: number;
}

export interface Unit {
  id: string;
  type: UnitType;
  faction: Faction;
  position: Position;
  stats: UnitStats;
  ai: UnitAI;
  status: UnitStatus;
  createdAt: number;
  experience: number;
  level: number;
}

export interface UnitTypeDefinition {
  name: string;
  baseStats: Omit<UnitStats, 'currentHP'>;
  cost: number;
  description: string;
  sprite: string;
  unlockRank: number;
}
