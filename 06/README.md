# The Emperor's Call - Idle Game

A Warhammer 40,000 themed idle strategy game built with React, Redux, and Material-UI.

## Features

- **Player Arrival**: Player drops into an unknown planet when the game starts
- **Reinforcements**: Automatic reinforcements arrive every 5 seconds
- **Game State Management**: Redux store manages player, planet, and reinforcement data
- **Basic UI**: Material-UI components display game data in a simple list format

## Tech Stack

- **React 18** - UI framework
- **Redux Toolkit** - State management
- **Material-UI (MUI)** - UI components
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Jest** - Testing framework

## Project Structure

```
src/
├── components/          # React components
│   ├── GameData.tsx    # Main game data display component
│   └── __tests__/      # Component tests
├── store/              # Redux store
│   ├── gameSlice.ts    # Game state slice
│   ├── store.ts        # Store configuration
│   ├── hooks.ts        # Typed Redux hooks
│   └── __tests__/      # Store tests
├── hooks/              # Custom React hooks
│   ├── useReinforcementTimer.ts  # Timer hook for reinforcements
│   └── __tests__/      # Hook tests
├── test/               # Test setup
│   └── setup.ts        # Jest setup file
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Testing

```bash
npm test
```

### Build

```bash
npm run build
```

## Game Mechanics

### Current Implementation

1. **Game Start**: When the app loads, the player is automatically dropped onto a randomly named planet
2. **Reinforcements**: Every 5 seconds, a new reinforcement arrives with:
   - Random type (Imperial Guardsmen, Heavy Weapons Team, etc.)
   - Random unit count (1-10 units)
   - Timestamp of arrival

### Game State

The Redux store manages:
- **Player**: Name, rank, rank title, arrival timestamp
- **Planet**: Name, discovery timestamp
- **Reinforcements**: Array of all arrived reinforcements
- **Game Status**: Whether the game has started

## Testing

All tests are located in `__tests__` directories next to their source files:

- `src/store/__tests__/gameSlice.test.ts` - Tests for Redux slice actions
- `src/hooks/__tests__/useReinforcementTimer.test.tsx` - Tests for reinforcement timer hook
- `src/components/__tests__/GameData.test.tsx` - Tests for game data display component

Run tests with:
```bash
npm test
```

## Future Enhancements

- Combat system
- Rank progression
- Resource management
- Village defense mechanics
- Enemy attacks

## License

Private project

