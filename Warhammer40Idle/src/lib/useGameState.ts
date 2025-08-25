import { useState, useEffect, useCallback } from 'react';
import { GameState, Barracks } from '@/types/game';
import { loadGameState, saveGameState, autoSave } from './storage';
import { generateSoldier, upgradeBarracks, getBarracksUpgradeCost, createInitialGameState } from './gameLogic';

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
          const newState = { ...prevState };
          
          // Update each barracks
          newState.barracks = prevState.barracks.map(barracks => {
            if (!barracks.isTraining) return barracks;
            
            const soldiersToAdd = Math.floor(timeDiff * barracks.trainingSpeed);
            const availableSpace = barracks.maxCapacity - barracks.soldiers.length;
            const actualSoldiersToAdd = Math.min(soldiersToAdd, availableSpace);
            
            const newSoldiers = [];
            for (let i = 0; i < actualSoldiersToAdd; i++) {
              newSoldiers.push(generateSoldier(barracks.level));
            }
            
            return {
              ...barracks,
              soldiers: [...barracks.soldiers, ...newSoldiers],
              lastUpdate: now,
            };
          });
          
          // Update totals
          const totalSoldiers = newState.barracks.reduce(
            (sum, barracks) => sum + barracks.soldiers.length, 
            0
          );
          newState.totalSoldiers = totalSoldiers;
          newState.totalExperience = totalSoldiers * 10; // 10 exp per soldier
          
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

  // Toggle barracks training
  const toggleBarracksTraining = useCallback((barracksId: string) => {
    setGameState(prevState => ({
      ...prevState,
      barracks: prevState.barracks.map(barracks =>
        barracks.id === barracksId
          ? { ...barracks, isTraining: !barracks.isTraining }
          : barracks
      ),
    }));
  }, []);

  // Upgrade barracks
  const upgradeBarracksLevel = useCallback((barracksId: string) => {
    setGameState(prevState => {
      const barracks = prevState.barracks.find(b => b.id === barracksId);
      if (!barracks) return prevState;
      
      const upgradeCost = getBarracksUpgradeCost(barracks);
      if (prevState.resources.gold < upgradeCost) return prevState;
      
      return {
        ...prevState,
        resources: {
          ...prevState.resources,
          gold: prevState.resources.gold - upgradeCost,
        },
        barracks: prevState.barracks.map(b =>
          b.id === barracksId ? upgradeBarracks(b) : b
        ),
      };
    });
  }, []);

  // Add new barracks
  const addBarracks = useCallback(() => {
    const newBarracksCost = 500;
    if (gameState.resources.gold < newBarracksCost) return;
    
    setGameState(prevState => ({
      ...prevState,
      resources: {
        ...prevState.resources,
        gold: prevState.resources.gold - newBarracksCost,
      },
      barracks: [
        ...prevState.barracks,
        {
          id: `barracks_${Date.now()}`,
          level: 1,
          soldiers: [],
          maxCapacity: 10,
          trainingSpeed: 1,
          lastUpdate: Date.now(),
          isTraining: true,
        },
      ],
    }));
  }, [gameState.resources.gold]);

  return {
    gameState,
    toggleBarracksTraining,
    upgradeBarracksLevel,
    addBarracks,
  };
}
