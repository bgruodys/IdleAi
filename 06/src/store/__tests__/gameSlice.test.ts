import gameReducer, { startGame, addReinforcement, resetGame, GameState } from '../gameSlice';

describe('gameSlice', () => {
  const initialState: GameState = {
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
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('startGame', () => {
    it('should initialize game with player and planet', () => {
      const action = startGame();
      const state = gameReducer(initialState, action);

      expect(state.gameStarted).toBe(true);
      expect(state.player).not.toBeNull();
      expect(state.player?.name).toBe('Imperial Commander');
      expect(state.player?.rank).toBe(1);
      expect(state.player?.rankTitle).toBe('Recruit');
      expect(state.player?.arrivedAt).toBe(Date.now());
      
      expect(state.planet).not.toBeNull();
      expect(state.planet?.name).toBeTruthy();
      expect(state.planet?.discoveredAt).toBe(Date.now());
      
      expect(state.lastReinforcementTime).toBe(Date.now());
    });

    it('should generate unique IDs for player and planet', () => {
      const action = startGame();
      const state1 = gameReducer(initialState, action);
      
      jest.advanceTimersByTime(1000);
      
      const state2 = gameReducer(initialState, action);
      
      expect(state1.player?.id).not.toBe(state2.player?.id);
      expect(state1.planet?.id).not.toBe(state2.planet?.id);
    });
  });

  describe('addReinforcement', () => {
    it('should add a reinforcement to the list', () => {
      const startedState: GameState = {
        ...initialState,
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
        lastReinforcementTime: Date.now(),
      };

      const action = addReinforcement();
      const state = gameReducer(startedState, action);

      expect(state.reinforcements).toHaveLength(1);
      expect(state.reinforcements[0].id).toBeTruthy();
      expect(state.reinforcements[0].type).toBeTruthy();
      expect(state.reinforcements[0].unitCount).toBeGreaterThan(0);
      expect(state.reinforcements[0].unitCount).toBeLessThanOrEqual(10);
      expect(state.reinforcements[0].arrivedAt).toBe(Date.now());
      expect(state.lastReinforcementTime).toBe(Date.now());
    });

    it('should add multiple reinforcements', () => {
      const startedState: GameState = {
        ...initialState,
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
        lastReinforcementTime: Date.now(),
      };

      let state = startedState;
      state = gameReducer(state, addReinforcement());
      state = gameReducer(state, addReinforcement());
      state = gameReducer(state, addReinforcement());

      expect(state.reinforcements).toHaveLength(3);
      expect(state.reinforcements[0].id).not.toBe(state.reinforcements[1].id);
      expect(state.reinforcements[1].id).not.toBe(state.reinforcements[2].id);
    });

    it('should update lastReinforcementTime', () => {
      const startedState: GameState = {
        ...initialState,
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
        lastReinforcementTime: 1000,
      };

      jest.advanceTimersByTime(5000);
      const action = addReinforcement();
      const state = gameReducer(startedState, action);

      expect(state.lastReinforcementTime).toBe(Date.now());
      expect(state.lastReinforcementTime).toBeGreaterThan(1000);
    });
  });

  describe('resetGame', () => {
    it('should reset game to initial state', () => {
      const startedState: GameState = {
        gameStarted: true,
        player: {
          id: 'player-1',
          name: 'Test Commander',
          rank: 5,
          rankTitle: 'Lieutenant',
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
            type: 'Guardsmen',
            unitCount: 5,
            arrivedAt: Date.now(),
          },
        ],
        resources: {
          credits: 1000,
          munitions: 500,
          promethium: 250,
          rawMaterials: 100,
          imperialFavor: 10,
        },
        lastReinforcementTime: Date.now(),
        sessionInfo: {
          sessionId: 'session-1',
          lastActiveTime: Date.now(),
          lastSaveTime: Date.now(),
        },
      };

      const action = resetGame();
      const state = gameReducer(startedState, action);

      expect(state.gameStarted).toBe(initialState.gameStarted);
      expect(state.player).toBe(initialState.player);
      expect(state.planet).toBe(initialState.planet);
      expect(state.reinforcements).toEqual(initialState.reinforcements);
      expect(state.resources).toEqual(initialState.resources);
      expect(state.sessionInfo).toBe(initialState.sessionInfo);
      expect(state.gameStarted).toBe(false);
      expect(state.player).toBeNull();
      expect(state.planet).toBeNull();
      expect(state.reinforcements).toHaveLength(0);
      expect(state.lastReinforcementTime).toBe(0);
    });
  });
});

