# Idle Warhammer - Development Guide

## Getting Started

This guide will help you understand the project structure and development workflow for the Idle Warhammer game.

## Project Overview

Idle Warhammer is an incremental/idle game set in the Warhammer 40,000 universe. Players manage Imperial forces, gather resources, and expand their military might through automated progression systems.

## Key Documentation Files

### Primary Documents
- `GAME_DESIGN_DOCUMENT.md` - Complete game design specifications
- `TECHNICAL_DOCUMENTATION.md` - Technical architecture and standards
- `DEVELOPMENT_GUIDE.md` - This file - development workflow and guidelines

### Reference Materials
- `API_REFERENCE.md` - Code API documentation (to be created)
- `BALANCE_NOTES.md` - Game balance considerations (to be created)
- `ASSET_GUIDELINES.md` - Art and audio asset specifications (to be created)

## Development Workflow

### 1. Feature Planning
Before implementing any feature:
- Reference the Game Design Document
- Update documentation if needed
- Plan technical approach
- Consider impact on existing systems

### 2. Implementation Process
- Create feature branch
- Implement core functionality
- Add tests where applicable
- Update documentation
- Test thoroughly

### 3. Code Review
- Check against coding standards
- Verify game design alignment
- Test on multiple devices/browsers
- Validate performance impact

## Coding Standards

### JavaScript Guidelines
```javascript
// Use descriptive names
const imperialGuardProduction = calculateUnitProduction('imperial_guard');

// Document complex functions
/**
 * Calculates offline progression rewards
 * @param {number} offlineTime - Time away in seconds
 * @param {Object} gameState - Current game state
 * @returns {Object} Rewards earned while offline
 */
function calculateOfflineRewards(offlineTime, gameState) {
  // Implementation
}

// Use consistent error handling
try {
  const result = processGameTick();
  updateUI(result);
} catch (error) {
  console.error('Game tick failed:', error);
  handleGameError(error);
}
```

### File Structure Guidelines
```
src/
├── core/
│   ├── GameEngine.js      # Main game loop
│   ├── ResourceManager.js # Resource calculations
│   ├── UnitManager.js     # Unit management
│   └── SaveManager.js     # Save/load functionality
├── ui/
│   ├── UIManager.js       # UI coordination
│   ├── components/        # Reusable UI components
│   └── screens/           # Game screen implementations
└── data/
    ├── units.json         # Unit definitions
    ├── upgrades.json      # Upgrade trees
    └── campaigns.json     # Campaign data
```

## Testing Strategy

### Unit Tests
- Core calculation functions
- Save/load functionality
- Resource management
- Unit progression

### Integration Tests
- Complete game loops
- UI interactions
- Cross-system dependencies

### Performance Tests
- Frame rate monitoring
- Memory usage tracking
- Load time measurements

## Documentation Updates

When making changes:
1. Update relevant sections in Game Design Document
2. Add technical details to Technical Documentation
3. Update this Development Guide if workflow changes
4. Create/update API documentation for new functions

## Common Patterns

### Resource Calculations
```javascript
// Standard resource generation pattern
function calculateResourceGeneration(resource, deltaTime) {
  const baseRate = resource.baseProduction;
  const multiplier = resource.multiplier;
  const generated = baseRate * multiplier * (deltaTime / 1000);
  return Math.floor(generated);
}
```

### UI Updates
```javascript
// Efficient UI update pattern
function updateResourceDisplay() {
  if (this.lastResourceUpdate + UPDATE_INTERVAL > Date.now()) {
    return; // Skip if updated recently
  }
  
  // Update display
  this.lastResourceUpdate = Date.now();
}
```

### Save State Management
```javascript
// Consistent save state structure
function createSaveState() {
  return {
    version: GAME_VERSION,
    timestamp: Date.now(),
    playerData: exportPlayerData(),
    settings: exportSettings()
  };
}
```

## Debugging Guidelines

### Console Commands (Development)
```javascript
// Debug functions for development
window.DEBUG = {
  addResource: (id, amount) => game.resources.add(id, amount),
  setResource: (id, amount) => game.resources.set(id, amount),
  unlockAll: () => game.unlocks.unlockAll(),
  resetProgress: () => game.reset()
};
```

### Performance Monitoring
```javascript
// Performance tracking
const perfStart = performance.now();
// ... expensive operation
const perfEnd = performance.now();
console.log(`Operation took ${perfEnd - perfStart} milliseconds`);
```

## Release Process

### Pre-Release Checklist
- [ ] All tests passing
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Save compatibility verified
- [ ] Cross-browser testing complete

### Version Management
- Use semantic versioning (MAJOR.MINOR.PATCH)
- Update version in all relevant files
- Tag releases in version control
- Maintain changelog

## Future Considerations

### Scalability
- Modular system design
- Plugin architecture for new content
- Efficient data structures
- Lazy loading strategies

### Platform Expansion
- Mobile app considerations
- Offline-first design
- Cross-platform save sync
- Performance on low-end devices

---

*This development guide will evolve as the project grows and new patterns emerge.*
