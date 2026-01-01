import React, { createContext, useContext, useReducer, useEffect } from 'react';

const GameContext = createContext();

// Initial game state
const initialState = {
  resources: {
    plasteel: 0,
    adamantium: 0,
    promethium: 0,
    ceramite: 0,
    gold: 0
  },
  mining: {
    plasteelMine: { level: 1, efficiency: 1, active: true },
    adamantiumMine: { level: 1, efficiency: 1, active: false },
    promethiumMine: { level: 1, efficiency: 1, active: false },
    ceramiteMine: { level: 1, efficiency: 1, active: false },
    goldMine: { level: 1, efficiency: 1, active: false }
  },
  upgrades: {
    miningEfficiency: 1,
    storageCapacity: 1000,
    offlineMultiplier: 1
  },
  lastSave: Date.now(),
  totalPlayTime: 0,
  offlineSummary: null
};

// Game actions
const gameActions = {
  UPDATE_RESOURCES: 'UPDATE_RESOURCES',
  GENERATE_RESOURCES: 'GENERATE_RESOURCES',
  UPGRADE_MINE: 'UPGRADE_MINE',
  TOGGLE_MINE: 'TOGGLE_MINE',
  PURCHASE_UPGRADE: 'PURCHASE_UPGRADE',
  LOAD_GAME: 'LOAD_GAME',
  SAVE_GAME: 'SAVE_GAME',
  UPDATE_PLAY_TIME: 'UPDATE_PLAY_TIME',
  CALCULATE_OFFLINE_PROGRESS: 'CALCULATE_OFFLINE_PROGRESS',
  SHOW_OFFLINE_SUMMARY: 'SHOW_OFFLINE_SUMMARY'
};

// Game reducer
function gameReducer(state, action) {
  switch (action.type) {
    case gameActions.UPDATE_RESOURCES:
      return {
        ...state,
        resources: {
          ...state.resources,
          ...action.payload
        }
      };
    
    case gameActions.GENERATE_RESOURCES:
      const activeMines = Object.entries(state.mining).filter(([_, mine]) => mine.active);
      const newResources = { ...state.resources };
      
      activeMines.forEach(([mineName, mine]) => {
        const resourceType = mineName.replace('Mine', '');
        const baseProduction = 1;
        const totalProduction = baseProduction * mine.level * mine.efficiency * state.upgrades.miningEfficiency;
        const productionAmount = totalProduction / 10; // Per second
        
        // Add resources without storage limitations
        newResources[resourceType] += productionAmount;
      });
      
      return {
        ...state,
        resources: newResources
      };
    
    case gameActions.UPGRADE_MINE:
      const { mineType, cost } = action.payload;
      return {
        ...state,
        resources: {
          ...state.resources,
          [cost.type]: Math.max(0, state.resources[cost.type] - cost.amount)
        },
        mining: {
          ...state.mining,
          [mineType]: {
            ...state.mining[mineType],
            level: state.mining[mineType].level + 1,
            efficiency: state.mining[mineType].efficiency + 0.2
          }
        },
        lastSave: Date.now() // Force save on action
      };
    
    case gameActions.TOGGLE_MINE:
      const { mineName } = action.payload;
      return {
        ...state,
        mining: {
          ...state.mining,
          [mineName]: {
            ...state.mining[mineName],
            active: !state.mining[mineName].active
          }
        },
        lastSave: Date.now() // Force save on action
      };
    
    case gameActions.PURCHASE_UPGRADE:
      const { upgradeType, cost: upgradeCost } = action.payload;
      return {
        ...state,
        resources: {
          ...state.resources,
          [upgradeCost.type]: Math.max(0, state.resources[upgradeCost.type] - upgradeCost.amount)
        },
        upgrades: {
          ...state.upgrades,
          [upgradeType]: state.upgrades[upgradeType] + action.payload.increase
        },
        lastSave: Date.now() // Force save on action
      };
    
    case gameActions.LOAD_GAME:
      return {
        ...action.payload,
        lastSave: Date.now()
      };
    
    case gameActions.SAVE_GAME:
      return {
        ...state,
        lastSave: Date.now()
      };
    
    case gameActions.CALCULATE_OFFLINE_PROGRESS:
      return {
        ...state,
        totalPlayTime: state.totalPlayTime + action.payload.offlineTime
      };
    
    case gameActions.UPDATE_PLAY_TIME:
      return {
        ...state,
        totalPlayTime: state.totalPlayTime + 1000
      };
    
    case gameActions.SHOW_OFFLINE_SUMMARY:
      return {
        ...state,
        offlineSummary: action.payload
      };
    
    default:
      return state;
  }
}

