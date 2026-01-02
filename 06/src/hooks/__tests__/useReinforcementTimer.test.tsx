import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useReinforcementTimer } from '../useReinforcementTimer';
import gameReducer, { GameState } from '../../store/gameSlice';

const createTestStore = (initialState: Partial<GameState> = {}) => {
  return configureStore({
    reducer: {
      game: gameReducer,
    },
    preloadedState: {
      game: {
        player: null,
        planet: null,
        reinforcements: [],
        gameStarted: false,
        lastReinforcementTime: 0,
        ...initialState,
      },
    },
  });
};

const TestComponent: React.FC<{ gameStarted: boolean }> = ({ gameStarted }) => {
  useReinforcementTimer(gameStarted);
  return <div>Test Component</div>;
};

describe('useReinforcementTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should dispatch addReinforcement immediately when game starts', () => {
    const store = createTestStore({
      gameStarted: true,
      player: {
        id: 'player-1',
        name: 'Test',
        rank: 1,
        rankTitle: 'Recruit',
        arrivedAt: Date.now(),
      },
      planet: {
        id: 'planet-1',
        name: 'Test Planet',
        discoveredAt: Date.now(),
      },
      reinforcements: [],
      lastReinforcementTime: 0,
    });

    render(
      <Provider store={store}>
        <TestComponent gameStarted={true} />
      </Provider>
    );

    // Should dispatch immediately
    jest.advanceTimersByTime(0);

    const state = store.getState();
    expect(state.game.reinforcements.length).toBeGreaterThan(0);
  });

  it('should not dispatch reinforcements when game is not started', () => {
    const store = createTestStore({
      gameStarted: false,
      player: null,
      planet: null,
      reinforcements: [],
      lastReinforcementTime: 0,
    });

    render(
      <Provider store={store}>
        <TestComponent gameStarted={false} />
      </Provider>
    );

    jest.advanceTimersByTime(10000);

    const state = store.getState();
    expect(state.game.reinforcements).toHaveLength(0);
  });

  it('should dispatch reinforcements every 5 seconds', async () => {
    const store = createTestStore({
      gameStarted: true,
      player: {
        id: 'player-1',
        name: 'Test',
        rank: 1,
        rankTitle: 'Recruit',
        arrivedAt: Date.now(),
      },
      planet: {
        id: 'planet-1',
        name: 'Test Planet',
        discoveredAt: Date.now(),
      },
      reinforcements: [],
      lastReinforcementTime: 0,
    });

    render(
      <Provider store={store}>
        <TestComponent gameStarted={true} />
      </Provider>
    );

    // Initial reinforcement
    jest.advanceTimersByTime(0);
    expect(store.getState().game.reinforcements).toHaveLength(1);

    // After 5 seconds
    jest.advanceTimersByTime(5000);
    expect(store.getState().game.reinforcements).toHaveLength(2);

    // After 10 seconds total
    jest.advanceTimersByTime(5000);
    expect(store.getState().game.reinforcements).toHaveLength(3);
  });

  it('should clean up interval on unmount', () => {
    const store = createTestStore({
      gameStarted: true,
      player: {
        id: 'player-1',
        name: 'Test',
        rank: 1,
        rankTitle: 'Recruit',
        arrivedAt: Date.now(),
      },
      planet: {
        id: 'planet-1',
        name: 'Test Planet',
        discoveredAt: Date.now(),
      },
      reinforcements: [],
      lastReinforcementTime: 0,
    });

    const { unmount } = render(
      <Provider store={store}>
        <TestComponent gameStarted={true} />
      </Provider>
    );

    jest.advanceTimersByTime(0);
    expect(store.getState().game.reinforcements).toHaveLength(1);

    unmount();

    // After unmount, no more reinforcements should be added
    const countBefore = store.getState().game.reinforcements.length;
    jest.advanceTimersByTime(10000);
    const countAfter = store.getState().game.reinforcements.length;

    expect(countAfter).toBe(countBefore);
  });
});

