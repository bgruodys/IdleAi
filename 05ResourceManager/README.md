# IdleWarhammer40k - Imperial Mining Operations

An idle resource management game set in the grim darkness of the 41st millennium. Manage your mining operations, upgrade your facilities, and expand your resource empire across the stars.

## 🎮 Game Features

### Core Mechanics
- **Resource Management**: Mine 5 different Imperial resources (Plasteel, Adamantium, Promethium, Ceramite, Gold)
- **Idle Progression**: Resources continue to accumulate even when you're offline
- **Mine Management**: Activate/deactivate mines and upgrade them for better efficiency
- **Global Upgrades**: Improve mining efficiency, storage capacity, and offline progress

### Warhammer 40k Theme
- **Imperial Aesthetic**: Dark, futuristic UI inspired by the 41st millennium
- **Resource Types**: Authentic Warhammer 40k materials used in Imperial construction
- **Mining Operations**: Space mining facilities for extracting valuable resources

### Offline Progress
- **Auto-Save**: Game automatically saves progress to localStorage
- **Offline Calculation**: Resources continue to generate when the game is closed
- **Progress Multipliers**: Upgrade offline progress efficiency for better returns

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation
1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Game
1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`
3. The game will automatically load and start mining!

## 🎯 Gameplay Guide

### Starting Out
- **Plasteel Mine**: Your first mine is automatically active and generates Plasteel
- **Resource Accumulation**: Watch your resources grow in real-time
- **First Upgrades**: Use Plasteel to upgrade your mining efficiency

### Mining Strategy
1. **Activate Mines**: Start with Plasteel, then unlock other mines as you progress
2. **Upgrade Priority**: Focus on Mining Efficiency first for better production rates
3. **Resource Balance**: Use Plasteel for most upgrades, save Gold for premium upgrades
4. **Storage Management**: Upgrade storage capacity to prevent resource overflow

### Advanced Tactics
- **Mine Synergy**: Higher-level mines produce more resources for upgrading others
- **Offline Optimization**: Invest in offline progress upgrades for better returns
- **Cost Scaling**: Upgrade costs increase exponentially, plan your purchases wisely

## 🏗️ Game Architecture

### Technology Stack
- **React 18**: Modern React with hooks and context
- **Styled Components**: CSS-in-JS for dynamic styling
- **Local Storage**: Persistent game state and offline progress
- **Game Loop**: Real-time resource generation and updates

### Game State Management
- **Context API**: Centralized game state management
- **Reducer Pattern**: Predictable state updates for game actions
- **Auto-Save**: Automatic persistence to localStorage
- **Offline Calculation**: Sophisticated offline progress computation

### Component Structure
- **GameHeader**: Game statistics and save status
- **ResourcePanel**: Current resource amounts and production rates
- **MiningPanel**: Mine management and upgrades
- **UpgradePanel**: Global game improvements

## 🎨 Customization

### Adding New Resources
1. Add resource to `initialState.resources` in `GameContext.js`
2. Add mine configuration in `MiningPanel.js`
3. Update resource colors and names in `ResourcePanel.js`

### Modifying Game Balance
- **Production Rates**: Adjust base production values in the game loop
- **Upgrade Costs**: Modify cost multipliers in upgrade calculations
- **Offline Multipliers**: Change offline progress efficiency

### UI Theming
- **Color Scheme**: Modify the color variables in styled components
- **Layout**: Adjust grid layouts and spacing in component styles
- **Animations**: Customize hover effects and transitions

## 🔧 Development

### Project Structure
```
src/
├── components/          # Game UI components
│   ├── GameHeader.js   # Game title and statistics
│   ├── ResourcePanel.js # Resource display
│   ├── MiningPanel.js  # Mine management
│   └── UpgradePanel.js # Global upgrades
├── context/            # Game state management
│   └── GameContext.js  # Main game context and logic
├── App.js             # Main application component
└── index.js           # Application entry point
```

### Key Features to Extend
- **New Resource Types**: Add more Warhammer 40k materials
- **Advanced Mining**: Implement mining expeditions and rare resource events
- **Faction System**: Add different Imperial factions with unique bonuses
- **Achievement System**: Track player milestones and progress
- **Sound Effects**: Add atmospheric audio for the Warhammer 40k theme

## 🎮 Game Controls

- **Click Mines**: Activate/deactivate individual mining operations
- **Upgrade Buttons**: Improve mine levels and global upgrades
- **Resource Monitoring**: Watch real-time production rates and storage
- **Auto-Save**: Game automatically saves every action

## 🌟 Future Enhancements

- **Multiplayer Features**: Compete with other players
- **Advanced Combat**: Defend your mining operations from threats
- **Planetary Expansion**: Mine on different worlds with unique resources
- **Imperial Missions**: Complete objectives for bonus rewards
- **Mobile App**: React Native version for mobile devices

## 📱 Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: Responsive design works on mobile browsers
- **Offline**: Works offline once loaded, with full offline progress

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs or suggesting features
- Submitting pull requests for improvements
- Adding new Warhammer 40k themed content
- Optimizing game performance

## 📄 License

This project is open source and available under the MIT License.

---

**For the Emperor!** 🚀⚔️

*May your mining operations bring glory to the Imperium of Man.*
