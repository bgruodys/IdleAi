/**
 * @fileoverview Main game store for IdleWarhammer40k
 * @author AI Assistant
 * @version 1.0.0
 */

import { create } from 'zustand';
import { GameState, Unit, Faction, CombatState, CombatResult } from '../models/types/GameTypes';
import { GAME_CONFIG, COMBAT_CONFIG } from '../config/gameConfig';
import { SPACE_MARINE_REINFORCEMENT_UNITS } from '../data/units/spaceMarines';
import { ORK_ATTACK_UNITS } from '../data/units/orks';
import { generateId, calculateDamage, randomInt } from '../utils/MathUtils';

interface GameStore extends GameState {
  // Actions
  initializeGame: () => void;
  updateGame: (deltaTime: number) => void;
  addReinforcement: () => void;
  spawnEnemyAttack: () => void;
  processCombat: () => void;
  attackUnit: (attacker: Unit, defender: Unit) => CombatResult;
  removeDeadUnits: () => void;
  addExperience: (amount: number) => void;
  addCredits: (amount: number) => void;
  addMaterials: (amount: number) => void;
  saveGame: () => void;
  loadGame: () => void;
}

const createUnit = (unitTemplate: any, faction: Faction, position: { x: number; y: number }): Unit => {
  return {
    id: generateId(),
    name: unitTemplate.name,
    type: unitTemplate.type,
    faction: faction,
    stats: { ...unitTemplate.stats },
    position: { ...position },
    level: 1,
    experience: 0,
    isAlive: true,
    lastAttackTime: 0,
    lastMoveTime: 0
  };
};

const getRandomPosition = (): { x: number; y: number } => {
  return {
    x: randomInt(100, 700),
    y: randomInt(100, 500)
  };
};

