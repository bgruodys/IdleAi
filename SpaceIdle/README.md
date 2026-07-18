# SpaceIdle

Idle space game (browser). Phase 1 prototype: **asteroid mining** — extract ore, upgrade your miner, deplete the rock.

Stack: **Vite + TypeScript** (vanilla DOM UI for now). No backend.

## Prerequisites

- [Node.js](https://nodejs.org/) 20+ (18+ may work)
- npm (comes with Node)

## Setup

```bash
npm install
```

## Run (development)

```bash
npm run dev
```

Vite prints a local URL (usually `http://localhost:5173`). Open it in a desktop or mobile browser.

## Other scripts

| Command | What it does |
|---------|----------------|
| `npm run build` | Typecheck (`tsc`) and build production assets into `dist/` |
| `npm run preview` | Serve the production build locally |

## Project layout

```
src/
  main.ts          # App entry
  style.css        # Styles
  game/            # State, tick, types, formatting
  ui/              # DOM shell + render
```

## Notes

- Single-player, client-only for now
- Functional UI first; art and multiplayer come later
