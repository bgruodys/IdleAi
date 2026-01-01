import { BattleField, BattleUnit, BattleResult, BattleSettings } from '@/types/battle';
import { Soldier } from '@/types/game';
import { GAME_CONSTANTS } from './gameLogic';

// Battle constants
export const BATTLE_CONSTANTS = {
  FIELD_WIDTH: 20,
  FIELD_HEIGHT: 20,
  SOLDIER_SPAWN_X: 0,
  ORC_SPAWN_X: 19,
  MOVE_COOLDOWN: 1000, // 1 second
  ATTACK_COOLDOWN: 2000, // 2 seconds
  SOLDIER_RANGE: 1,
  ORC_RANGE: 1,
  SOLDIER_SPEED: 1,
  ORC_SPEED: 1,
  BASE_ORC_HEALTH: 80,
  BASE_ORC_ATTACK: 8,
  BASE_ORC_DEFENSE: 3,
};

// Create a new soldier unit from barracks soldier
export function createSoldierUnit(soldier: Soldier, x: number, y: number): BattleUnit {
  return {
    id: `battle_${soldier.id}`,
    type: 'soldier',
    x,
    y,
    health: soldier.health,
    maxHealth: soldier.maxHealth,
    attack: soldier.attack,
    defense: soldier.defense,
    speed: BATTLE_CONSTANTS.SOLDIER_SPEED,
    range: BATTLE_CONSTANTS.SOLDIER_RANGE,
    lastMove: Date.now(),
    lastAttack: Date.now(),
    isAlive: true,
  };
}

