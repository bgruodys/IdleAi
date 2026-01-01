import { useState, useEffect, useCallback } from 'react';
import { GameState } from '@/types/game';
import { loadGameState, saveGameState, autoSave } from './storage';
import { spawnSoldierIfReady, createInitialGameState } from './gameLogic';
import { updateBattleField, getBattleResult, createBattleField } from './battleLogic';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => {
    if (typeof window === 'undefined') {
      return createInitialGameState();
    }
    return loadGameState();
  });
  const [lastUpdate, setLastUpdate] = useState(() => {
    if (typeof window === 'undefined') {
      return Date.now();
    }
    return Date.now();
  });

  // Auto-save and update game state
  useEffect(() => {
    if (typeof window === 'undefined') return; // Server-side rendering guard
    
    const interval = setInterval(() => {
      try {
        const now = Date.now();
        const timeDiff = (now - lastUpdate) / 1000; // seconds
        
        setGameState(prevState => {
          let newState = { ...prevState };
          
          // Check if it's time to spawn a new soldier
          newState = spawnSoldierIfReady(newState);
          
          // Update battlefield continuously
          newState.battleField = updateBattleField(newState.battleField, []);
          
          // Check battle result
          const battleResult = getBattleResult(newState.battleField);
          if (battleResult.winner !== 'ongoing') {
            // Battle ended - reset and continue
            newState.battleField = createBattleField();
            newState.battleStats.totalBattles += 1;
            
            if (battleResult.winner === 'soldiers') {
              newState.battleStats.battlesWon += 1;
              newState.resources.experience += battleResult.experienceGained;
              newState.resources.gold += battleResult.goldGained;
            }
            
            newState.battleStats.soldiersLost += battleResult.soldiersLost;
            newState.battleStats.orcsKilled += battleResult.orcsKilled;
          }
          
          return newState;
        });
        
        setLastUpdate(now);
      } catch (error) {
        console.error('Error updating game state:', error);
      }
    }, 1000); // Update every second
    
    return () => clearInterval(interval);
  }, [lastUpdate]);

  // Auto-save effect
  useEffect(() => {
    if (typeof window === 'undefined') return; // Server-side rendering guard
    
    const saveInterval = setInterval(() => {
      try {
        autoSave(gameState);
      } catch (error) {
        console.error('Error auto-saving game state:', error);
      }
    }, 5000); // Check for auto-save every 5 seconds
    
    return () => clearInterval(saveInterval);
  }, [gameState]);

  // Save on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        try {
          saveGameState(gameState);
        } catch (error) {
          console.error('Error saving game state on unmount:', error);
        }
      }
    };
  }, [gameState]);

  return {
    gameState,
  };
}
