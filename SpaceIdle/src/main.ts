import './style.css'
import { createInitialState } from './game/state.ts'
import { buyUpgrade, tick } from './game/tick.ts'
import type { GameState } from './game/types.ts'
import { mountShell, render } from './ui/render.ts'

const SAVE_KEY = 'spaceidle.mining.v1'
const MAX_DT_SECONDS = 1

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return createInitialState()
    const parsed = JSON.parse(raw) as GameState
    if (
      typeof parsed.oreKg !== 'number' ||
      typeof parsed.miningRateKgPerS !== 'number' ||
      !parsed.asteroid
    ) {
      return createInitialState()
    }
    return parsed
  } catch {
    return createInitialState()
  }
}

function saveState(state: GameState): void {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state))
}

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) {
  throw new Error('#app root missing')
}

let state = loadState()
mountShell(app)
render(state)

app.addEventListener('click', (event) => {
  const target = event.target
  if (!(target instanceof Element)) return
  const button = target.closest<HTMLButtonElement>('[data-action]')
  if (!button || button.disabled) return

  const action = button.dataset.action
  if (action === 'upgrade') {
    state = buyUpgrade(state)
    saveState(state)
    render(state)
  }
})

let lastTs = performance.now()
let saveAccum = 0

function frame(now: number): void {
  const rawDt = (now - lastTs) / 1000
  lastTs = now
  const dt = Math.min(Math.max(rawDt, 0), MAX_DT_SECONDS)

  state = tick(state, dt)
  saveAccum += dt
  if (saveAccum >= 2) {
    saveState(state)
    saveAccum = 0
  }

  render(state)
  requestAnimationFrame(frame)
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    lastTs = performance.now()
  }
})

requestAnimationFrame(frame)
