# API Reference

This document provides comprehensive API documentation for all major systems, hooks, and components in the game.

## Table of Contents
- [GameEngine API](#gameengine-api)
- [SaveManager API](#savemanager-api)
- [Game Store API](#game-store-api)
- [Custom Hooks API](#custom-hooks-api)
- [Context APIs](#context-apis)
- [Component Library](#component-library)
- [Utility Functions](#utility-functions)

## GameEngine API

### Class: GameEngine

The central game coordinator implementing the singleton pattern.

#### Static Methods

```typescript
static getInstance(): GameEngine
```
Returns the singleton instance of the GameEngine.

**Returns:** `GameEngine` - The singleton instance

**Example:**
```typescript
const engine = GameEngine.getInstance();
```

#### Instance Methods

##### Lifecycle Management

```typescript
start(): void
```
Starts the game loop and begins automatic progression.

**Example:**
```typescript
engine.start();
```

```typescript
stop(): void
```
Stops the game loop and halts all progression.

**Example:**
```typescript
engine.stop();
```

```typescript
pause(): void
```
Pauses the game loop while maintaining state.

**Example:**
```typescript
engine.pause();
```

```typescript
resume(): void
```
Resumes the game loop from paused state.

**Example:**
```typescript
engine.resume();
```

##### State Management

```typescript
getState(): GameState
```
Returns the current game state.

**Returns:** `GameState` - The complete game state object

**Example:**
```typescript
const state = engine.getState();
console.log(state.player.rank);
```

```typescript
updateState(updates: Partial<GameState>): void
```
Updates the game state with provided changes.

**Parameters:**
- `updates: Partial<GameState>` - Partial state updates to apply

**Example:**
```typescript
engine.updateState({
  player: { ...currentPlayer, rankPoints: newPoints }
});
```

##### Subscription Management

```typescript
subscribe(callback: () => void): () => void
```
Subscribes to state changes and returns an unsubscribe function.

**Parameters:**
- `callback: () => void` - Function to call when state changes

**Returns:** `() => void` - Unsubscribe function

**Example:**
```typescript
const unsubscribe = engine.subscribe(() => {
  console.log('State changed!');
});

// Later...
unsubscribe();
```

##### Properties

```typescript
readonly isRunning: boolean
```
Indicates whether the game loop is currently running.

```typescript
readonly isPaused: boolean
```
Indicates whether the game is currently paused.

```typescript
readonly frameRate: number
```
Current frames per second of the game loop.

## SaveManager API

### Class: SaveManager

Handles all persistence operations with validation and backup management.

#### Constructor

```typescript
constructor(options?: SaveManagerOptions)
```

**Parameters:**
- `options?: SaveManagerOptions` - Configuration options

```typescript
interface SaveManagerOptions {
  maxBackups?: number;          // Default: 5
  compressionEnabled?: boolean; // Default: true
  autoSaveInterval?: number;    // Default: 30000ms
}
```

#### Methods

##### Core Operations

```typescript
save(gameState: GameState): Promise<SaveResult>
```
Saves the current game state with validation and backup creation.

**Parameters:**
- `gameState: GameState` - The state to save

**Returns:** `Promise<SaveResult>` - Result of the save operation

```typescript
interface SaveResult {
  success: boolean;
  timestamp: number;
  checksum: string;
  error?: string;
}
```

**Example:**
```typescript
const result = await saveManager.save(gameState);
if (result.success) {
  console.log('Game saved successfully');
}
```

```typescript
load(): Promise<GameState | null>
```
Loads the game state from storage with validation.

**Returns:** `Promise<GameState | null>` - The loaded state or null if none exists

**Example:**
```typescript
const state = await saveManager.load();
if (state) {
  engine.updateState(state);
}
```

##### Backup Management

```typescript
createBackup(name?: string): Promise<BackupInfo>
```
Creates a named backup of the current state.

**Parameters:**
- `name?: string` - Optional backup name

**Returns:** `Promise<BackupInfo>` - Information about the created backup

```typescript
interface BackupInfo {
  id: string;
  name: string;
  timestamp: number;
  size: number;
  checksum: string;
}
```

```typescript
listBackups(): BackupInfo[]
```
Returns a list of all available backups.

**Returns:** `BackupInfo[]` - Array of backup information

```typescript
restoreBackup(id: string): Promise<GameState>
```
Restores a specific backup by ID.

**Parameters:**
- `id: string` - The backup ID to restore

**Returns:** `Promise<GameState>` - The restored game state

```typescript
deleteBackup(id: string): Promise<void>
```
Deletes a specific backup.

**Parameters:**
- `id: string` - The backup ID to delete

##### Import/Export

```typescript
exportSave(): Promise<string>
```
Exports the current save as a base64 string for sharing.

**Returns:** `Promise<string>` - Base64 encoded save data

```typescript
importSave(data: string): Promise<GameState>
```
Imports a save from base64 encoded data.

**Parameters:**
- `data: string` - Base64 encoded save data

**Returns:** `Promise<GameState>` - The imported game state

## Game Store API

### Store: useGameStore

Zustand store for centralized state management.

#### State Interface

```typescript
interface GameStore {
  // Core state
  player: PlayerState;
  battlefield: BattlefieldState;
  statistics: GameStatistics;
  timers: TimerState;
  settings: GameSettings;
  
  // Actions
  updatePlayer: (updates: Partial<PlayerState>) => void;
  updateBattlefield: (updates: Partial<BattlefieldState>) => void;
  updateStatistics: (updates: Partial<GameStatistics>) => void;
  updateTimers: (updates: Partial<TimerState>) => void;
  updateSettings: (updates: Partial<GameSettings>) => void;
  
  // Unit management
  addUnit: (unit: Unit) => void;
  removeUnit: (unitId: string) => void;
  updateUnit: (unitId: string, updates: Partial<Unit>) => void;
  
  // Computed getters
  getTotalUnits: () => number;
  getPlayerUnits: () => Unit[];
  getEnemyUnits: () => Unit[];
  getActiveTimers: () => Timer[];
  getRankProgress: () => number;
  
  // Utility actions
  reset: () => void;
  loadState: (state: GameState) => void;
}
```

#### Usage Examples

```typescript
// Subscribe to specific state
const player = useGameStore(state => state.player);

// Subscribe to computed values
const totalUnits = useGameStore(state => state.getTotalUnits());

// Use actions
const { updatePlayer, addUnit } = useGameStore();

// Update player state
updatePlayer({ rankPoints: newPoints });

// Add a new unit
addUnit({
  id: 'unit-1',
  type: 'infantry',
  position: { x: 10, y: 10 },
  health: 100
});
```

## Custom Hooks API

### useGameSystems Hook

Provides access to all game systems through focused sub-hooks.

```typescript
function useGameSystems(): {
  player: ReturnType<typeof usePlayerState>;
  battlefield: ReturnType<typeof useBattlefield>;
  timers: ReturnType<typeof useGameTimers>;
  lifecycle: ReturnType<typeof useGameLifecycle>;
  statistics: ReturnType<typeof useGameStatistics>;
  settings: ReturnType<typeof useGameSettings>;
  progression: ReturnType<typeof useRankProgression>;
  gameState: ReturnType<typeof useGameState>;
}
```

### usePlayerState Hook

```typescript
function usePlayerState(): {
  // State
  rank: number;
  rankPoints: number;
  totalKills: number;
  
  // Actions
  addRankPoints: (points: number) => void;
  spendRankPoints: (points: number) => boolean;
  promoteRank: () => boolean;
  
  // Computed values
  nextRankRequirement: number;
  rankProgress: number;
  rankTitle: string;
}
```

### useBattlefield Hook

```typescript
function useBattlefield(): {
  // State
  units: Unit[];
  gridSize: { width: number; height: number };
  
  // Unit management
  addUnit: (unit: Omit<Unit, 'id'>) => string;
  removeUnit: (unitId: string) => void;
  moveUnit: (unitId: string, position: Position) => void;
  
  // Queries
  getUnitsAt: (position: Position) => Unit[];
  getPlayerUnits: () => Unit[];
  getEnemyUnits: () => Unit[];
  getUnitsInRange: (center: Position, range: number) => Unit[];
  
  // Battle management
  startBattle: () => void;
  endBattle: () => void;
  isBattleActive: boolean;
}
```

### useGameTimers Hook

```typescript
function useGameTimers(): {
  // Timer state
  reinforcementTimer: Timer;
  assaultTimer: Timer;
  activeTimers: Timer[];
  
  // Timer management
  startTimer: (name: string, duration: number) => void;
  stopTimer: (name: string) => void;
  resetTimer: (name: string) => void;
  
  // Timer queries
  getTimeRemaining: (name: string) => number;
  isTimerActive: (name: string) => boolean;
  getTimerProgress: (name: string) => number;
}
```

### useGameLifecycle Hook

```typescript
function useGameLifecycle(): {
  // Game state
  isRunning: boolean;
  isPaused: boolean;
  gameTime: number;
  
  // Lifecycle controls
  startGame: () => void;
  stopGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  
  // Save/Load
  saveGame: () => Promise<void>;
  loadGame: () => Promise<void>;
  canSave: boolean;
  canLoad: boolean;
}
```

## Context APIs

### ConfigContext

Provides application-level configuration and settings.

```typescript
interface ConfigContextValue {
  // Theme settings
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  
  // Accessibility settings
  reducedMotion: boolean;
  setReducedMotion: (enabled: boolean) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  
  // Performance settings
  maxFPS: number;
  setMaxFPS: (fps: number) => void;
  enableAnimations: boolean;
  setEnableAnimations: (enabled: boolean) => void;
  
  // Debug settings
  debugMode: boolean;
  setDebugMode: (enabled: boolean) => void;
  showPerformanceMetrics: boolean;
  setShowPerformanceMetrics: (enabled: boolean) => void;
}
```

#### Usage

```typescript
const { theme, setTheme, debugMode } = useConfig();

// Change theme
setTheme('dark');

// Check debug mode
if (debugMode) {
  console.log('Debug information');
}
```

### GameEngineContext

Provides access to the GameEngine instance throughout the React tree.

```typescript
interface GameEngineContextValue {
  engine: GameEngine;
  isInitialized: boolean;
}
```

#### Usage

```typescript
const { engine, isInitialized } = useGameEngine();

if (isInitialized) {
  engine.start();
}
```

## Component Library

### Button Component

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
}
```

### ProgressBar Component

```typescript
interface ProgressBarProps {
  value: number;            // 0-100
  max?: number;            // Default: 100
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}
```

### Panel Component

```typescript
interface PanelProps {
  title?: string;
  headerActions?: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  variant?: 'default' | 'outlined' | 'elevated';
  children: React.ReactNode;
}
```

## Utility Functions

### Mathematical Utilities

```typescript
// Calculate exponential rank requirements
function calculateRankRequirement(rank: number): number;

// Calculate rank progress percentage
function calculateRankProgress(currentPoints: number, requiredPoints: number): number;

// Generate random number in range
function randomBetween(min: number, max: number): number;

// Calculate distance between two points
function calculateDistance(point1: Position, point2: Position): number;

// Check if point is within range of another point
function isInRange(point1: Position, point2: Position, range: number): boolean;

// Clamp value between min and max
function clamp(value: number, min: number, max: number): number;

// Linear interpolation
function lerp(a: number, b: number, t: number): number;

// Format large numbers with suffixes (K, M, B, etc.)
function formatNumber(value: number): string;

// Calculate percentage
function percentage(value: number, total: number): number;
```

### Game Constants

```typescript
// Rank requirements
const RANK_REQUIREMENTS: number[];

// Timer durations
const REINFORCEMENT_INTERVAL: number;
const ASSAULT_INTERVAL: number;

// Battlefield dimensions
const BATTLEFIELD_WIDTH: number;
const BATTLEFIELD_HEIGHT: number;

// Unit types
const UNIT_TYPES: UnitType[];

// Rank titles
const RANK_TITLES: string[];
```

## Error Handling

All async operations return promises that may reject with specific error types:

```typescript
// Save/Load errors
class SaveError extends Error {
  constructor(message: string, public code: string) {
    super(message);
  }
}

// Validation errors
class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
  }
}

// Game engine errors
class GameEngineError extends Error {
  constructor(message: string, public system: string) {
    super(message);
  }
}
```

## Type Definitions

Key TypeScript interfaces and types used throughout the application are documented in the [types directory](../src/types/). Major types include:

- `GameState` - Complete game state structure
- `PlayerState` - Player progression and statistics
- `Unit` - Individual unit properties and behavior
- `BattlefieldState` - Battlefield and spatial information
- `Timer` - Timer state and configuration
- `SaveData` - Serialized save game format

This API reference serves as a comprehensive guide for developers working with the game's systems and provides clear examples for all major functionality.