// Cookie utility functions
const setCookie = (name, value, days = 365) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      try {
        return JSON.parse(decodeURIComponent(c.substring(nameEQ.length, c.length)));
      } catch (error) {
        console.error('Failed to parse cookie:', error);
        return null;
      }
    }
  }
  return null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Calculate offline progress function (moved outside component to be accessible)
const calculateOfflineProgress = (savedGame, offlineTime) => {
  const offlineSeconds = offlineTime / 1000;
  const offlineMultiplier = savedGame.upgrades.offlineMultiplier;
  
  const newResources = { ...savedGame.resources };
  const activeMines = Object.entries(savedGame.mining).filter(([_, mine]) => mine.active);
  
  activeMines.forEach(([mineName, mine]) => {
    const resourceType = mineName.replace('Mine', '');
    const baseProduction = 1;
    const totalProduction = baseProduction * mine.level * mine.efficiency * savedGame.upgrades.miningEfficiency;
    const offlineProduction = (totalProduction * offlineSeconds * offlineMultiplier) / 10;
    
    // Add offline resources without storage limitations
    newResources[resourceType] += offlineProduction;
  });
  
  return {
    ...savedGame,
    resources: newResources,
    totalPlayTime: savedGame.totalPlayTime + offlineTime
  };
};

// Game provider component
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load game from localStorage on mount
  useEffect(() => {
    console.log('=== GAME LOADING STARTED ===');
    
    // Add a small delay to ensure cookies are fully accessible
    const loadGame = () => {
      try {
        const savedGame = getCookie('idleWarhammer40k');
        console.log('Raw cookie data:', savedGame ? 'Found' : 'Not found');
        console.log('All cookies:', document.cookie);
        
                 if (savedGame) {
           try {
             // savedGame is already parsed from getCookie, no need to parse again
             const parsedGame = savedGame;
             console.log('Parsed game data:', parsedGame);
            
            // Validate the parsed data has required fields
            if (!parsedGame.resources || !parsedGame.mining || !parsedGame.upgrades) {
              console.error('Invalid saved game data - missing required fields');
              console.log('Attempting to repair corrupted data...');
              
              // Try to repair the data by merging with initial state
              const repairedGame = {
                ...initialState,
                ...parsedGame,
                resources: { ...initialState.resources, ...(parsedGame.resources || {}) },
                mining: { ...initialState.mining, ...(parsedGame.mining || {}) },
                upgrades: { ...initialState.upgrades, ...(parsedGame.upgrades || {}) },
                lastSave: parsedGame.lastSave || Date.now(),
                totalPlayTime: parsedGame.totalPlayTime || 0
              };
              
              console.log('Repaired game data:', repairedGame);
              dispatch({ type: gameActions.LOAD_GAME, payload: repairedGame });
              return;
            }
            
            const offlineTime = Date.now() - parsedGame.lastSave;
            console.log('Loading saved game, offline time:', offlineTime, 'ms');
            
            // Always load the saved game data first
            console.log('Loading saved game data...');
            dispatch({ type: gameActions.LOAD_GAME, payload: parsedGame });
            
            // Calculate offline progress only if more than 1 second has passed
            if (offlineTime > 1000) { // More than 1 second
              console.log('Calculating offline progress...');
              const offlineProgress = calculateOfflineProgress(parsedGame, offlineTime);
              console.log('Offline progress result:', offlineProgress);
              
              const offlineSummary = {
                timeOffline: offlineTime,
                resourcesGained: {},
                minesActive: Object.values(parsedGame.mining).filter(mine => mine.active).length
              };
              
              // Calculate resources gained
              Object.entries(parsedGame.resources).forEach(([resourceType, oldAmount]) => {
                const newAmount = offlineProgress.resources[resourceType];
                const gained = newAmount - oldAmount;
                if (gained > 0) {
                  offlineSummary.resourcesGained[resourceType] = gained;
                }
              });
              
              console.log('Offline summary calculated:', offlineSummary);
              
              // Apply offline progress
              console.log('Applying offline progress...');
              dispatch({ type: gameActions.LOAD_GAME, payload: offlineProgress });
              console.log('Dispatching SHOW_OFFLINE_SUMMARY');
              dispatch({ type: gameActions.SHOW_OFFLINE_SUMMARY, payload: offlineSummary });
            } else {
              console.log('No offline progress to calculate (less than 1 second)');
            }
                     } catch (error) {
             console.error('Failed to process saved game data:', error);
             // If there's an error loading, start with initial state and save it
             console.log('Starting with initial game state due to load error');
             try {
               const initialGameData = {
                 ...initialState,
                 lastSave: Date.now()
               };
               setCookie('idleWarhammer40k', initialGameData);
               console.log('Initial game state saved after load error');
             } catch (saveError) {
               console.error('Failed to save initial game state after load error:', saveError);
             }
           }
        } else {
          // No saved game found, start with initial state and save it
          console.log('No saved game found, starting with initial state');
          try {
            const initialGameData = {
              ...initialState,
              lastSave: Date.now()
            };
            setCookie('idleWarhammer40k', initialGameData);
            console.log('Initial game state saved as baseline in cookies');
          } catch (error) {
            console.error('Failed to save initial game state to cookies:', error);
          }
        }
             } catch (error) {
         console.error('Error accessing cookies:', error);
         console.log('Starting with initial game state due to cookie error');
       }
    };
    
             // Small delay to ensure cookies are ready
    setTimeout(loadGame, 100);
    
    console.log('=== GAME LOADING COMPLETED ===');
  }, []);

  // Save game to cookies with strict throttling - only on meaningful state changes
  useEffect(() => {
    // Don't save immediately on mount - wait for first meaningful state change
    if (state.lastSave === initialState.lastSave) {
      return;
    }
    
    // Only save if this is an action-triggered save (lastSave was just updated)
    // This prevents saves from resource generation loops
    const now = Date.now();
    const timeSinceLastSave = now - state.lastSave;
    
    // If lastSave was updated very recently (within 100ms), this is an action save
    // Otherwise, skip this save (let periodic save handle it)
    if (timeSinceLastSave > 100) {
      return;
    }
    
    try {
      const gameData = {
        ...state,
        lastSave: now // Use current timestamp
      };
      setCookie('idleWarhammer40k', gameData);
      console.log('Action-triggered save completed:', new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Failed to save game to cookies:', error);
    }
  }, [state]);

  // Save game before page unload
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      try {
        // Force a synchronous save to cookies
        const gameData = {
          ...state,
          lastSave: Date.now()
        };
        setCookie('idleWarhammer40k', gameData);
        console.log('Game saved to cookies before unload - Data size:', JSON.stringify(gameData).length);
        
        // Verify the save worked
        const savedData = getCookie('idleWarhammer40k');
        if (savedData && savedData.lastSave === gameData.lastSave) {
          console.log('Cookie save verification successful');
        } else {
          console.error('Cookie save verification failed - data mismatch');
        }
      } catch (error) {
        console.error('Failed to save game to cookies before unload:', error);
      }
    };

    const handlePageHide = () => {
      try {
        const gameData = {
          ...state,
          lastSave: Date.now()
        };
        setCookie('idleWarhammer40k', gameData);
        console.log('Game saved to cookies on page hide');
      } catch (error) {
        console.error('Failed to save game to cookies on page hide:', error);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        try {
          const gameData = {
            ...state,
            lastSave: Date.now()
          };
          setCookie('idleWarhammer40k', gameData);
          console.log('Game saved to cookies on visibility change to hidden');
        } catch (error) {
          console.error('Failed to save game to cookies on visibility change:', error);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handlePageHide);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handlePageHide);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [state]);

  // Game loop for resource generation
  useEffect(() => {
    const gameLoop = setInterval(() => {
      dispatch({ type: gameActions.GENERATE_RESOURCES });
    }, 100);

    return () => clearInterval(gameLoop);
  }, []);

  // Timer for play time tracking only
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: gameActions.UPDATE_PLAY_TIME });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Periodic save every 5 seconds (independent of state changes)
  useEffect(() => {
    const saveTimer = setInterval(() => {
      const now = Date.now();
      const timeSinceLastSave = now - state.lastSave;
      
      // Only save if more than 1 second has passed since last save
      if (timeSinceLastSave >= 1000) {
        try {
          const gameData = {
            ...state,
            lastSave: now
          };
          setCookie('idleWarhammer40k', gameData);
          console.log('Periodic save completed:', new Date().toLocaleTimeString());
        } catch (error) {
          console.error('Failed to perform periodic save:', error);
        }
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(saveTimer);
  }, [state]);



  const value = {
    state,
    dispatch,
    actions: gameActions
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook to use game context
export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}
