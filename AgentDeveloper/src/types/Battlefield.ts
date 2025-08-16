import { Unit } from './Unit';

export interface BattlefieldCell {
  x: number;
  y: number;
  unit: Unit | null;
  terrain: TerrainType;
  cover: number; // 0-100 cover percentage
}

export enum TerrainType {
  OPEN = 'open',
  COVER = 'cover',
  OBSTACLE = 'obstacle',
  FORTIFIED = 'fortified',
}

export interface BattlefieldState {
  grid: BattlefieldCell[][];
  width: number;
  height: number;
  activeUnits: Map<string, Unit>;
  deadUnits: string[];
  lastUpdate: number;
}

export interface BattlefieldConfig {
  width: number;
  height: number;
  cellSize: number;
  maxUnits: number;
  spawnZones: {
    friendly: { x: number; y: number; width: number; height: number };
    enemy: { x: number; y: number; width: number; height: number };
    neutral: { x: number; y: number; width: number; height: number };
  };
}

export interface PathfindingNode {
  x: number;
  y: number;
  cost: number;
  heuristic: number;
  total: number;
  parent: PathfindingNode | null;
}

export interface MovementPath {
  nodes: PathfindingNode[];
  totalCost: number;
  isValid: boolean;
}
