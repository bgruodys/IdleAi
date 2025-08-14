import React from 'react';

/**
 * @fileoverview Combat log component for IdleWarhammer40k
 * @author AI Assistant
 * @version 1.0.0
 */

const CombatLog: React.FC = () => {
  // For now, we'll show a placeholder combat log
  // In a full implementation, this would display actual combat events from the game store
  
  const mockCombatEvents = [
    { id: 1, message: "Tactical Marine attacks Ork Boy for 12 damage", type: "attack", timestamp: Date.now() - 5000 },
    { id: 2, message: "Ork Boy attacks Tactical Marine for 8 damage", type: "attack", timestamp: Date.now() - 4000 },
    { id: 3, message: "Assault Marine joins the battle!", type: "reinforcement", timestamp: Date.now() - 3000 },
    { id: 4, message: "Ork Boy defeated! +5 Credits, +2 Materials, +10 XP", type: "victory", timestamp: Date.now() - 2000 },
    { id: 5, message: "New Ork attack wave incoming!", type: "warning", timestamp: Date.now() - 1000 },
  ];

  const getEventColor = (type: string): string => {
    switch (type) {
      case 'attack': return 'text-red-400';
      case 'reinforcement': return 'text-green-400';
      case 'victory': return 'text-yellow-400';
      case 'warning': return 'text-orange-400';
      default: return 'text-gray-300';
    }
  };

  const formatTime = (timestamp: number): string => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  };

  return (
    <div className="combat-log p-4">
      <h3 className="text-lg font-bold text-gray-200 mb-3">Combat Log</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {mockCombatEvents.map(event => (
          <div key={event.id} className="flex justify-between items-center text-sm">
            <span className={getEventColor(event.type)}>
              {event.message}
            </span>
            <span className="text-gray-500 text-xs">
              {formatTime(event.timestamp)}
            </span>
          </div>
        ))}
        
        {/* Placeholder for when no events */}
        {mockCombatEvents.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>No combat events yet...</p>
            <p className="text-xs mt-1">Combat will begin when units engage</p>
          </div>
        )}
      </div>
      
      {/* Combat Statistics */}
      <div className="mt-4 pt-4 border-t border-gray-600">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="text-gray-400">Units Killed</div>
            <div className="text-green-400 font-bold">0</div>
          </div>
          <div>
            <div className="text-gray-400">Units Lost</div>
            <div className="text-red-400 font-bold">0</div>
          </div>
          <div>
            <div className="text-gray-400">Battle Score</div>
            <div className="text-yellow-400 font-bold">0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombatLog; 