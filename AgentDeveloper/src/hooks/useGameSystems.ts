import { useCallback } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { Unit, GameStatus } from '@/types/GameState';
import { IMPERIAL_RANKS } from '@/utils/constants';

/**
 * Custom React hooks for game systems
 * Provides easy access to game functionality from components
 */

// Player management hooks
export const usePlayerState = () => {
  const player = useGameStore(state => state.player);
  const updatePlayer = useGameStore(state => state.updatePlayer);
  const addRankPoints = useGameStore(state => state.addRankPoints);
  const recordKill = useGameStore(state => state.recordKill);
  const promoteRank = useGameStore(state => state.promoteRank);
  
  return {
    player,
    updatePlayer,
    addRankPoints,
    recordKill,
    promoteRank,
  };
};

// Battlefield management hooks
export const useBattlefield = () => {
  const battlefield = useGameStore(state => state.battlefield);
  const updateBattlefield = useGameStore(state => state.updateBattlefield);
  const addUnit = useGameStore(state => state.addUnit);
  const removeUnit = useGameStore(state => state.removeUnit);
  const updateUnit = useGameStore(state => state.updateUnit);
  const clearDeadUnits = useGameStore(state => state.clearDeadUnits);
  
  const addMultipleUnits = useCallback((units: Unit[]) => {
    units.forEach(unit => addUnit(unit));
  }, [addUnit]);
  
  const removeMultipleUnits = useCallback((unitIds: string[]) => {
    unitIds.forEach(id => removeUnit(id));
  }, [removeUnit]);
  
  return {
    battlefield,
    updateBattlefield,
    addUnit,
    removeUnit,
    updateUnit,
    clearDeadUnits,
    addMultipleUnits,
    removeMultipleUnits,
  };
};

// Game timer hooks
export const useGameTimers = () => {
  const timers = useGameStore(state => state.timers);
  const updateTimers = useGameStore(state => state.updateTimers);
  const resetReinforcementTimer = useGameStore(state => state.resetReinforcementTimer);
  const resetAssaultTimer = useGameStore(state => state.resetAssaultTimer);
  const getTimeToNextReinforcement = useGameStore(state => state.getTimeToNextReinforcement);
  const getTimeToNextAssault = useGameStore(state => state.getTimeToNextAssault);
  
  const getRemainingReinforcementTime = useCallback(() => {
    return Math.ceil(getTimeToNextReinforcement() / 1000); // Convert to seconds
  }, [getTimeToNextReinforcement]);
  
  const getRemainingAssaultTime = useCallback(() => {
    return Math.ceil(getTimeToNextAssault() / 1000); // Convert to seconds
  }, [getTimeToNextAssault]);
  
  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }, []);
  
  return {
    timers,
    updateTimers,
    resetReinforcementTimer,
    resetAssaultTimer,
    getRemainingReinforcementTime,
    getRemainingAssaultTime,
    formatTime,
  };
};

// Game lifecycle hooks
export const useGameLifecycle = () => {
  const status = useGameStore(state => state.status);
  const isPaused = useGameStore(state => state.isPaused);
  const isInitialized = useGameStore(state => state.isInitialized);
  const initializeGame = useGameStore(state => state.initializeGame);
  const setGameStatus = useGameStore(state => state.setGameStatus);
  const pause = useGameStore(state => state.pause);
  const resume = useGameStore(state => state.resume);
  const reset = useGameStore(state => state.reset);
  
  const startGame = useCallback(() => {
    if (!isInitialized) {
      initializeGame();
    }
    setGameStatus(GameStatus.RUNNING);
  }, [isInitialized, initializeGame, setGameStatus]);
  
  const stopGame = useCallback(() => {
    setGameStatus(GameStatus.STOPPED);
  }, [setGameStatus]);
  
  const togglePause = useCallback(() => {
    if (isPaused) {
      resume();
    } else {
      pause();
    }
  }, [isPaused, pause, resume]);
  
  return {
    status,
    isPaused,
    isInitialized,
    startGame,
    stopGame,
    togglePause,
    reset,
  };
};

