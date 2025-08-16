# Technical Specifications - IdleWarhammer40k

## Architecture Overview

### Frontend Technology Stack
- **Framework**: React 18+ with TypeScript
- **State Management**: Zustand for global state
- **Rendering**: HTML5 Canvas with React refs
- **Build Tool**: Vite for fast development and builds
- **Styling**: Tailwind CSS for utility-first styling
- **Testing**: React Testing Library + Jest
- **Persistence**: Custom React hooks with LocalStorage/IndexedDB

### Core Components

#### 1. Game Engine (`GameEngine.ts`)
```typescript
import { create } from 'zustand';
import { useEffect, useRef } from 'react';

interface GameState {
  isRunning: boolean;
  battlefield: Battlefield;
  reinforcementSystem: ReinforcementSystem;
  defenseSystem: DefenseSystem;
  tick: () => void;
  start: () => void;
  stop: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  isRunning: false,
  battlefield: new Battlefield(),
  reinforcementSystem: new ReinforcementSystem(),
  defenseSystem: new DefenseSystem(),
  
  tick: () => {
    const state = get();
    state.battlefield.update();
    state.reinforcementSystem.checkSpawns();
    state.defenseSystem.checkEvents();
  },
  
  start: () => set({ isRunning: true }),
  stop: () => set({ isRunning: false })
}));

// Custom hook for game loop
export const useGameLoop = (tickRate = 1000) => {
  const { tick, isRunning } = useGameStore();
  
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(tick, tickRate);
    return () => clearInterval(interval);
  }, [isRunning, tick, tickRate]);
};
```

#### 2. Battlefield Component (`BattlefieldView.tsx`)
```typescript
import React, { useRef, useEffect } from 'react';
import { useGameStore } from '../stores/gameStore';

interface BattlefieldViewProps {
  width: number;
  height: number;
  className?: string;
}

export const BattlefieldView: React.FC<BattlefieldViewProps> = ({ 
  width, 
  height, 
  className 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { battlefield } = useGameStore();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const render = () => {
      battlefield.render(ctx, width, height);
      requestAnimationFrame(render);
    };
    
    render();
  }, [battlefield, width, height]);
  
  return (
    <div className={className}>
      <canvas 
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-steel-gray"
      />
    </div>
  );
};
```

#### 3. Unit Management Hook (`useUnits.ts`)
```typescript
import { create } from 'zustand';
import { Unit } from '../types/Unit';

interface UnitsState {
  units: Map<string, Unit>;
  selectedUnit: string | null;
  addUnit: (unit: Unit) => void;
  removeUnit: (id: string) => void;
  selectUnit: (id: string | null) => void;
  updateUnit: (id: string, updates: Partial<Unit>) => void;
}

export const useUnitsStore = create<UnitsState>((set, get) => ({
  units: new Map(),
  selectedUnit: null,
  
  addUnit: (unit) => set((state) => {
    const newUnits = new Map(state.units);
    newUnits.set(unit.id, unit);
    return { units: newUnits };
  }),
  
  removeUnit: (id) => set((state) => {
    const newUnits = new Map(state.units);
    newUnits.delete(id);
    return { 
      units: newUnits,
      selectedUnit: state.selectedUnit === id ? null : state.selectedUnit
    };
  }),
  
  selectUnit: (id) => set({ selectedUnit: id }),
  
  updateUnit: (id, updates) => set((state) => {
    const newUnits = new Map(state.units);
    const unit = newUnits.get(id);
    if (unit) {
      newUnits.set(id, { ...unit, ...updates });
    }
    return { units: newUnits };
  })
}));

// React hook for unit operations
export const useUnits = () => {
  const store = useUnitsStore();
  
  return {
    ...store,
    unitsList: Array.from(store.units.values()),
    getUnit: (id: string) => store.units.get(id),
    getSelectedUnit: () => store.selectedUnit ? store.units.get(store.selectedUnit) : null
  };
};
```

## Performance Considerations

### Optimization Strategies
- **Object Pooling**: Reuse unit and projectile objects
- **Spatial Partitioning**: Efficient collision detection using grid-based system
- **Lazy Rendering**: Only render visible battlefield sections
- **Background Processing**: Use Web Workers for complex calculations
- **Throttled Updates**: Reduce tick rate when tab is inactive

### Memory Management
- **Garbage Collection**: Proper cleanup of destroyed units
- **Event Listener Management**: Remove unused event listeners
- **Asset Preloading**: Cache sprites and audio files
- **State Compression**: Efficient serialization for save data

## Data Structures

