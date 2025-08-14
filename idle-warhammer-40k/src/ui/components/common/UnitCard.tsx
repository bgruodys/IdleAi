import React from 'react';
import { Unit } from '../../../models/types/GameTypes';

/**
 * @fileoverview Unit card component for IdleWarhammer40k
 * @author AI Assistant
 * @version 1.0.0
 */

interface UnitCardProps {
  unit: Unit;
  faction: 'space-marines' | 'orks';
}

const UnitCard: React.FC<UnitCardProps> = ({ unit, faction }) => {
  const healthPercentage = (unit.stats.health / unit.stats.maxHealth) * 100;
  
  const getHealthColor = (percentage: number): string => {
    if (percentage > 60) return 'bg-green-500';
    if (percentage > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getFactionColors = (faction: string) => {
    if (faction === 'space-marines') {
      return {
        bg: 'bg-space-marine-700',
        border: 'border-space-marine-400',
        text: 'text-space-marine-200'
      };
    } else {
      return {
        bg: 'bg-ork-700',
        border: 'border-ork-400',
        text: 'text-ork-200'
      };
    }
  };

  const colors = getFactionColors(faction);

  return (
    <div className={`unit-card p-3 ${colors.bg} border ${colors.border} rounded`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-bold ${colors.text} text-sm`}>
          {unit.name}
        </h3>
        <span className="text-xs text-gray-400">
          Lv.{unit.level}
        </span>
      </div>
      
      {/* Health Bar */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-gray-300 mb-1">
          <span>HP</span>
          <span>{unit.stats.health}/{unit.stats.maxHealth}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`health-bar h-2 rounded-full transition-all duration-300 ${getHealthColor(healthPercentage)}`}
            style={{ width: `${healthPercentage}%` }}
          />
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">ATK:</span>
          <span className="text-red-400 font-mono">{unit.stats.attack}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">DEF:</span>
          <span className="text-blue-400 font-mono">{unit.stats.defense}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">SPD:</span>
          <span className="text-green-400 font-mono">{unit.stats.speed}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">RNG:</span>
          <span className="text-purple-400 font-mono">{unit.stats.range}</span>
        </div>
      </div>
      
      {/* Experience */}
      <div className="mt-2 text-xs text-gray-400">
        XP: {unit.experience}
      </div>
    </div>
  );
};

export default UnitCard; 