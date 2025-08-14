# IdleWarhammer40k

A browser-based idle game set in the Warhammer 40,000 universe where you command Space Marines against endless waves of Orks.

## 🎮 Game Overview

**IdleWarhammer40k** is an idle strategy game where you lead the Space Marines in an eternal battle against the Ork hordes. The game features:

- **Space Marines**: Your faction with various unit types (Tactical Marines, Assault Marines, Devastators, etc.)
- **Ork Enemies**: Endless waves of Ork forces attacking every 10 seconds
- **Reinforcements**: New Space Marine units arrive every minute
- **Combat System**: Real-time tactical combat with damage calculations
- **Resource Management**: Earn credits, materials, and experience from victories
- **Progressive Web App**: Play on desktop, mobile, or install as an app

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd idle-warhammer-40k
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎯 Game Mechanics

### Core Systems

- **Reinforcement System**: Space Marines receive reinforcements every 60 seconds
- **Attack System**: Orks spawn and attack every 10 seconds
- **Combat System**: Units automatically engage enemies within range
- **Resource System**: Earn rewards for defeating enemies
- **Save System**: Automatic save every 30 seconds

### Unit Types

#### Space Marines
- **Tactical Marine**: Balanced infantry unit
- **Assault Marine**: Fast melee specialist
- **Devastator Marine**: Heavy weapons specialist
- **Terminator**: Elite armored infantry
- **Dreadnought**: Heavy walker unit
- **Predator Tank**: Main battle tank
- **Land Raider**: Heavy transport
- **Thunderhawk Gunship**: Aerial support

#### Ork Forces
- **Ork Boy**: Basic infantry
- **Nob**: Elite infantry leader
- **Warboss**: Powerful commander
- **Trukk**: Fast transport vehicle
- **Battlewagon**: Heavy transport
- **Deff Dread**: Ork walker
- **Loota**: Heavy weapons specialist
- **Stormboy**: Jump pack infantry

### Combat Stats

Each unit has the following stats:
- **Health**: Current and maximum health points
- **Attack**: Damage output
- **Defense**: Damage reduction
- **Speed**: Movement and attack speed
- **Range**: Attack distance

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Audio**: Web Audio API
- **Storage**: LocalStorage + IndexedDB
- **PWA**: Service Workers

## 📁 Project Structure

```
idle-warhammer-40k/
├── src/
│   ├── core/           # Core game systems
│   ├── systems/        # Game mechanics
│   ├── models/         # Data models and types
│   ├── stores/         # State management
│   ├── ui/             # User interface components
│   ├── utils/          # Utility functions
│   ├── config/         # Game configuration
│   └── data/           # Game data (units, etc.)
├── public/             # Static assets
└── docs/              # Documentation
```

## 🎨 Features

### Current Features
- ✅ Real-time combat system
- ✅ Automatic reinforcements (every 60s)
- ✅ Enemy attacks (every 10s)
- ✅ Unit health and damage system
- ✅ Resource tracking (credits, materials, experience)
- ✅ Visual battlefield with unit positions
- ✅ Responsive design for mobile and desktop
- ✅ Auto-save system

### Planned Features
- 🔄 Unit upgrades and research
- 🔄 Building system
- 🔄 Multiple factions (Eldar, Necrons, etc.)
- 🔄 Mission system
- 🔄 Achievement system
- 🔄 Sound effects and music
- 🔄 Cloud save support
- 🔄 Multiplayer features

## 🎮 How to Play

1. **Start the Game**: The game begins automatically when you load the page
2. **Watch Reinforcements**: Space Marines will arrive every minute
3. **Defend Against Orks**: Ork forces attack every 10 seconds
4. **Monitor Combat**: Watch the battlefield and combat log for updates
5. **Collect Resources**: Earn rewards from defeating enemies
6. **Save Progress**: Your progress is automatically saved

## 🔧 Development

### Code Standards
This project follows the AI Technical Documentation standards:
- SOLID principles
- Each class in separate files
- Comprehensive TypeScript types
- JSDoc documentation
- Consistent naming conventions

### Contributing
1. Fork the repository
2. Create a feature branch
3. Follow the coding standards
4. Add tests for new features
5. Submit a pull request

## 📱 Platform Support

- **Desktop Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Progressive Web App**: Installable on supported platforms
- **Offline Support**: Service worker for offline gameplay

## 🎯 Game Balance

### Current Settings
- **Reinforcement Interval**: 60 seconds
- **Attack Interval**: 10 seconds
- **Max Units**: 50 per side
- **Starting Resources**: 1000 credits, 500 materials

### Combat Balance
- **Critical Hit Chance**: 10%
- **Critical Hit Multiplier**: 2x
- **Experience per Kill**: 10 XP
- **Credits per Kill**: 5 credits
- **Materials per Kill**: 2 materials

## 🐛 Known Issues

- Combat log currently shows mock data (will be connected to real events)
- Audio system not yet implemented
- Some advanced features still in development

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Games Workshop for the Warhammer 40,000 universe
- The React and TypeScript communities
- All contributors and testers

---

**For the Emperor!** 🛡️⚔️ 