// Create a new orc unit
export function createOrcUnit(x: number, y: number, level: number = 1): BattleUnit {
  const levelMultiplier = 1 + (level - 1) * 0.2;
  
  return {
    id: `orc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'orc',
    x,
    y,
    health: Math.floor(BATTLE_CONSTANTS.BASE_ORC_HEALTH * levelMultiplier),
    maxHealth: Math.floor(BATTLE_CONSTANTS.BASE_ORC_HEALTH * levelMultiplier),
    attack: Math.floor(BATTLE_CONSTANTS.BASE_ORC_ATTACK * levelMultiplier),
    defense: Math.floor(BATTLE_CONSTANTS.BASE_ORC_DEFENSE * levelMultiplier),
    speed: BATTLE_CONSTANTS.ORC_SPEED,
    range: BATTLE_CONSTANTS.ORC_RANGE,
    lastMove: Date.now(),
    lastAttack: Date.now(),
    isAlive: true,
  };
}

// Initialize battlefield
export function createBattleField(): BattleField {
  return {
    width: BATTLE_CONSTANTS.FIELD_WIDTH,
    height: BATTLE_CONSTANTS.FIELD_HEIGHT,
    units: [],
    turn: 0,
    isActive: true,
    lastUpdate: Date.now(),
  };
}

// Find nearest enemy
export function findNearestEnemy(unit: BattleUnit, units: BattleUnit[]): BattleUnit | null {
  const enemies = units.filter(u => u.isAlive && u.type !== unit.type);
  if (enemies.length === 0) return null;
  
  let nearest = enemies[0];
  let minDistance = getDistance(unit, nearest);
  
  for (const enemy of enemies) {
    const distance = getDistance(unit, enemy);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = enemy;
    }
  }
  
  return nearest;
}

// Calculate distance between two units
export function getDistance(unit1: BattleUnit, unit2: BattleUnit): number {
  const dx = unit1.x - unit2.x;
  const dy = unit1.y - unit2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Move unit towards target
export function moveUnitTowards(unit: BattleUnit, target: BattleUnit, allUnits: BattleUnit[]): BattleUnit {
  const now = Date.now();
  if (now - unit.lastMove < BATTLE_CONSTANTS.MOVE_COOLDOWN) {
    return unit;
  }
  
  const dx = target.x - unit.x;
  const dy = target.y - unit.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance <= unit.range) {
    return unit; // Already in range
  }
  
  // Try direct path first
  const moveX = Math.sign(dx) * Math.min(Math.abs(dx), unit.speed);
  const moveY = Math.sign(dy) * Math.min(Math.abs(dy), unit.speed);
  
  const directX = Math.max(0, Math.min(BATTLE_CONSTANTS.FIELD_WIDTH - 1, unit.x + moveX));
  const directY = Math.max(0, Math.min(BATTLE_CONSTANTS.FIELD_HEIGHT - 1, unit.y + moveY));
  
  // Check if direct path is available
  const isDirectPathOccupied = allUnits.some(otherUnit => 
    otherUnit.id !== unit.id && 
    otherUnit.isAlive && 
    otherUnit.x === directX && 
    otherUnit.y === directY
  );
  
  if (!isDirectPathOccupied) {
    return {
      ...unit,
      x: directX,
      y: directY,
      lastMove: now,
    };
  }
  
  // Try alternative paths around the obstacle
  const alternativeMoves = [
    // Try moving only in X direction
    { x: directX, y: unit.y },
    // Try moving only in Y direction  
    { x: unit.x, y: directY },
    // Try diagonal moves
    { x: unit.x + Math.sign(dx), y: unit.y },
    { x: unit.x, y: unit.y + Math.sign(dy) },
    // Try perpendicular moves
    { x: unit.x + 1, y: unit.y },
    { x: unit.x - 1, y: unit.y },
    { x: unit.x, y: unit.y + 1 },
    { x: unit.x, y: unit.y - 1 },
  ];
  
  // Filter valid alternative moves
  const validMoves = alternativeMoves.filter(move => {
    // Check bounds
    if (move.x < 0 || move.x >= BATTLE_CONSTANTS.FIELD_WIDTH || 
        move.y < 0 || move.y >= BATTLE_CONSTANTS.FIELD_HEIGHT) {
      return false;
    }
    
    // Check if position is occupied
    const isOccupied = allUnits.some(otherUnit => 
      otherUnit.id !== unit.id && 
      otherUnit.isAlive && 
      otherUnit.x === move.x && 
      otherUnit.y === move.y
    );
    
    return !isOccupied;
  });
  
  // Find the best alternative move (closest to target)
  if (validMoves.length > 0) {
    let bestMove = validMoves[0];
    let bestDistance = getDistance({ ...unit, x: bestMove.x, y: bestMove.y }, target);
    
    for (const move of validMoves) {
      const moveDistance = getDistance({ ...unit, x: move.x, y: move.y }, target);
      if (moveDistance < bestDistance) {
        bestMove = move;
        bestDistance = moveDistance;
      }
    }
    
    return {
      ...unit,
      x: bestMove.x,
      y: bestMove.y,
      lastMove: now,
    };
  }
  
  // If no alternative path found, stay in place
  return unit;
}

// Attack enemy
export function attackEnemy(attacker: BattleUnit, target: BattleUnit): { attacker: BattleUnit; target: BattleUnit } {
  const now = Date.now();
  if (now - attacker.lastAttack < BATTLE_CONSTANTS.ATTACK_COOLDOWN) {
    return { attacker, target };
  }
  
  const distance = getDistance(attacker, target);
  if (distance > attacker.range) {
    return { attacker, target };
  }
  
  // Calculate damage
  const damage = Math.max(1, attacker.attack - target.defense);
  const newTargetHealth = Math.max(0, target.health - damage);
  
  const updatedTarget: BattleUnit = {
    ...target,
    health: newTargetHealth,
    isAlive: newTargetHealth > 0,
  };
  
  const updatedAttacker: BattleUnit = {
    ...attacker,
    lastAttack: now,
  };
  
  return { attacker: updatedAttacker, target: updatedTarget };
}

// Update battlefield
export function updateBattleField(battleField: BattleField, soldiers: Soldier[]): BattleField {
  const now = Date.now();
  const timeDiff = (now - battleField.lastUpdate) / 1000;
  
  let updatedUnits = [...battleField.units];
  
  // Remove dead units
  updatedUnits = updatedUnits.filter(unit => unit.isAlive);
  
  // Update each unit
  for (let i = 0; i < updatedUnits.length; i++) {
    const unit = updatedUnits[i];
    const nearestEnemy = findNearestEnemy(unit, updatedUnits);
    
    if (nearestEnemy) {
      const distance = getDistance(unit, nearestEnemy);
      
      if (distance <= unit.range) {
        // Attack if in range
        const { attacker, target } = attackEnemy(unit, nearestEnemy);
        updatedUnits[i] = attacker;
        
        // Update target unit
        const targetIndex = updatedUnits.findIndex(u => u.id === target.id);
        if (targetIndex !== -1) {
          updatedUnits[targetIndex] = target;
        }
             } else {
         // Move towards enemy
         updatedUnits[i] = moveUnitTowards(unit, nearestEnemy, updatedUnits);
       }
    }
  }
  
  // Spawn new units
  const soldierSpawnCount = Math.floor(timeDiff * 0.5); // 0.5 soldiers per second
  const orcSpawnCount = Math.floor(timeDiff * 0.2); // 0.2 orcs per second (every 5 seconds)
  
  const currentSoldiers = updatedUnits.filter(u => u.type === 'soldier').length;
  const currentOrcs = updatedUnits.filter(u => u.type === 'orc').length;
  let totalUnits = currentSoldiers + currentOrcs;
  const maxUnitsInBattle = 10;
  
  // Helper function to find empty spawn position
  const findEmptySpawnPosition = (spawnX: number, allUnits: BattleUnit[]): number | null => {
    const occupiedYs = allUnits
      .filter(unit => unit.isAlive && unit.x === spawnX)
      .map(unit => unit.y);
    
    for (let y = 0; y < BATTLE_CONSTANTS.FIELD_HEIGHT; y++) {
      if (!occupiedYs.includes(y)) {
        return y;
      }
    }
    return null; // No empty position found
  };

  // Spawn soldiers
  for (let i = 0; i < soldierSpawnCount && totalUnits < maxUnitsInBattle; i++) {
    const spawnY = findEmptySpawnPosition(BATTLE_CONSTANTS.SOLDIER_SPAWN_X, updatedUnits);
    if (spawnY !== null) {
      const soldierUnit = createSoldierUnit({
        id: `battle_soldier_${Date.now()}_${i}`,
        level: 1,
        experience: 0,
        attack: GAME_CONSTANTS.SOLDIER_BASE_ATTACK,
        defense: GAME_CONSTANTS.SOLDIER_BASE_DEFENSE,
        health: GAME_CONSTANTS.SOLDIER_BASE_HEALTH,
        maxHealth: GAME_CONSTANTS.SOLDIER_BASE_HEALTH,
        createdAt: Date.now(),
      }, BATTLE_CONSTANTS.SOLDIER_SPAWN_X, spawnY);
      updatedUnits.push(soldierUnit);
      totalUnits++;
    }
  }
  
  // Spawn orcs
  for (let i = 0; i < orcSpawnCount && totalUnits < maxUnitsInBattle; i++) {
    const spawnY = findEmptySpawnPosition(BATTLE_CONSTANTS.ORC_SPAWN_X, updatedUnits);
    if (spawnY !== null) {
      const orcUnit = createOrcUnit(BATTLE_CONSTANTS.ORC_SPAWN_X, spawnY);
      updatedUnits.push(orcUnit);
      totalUnits++;
    }
  }
  
  return {
    ...battleField,
    units: updatedUnits,
    turn: battleField.turn + 1,
    lastUpdate: now,
  };
}

// Check battle result
export function getBattleResult(battleField: BattleField): BattleResult {
  const soldiers = battleField.units.filter(u => u.type === 'soldier' && u.isAlive);
  const orcs = battleField.units.filter(u => u.type === 'orc' && u.isAlive);
  
  let winner: 'soldiers' | 'orcs' | 'ongoing' = 'ongoing';
  
  if (soldiers.length === 0 && orcs.length > 0) {
    winner = 'orcs';
  } else if (orcs.length === 0 && soldiers.length > 0) {
    winner = 'soldiers';
  }
  
  const soldiersLost = battleField.units.filter(u => u.type === 'soldier' && !u.isAlive).length;
  const orcsKilled = battleField.units.filter(u => u.type === 'orc' && !u.isAlive).length;
  
  return {
    winner,
    soldiersLost,
    orcsKilled,
    experienceGained: orcsKilled * 20,
    goldGained: orcsKilled * 10,
  };
}