export const useGameStore = create<GameStore>((set: any, get: any) => ({
  // Initial state
  playerFaction: Faction.SPACE_MARINES,
  playerUnits: [],
  enemyUnits: [],
  resources: {
    credits: GAME_CONFIG.startingResources.credits,
    materials: GAME_CONFIG.startingResources.materials,
    experience: GAME_CONFIG.startingResources.experience
  },
  combatState: CombatState.IDLE,
  gameTime: 0,
  lastSaveTime: Date.now(),
  reinforcements: {
    nextReinforcementTime: Date.now() + GAME_CONFIG.reinforcementInterval,
    reinforcementInterval: GAME_CONFIG.reinforcementInterval
  },
  attacks: {
    nextAttackTime: Date.now() + GAME_CONFIG.attackInterval,
    attackInterval: GAME_CONFIG.attackInterval
  },

  // Actions
  initializeGame: () => {
    const initialState: GameState = {
      playerFaction: Faction.SPACE_MARINES,
      playerUnits: [],
      enemyUnits: [],
      resources: {
        credits: GAME_CONFIG.startingResources.credits,
        materials: GAME_CONFIG.startingResources.materials,
        experience: GAME_CONFIG.startingResources.experience
      },
      combatState: CombatState.IDLE,
      gameTime: 0,
      lastSaveTime: Date.now(),
      reinforcements: {
        nextReinforcementTime: Date.now() + GAME_CONFIG.reinforcementInterval,
        reinforcementInterval: GAME_CONFIG.reinforcementInterval
      },
      attacks: {
        nextAttackTime: Date.now() + GAME_CONFIG.attackInterval,
        attackInterval: GAME_CONFIG.attackInterval
      }
    };

    set(initialState);
    get().loadGame();
  },

  updateGame: (deltaTime: number) => {
    const state = get();
    const currentTime = Date.now();

    set({
      gameTime: state.gameTime + deltaTime
    });

    // Check for reinforcements
    if (currentTime >= state.reinforcements.nextReinforcementTime) {
      get().addReinforcement();
    }

    // Check for enemy attacks
    if (currentTime >= state.attacks.nextAttackTime) {
      get().spawnEnemyAttack();
    }

    // Process combat
    if (state.enemyUnits.length > 0 && state.playerUnits.length > 0) {
      get().processCombat();
    }

    // Remove dead units
    get().removeDeadUnits();
  },

  addReinforcement: () => {
    const state = get();
    const currentTime = Date.now();

    // Check if we're at the player unit limit (only count alive units)
    const alivePlayerUnits = state.playerUnits.filter((unit: Unit) => unit.isAlive);
    if (alivePlayerUnits.length >= GAME_CONFIG.maxUnits) {
      // Still update the reinforcement timer even if we can't spawn more units
      set({
        reinforcements: {
          ...state.reinforcements,
          nextReinforcementTime: currentTime + state.reinforcements.reinforcementInterval
        }
      });
      return; // Max units reached
    }

    // Select random reinforcement unit
    const randomUnit = SPACE_MARINE_REINFORCEMENT_UNITS[randomInt(0, SPACE_MARINE_REINFORCEMENT_UNITS.length - 1)];
    const newUnit = createUnit(randomUnit, Faction.SPACE_MARINES, getRandomPosition());

    set({
      playerUnits: [...state.playerUnits, newUnit],
      reinforcements: {
        ...state.reinforcements,
        nextReinforcementTime: currentTime + state.reinforcements.reinforcementInterval
      }
    });
  },

  spawnEnemyAttack: () => {
    const state = get();
    const currentTime = Date.now();

    // Check if we're at the enemy unit limit
    const aliveEnemyUnits = state.enemyUnits.filter(unit => unit.isAlive);
    if (aliveEnemyUnits.length >= GAME_CONFIG.maxEnemyUnits) {
      // Still update the attack timer even if we can't spawn more units
      set({
        attacks: {
          ...state.attacks,
          nextAttackTime: currentTime + state.attacks.attackInterval
        }
      });
      return;
    }

    // Spawn 1-3 enemy units, but respect the limit
    const maxSpawnCount = Math.min(3, GAME_CONFIG.maxEnemyUnits - aliveEnemyUnits.length);
    const numEnemies = randomInt(1, maxSpawnCount);
    const newEnemies: Unit[] = [];

    for (let i = 0; i < numEnemies; i++) {
      const randomUnit = ORK_ATTACK_UNITS[randomInt(0, ORK_ATTACK_UNITS.length - 1)];
      const newUnit = createUnit(randomUnit, Faction.ORKS, getRandomPosition());
      newEnemies.push(newUnit);
    }

    set({
      enemyUnits: [...state.enemyUnits, ...newEnemies],
      attacks: {
        ...state.attacks,
        nextAttackTime: currentTime + state.attacks.attackInterval
      }
    });
  },

  processCombat: () => {
    const state = get();
    const currentTime = Date.now();

    // Process player unit movement and attacks
    state.playerUnits.forEach((playerUnit: Unit) => {
      if (!playerUnit.isAlive) return;

      // Find nearest enemy
      const nearestEnemy = state.enemyUnits
        .filter((enemy: Unit) => enemy.isAlive)
        .reduce((nearest: Unit | null, enemy: Unit) => {
          const distance = Math.sqrt(
            Math.pow(enemy.position.x - playerUnit.position.x, 2) +
            Math.pow(enemy.position.y - playerUnit.position.y, 2)
          );
          const nearestDistance = nearest ? Math.sqrt(
            Math.pow(nearest.position.x - playerUnit.position.x, 2) +
            Math.pow(nearest.position.y - playerUnit.position.y, 2)
          ) : Infinity;
          return distance < nearestDistance ? enemy : nearest;
        }, null);

      if (nearestEnemy) {
        const distance = Math.sqrt(
          Math.pow(nearestEnemy.position.x - playerUnit.position.x, 2) +
          Math.pow(nearestEnemy.position.y - playerUnit.position.y, 2)
        );

        if (distance <= playerUnit.stats.range && currentTime - playerUnit.lastAttackTime >= COMBAT_CONFIG.unitAttackCooldown) {
          // Attack if in range and cooldown is ready
          const combatResult = get().attackUnit(playerUnit, nearestEnemy);
          
          // Update enemy health
          const updatedEnemyUnits = state.enemyUnits.map((enemy: Unit) =>
            enemy.id === nearestEnemy.id
              ? { ...enemy, stats: { ...enemy.stats, health: Math.max(0, enemy.stats.health - combatResult.damage) } }
              : enemy
          );

          set({ enemyUnits: updatedEnemyUnits });
        } else if (distance > playerUnit.stats.range && currentTime - playerUnit.lastMoveTime >= COMBAT_CONFIG.unitMoveCooldown) {
          // Move towards enemy if out of range and move cooldown is ready
          const moveSpeed = playerUnit.stats.speed;
          const dx = nearestEnemy.position.x - playerUnit.position.x;
          const dy = nearestEnemy.position.y - playerUnit.position.y;
          const moveDistance = Math.min(moveSpeed, distance - playerUnit.stats.range);
          
          if (moveDistance > 0) {
            const moveX = (dx / distance) * moveDistance;
            const moveY = (dy / distance) * moveDistance;
            
            const newPosition = {
              x: Math.max(50, Math.min(750, playerUnit.position.x + moveX)),
              y: Math.max(50, Math.min(550, playerUnit.position.y + moveY))
            };

            const updatedPlayerUnits = state.playerUnits.map((unit: Unit) =>
              unit.id === playerUnit.id 
                ? { ...unit, position: newPosition, lastMoveTime: currentTime }
                : unit
            );

            set({ playerUnits: updatedPlayerUnits });
          }
        }
      }
    });

    // Process enemy unit movement and attacks
    state.enemyUnits.forEach((enemyUnit: Unit) => {
      if (!enemyUnit.isAlive) return;

      // Find nearest player unit
      const nearestPlayer = state.playerUnits
        .filter((player: Unit) => player.isAlive)
        .reduce((nearest: Unit | null, player: Unit) => {
          const distance = Math.sqrt(
            Math.pow(player.position.x - enemyUnit.position.x, 2) +
            Math.pow(player.position.y - enemyUnit.position.y, 2)
          );
          const nearestDistance = nearest ? Math.sqrt(
            Math.pow(nearest.position.x - enemyUnit.position.x, 2) +
            Math.pow(nearest.position.y - enemyUnit.position.y, 2)
          ) : Infinity;
          return distance < nearestDistance ? player : nearest;
        }, null);

      if (nearestPlayer) {
        const distance = Math.sqrt(
          Math.pow(nearestPlayer.position.x - enemyUnit.position.x, 2) +
          Math.pow(nearestPlayer.position.y - enemyUnit.position.y, 2)
        );

        if (distance <= enemyUnit.stats.range && currentTime - enemyUnit.lastAttackTime >= COMBAT_CONFIG.unitAttackCooldown) {
          // Attack if in range and cooldown is ready
          const combatResult = get().attackUnit(enemyUnit, nearestPlayer);
          
          // Update player health
          const updatedPlayerUnits = state.playerUnits.map((player: Unit) =>
            player.id === nearestPlayer.id
              ? { ...player, stats: { ...player.stats, health: Math.max(0, player.stats.health - combatResult.damage) } }
              : player
          );

          set({ playerUnits: updatedPlayerUnits });
        } else if (distance > enemyUnit.stats.range && currentTime - enemyUnit.lastMoveTime >= COMBAT_CONFIG.unitMoveCooldown) {
          // Move towards player if out of range and move cooldown is ready
          const moveSpeed = enemyUnit.stats.speed;
          const dx = nearestPlayer.position.x - enemyUnit.position.x;
          const dy = nearestPlayer.position.y - enemyUnit.position.y;
          const moveDistance = Math.min(moveSpeed, distance - enemyUnit.stats.range);
          
          if (moveDistance > 0) {
            const moveX = (dx / distance) * moveDistance;
            const moveY = (dy / distance) * moveDistance;
            
            const newPosition = {
              x: Math.max(50, Math.min(750, enemyUnit.position.x + moveX)),
              y: Math.max(50, Math.min(550, enemyUnit.position.y + moveY))
            };

            const updatedEnemyUnits = state.enemyUnits.map((unit: Unit) =>
              unit.id === enemyUnit.id 
                ? { ...unit, position: newPosition, lastMoveTime: currentTime }
                : unit
            );

            set({ enemyUnits: updatedEnemyUnits });
          }
        }
      }
    });
  },

  attackUnit: (attacker: Unit, defender: Unit): CombatResult => {
    const { damage, isCritical } = calculateDamage(
      attacker.stats.attack,
      defender.stats.defense,
      COMBAT_CONFIG.criticalHitChance,
      COMBAT_CONFIG.criticalHitMultiplier
    );

    // Update attacker's last attack time
    const currentTime = Date.now();
    if (attacker.faction === Faction.SPACE_MARINES) {
      const updatedPlayerUnits = get().playerUnits.map(unit =>
        unit.id === attacker.id ? { ...unit, lastAttackTime: currentTime } : unit
      );
      set({ playerUnits: updatedPlayerUnits });
    } else {
      const updatedEnemyUnits = get().enemyUnits.map(unit =>
        unit.id === attacker.id ? { ...unit, lastAttackTime: currentTime } : unit
      );
      set({ enemyUnits: updatedEnemyUnits });
    }

    return {
      attacker,
      defender,
      damage,
      isCritical,
      timestamp: currentTime
    };
  },

  removeDeadUnits: () => {
    const state = get();
    const currentTime = Date.now();

    // Find dead units (health <= 0)
    const deadPlayerUnits = state.playerUnits.filter((unit: Unit) => unit.stats.health <= 0);
    const deadEnemyUnits = state.enemyUnits.filter((unit: Unit) => unit.stats.health <= 0);

    // Award rewards for killed enemies
    deadEnemyUnits.forEach(() => {
      get().addExperience(COMBAT_CONFIG.experiencePerKill);
      get().addCredits(COMBAT_CONFIG.creditsPerKill);
      get().addMaterials(COMBAT_CONFIG.materialsPerKill);
    });

    // Remove dead units from arrays to free up space
    const updatedPlayerUnits = state.playerUnits.filter((unit: Unit) => unit.stats.health > 0);
    const updatedEnemyUnits = state.enemyUnits.filter((unit: Unit) => unit.stats.health > 0);

    // Only update if there are changes
    if (deadPlayerUnits.length > 0 || deadEnemyUnits.length > 0) {
      set({
        playerUnits: updatedPlayerUnits,
        enemyUnits: updatedEnemyUnits
      });
    }
  },

  addExperience: (amount: number) => {
    const state = get();
    set({
      resources: {
        ...state.resources,
        experience: state.resources.experience + amount
      }
    });
  },

  addCredits: (amount: number) => {
    const state = get();
    set({
      resources: {
        ...state.resources,
        credits: state.resources.credits + amount
      }
    });
  },

  addMaterials: (amount: number) => {
    const state = get();
    set({
      resources: {
        ...state.resources,
        materials: state.resources.materials + amount
      }
    });
  },

  saveGame: () => {
    const state = get();
    const saveData = {
      ...state,
      lastSaveTime: Date.now()
    };
    localStorage.setItem('idleWarhammer40k_save', JSON.stringify(saveData));
  },

  loadGame: () => {
    const saveData = localStorage.getItem('idleWarhammer40k_save');
    if (saveData) {
      try {
        const parsedData = JSON.parse(saveData);
        set(parsedData);
      } catch (error) {
        console.error('Failed to load save data:', error);
      }
    }
  }
})); 