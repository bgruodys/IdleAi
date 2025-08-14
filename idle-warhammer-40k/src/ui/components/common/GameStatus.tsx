import React from 'react';

/**
 * @fileoverview Game status component for IdleWarhammer40k
 * @author AI Assistant
 * @version 1.0.0
 */

interface GameStatusProps {
  playerUnits: number;
  enemyUnits: number;
  timeUntilReinforcement: number;
  timeUntilAttack: number;
}

const GameStatus: React.FC<GameStatusProps> = ({
  playerUnits,
  enemyUnits,
  timeUntilReinforcement,
  timeUntilAttack
}) => {
  const formatTime = (milliseconds: number): string => {
    const seconds = Math.ceil(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${remainingSeconds}s`;
  };

  const getReinforcementColor = (time: number): string => {
    if (time < 10000) return 'text-green-400 pulse-gold';
    if (time < 30000) return 'text-yellow-400';
    return 'text-blue-400';
  };

  const getEnemyWaveColor = (time: number): string => {
    if (time < 3000) return 'text-red-400 pulse-gold';
    if (time < 8000) return 'text-orange-400';
    return 'text-gray-400';
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-600">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {/* Player Units */}
        <div className="space-y-2">
          <div className="text-sm text-gray-400">Space Marines</div>
          <div className="text-2xl font-bold text-space-marine-400">
            {playerUnits}
          </div>
        </div>

        {/* Enemy Units */}
        <div className="space-y-2">
          <div className="text-sm text-gray-400">Ork Forces</div>
          <div className="text-2xl font-bold text-ork-400">
            {enemyUnits}
          </div>
        </div>

        {/* Reinforcement Timer */}
        <div className="space-y-2">
          <div className="text-sm text-gray-400">Next Reinforcement</div>
          <div className={`text-xl font-bold ${getReinforcementColor(timeUntilReinforcement)}`}>
            {formatTime(timeUntilReinforcement)}
          </div>
        </div>

        {/* Enemy Reinforcement Timer */}
        <div className="space-y-2">
          <div className="text-sm text-gray-400">Next Ork Wave</div>
          <div className={`text-xl font-bold ${getEnemyWaveColor(timeUntilAttack)}`}>
            {formatTime(timeUntilAttack)}
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="mt-4 flex justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-space-marine-500 rounded-full"></div>
          <span className="text-sm text-gray-300">Space Marines</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-ork-500 rounded-full"></div>
          <span className="text-sm text-gray-300">Ork Forces</span>
        </div>
      </div>
    </div>
  );
};

export default GameStatus; 