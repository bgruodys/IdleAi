export interface BattleUnit {
  id: string;
  type: 'soldier' | 'orc';
  x: number;
  y: number;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  speed: number; // movement speed
  range: number; // attack range
  lastMove: number;
  lastAttack: number;
  isAlive: boolean;
}

export interface BattleField {
  width: number;
  height: number;
  units: BattleUnit[];
  turn: number;
  isActive: boolean;
  lastUpdate: number;
}

export interface BattleResult {
  winner: 'soldiers' | 'orcs' | 'ongoing';
  soldiersLost: number;
  orcsKilled: number;
  experienceGained: number;
  goldGained: number;
}

export interface BattleSettings {
  soldierSpawnRate: number; // soldiers per second
  orcSpawnRate: number; // orcs per second
  maxSoldiersOnField: number;
  maxOrcsOnField: number;
  soldierSpawnY: number; // spawn position
  orcSpawnY: number;
}
