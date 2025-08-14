# IdleWarhammer40k - Game File Structure

## Project Overview
IdleWarhammer40k is a browser-based idle game set in the Warhammer 40,000 universe, designed to run on multiple platforms including desktop browsers, mobile browsers, and potentially as a Progressive Web App (PWA).

## Technology Stack
- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules + Tailwind CSS
- **State Management**: Zustand
- **Audio**: Web Audio API
- **Storage**: LocalStorage + IndexedDB
- **PWA**: Service Workers for offline support
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier

## Complete File Structure

```
idle-warhammer-40k/
├── public/                          # Static assets
│   ├── index.html                   # Main HTML file
│   ├── favicon.ico                  # Favicon
│   ├── manifest.json               # PWA manifest
│   ├── robots.txt                  # SEO robots file
│   ├── assets/                     # Static game assets
│   │   ├── images/                 # Image assets
│   │   │   ├── ui/                 # UI elements
│   │   │   │   ├── buttons/        # Button sprites
│   │   │   │   ├── icons/          # UI icons
│   │   │   │   ├── backgrounds/    # Background images
│   │   │   │   └── borders/        # Border decorations
│   │   │   ├── units/              # Unit sprites
│   │   │   │   ├── space-marines/  # Space Marine units
│   │   │   │   ├── orks/           # Ork units
│   │   │   │   ├── eldar/          # Eldar units
│   │   │   │   ├── necrons/        # Necron units
│   │   │   │   ├── tyranids/       # Tyranid units
│   │   │   │   └── chaos/          # Chaos units
│   │   │   ├── buildings/          # Building sprites
│   │   │   ├── weapons/            # Weapon sprites
│   │   │   ├── vehicles/           # Vehicle sprites
│   │   │   └── effects/            # Visual effects
│   │   ├── sounds/                 # Audio assets
│   │   │   ├── music/              # Background music
│   │   │   ├── sfx/                # Sound effects
│   │   │   │   ├── ui/             # UI sound effects
│   │   │   │   ├── combat/         # Combat sounds
│   │   │   │   ├── building/       # Building sounds
│   │   │   │   └── ambient/        # Ambient sounds
│   │   │   └── voice/              # Voice lines
│   │   └── data/                   # Static game data
│   │       ├── units.json          # Unit definitions
│   │       ├── buildings.json      # Building definitions
│   │       ├── weapons.json        # Weapon definitions
│   │       ├── vehicles.json       # Vehicle definitions
│   │       ├── factions.json       # Faction definitions
│   │       └── achievements.json   # Achievement definitions
│   └── sw.js                       # Service Worker
├── src/                            # Source code
│   ├── main.tsx                    # Application entry point
│   ├── App.tsx                     # Root application component
│   ├── index.css                   # Global styles
│   ├── vite-env.d.ts              # Vite type definitions
│   ├── core/                       # Core game systems
│   │   ├── GameEngine.ts           # Main game engine
│   │   ├── GameState.ts            # Global game state
│   │   ├── GameLoop.ts             # Game loop management
│   │   ├── SaveManager.ts          # Save/load system
│   │   ├── ConfigManager.ts        # Configuration management
│   │   ├── AudioManager.ts         # Audio system
│   │   ├── InputManager.ts         # Input handling
│   │   ├── PerformanceManager.ts   # Performance monitoring
│   │   └── PlatformManager.ts      # Platform detection
│   ├── systems/                    # Game systems
│   │   ├── ResourceSystem.ts       # Resource management
│   │   ├── UnitSystem.ts           # Unit management
│   │   ├── BuildingSystem.ts       # Building management
│   │   ├── CombatSystem.ts         # Combat mechanics
│   │   ├── ResearchSystem.ts       # Research and upgrades
│   │   ├── FactionSystem.ts        # Faction management
│   │   ├── MissionSystem.ts        # Mission system
│   │   ├── AchievementSystem.ts    # Achievement tracking
│   │   ├── EventSystem.ts          # Event management
│   │   ├── TimeSystem.ts           # Time and progression
│   │   └── BalanceSystem.ts        # Game balance
│   ├── models/                     # Data models
│   │   ├── types/                  # TypeScript type definitions
│   │   │   ├── GameTypes.ts        # Core game types
│   │   │   ├── UnitTypes.ts        # Unit-related types
│   │   │   ├── BuildingTypes.ts    # Building-related types
│   │   │   ├── CombatTypes.ts      # Combat-related types
│   │   │   └── UITypes.ts          # UI-related types
│   │   ├── Unit.ts                 # Unit model
│   │   ├── Building.ts             # Building model
│   │   ├── Weapon.ts               # Weapon model
│   │   ├── Vehicle.ts              # Vehicle model
│   │   ├── Faction.ts              # Faction model
│   │   ├── Mission.ts              # Mission model
│   │   ├── Achievement.ts          # Achievement model
│   │   └── Resource.ts             # Resource model
│   ├── stores/                     # State management
│   │   ├── GameStore.ts            # Main game store
│   │   ├── UIStore.ts              # UI state store
│   │   ├── AudioStore.ts           # Audio state store
│   │   ├── SettingsStore.ts        # Settings store
│   │   └── NotificationStore.ts    # Notification store
│   ├── ui/                         # User interface
│   │   ├── components/             # Reusable UI components
│   │   │   ├── common/             # Common components
│   │   │   │   ├── Button.tsx      # Button component
│   │   │   │   ├── Modal.tsx       # Modal component
│   │   │   │   ├── Tooltip.tsx     # Tooltip component
│   │   │   │   ├── ProgressBar.tsx # Progress bar component
│   │   │   │   ├── Icon.tsx        # Icon component
│   │   │   │   ├── Badge.tsx       # Badge component
│   │   │   │   ├── Card.tsx        # Card component
│   │   │   │   ├── Tabs.tsx        # Tabs component
│   │   │   │   ├── Dropdown.tsx    # Dropdown component
│   │   │   │   ├── Slider.tsx      # Slider component
│   │   │   │   ├── Toggle.tsx      # Toggle component
│   │   │   │   └── Loading.tsx     # Loading component
│   │   │   ├── game/               # Game-specific components
│   │   │   │   ├── UnitCard.tsx    # Unit display card
│   │   │   │   ├── BuildingCard.tsx # Building display card
│   │   │   │   ├── ResourceDisplay.tsx # Resource display
│   │   │   │   ├── CombatLog.tsx   # Combat log display
│   │   │   │   ├── MissionCard.tsx # Mission display
│   │   │   │   ├── AchievementCard.tsx # Achievement display
│   │   │   │   ├── FactionBanner.tsx # Faction banner
│   │   │   │   ├── UpgradeTree.tsx # Upgrade tree display
│   │   │   │   ├── Battlefield.tsx # Battlefield display
│   │   │   │   └── MiniMap.tsx     # Mini map component
│   │   │   ├── layout/             # Layout components
│   │   │   │   ├── Header.tsx      # Header component
│   │   │   │   ├── Sidebar.tsx     # Sidebar component
│   │   │   │   ├── Footer.tsx      # Footer component
│   │   │   │   ├── Navigation.tsx  # Navigation component
│   │   │   │   └── Layout.tsx      # Main layout wrapper
│   │   │   └── forms/              # Form components
│   │   │       ├── Input.tsx       # Input component
│   │   │       ├── Select.tsx      # Select component
│   │   │       ├── Checkbox.tsx    # Checkbox component
│   │   │       ├── Radio.tsx       # Radio component
│   │   │       └── Form.tsx        # Form wrapper
│   │   ├── pages/                  # Page components
│   │   │   ├── MainGame.tsx        # Main game page
│   │   │   ├── Barracks.tsx        # Barracks page
│   │   │   ├── Workshop.tsx        # Workshop page
│   │   │   ├── Research.tsx        # Research page
│   │   │   ├── Missions.tsx        # Missions page
│   │   │   ├── Achievements.tsx    # Achievements page
│   │   │   ├── Settings.tsx        # Settings page
│   │   │   ├── Statistics.tsx      # Statistics page
│   │   │   ├── Help.tsx            # Help page
│   │   │   └── Credits.tsx         # Credits page
│   │   ├── hooks/                  # Custom React hooks
│   │   │   ├── useGameState.ts     # Game state hook
│   │   │   ├── useAudio.ts         # Audio hook
│   │   │   ├── useLocalStorage.ts  # Local storage hook
│   │   │   ├── useInterval.ts      # Interval hook
│   │   │   ├── useDebounce.ts      # Debounce hook
│   │   │   ├── useClickOutside.ts  # Click outside hook
│   │   │   └── useResponsive.ts    # Responsive design hook
│   │   └── styles/                 # Component styles
│   │       ├── components/         # Component-specific styles
│   │       ├── pages/              # Page-specific styles
│   │       └── themes/             # Theme definitions
│   ├── utils/                      # Utility functions
│   │   ├── MathUtils.ts            # Mathematical utilities
│   │   ├── TimeUtils.ts            # Time-related utilities
│   │   ├── StringUtils.ts          # String manipulation
│   │   ├── ArrayUtils.ts           # Array manipulation
│   │   ├── ObjectUtils.ts          # Object manipulation
│   │   ├── ValidationUtils.ts      # Input validation
│   │   ├── FormatUtils.ts          # Data formatting
│   │   ├── StorageUtils.ts         # Storage utilities
│   │   ├── AudioUtils.ts           # Audio utilities
│   │   ├── PlatformUtils.ts        # Platform detection
│   │   ├── PerformanceUtils.ts     # Performance utilities
│   │   └── Constants.ts            # Game constants
│   ├── services/                   # External services
│   │   ├── AnalyticsService.ts     # Analytics tracking
│   │   ├── CloudSaveService.ts     # Cloud save service
│   │   ├── LeaderboardService.ts   # Leaderboard service
│   │   ├── NotificationService.ts  # Push notifications
│   │   └── UpdateService.ts        # Update checking
│   ├── config/                     # Configuration files
│   │   ├── gameConfig.ts           # Game configuration
│   │   ├── audioConfig.ts          # Audio configuration
│   │   ├── uiConfig.ts             # UI configuration
│   │   ├── balanceConfig.ts        # Balance configuration
│   │   └── platformConfig.ts       # Platform-specific config
│   └── data/                       # Game data
│       ├── units/                  # Unit data
│       │   ├── spaceMarines.ts     # Space Marine units
│       │   ├── orks.ts             # Ork units
│       │   ├── eldar.ts            # Eldar units
│       │   ├── necrons.ts          # Necron units
│       │   ├── tyranids.ts         # Tyranid units
│       │   └── chaos.ts            # Chaos units
│       ├── buildings/              # Building data
│       ├── weapons/                # Weapon data
│       ├── vehicles/               # Vehicle data
│       ├── factions/               # Faction data
│       ├── missions/               # Mission data
│       ├── achievements/           # Achievement data
│       └── events/                 # Event data
├── tests/                          # Test files
│   ├── unit/                       # Unit tests
│   │   ├── core/                   # Core system tests
│   │   ├── systems/                # Game system tests
│   │   ├── models/                 # Model tests
│   │   ├── stores/                 # Store tests
│   │   ├── utils/                  # Utility tests
│   │   └── services/               # Service tests
│   ├── integration/                # Integration tests
│   ├── e2e/                        # End-to-end tests
│   └── fixtures/                   # Test data
├── docs/                           # Documentation
│   ├── API.md                      # API documentation
│   ├── ARCHITECTURE.md             # Architecture documentation
│   ├── DEPLOYMENT.md               # Deployment guide
│   ├── CONTRIBUTING.md             # Contribution guide
│   └── CHANGELOG.md                # Change log
├── scripts/                        # Build and deployment scripts
│   ├── build.js                    # Build script
│   ├── deploy.js                   # Deployment script
│   ├── analyze.js                  # Bundle analysis
│   └── generate-assets.js          # Asset generation
├── .github/                        # GitHub workflows
│   └── workflows/                  # CI/CD workflows
├── .vscode/                        # VS Code configuration
├── package.json                    # Dependencies and scripts
├── package-lock.json               # Lock file
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── jest.config.js                  # Jest configuration
├── .eslintrc.js                    # ESLint configuration
├── .prettierrc                     # Prettier configuration
├── .gitignore                      # Git ignore file
├── README.md                       # Project readme
└── AI_TECHNICAL_DOCUMENTATION.md   # AI development standards
```

