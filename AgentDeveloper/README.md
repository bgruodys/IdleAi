# Idle Warhammer 40k Game

A comprehensive idle/incremental game set in the Warhammer 40,000 universe, built with React, TypeScript, and Material-UI.

## 🎮 Game Overview

Command Imperial forces in an endless battle against the forces of Chaos. Build your ranks, upgrade your units, and defend strategic positions in the grim darkness of the far future.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AgentDeveloper
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the game in your browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - One-way operation to eject from Create React App
- `npm run lint` - Runs ESLint to check code quality
- `npm run lint:fix` - Automatically fixes ESLint issues

## 📋 Development Roadmap

### ✅ Week 1: Foundation (COMPLETED)
- [x] Project setup with React 18, TypeScript, and Vite
- [x] Material-UI integration for consistent design system
- [x] Core component library (Button, ProgressBar, Panel, Layout)
- [x] Error boundary implementation
- [x] Utility functions and mathematical helpers
- [x] Comprehensive test suite with Jest and React Testing Library
- [x] ESLint and Prettier configuration

### ✅ Week 2: Game Engine Core (COMPLETED)
- [x] **GameEngine class with React context integration**
  - Singleton pattern for centralized game management
  - Game loop with 60 FPS target and delta time calculations
  - State management with subscriber pattern for React integration
  - Save/load functionality with automatic persistence
  
- [x] **Enhanced Zustand stores for game state**
  - Complete game state management with persistence middleware
  - Player progression, battlefield management, and statistics tracking
  - Timer management for reinforcements and assault events
  - Settings management with audio, graphics, and gameplay options
  
- [x] **SaveManager with React persistence hooks**
  - Automatic backup rotation with configurable retention
  - Data validation and checksum verification
  - Import/export functionality for save sharing
  - Error recovery and corrupted data handling
  
- [x] **React custom hooks for game systems**
  - `usePlayerState` - Player rank, points, and progression
  - `useBattlefield` - Unit management and battlefield state
  - `useGameTimers` - Reinforcement and assault timers
  - `useGameLifecycle` - Game start, pause, resume, stop
  - `useGameStatistics` - Kill rates, win rates, survival rates
  - `useGameSettings` - Audio, graphics, and UI preferences
  - `useRankProgression` - Rank titles and progression tracking
  - `useGameState` - Combined access to all game systems
  
- [x] **Configuration management with React context**
  - App-level configuration separate from game state
  - Theme management (light/dark/auto with system detection)
  - Accessibility settings (reduced motion, high contrast, font size)
  - Performance settings (animations, particle effects, FPS limits)
  - Developer tools and debug mode
  - Internationalization support

### 🔄 Week 3: Core Gameplay Systems (IN PROGRESS)
- [ ] Unit system with Imperial Guard archetypes
- [ ] Combat mechanics and damage calculations
- [ ] Resource management (Personnel, Equipment, Morale)
- [ ] Reinforcement system and unit recruitment
- [ ] Basic progression and rank advancement

### 📅 Week 4: Battle System
- [ ] Turn-based tactical combat
- [ ] Enemy AI and wave generation
- [ ] Special abilities and unit commands
- [ ] Battle statistics and performance metrics

### 📅 Week 5: Progression & Upgrades
- [ ] Technology tree and research system
- [ ] Unit upgrades and specializations
- [ ] Equipment and weapon systems
- [ ] Achievement system

### 📅 Week 6: Advanced Features
- [ ] Multiple battlefield scenarios
- [ ] Elite units and special forces
- [ ] Campaign mode with story progression
- [ ] Prestige system for long-term progression

## 🏗️ Architecture