### Game State Schema
```typescript
interface GameState {
  player: {
    rank: number;
    rankPoints: number;
    totalKills: number;
    defensesWon: number;
    defensesLost: number;
    playTime: number;
  };
  battlefield: {
    units: Unit[];
    structures: Structure[];
    lastUpdate: number;
  };
  timers: {
    nextReinforcement: number;
    nextAssault: number;
    lastSave: number;
  };
  settings: {
    autoSave: boolean;
    soundEnabled: boolean;
    graphicsQuality: 'low' | 'medium' | 'high';
  };
}
```

### Unit Data Structure
```typescript
interface Unit {
  id: string;
  type: UnitType;
  faction: 'imperial' | 'chaos' | 'ork' | 'tyranid';
  position: { x: number; y: number };
  stats: {
    maxHP: number;
    currentHP: number;
    attack: number;
    armor: number;
    speed: number;
    range: number;
  };
  ai: {
    target: string | null;
    behavior: 'aggressive' | 'defensive' | 'patrol';
    lastAction: number;
  };
}

enum UnitType {
  GUARDSMAN = 'guardsman',
  SERGEANT = 'sergeant',
  HEAVY_WEAPONS = 'heavy_weapons',
  COMMISSAR = 'commissar',
  OGRYN = 'ogryn',
  SPACE_MARINE = 'space_marine'
}
```

## File Structure

```
src/
├── components/           # React Components
│   ├── GameInterface/
│   │   ├── GameInterface.tsx
│   │   ├── GameHeader.tsx
│   │   └── GameInterface.styles.ts
│   ├── Battlefield/
│   │   ├── BattlefieldView.tsx
│   │   ├── UnitRenderer.tsx
│   │   └── BattlefieldControls.tsx
│   ├── UI/
│   │   ├── UnitPanel.tsx
│   │   ├── DefenseStatus.tsx
│   │   ├── CombatLog.tsx
│   │   └── SettingsPanel.tsx
│   └── common/
│       ├── Button.tsx
│       ├── ProgressBar.tsx
│       └── Modal.tsx
├── hooks/               # Custom React Hooks
│   ├── useGameLoop.ts
│   ├── useUnits.ts
│   ├── useBattlefield.ts
│   ├── useReinforcements.ts
│   └── usePersistence.ts
├── stores/              # Zustand Stores
│   ├── gameStore.ts
│   ├── unitsStore.ts
│   ├── battlefieldStore.ts
│   └── settingsStore.ts
├── systems/             # Game Logic
│   ├── GameEngine.ts
│   ├── Battlefield.ts
│   ├── UnitSystem.ts
│   ├── ReinforcementSystem.ts
│   └── DefenseSystem.ts
├── types/               # TypeScript Types
│   ├── Unit.ts
│   ├── Battlefield.ts
│   ├── GameState.ts
│   └── Events.ts
├── utils/               # Utilities
│   ├── constants.ts
│   ├── mathUtils.ts
│   ├── saveManager.ts
│   └── eventSystem.ts
├── assets/              # Game Assets
│   ├── sprites/
│   ├── audio/
│   └── data/
└── styles/              # Global Styles
    ├── globals.css
    ├── components.css
    └── themes.css
```

## API Endpoints (Future Considerations)

### Optional Backend Integration
```javascript
// Leaderboard system
GET /api/leaderboard
POST /api/scores

// Achievement system
GET /api/achievements
POST /api/achievement-unlock

// Save synchronization
GET /api/save-data
POST /api/save-data
```

## Browser Compatibility

### Minimum Requirements
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Required Browser Features
- ES2020+ (for React 18)
- TypeScript support (via transpilation)
- React 18 concurrent features
- Canvas 2D API
- LocalStorage
- Web Workers (optional enhancement)
- IndexedDB (fallback storage)

## Performance Targets

### Frame Rate Goals
- **60 FPS**: Smooth battlefield animation
- **30 FPS**: Minimum acceptable performance
- **Graceful Degradation**: Reduce visual effects if needed

### Memory Constraints
- **Maximum RAM Usage**: 200MB
- **Initial Load Time**: < 3 seconds
- **Save Data Size**: < 10MB

## Security Considerations

### Client-Side Validation
- **Save Data Integrity**: Checksum validation
- **Anti-Tampering**: Basic obfuscation of game state
- **Rate Limiting**: Prevent rapid-fire actions

### Data Privacy
- **Local Storage Only**: No personal data collection
- **Optional Analytics**: Anonymous usage statistics
- **GDPR Compliance**: Clear data usage policies
