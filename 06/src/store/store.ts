import { configureStore, Middleware } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import { saveGameStateToStorage } from '../utils/persistence';

// Middleware to save state to localStorage on every action
const persistenceMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  
  try {
    const state = store.getState();
    
    // Only save if game is started and state is valid
    if (state?.game?.gameStarted && state.game.sessionInfo) {
      saveGameStateToStorage(state.game);
    }
  } catch (error) {
    // Silently fail - don't break the app if persistence fails
    console.error('Persistence middleware error:', error);
  }
  
  return result;
};

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
