# Idle Warhammer - Technical Documentation

## Project Structure

```
IdleAi/
├── docs/                    # Documentation
│   ├── GAME_DESIGN_DOCUMENT.md
│   ├── TECHNICAL_SPECS.md
│   ├── API_REFERENCE.md
│   └── DEVELOPMENT_GUIDE.md
├── src/                     # Source code
│   ├── core/               # Core game systems
│   ├── ui/                 # User interface components
│   ├── data/               # Game data and configurations
│   ├── utils/              # Utility functions
│   └── assets/             # Game assets
├── tests/                   # Test files
├── dist/                    # Built/compiled files
└── tools/                   # Development tools
```

## Core Systems Architecture

### Game State Management
```javascript
GameState = {
  player: {
    resources: {},
    units: {},
    upgrades: {},
    achievements: {},
    statistics: {}
  },
  game: {
    version: "",
    lastSave: timestamp,
    totalPlayTime: seconds,
    settings: {}
  }
}
```

### Resource System
```javascript
Resource = {
  id: "credits",
  name: "Credits",
  amount: 0,
  perSecond: 0,
  capacity: Infinity,
  multiplier: 1.0
}
```

### Unit System
```javascript
Unit = {
  id: "guardsman",
  name: "Imperial Guardsman",
  count: 0,
  cost: {},
  production: {},
  upgrades: [],
  effectiveness: 1.0
}
```

## Development Standards

### Code Style
- Use ES6+ features
- Consistent naming conventions (camelCase)
- JSDoc comments for functions
- Modular architecture

### File Organization
- One class/system per file
- Clear separation of concerns
- Consistent import/export patterns

### Testing
- Unit tests for core systems
- Integration tests for game flow
- Performance benchmarks

## Data Formats

### Save Game Format
```json
{
  "version": "1.0.0",
  "timestamp": 1234567890,
  "playerData": {
    "resources": {...},
    "units": {...},
    "upgrades": {...}
  }
}
```

### Configuration Files
- JSON format for game data
- Separate files for different content types
- Version tracking for data migration

## Performance Guidelines

### Optimization Targets
- 60 FPS on mobile devices
- < 100MB memory usage
- < 5 second initial load time
- Smooth offline/online transitions

### Best Practices
- Efficient calculation loops
- Lazy loading of assets
- Debounced UI updates
- Minimal DOM manipulations

---

*This technical documentation will be expanded as development progresses.*