// Statistics hooks
export const useGameStatistics = () => {
  const statistics = useGameStore(state => state.statistics);
  const updateStatistics = useGameStore(state => state.updateStatistics);
  const incrementStat = useGameStore(state => state.incrementStat);
  
  const getKillRate = useCallback(() => {
    const playtimeHours = statistics.totalPlayTime / (1000 * 60 * 60);
    return playtimeHours > 0 ? statistics.enemiesKilled / playtimeHours : 0;
  }, [statistics.totalPlayTime, statistics.enemiesKilled]);
  
  const getWinRate = useCallback(() => {
    const totalDefenses = statistics.defensesWon + statistics.defensesLost;
    return totalDefenses > 0 ? (statistics.defensesWon / totalDefenses) * 100 : 0;
  }, [statistics.defensesWon, statistics.defensesLost]);
  
  const getSurvivalRate = useCallback(() => {
    const totalUnits = statistics.unitsLost + statistics.enemiesKilled;
    return totalUnits > 0 ? ((totalUnits - statistics.unitsLost) / totalUnits) * 100 : 100;
  }, [statistics.unitsLost, statistics.enemiesKilled]);
  
  return {
    statistics,
    updateStatistics,
    incrementStat,
    getKillRate,
    getWinRate,
    getSurvivalRate,
  };
};

// Settings hooks
export const useGameSettings = () => {
  const settings = useGameStore(state => state.settings);
  const updateSettings = useGameStore(state => state.updateSettings);
  
  const toggleSound = useCallback(() => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  }, [settings.soundEnabled, updateSettings]);
  
  const toggleMusic = useCallback(() => {
    updateSettings({ musicEnabled: !settings.musicEnabled });
  }, [settings.musicEnabled, updateSettings]);
  
  const setVolume = useCallback((type: 'master' | 'sfx' | 'music', volume: number) => {
    updateSettings({
      volume: {
        ...settings.volume,
        [type]: Math.max(0, Math.min(1, volume)),
      },
    });
  }, [settings.volume, updateSettings]);
  
  const setBattleSpeed = useCallback((speed: number) => {
    updateSettings({ 
      battleSpeed: Math.max(0.1, Math.min(3.0, speed)) 
    });
  }, [updateSettings]);
  
  return {
    settings,
    updateSettings,
    toggleSound,
    toggleMusic,
    setVolume,
    setBattleSpeed,
  };
};

// Rank progression hooks
export const useRankProgression = () => {
  const player = useGameStore(state => state.player);
  const getRankProgress = useGameStore(state => state.getRankProgress);
  const getReinforcementCount = useGameStore(state => state.getReinforcementCount);
  
  const progress = getRankProgress();
  const reinforcementCount = getReinforcementCount();
  
  const getRankTitle = useCallback((rank: number) => {
    // Ensure rank is within valid range
    const rankIndex = Math.max(0, Math.min(rank - 1, IMPERIAL_RANKS.length - 1));
    return IMPERIAL_RANKS[rankIndex];
  }, []);
  
  const getProgressPercentage = useCallback(() => {
    return progress.percentage;
  }, [progress.percentage]);
  
  const isMaxRank = useCallback(() => {
    return player.rank >= 20;
  }, [player.rank]);
  
  return {
    player,
    progress,
    reinforcementCount,
    getRankTitle,
    getProgressPercentage,
    isMaxRank,
  };
};

// Combined game state hook for components that need multiple systems
export const useGameState = () => {
  const gameTime = useGameStore(state => state.gameTime);
  const updateGameTime = useGameStore(state => state.updateGameTime);
  const lastUpdate = useGameStore(state => state.lastUpdate);
  const version = useGameStore(state => state.version);
  
  const playerState = usePlayerState();
  const battlefield = useBattlefield();
  const timers = useGameTimers();
  const lifecycle = useGameLifecycle();
  const statistics = useGameStatistics();
  const settings = useGameSettings();
  const rankProgression = useRankProgression();
  
  return {
    gameTime,
    updateGameTime,
    lastUpdate,
    version,
    player: playerState,
    battlefield,
    timers,
    lifecycle,
    statistics,
    settings,
    rank: rankProgression,
  };
};
