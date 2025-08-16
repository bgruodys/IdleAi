# IdleWarhammer40k - Browser Idle Game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)]()
[![Status](https://img.shields.io/badge/Status-In%20Development-orange.svg)]()

An idle browser game set in the grimdark universe of Warhammer 40,000. Command Imperial forces in an endless war against the enemies of mankind through strategic resource management and tactical decision-making.

## 🎮 Game Overview

In IdleWarhammer40k, you serve as an Imperial commander managing troops in a constant battle for humanity's survival. The game features:

- **Autonomous Warfare**: Battles continue even when offline
- **Rank Progression**: Advance through Imperial hierarchy 
- **Strategic Defense**: Protect your outpost from hourly assaults
- **Reinforcement Management**: Deploy troops based on your rank
- **Grimdark Atmosphere**: Authentic Warhammer 40k experience

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- JavaScript enabled
- Minimum 1GB RAM available

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/IdleWarhammer40k.git
   cd IdleWarhammer40k
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

### Production Build
```bash
npm run build
npm run preview
```

## 🎯 Core Gameplay

### Reinforcement System
- **Frequency**: New troops arrive every 60 seconds
- **Scaling**: Higher ranks receive more and better units
- **Strategy**: Balance offensive and defensive deployments

### Rank Progression  
- **Earn Points**: Eliminate enemies to gain Rank Points (RP)
- **Advance Ranks**: Rise through 20+ Imperial ranks
- **Unlock Benefits**: Better reinforcements and special abilities

### Outpost Defense
- **Hourly Assaults**: Defend against escalating enemy attacks
- **Consequence System**: Failures result in RP loss and casualties
- **Strategic Planning**: Build defenses and manage garrison forces

### Battle System
- **100x100 Grid**: Large-scale battlefield simulation
- **Autonomous Combat**: Units move and fight independently
- **Tactical Depth**: Terrain, formations, and special abilities

## 📁 Project Structure

```
IdleWarhammer40k/
├── src/
│   ├── components/          # React Components
│   │   ├── GameInterface/
│   │   ├── Battlefield/
│   │   ├── UI/
│   │   └── common/
│   ├── hooks/              # Custom React Hooks
│   │   ├── useGameLoop.ts
│   │   ├── useUnits.ts
│   │   └── useBattlefield.ts
│   ├── stores/             # Zustand Stores
│   │   ├── gameStore.ts
│   │   ├── unitsStore.ts
│   │   └── battlefieldStore.ts
│   ├── systems/            # Game Logic
│   │   ├── GameEngine.ts
│   │   ├── Battlefield.ts
│   │   └── UnitSystem.ts
│   ├── types/              # TypeScript Types
│   │   ├── Unit.ts
│   │   └── GameState.ts
│   ├── utils/              # Utilities
│   │   ├── constants.ts
│   │   └── saveManager.ts
│   ├── assets/             # Game Assets
│   │   ├── sprites/
│   │   ├── audio/
│   │   └── data/
│   └── styles/             # CSS Styles
├── docs/                   # Documentation
├── tests/                  # Test Files
└── build/                  # Production Build
```

## 🛠️ Development

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **State Management**: Zustand
- **Rendering**: HTML5 Canvas
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Testing**: React Testing Library + Jest + Playwright
- **Storage**: LocalStorage with IndexedDB fallback

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run lint         # Check code quality
npm run preview      # Preview production build
```

### Code Quality
- **ESLint**: Enforces coding standards
- **Prettier**: Code formatting
- **Jest**: Unit testing (80%+ coverage required)
- **Playwright**: E2E testing

## 📊 Testing

### Running Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

### Test Coverage Goals
- **Core Systems**: 90%+ coverage
- **UI Components**: 80%+ coverage
- **Utilities**: 95%+ coverage
- **Integration**: All critical paths tested

## 🎨 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Coding Standards
- Follow ESLint configuration for React + TypeScript
- Write unit tests for React components and custom hooks
- Use React Testing Library for component testing
- Update documentation for API changes
- Follow SOLID principles with React patterns
- Use TypeScript for type safety
- Implement proper React performance optimizations

### Commit Convention
```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
Examples:
- feat(combat): add area of effect attacks
- fix(ui): resolve mobile layout issues in React components
- docs(api): update game mechanics documentation
- refactor(hooks): optimize useGameLoop performance
```

## 📖 Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[Game Overview](docs/IdleWarhammer40k-Overview.md)**: Core concepts and features
- **[Game Mechanics](docs/Game-Mechanics.md)**: Detailed system explanations  
- **[Technical Specifications](docs/Technical-Specifications.md)**: Architecture and implementation
- **[UI Design](docs/UI-Design.md)**: Interface design principles
- **[Implementation Roadmap](docs/Implementation-Roadmap.md)**: Development timeline
- **[Balance and Progression](docs/Balance-and-Progression.md)**: Game balance details

## 🐛 Known Issues

### Current Limitations
- **Performance**: Large battles may impact frame rate on older devices
- **Mobile**: Touch controls need optimization for small screens
- **Audio**: Sound effects not yet implemented
- **Saves**: No cloud synchronization (local storage only)

### Planned Fixes
See [Implementation Roadmap](docs/Implementation-Roadmap.md) for detailed timeline.

## 🔮 Roadmap

### Phase 1: Core Foundation ✅
- Basic game loop and infrastructure
- Simple combat and reinforcement systems

### Phase 2: Core Mechanics 🚧
- Complete reinforcement and rank systems
- Enemy varieties and defense events

### Phase 3: User Interface 📋
- Polished UI components
- Mobile responsiveness
- Audio integration

### Phase 4: Advanced Features 📋
- Additional content and mechanics
- Performance optimization
- Balancing and polish

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Games Workshop** for the Warhammer 40,000 universe (used under fair use)
- **MDN Web Docs** for excellent web development documentation
- **Jest** and **Playwright** teams for testing frameworks
- **Vite** team for the excellent build tool

## 📞 Support

### Getting Help
- **Documentation**: Check `/docs` folder for detailed guides
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Use GitHub Discussions for questions
- **Email**: contact@idlewarhammer40k.com (if available)

### System Requirements
- **Minimum**: Chrome 90+, 2GB RAM, 100MB storage
- **Recommended**: Chrome 100+, 4GB RAM, 500MB storage
- **Optimal**: Modern browser, 8GB+ RAM, SSD storage

---

**For the Emperor!** ⚔️

*"In the grim darkness of the far future, there is only war..."*
