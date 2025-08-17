# Architecture Overview

This document provides a comprehensive overview of the game engine architecture, focusing on design patterns, state management, and system interactions.

## Table of Contents
- [Design Philosophy](#design-philosophy)
- [System Architecture](#system-architecture)
- [Core Components](#core-components)
- [State Management](#state-management)
- [Data Flow](#data-flow)
- [Performance Considerations](#performance-considerations)
- [Testing Strategy](#testing-strategy)

## Design Philosophy

The architecture follows SOLID principles and React best practices to create a maintainable, scalable, and testable codebase.

### SOLID Principles Implementation

#### Single Responsibility Principle (SRP)
- Each class/component has one clear purpose
- `GameEngine` handles game loop and coordination
- `SaveManager` handles persistence operations
- Components focus on presentation logic only

#### Open/Closed Principle (OCP)
- Systems are extensible without modification
- Interface-based design allows for easy extension
- Factory patterns enable new implementations

#### Liskov Substitution Principle (LSP)
- Interfaces are properly abstracted
- Implementations can be swapped without breaking functionality
- Type system ensures compatibility

#### Interface Segregation Principle (ISP)
- Small, focused interfaces
- Components depend only on methods they use
- Clear separation of concerns

#### Dependency Inversion Principle (DIP)
- High-level modules don't depend on low-level modules
- Dependencies are injected through React context
- Abstractions don't depend on details

### React Patterns

#### Composition over Inheritance
- Components are composed of smaller, reusable pieces
- Higher-order components for cross-cutting concerns
- Render props for flexible component behavior

#### Declarative Programming
- State changes drive UI updates
- Functional components with hooks
- Immutable state updates

#### Unidirectional Data Flow
- Data flows down through props
- Events bubble up through callbacks
- Centralized state management with Zustand

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        React App                           │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Components    │  │    Contexts     │  │    Hooks    │ │
│  │                 │  │                 │  │             │ │
│  │ • GameInterface │  │ • ConfigContext │  │ • Game      │ │
│  │ • Common UI     │  │ • GameEngine    │  │   Systems   │ │
│  │ • Layout        │  │   Context       │  │ • Lifecycle │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │    Stores       │  │    Systems      │  │   Utils     │ │
│  │                 │  │                 │  │             │ │
│  │ • Game Store    │  │ • GameEngine    │  │ • Math      │ │
│  │   (Zustand)     │  │ • SaveManager   │  │ • Constants │ │
│  │ • Persistence   │  │ • Unit System   │  │ • Helpers   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

#### Presentation Layer (Components)
- Render UI based on state
- Handle user interactions
- Delegate business logic to hooks
- Maintain local UI state only

#### Application Layer (Hooks & Contexts)
- Coordinate between UI and business logic
- Handle side effects (API calls, timers)
- Provide abstractions for complex operations
- Manage component lifecycle

#### Business Logic Layer (Systems)
- Implement game rules and mechanics
- Handle complex calculations
- Manage game state transitions
- Coordinate between different systems

#### Data Layer (Stores)
- Centralized state management
- Persistence and hydration
- State validation and normalization
- Subscription management

## Core Components

### GameEngine (Singleton)

The `GameEngine` is the central coordinator that manages the game loop and system interactions.

```typescript
class GameEngine {
  private static instance: GameEngine;
  private gameLoop: number | null = null;
  private isRunning: boolean = false;
  private subscribers: Set<() => void> = new Set();
  
  // Singleton pattern ensures single instance
  public static getInstance(): GameEngine;
  
  // Game lifecycle management
  public start(): void;
  public stop(): void;
  public pause(): void;
  public resume(): void;
  
  // State management
  public subscribe(callback: () => void): () => void;
  public getState(): GameState;
  public updateState(updates: Partial<GameState>): void;
}
```

**Responsibilities:**
- Manage game loop timing (60 FPS target)
- Coordinate system updates
- Handle state persistence
- Provide React integration points

**Design Patterns:**
- Singleton: Ensures single game instance
- Observer: Notifies React components of state changes
- Command: Encapsulates game actions

### SaveManager

Handles all persistence operations with robust error handling and data validation.

```typescript
class SaveManager {
  private maxBackups: number = 5;
  private compressionEnabled: boolean = true;
  
  // Core persistence operations
  public save(gameState: GameState): Promise<SaveResult>;
  public load(): Promise<GameState | null>;
  public createBackup(name?: string): Promise<BackupInfo>;
  
  // Data validation and integrity
  private validateSaveData(data: any): boolean;
  private calculateChecksum(data: string): string;
  private compressData(data: string): string;
  
  // Backup management
  public listBackups(): BackupInfo[];
  public restoreBackup(id: string): Promise<GameState>;
  public deleteBackup(id: string): Promise<void>;
}
```

**Responsibilities:**
- Automatic save/load operations
- Backup rotation and management
- Data validation and integrity checks
- Error recovery mechanisms

**Design Patterns:**
- Strategy: Different storage backends
- Template Method: Common save/load workflow
- Factory: Create different save formats

### GameStore (Zustand)

Centralized state management with middleware for persistence and subscriptions.

```typescript
interface GameStore {
  // Core game state
  player: PlayerState;
  battlefield: BattlefieldState;
  statistics: GameStatistics;
  timers: TimerState;
  settings: GameSettings;
  
  // Actions
  updatePlayer: (updates: Partial<PlayerState>) => void;
  addUnit: (unit: Unit) => void;
  updateStatistics: (stats: Partial<GameStatistics>) => void;
  
  // Computed values
  getTotalUnits: () => number;
  getActiveTimers: () => Timer[];
  getRankProgress: () => number;
}
```

**Features:**
- Immutable state updates
- Automatic persistence to localStorage
- Subscription-based updates
- Computed values for derived state
- Middleware for logging and debugging

## State Management

### State Flow Architecture

```
User Action → Component → Hook → Store → GameEngine → Systems
     ↑                                                    ↓
UI Update ← Component ← Hook ← Store ← State Change ← Business Logic
```

### State Types

#### Game State (Persisted)
- Player progression and statistics
- Battlefield units and positions
- Game settings and preferences
- Timer states and intervals

#### App State (Session-only)
- UI state (modals, tabs, etc.)
- Configuration settings
- Theme and accessibility preferences
- Debug information

#### Derived State (Computed)
- Progress percentages
- Filtered and sorted data
- Aggregated statistics
- Formatted display values

### State Normalization

State is normalized to reduce redundancy and improve performance:

```typescript
interface NormalizedGameState {
  entities: {
    units: { [id: string]: Unit };
    timers: { [id: string]: Timer };
  };
  collections: {
    playerUnits: string[];
    enemyUnits: string[];
    activeTimers: string[];
  };
  ui: {
    selectedUnit: string | null;
    activeTab: string;
  };
}
```

## Data Flow

### Game Loop Flow

```
GameEngine.tick()
    ↓
Update Timers
    ↓
Process Game Logic
    ↓
Update Store State
    ↓
Notify Subscribers
    ↓
React Re-render
```

### User Action Flow

```
User Interaction
    ↓
Component Event Handler
    ↓
Custom Hook
    ↓
Store Action
    ↓
State Update
    ↓
GameEngine Notification
    ↓
UI Update
```

### Persistence Flow

```
State Change
    ↓
Zustand Middleware
    ↓
SaveManager.save()
    ↓
Data Validation
    ↓
Compression (optional)
    ↓
localStorage Write
    ↓
Backup Rotation
```

## Performance Considerations

### Optimization Strategies

#### React Optimizations
- `React.memo` for expensive components
- `useMemo` for computed values
- `useCallback` for stable event handlers
- Component splitting and lazy loading

#### State Management
- Normalized state structure
- Selective subscriptions
- Batched updates
- Derived state caching

#### Game Loop
- 60 FPS target with frame dropping
- Delta time calculations
- Efficient collision detection
- Object pooling for frequent allocations

### Memory Management

#### Garbage Collection
- Avoid creating objects in render loops
- Use object pools for temporary objects
- Clean up event listeners and timers
- Weak references where appropriate

#### State Cleanup
- Remove unused entities
- Compress historical data
- Limit backup retention
- Clear debug information

## Testing Strategy

### Test Pyramid

```
    E2E Tests (Cypress)
         /\
        /  \
   Integration Tests
      /\    /\
     /  \  /  \
  Unit Tests (Jest)
```

### Testing Levels

#### Unit Tests
- Pure functions and utilities
- Individual component behavior
- Hook functionality
- State management logic

#### Integration Tests
- Component + hook interactions
- Store + system coordination
- Cross-system communication
- Error handling flows

#### End-to-End Tests
- Complete user workflows
- Save/load functionality
- Performance scenarios
- Browser compatibility

### Test Patterns

#### Arrange-Act-Assert
```typescript
test('should calculate rank progress correctly', () => {
  // Arrange
  const currentPoints = 150;
  const requiredPoints = 200;
  
  // Act
  const progress = calculateRankProgress(currentPoints, requiredPoints);
  
  // Assert
  expect(progress).toBe(0.75);
});
```

#### Given-When-Then
```typescript
test('game state persistence', () => {
  // Given a game with progress
  const gameState = createTestGameState();
  
  // When the game is saved and loaded
  saveManager.save(gameState);
  const loaded = saveManager.load();
  
  // Then the state should be preserved
  expect(loaded).toEqual(gameState);
});
```

### Mocking Strategy

#### System Dependencies
- Mock external APIs
- Mock localStorage
- Mock timers and dates
- Mock random number generation

#### React Dependencies
- Mock context providers
- Mock custom hooks
- Mock component dependencies
- Mock external libraries

This architecture ensures a maintainable, scalable, and well-tested codebase that follows React and TypeScript best practices while implementing the game requirements effectively.
