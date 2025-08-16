export interface PlayerState {
  rank: number;
  rankPoints: number;
  totalKills: number;
  defensesWon: number;
  defensesLost: number;
  playTime: number;
  lastLogin: number;
  achievements: string[];
}

export interface GameTimers {
  nextReinforcement: number;
  nextAssault: number;
  lastSave: number;
  gameStarted: number;
}

export interface GameSettings {
  autoSave: boolean;
  soundEnabled: boolean;
  musicEnabled: boolean;
  graphicsQuality: 'low' | 'medium' | 'high';
  showFPS: boolean;
  battleSpeed: number;
  volume: {
    master: number;
    sfx: number;
    music: number;
  };
}

export interface GameState {
  player: PlayerState;
  timers: GameTimers;
  settings: GameSettings;
  isInitialized: boolean;
  isPaused: boolean;
  isBackground: boolean;
  lastUpdate: number;
  version: string;
}

export enum GameEvent {
  UNIT_SPAWNED = 'unit_spawned',
  UNIT_DIED = 'unit_died',
  COMBAT_STARTED = 'combat_started',
  COMBAT_ENDED = 'combat_ended',
  RANK_UP = 'rank_up',
  REINFORCEMENTS_ARRIVED = 'reinforcements_arrived',
  ASSAULT_STARTED = 'assault_started',
  ASSAULT_ENDED = 'assault_ended',
  DEFENSE_SUCCESS = 'defense_success',
  DEFENSE_FAILED = 'defense_failed',
}

export interface GameEventData {
  type: GameEvent;
  timestamp: number;
  data: Record<string, unknown>;
  id: string;
}

export interface RankInfo {
  level: number;
  name: string;
  pointsRequired: number;
  pointsToNext: number;
  benefits: string[];
  reinforcementBonus: number;
  defenseBonus: number;
}