## Key Architectural Decisions

### 1. **Modular Architecture**
- Each system is self-contained and follows SOLID principles
- Clear separation of concerns between core, systems, models, and UI
- Dependency injection for loose coupling

### 2. **Cross-Platform Support**
- Progressive Web App (PWA) capabilities
- Responsive design for mobile and desktop
- Platform detection and optimization
- Service worker for offline functionality

### 3. **Performance Optimization**
- Lazy loading of components and assets
- Efficient state management with Zustand
- Optimized rendering with React 18 features
- Asset optimization and compression

### 4. **Scalability**
- Modular file structure for easy expansion
- TypeScript for type safety and better development experience
- Comprehensive testing structure
- Clear documentation and standards

### 5. **Warhammer 40k Theme Integration**
- Faction-based unit and building systems
- Authentic Warhammer 40k lore integration
- Multiple playable factions
- Rich visual and audio assets

## Development Workflow

1. **Setup**: Clone repository and install dependencies
2. **Development**: Use Vite dev server for hot reloading
3. **Testing**: Run unit, integration, and e2e tests
4. **Building**: Create optimized production build
5. **Deployment**: Deploy to multiple platforms

## Platform Support

- **Desktop Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Web App**: Installable on supported platforms
- **Offline Support**: Service worker for offline gameplay

This structure provides a solid foundation for building a high-quality, scalable, and maintainable IdleWarhammer40k game that can run across multiple platforms while following industry best practices and the established AI technical documentation standards. 