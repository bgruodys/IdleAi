import React from 'react';
import { useGameStore } from '../../stores/GameStore';
import ResourceDisplay from '../components/common/ResourceDisplay';
import UnitCard from '../components/common/UnitCard';
import CombatLog from '../components/common/CombatLog';
import GameStatus from '../components/common/GameStatus';

/**
 * @fileoverview Main game page component for IdleWarhammer40k
 * @author AI Assistant
 * @version 1.0.0
 */

const MainGame: React.FC = () => {
  const {
    playerUnits,
    enemyUnits,
    resources,
    reinforcements,
    attacks,
    gameTime
  } = useGameStore();

  const alivePlayerUnits = playerUnits.filter(unit => unit.isAlive);
  const aliveEnemyUnits = enemyUnits.filter(unit => unit.isAlive);

  const timeUntilReinforcement = Math.max(0, reinforcements.nextReinforcementTime - Date.now());
  const timeUntilAttack = Math.max(0, attacks.nextAttackTime - Date.now());

  return (
    <div className="game-container p-6 max-w-7xl mx-auto">
      {/* Game Status Bar */}
      <div className="mb-6">
        <GameStatus
          playerUnits={alivePlayerUnits.length}
          enemyUnits={aliveEnemyUnits.length}
          timeUntilReinforcement={timeUntilReinforcement}
          timeUntilAttack={timeUntilAttack}
        />
      </div>

      {/* Resources Display */}
      <div className="mb-6">
        <ResourceDisplay resources={resources} />
      </div>

      {/* Main Game Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Player Units */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-space-marine-800 to-space-marine-900 p-4 rounded-lg border border-space-marine-500">
            <h2 className="text-xl font-bold text-space-marine-200 mb-4">
              Space Marines ({alivePlayerUnits.length})
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {alivePlayerUnits.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  No Space Marines deployed. Reinforcements incoming...
                </p>
              ) : (
                alivePlayerUnits.map(unit => (
                  <UnitCard
                    key={unit.id}
                    unit={unit}
                    faction="space-marines"
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Battlefield */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-600 min-h-96">
            <h2 className="text-xl font-bold text-gray-200 mb-4">
              Battlefield
            </h2>
            <div className="relative w-full h-80 bg-gradient-to-b from-gray-700 to-gray-800 rounded border border-gray-600 overflow-hidden">
              {/* Render units on battlefield */}
              {alivePlayerUnits.map(unit => (
                <div
                  key={unit.id}
                  className="absolute w-4 h-4 bg-space-marine-500 rounded-full border-2 border-space-marine-300"
                  style={{
                    left: `${(unit.position.x / 800) * 100}%`,
                    top: `${(unit.position.y / 600) * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  title={`${unit.name} - HP: ${unit.stats.health}/${unit.stats.maxHealth}`}
                />
              ))}
              {aliveEnemyUnits.map(unit => (
                <div
                  key={unit.id}
                  className="absolute w-4 h-4 bg-ork-500 rounded-full border-2 border-ork-300"
                  style={{
                    left: `${(unit.position.x / 800) * 100}%`,
                    top: `${(unit.position.y / 600) * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  title={`${unit.name} - HP: ${unit.stats.health}/${unit.stats.maxHealth}`}
                />
              ))}
              
              {/* Battlefield grid lines */}
              <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute top-0 bottom-0 border-l border-gray-500"
                    style={{ left: `${(i + 1) * 12.5}%` }}
                  />
                ))}
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute left-0 right-0 border-t border-gray-500"
                    style={{ top: `${(i + 1) * 16.67}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enemy Units */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-ork-800 to-ork-900 p-4 rounded-lg border border-ork-500">
            <h2 className="text-xl font-bold text-ork-200 mb-4">
              Ork Forces ({aliveEnemyUnits.length})
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {aliveEnemyUnits.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  No Orks detected. Preparing for next attack...
                </p>
              ) : (
                aliveEnemyUnits.map(unit => (
                  <UnitCard
                    key={unit.id}
                    unit={unit}
                    faction="orks"
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Combat Log */}
      <div className="mt-6">
        <CombatLog />
      </div>

      {/* Game Info */}
      <div className="mt-6 text-center text-sm text-gray-400">
        <p>Game Time: {Math.floor(gameTime / 1000)}s</p>
        <p className="mt-2">
          Space Marines receive reinforcements every minute. Orks attack every 10 seconds.
        </p>
      </div>
    </div>
  );
};

export default MainGame; 