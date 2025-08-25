# Warhammer 40K Idle

A simple idle game built with React, Next.js, and Material-UI where you build barracks and train soldiers in the Warhammer 40K universe.

## Features

- **Barracks Management**: Build and upgrade barracks to train soldiers
- **Idle Progress**: Soldiers are automatically generated over time
- **Offline Progress**: Game calculates progress made while you were away
- **Resource Management**: Manage gold and experience points
- **Modern UI**: Beautiful dark theme with Material-UI components
- **Real-time Updates**: Live updates every second showing progress

## Game Mechanics

### Barracks
- Each barracks can train soldiers automatically
- Higher level barracks produce stronger soldiers
- Upgrade barracks to increase capacity and training speed
- Toggle training on/off for each barracks

### Soldiers
- Soldiers have attack, defense, and health stats
- Stats scale with barracks level
- Each soldier provides experience points

### Resources
- **Gold**: Used to build new barracks and upgrade existing ones
- **Experience**: Earned from trained soldiers

### Offline Progress
- Game automatically calculates progress made while offline
- Progress is applied when you return to the game
- Welcome back notification shows when offline progress is detected

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Framework**: Next.js 14 with App Router
- **UI Library**: Material-UI (MUI) v5
- **State Management**: React hooks with custom game state management
- **Storage**: localStorage for game persistence
- **Styling**: Material-UI theming with custom dark theme

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Warhammer40Idle
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Game Controls

- **Build New Barracks**: Click the "Build New Barracks" button (costs 500 gold)
- **Toggle Training**: Click "Start/Pause Training" on any barracks
- **Upgrade Barracks**: Click the upgrade icon on barracks (costs gold based on level)
- **View Soldier Stats**: Hover over soldier chips to see their stats

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page
├── components/         # React components
│   ├── Barracks.tsx    # Barracks component
│   ├── Game.tsx        # Main game component
│   └── Layout.tsx      # Layout with theme provider
├── lib/               # Game logic and utilities
│   ├── gameLogic.ts   # Core game mechanics
│   ├── storage.ts     # localStorage utilities
│   └── useGameState.ts # Custom React hook
└── types/             # TypeScript type definitions
    └── game.ts        # Game state types
```

## Game Balance

- Base training speed: 1 soldier per second
- Base barracks capacity: 10 soldiers
- New barracks cost: 500 gold
- Upgrade cost multiplier: 1.5x per level
- Experience per soldier: 10 XP

## Future Enhancements

- Multiple soldier types with different stats
- Combat system
- Research and technology tree
- Achievements and milestones
- Sound effects and animations
- Multiplayer features
- More Warhammer 40K lore integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
