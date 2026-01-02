import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { GameData } from '../GameData';
import gameReducer from '../../store/gameSlice';

const createTestStore = (initialState: any) => {
  return configureStore({
    reducer: {
      game: gameReducer,
    },
    preloadedState: {
      game: {
        player: null,
        planet: null,
        reinforcements: [],
        resources: {
          credits: 0,
          munitions: 0,
          promethium: 0,
          rawMaterials: 0,
          imperialFavor: 0,
        },
        gameStarted: false,
        lastReinforcementTime: 0,
        sessionInfo: null,
        ...initialState,
      },
    },
  });
};

describe('GameData', () => {
  it('should display game not started message when game is not started', () => {
    const store = createTestStore({
      gameStarted: false,
      player: null,
      planet: null,
      reinforcements: [],
      lastReinforcementTime: 0,
    });

    render(
      <Provider store={store}>
        <GameData />
      </Provider>
    );

    expect(screen.getByText('Game not started')).toBeInTheDocument();
  });

  it('should display planet information when game is started', () => {
    const store = createTestStore({
      gameStarted: true,
      player: {
        id: 'player-1',
        name: 'Test Commander',
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
      resources: {
        credits: 0,
        munitions: 0,
        promethium: 0,
        rawMaterials: 0,
        imperialFavor: 0,
      },
      lastReinforcementTime: 0,
      sessionInfo: null,
    });

    render(
      <Provider store={store}>
        <GameData />
      </Provider>
    );

    expect(screen.getByText('The Emperor\'s Call')).toBeInTheDocument();
    expect(screen.getByText('Planet Information')).toBeInTheDocument();
    expect(screen.getByText('Test Planet')).toBeInTheDocument();
  });

  it('should display player information', () => {
    const store = createTestStore({
      gameStarted: true,
      player: {
        id: 'player-1',
        name: 'Test Commander',
        rank: 3,
        rankTitle: 'Veteran Guardsman',
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
        <GameData />
      </Provider>
    );

    expect(screen.getByText('Player Information')).toBeInTheDocument();
    expect(screen.getByText('Test Commander')).toBeInTheDocument();
    expect(screen.getByText('3 - Veteran Guardsman')).toBeInTheDocument();
  });

  it('should display reinforcements list', () => {
    const store = createTestStore({
      gameStarted: true,
      player: {
        id: 'player-1',
        name: 'Test Commander',
        rank: 1,
        rankTitle: 'Recruit',
        arrivedAt: Date.now(),
      },
      planet: {
        id: 'planet-1',
        name: 'Test Planet',
        discoveredAt: Date.now(),
      },
      reinforcements: [
        {
          id: 'reinforcement-1',
          type: 'Imperial Guardsmen',
          unitCount: 5,
          arrivedAt: Date.now(),
        },
        {
          id: 'reinforcement-2',
          type: 'Heavy Weapons Team',
          unitCount: 3,
          arrivedAt: Date.now(),
        },
      ],
      lastReinforcementTime: Date.now(),
    });

    render(
      <Provider store={store}>
        <GameData />
      </Provider>
    );

    expect(screen.getByText(/Reinforcements \(8 total units\)/)).toBeInTheDocument();
    expect(screen.getByText(/Imperial Guardsmen - 5 units/)).toBeInTheDocument();
    expect(screen.getByText(/Heavy Weapons Team - 3 units/)).toBeInTheDocument();
  });

  it('should aggregate multiple reinforcements of the same type', () => {
    const now = Date.now();
    const store = createTestStore({
      gameStarted: true,
      player: {
        id: 'player-1',
        name: 'Test Commander',
        rank: 1,
        rankTitle: 'Recruit',
        arrivedAt: now,
      },
      planet: {
        id: 'planet-1',
        name: 'Test Planet',
        discoveredAt: now,
      },
      reinforcements: [
        {
          id: 'reinforcement-1',
          type: 'Imperial Guardsmen',
          unitCount: 5,
          arrivedAt: now,
        },
        {
          id: 'reinforcement-2',
          type: 'Imperial Guardsmen',
          unitCount: 8,
          arrivedAt: now + 5000,
        },
        {
          id: 'reinforcement-3',
          type: 'Imperial Guardsmen',
          unitCount: 3,
          arrivedAt: now + 10000,
        },
      ],
      resources: {
        credits: 0,
        munitions: 0,
        promethium: 0,
        rawMaterials: 0,
        imperialFavor: 0,
      },
      lastReinforcementTime: now + 10000,
      sessionInfo: null,
    });

    render(
      <Provider store={store}>
        <GameData />
      </Provider>
    );

    expect(screen.getByText(/Reinforcements \(16 total units\)/)).toBeInTheDocument();
    expect(screen.getByText(/Imperial Guardsmen - 16 units/)).toBeInTheDocument(); // 5 + 8 + 3
  });

  it('should display message when no reinforcements have arrived', () => {
    const store = createTestStore({
      gameStarted: true,
      player: {
        id: 'player-1',
        name: 'Test Commander',
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
      resources: {
        credits: 0,
        munitions: 0,
        promethium: 0,
        rawMaterials: 0,
        imperialFavor: 0,
      },
      lastReinforcementTime: 0,
      sessionInfo: null,
    });

    render(
      <Provider store={store}>
        <GameData />
      </Provider>
    );

    expect(screen.getByText('No reinforcements arrived yet')).toBeInTheDocument();
  });
});

