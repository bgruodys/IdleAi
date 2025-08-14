import React, { useEffect } from 'react';
import { useGameStore } from './stores/GameStore';
import MainGame from './ui/pages/MainGame';

/**
 * @fileoverview Main App component for IdleWarhammer40k
 * @author AI Assistant
 * @version 1.0.0
 */

function App() {
  const { initializeGame, updateGame, saveGame } = useGameStore();

  useEffect(() => {
    // Initialize the game when the app starts
    initializeGame();

    // Set up the game loop
    const gameLoop = setInterval(() => {
      updateGame(100); // Update every 100ms
    }, 100);

    // Auto-save every 30 seconds
    const autoSave = setInterval(() => {
      saveGame();
    }, 30000);

    // Cleanup on unmount
    return () => {
      clearInterval(gameLoop);
      clearInterval(autoSave);
      saveGame(); // Final save
    };
  }, [initializeGame, updateGame, saveGame]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-warhammer-dark to-warhammer-darker text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-warhammer-gold mb-2">
            IdleWarhammer40k
          </h1>
          <p className="text-lg text-gray-300">
            Space Marines vs Orks - The Eternal Battle
          </p>
        </header>
        
        <MainGame />
      </div>
    </div>
  );
}

export default App; 