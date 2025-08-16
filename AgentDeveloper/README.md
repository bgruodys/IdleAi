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

## �️ Tech Stack

### Frontend Framework
- **React 18**: Modern React with Hooks and concurrent features
- **TypeScript**: Full type safety and developer experience
- **Vite**: Fast development server and optimized builds

### UI Framework
- **Material UI v5**: Professional component library with accessibility
- **Emotion**: CSS-in-JS styling solution
- **Custom Warhammer 40k Theme**: Dark theme with Imperial Gold accents
- **Material Icons**: Comprehensive icon library

### State Management
- **Zustand**: Lightweight state management with TypeScript support
- **React Context**: Component-level state and theme management
- **LocalStorage**: Persistent game save data

### Testing
- **Jest**: JavaScript testing framework
- **React Testing Library**: Component testing utilities
- **Testing Library Jest DOM**: Extended matchers for DOM testing

### Code Quality
- **ESLint**: Code linting with React and TypeScript rules
- **Prettier**: Code formatting and style consistency
- **TypeScript**: Static type checking
│   ├── assets/             # Game Assets
## 📁 Project Structure

```
IdleWarhammer40k/
├── src/
│   ├── components/          # React Components
│   │   ├── GameInterface/   # Main game interface
│   │   ├── common/          # Material UI component library
│   │   │   ├── Button.tsx   # Custom button with variants
│   │   │   ├── ProgressBar.tsx # Progress indicators
│   │   │   ├── Layout.tsx   # Tabs, panels, cards
│   │   │   └── index.ts     # Barrel exports
│   │   └── __tests__/       # Component tests
│   ├── hooks/              # Custom React Hooks
│   │   ├── useGameLoop.ts   # Game loop management
│   │   ├── usePersistence.ts # Save/load functionality
│   │   └── useTimer.ts      # Timer utilities
│   ├── stores/             # Zustand Stores
│   │   └── gameStore.ts     # Game state management
│   ├── types/              # TypeScript Types
│   │   ├── GameState.ts     # Core game types
│   │   └── index.ts         # Type exports
│   ├── utils/              # Utilities
│   │   ├── constants.ts     # Game constants
│   │   ├── mathUtils.ts     # Mathematical functions
│   │   └── __tests__/       # Utility tests
│   └── main.tsx            # App entry point with MUI theme
├── docs/                   # Documentation
│   ├── Game-Overview.md
│   ├── Technical-Specifications.md
│   ├── Implementation-Roadmap.md
│   └── Material-UI-Integration.md
└── public/                 # Static assets
```

## 🎨 UI Components Library

The game features a comprehensive Material UI component library with Warhammer 40k theming:

### Available Components
- **Button**: Multiple variants (primary, secondary, danger, ghost) with loading states
- **ProgressBar**: Animated progress indicators with labels and color variants  
- **Panel**: Container components with titles and header actions
- **Tabs**: Navigation tabs with icons and responsive design
- **Card**: Interactive cards with hover effects and selection states
- **StatDisplay**: Chip-based displays for game statistics

### Theme Features
- **Dark Mode**: Grimdark color scheme with Imperial Gold accents
- **Typography**: Roboto font family with custom heading styles
- **Responsive**: Mobile-first design with breakpoint support
- **Accessibility**: WCAG 2.1 AA compliance with proper ARIA attributes

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Create production build
npm run test         # Run unit tests with Jest
npm run type-check   # TypeScript type checking
npm run lint         # ESLint code quality check
npm run preview      # Preview production build
```

### Development Workflow
1. **Hot Reload**: Instant updates during development
2. **Type Safety**: Full TypeScript integration with strict checking
3. **Code Quality**: ESLint + Prettier with pre-commit hooks
4. **Testing**: Unit tests with React Testing Library

## 📊 Testing

### Test Coverage
- **Target Coverage**: 80% minimum for all core systems
- **Component Tests**: Material UI integration testing
- **Utility Tests**: Mathematical functions and game logic
- **Integration Tests**: Store and hook interactions

### Running Tests
```bash
# Run all tests
npm test

# Watch mode for development
npm test -- --watch

# Coverage report
npm test -- --coverage
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