### Core Technologies
- **React 18** - User interface framework
- **TypeScript** - Type-safe JavaScript development
- **Material-UI v5** - Component library and design system
- **Zustand** - Lightweight state management with persistence
- **Jest + React Testing Library** - Comprehensive testing framework

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── common/          # Basic UI building blocks
│   └── GameInterface/   # Game-specific interface components
├── contexts/            # React context providers
│   ├── ConfigContext.tsx      # App configuration management
│   └── GameEngineContext.tsx  # Game engine integration
├── hooks/               # Custom React hooks
│   ├── useGameSystems.ts      # Game system hooks
│   ├── useGameLoop.ts         # Game loop management
│   └── usePersistence.ts      # Data persistence hooks
├── stores/              # Zustand state stores
│   └── gameStore.ts     # Main game state store
├── systems/             # Core game systems
│   ├── GameEngine.ts    # Main game engine class
│   └── SaveManager.ts   # Save/load management
├── types/               # TypeScript type definitions
│   ├── GameState.ts     # Core game state types
│   ├── Unit.ts          # Unit and combat types
│   └── Battlefield.ts   # Battlefield and spatial types
├── utils/               # Utility functions
│   ├── mathUtils.ts     # Mathematical helpers
│   └── constants.ts     # Game constants and configuration
└── __tests__/           # Comprehensive test suites
```

### Key Design Principles

#### SOLID Principles Implementation
- **Single Responsibility** - Each class and component has one clear purpose
- **Open/Closed** - Systems are extensible without modification
- **Liskov Substitution** - Interfaces are properly abstracted
- **Interface Segregation** - Small, focused interfaces
- **Dependency Inversion** - Dependencies are injected, not hardcoded

#### State Management Architecture
- **GameEngine** - Centralized game logic and coordination
- **Zustand Store** - Reactive state management with persistence
- **React Context** - Configuration and app-level state
- **Custom Hooks** - Abstracted system interactions

#### Testing Strategy
- Unit tests for all utility functions and game logic
- Component tests for UI interactions
- Integration tests for system interactions
- Mocked dependencies for isolated testing
- Test coverage targets: 80%+ for statements, branches, and functions

## 🎯 Game Features

### Current Implementation
- **Player Progression** - Rank advancement system with exponential requirements
- **Time Management** - Real-time progression with pause/resume functionality
- **Save System** - Automatic saves with manual backup/restore
- **Statistics Tracking** - Comprehensive performance metrics
- **Settings Management** - Customizable gameplay and accessibility options
- **Responsive Design** - Works on desktop and mobile devices

### Planned Features
- **Combat System** - Turn-based tactical battles
- **Unit Management** - Recruit, train, and upgrade Imperial forces
- **Resource Economy** - Manage personnel, equipment, and morale
- **Technology Tree** - Research advanced weapons and tactics
- **Achievement System** - Unlock rewards for various milestones
- **Campaign Mode** - Story-driven progression through different battlefields

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test files
npm test -- --testPathPattern="GameEngine"
```

### Test Coverage
Current test coverage focuses on:
- Mathematical utilities (100% coverage)
- UI components (comprehensive interaction testing)
- Game engine core functionality
- State management systems
- Error handling and edge cases

### Test Structure
- **Unit Tests** - Individual function and class testing
- **Component Tests** - React component behavior and rendering
- **Integration Tests** - System interaction testing
- **E2E Tests** - (Planned) Full user workflow testing

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:
```env
REACT_APP_GAME_VERSION=1.0.0
REACT_APP_DEBUG_MODE=true
REACT_APP_AUTO_SAVE_INTERVAL=30000
```

### Build Configuration
The project uses Create React App with TypeScript template:
- **Webpack** - Module bundling and optimization
- **Babel** - JavaScript transpilation
- **TypeScript** - Type checking and compilation
- **ESLint** - Code quality and style enforcement
- **Prettier** - Code formatting

## 📖 Documentation

Detailed documentation is maintained in the `docs/` folder:
- [Architecture Overview](docs/architecture.md)
- [Game Design Document](docs/game-design.md)
- [API Reference](docs/api-reference.md)
- [Contributing Guidelines](docs/contributing.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain test coverage above 80%
- Use conventional commit messages
- Follow SOLID principles
- Write comprehensive documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚖️ Legal Notice

This is a fan-made game inspired by the Warhammer 40,000 universe. All Warhammer 40,000 related content is the property of Games Workshop Ltd. This project is not affiliated with or endorsed by Games Workshop.

---

**For the Emperor!** 🦅

*In the grim darkness of the far future, there is only war...*
