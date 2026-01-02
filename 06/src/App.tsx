import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { store } from './store/store';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { startGame, loadGame, addOfflineEarnings, updateSession, addReinforcement, Resources } from './store/gameSlice';
import { useReinforcementTimer } from './hooks/useReinforcementTimer';
import { useResourceTimer } from './hooks/useResourceTimer';
import { GameData } from './components/GameData';
import { OfflineEarningsDialog } from './components/OfflineEarningsDialog';
import { 
  loadGameStateFromStorage, 
  checkActiveSession, 
  setActiveSession, 
  updateSessionActivity,
  clearSession 
} from './utils/persistence';
import { calculateOfflineEarningsForState, calculateOfflineReinforcements, generateOfflineReinforcementsByType } from './utils/offlineEarnings';
import { REINFORCEMENT_TYPES_EXPORT } from './store/gameSlice';
import { initSessionManager, cleanupSessionManager, hasOtherActiveSession } from './utils/sessionManager';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const gameState = useAppSelector((state) => state.game);
  const { gameStarted, sessionInfo, player } = gameState || { gameStarted: false, sessionInfo: null, player: null };
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [offlineEarningsDialog, setOfflineEarningsDialog] = useState<{
    open: boolean;
    timeAwayMs: number;
    earnings: Resources;
    reinforcements: number;
    reinforcementsByType: Map<string, { count: number; totalUnits: number }>;
  }>({
    open: false,
    timeAwayMs: 0,
    earnings: { credits: 0, munitions: 0, promethium: 0, rawMaterials: 0, imperialFavor: 0 },
    reinforcements: 0,
    reinforcementsByType: new Map(),
  });

  useEffect(() => {
    // Initialize game on mount
    const initializeGame = async () => {
      if (isInitialized) return;
      
      try {
        // Try to load saved game first
        const savedState = loadGameStateFromStorage();
        
        if (savedState && savedState.gameStarted && savedState.sessionInfo?.sessionId) {
          // Check for active session
          const { sessionId: activeSessionId, isActive } = checkActiveSession();
          const currentSessionId = savedState.sessionInfo.sessionId;
          
          // Only show error if there's an active session that's DIFFERENT from the one we're loading
          if (isActive && activeSessionId && activeSessionId !== currentSessionId) {
            // Another session is active - prevent this session
            alert('Another game session is already active. Please close other tabs/windows.');
            setIsInitialized(true);
            return;
          }
          
          // Set this as the active session (same session or no active session)
          setActiveSession(currentSessionId);
          
          // Initialize session manager to detect other tabs
          initSessionManager(currentSessionId, () => {
            // Another tab detected - show warning but don't block
            console.warn('Another game session detected in another tab/window');
          });
          
          // Calculate offline earnings
          const currentTime = Date.now();
          const timeAway = currentTime - (savedState.sessionInfo?.lastActiveTime || currentTime);
          const offlineEarnings = calculateOfflineEarningsForState(savedState, currentTime);
          const offlineReinforcements = calculateOfflineReinforcements(
            savedState.lastReinforcementTime,
            currentTime
          );
          
          // Generate offline reinforcements by type for display
          const reinforcementsToAdd = Math.min(offlineReinforcements, 100);
          const reinforcementsByType = generateOfflineReinforcementsByType(
            reinforcementsToAdd,
            REINFORCEMENT_TYPES_EXPORT
          );
          
          // Load the saved state
          dispatch(loadGame(savedState));
          
          // Check if we should show offline earnings dialog
          // Show dialog if away for at least 1 minute and there are earnings or reinforcements
          const MIN_OFFLINE_TIME = 60 * 1000; // 1 minute
          const hasEarnings = offlineEarnings.credits > 0 || 
                            offlineEarnings.munitions > 0 || 
                            offlineEarnings.promethium > 0 || 
                            offlineEarnings.rawMaterials > 0;
          
          if (timeAway >= MIN_OFFLINE_TIME && (hasEarnings || offlineReinforcements > 0)) {
            // Show dialog after state is loaded
            setOfflineEarningsDialog({
              open: true,
              timeAwayMs: timeAway,
              earnings: offlineEarnings,
              reinforcements: offlineReinforcements,
              reinforcementsByType,
            });
          }
          
          // Add offline earnings if any
          if (hasEarnings) {
            dispatch(addOfflineEarnings(offlineEarnings));
          }
          
          // Add offline reinforcements (simplified - just add them all at once)
          for (let i = 0; i < reinforcementsToAdd; i++) {
            dispatch(addReinforcement());
          }
          
          // Update session
          dispatch(updateSession());
        } else {
          // No saved game or invalid state, start new game
          // Clear any old session data first
          clearSession();
          
          // Check if another session is actually active (using BroadcastChannel)
          // Only block if we detect another tab actively running
          const otherSessionActive = hasOtherActiveSession();
          
          if (otherSessionActive) {
            // Another tab is actively running - prevent this session
            alert('Another game session is already active. Please close other tabs/windows.');
            setIsInitialized(true);
            return;
          }
          
          // No active session, start new game
          const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          setActiveSession(newSessionId);
          dispatch(startGame(newSessionId));
          
          // Initialize session manager to detect other tabs
          initSessionManager(newSessionId, () => {
            // Another tab detected - show warning but don't block
            console.warn('Another game session detected in another tab/window');
          });
        }
      } catch (error) {
        console.error('Error initializing game:', error);
        setInitError(error instanceof Error ? error.message : 'Unknown error');
        // On error, try to start a new game
        try {
          const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          setActiveSession(newSessionId);
          dispatch(startGame(newSessionId));
        } catch (fallbackError) {
          console.error('Failed to start game even after error:', fallbackError);
          setInitError('Failed to initialize game. Please refresh the page.');
        }
      }
      
      setIsInitialized(true);
    };

    initializeGame();
  }, [dispatch, isInitialized]);

  // Update session activity periodically
  useEffect(() => {
    if (!gameStarted || !sessionInfo) return;
    
    const interval = setInterval(() => {
      updateSessionActivity(sessionInfo.sessionId);
      dispatch(updateSession());
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, [gameStarted, sessionInfo, dispatch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sessionInfo?.sessionId) {
        cleanupSessionManager(sessionInfo.sessionId);
      }
      clearSession();
    };
  }, [sessionInfo]);

    // Set up reinforcement timer
    useReinforcementTimer(gameStarted);
    
    // Set up resource generation timer
    useResourceTimer(gameStarted);

  // Don't render until initialized to prevent crashes
  if (!isInitialized) {
    return (
      <Box p={2}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  // Show error if initialization failed
  if (initError) {
    return (
      <Box p={2}>
        <Typography variant="h6" color="error">Error</Typography>
        <Typography>{initError}</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Try refreshing the page or clearing your browser's localStorage.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <GameData />
      {player && (
        <OfflineEarningsDialog
          open={offlineEarningsDialog.open}
          onClose={() => setOfflineEarningsDialog({ ...offlineEarningsDialog, open: false })}
          timeAwayMs={offlineEarningsDialog.timeAwayMs}
          earnings={offlineEarningsDialog.earnings}
          reinforcements={offlineEarningsDialog.reinforcements}
          reinforcementsByType={offlineEarningsDialog.reinforcementsByType}
          playerRank={player.rank}
          playerRankTitle={player.rankTitle}
        />
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;

