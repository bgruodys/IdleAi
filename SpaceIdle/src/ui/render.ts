import { formatMassKg, formatPercent, formatRateKgPerS } from '../game/format.ts'
import { previewUpgrade } from '../game/tick.ts'
import type { GameState } from '../game/types.ts'

export function mountShell(root: HTMLElement): void {
  root.innerHTML = `
    <main class="shell">
      <header class="header">
        <p class="brand">SpaceIdle</p>
        <h1>Asteroid Mining</h1>
        <p class="lede">Extract ore from a near-Earth fragment. Mass in, mass out.</p>
      </header>

      <section class="panel resources" aria-label="Resources">
        <div class="stat">
          <span class="label">Ore stockpile</span>
          <span class="value" data-bind="ore">0 kg</span>
        </div>
        <div class="stat">
          <span class="label">Mining rate</span>
          <span class="value" data-bind="rate">0 kg/s</span>
        </div>
        <div class="stat">
          <span class="label">Miner level</span>
          <span class="value" data-bind="level">1</span>
        </div>
      </section>

      <section class="panel asteroid" aria-label="Current asteroid">
        <div class="asteroid-head">
          <h2 data-bind="asteroid-name">Prospect A-1</h2>
          <span class="pill" data-bind="status">Mining</span>
        </div>
        <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100">
          <div class="progress-fill" data-bind="progress-fill"></div>
        </div>
        <p class="meta">
          <span data-bind="remaining">0 kg</span>
          <span class="sep">remaining of</span>
          <span data-bind="total">0 kg</span>
          <span class="sep">·</span>
          <span data-bind="pct">100%</span>
        </p>
      </section>

      <section class="panel actions" aria-label="Actions">
        <button type="button" class="btn primary" data-action="upgrade">
          <span class="btn-title">Upgrade miner</span>
          <span class="btn-sub" data-bind="upgrade-cost">—</span>
        </button>
      </section>
    </main>
  `
}

export function render(state: GameState): void {
  const ore = document.querySelector('[data-bind="ore"]')
  const rate = document.querySelector('[data-bind="rate"]')
  const level = document.querySelector('[data-bind="level"]')
  const name = document.querySelector('[data-bind="asteroid-name"]')
  const status = document.querySelector('[data-bind="status"]')
  const remaining = document.querySelector('[data-bind="remaining"]')
  const total = document.querySelector('[data-bind="total"]')
  const pct = document.querySelector('[data-bind="pct"]')
  const fill = document.querySelector<HTMLElement>('[data-bind="progress-fill"]')
  const progress = document.querySelector('.progress')
  const upgradeCost = document.querySelector('[data-bind="upgrade-cost"]')
  const upgradeBtn = document.querySelector<HTMLButtonElement>('[data-action="upgrade"]')

  const fraction =
    state.asteroid.totalKg > 0 ? state.asteroid.remainingKg / state.asteroid.totalKg : 0
  const preview = previewUpgrade(state)

  if (ore) ore.textContent = formatMassKg(state.oreKg)
  if (rate) rate.textContent = formatRateKgPerS(state.miningRateKgPerS)
  if (level) level.textContent = String(state.minerLevel)
  if (name) name.textContent = state.asteroid.name
  if (status) status.textContent = 'Mining'
  if (remaining) remaining.textContent = formatMassKg(state.asteroid.remainingKg)
  if (total) total.textContent = formatMassKg(state.asteroid.totalKg)
  if (pct) pct.textContent = formatPercent(fraction)
  if (fill) fill.style.width = `${Math.max(0, Math.min(100, fraction * 100))}%`
  if (progress) progress.setAttribute('aria-valuenow', String(Math.round(fraction * 100)))
  if (upgradeCost) {
    upgradeCost.textContent = `Lv ${preview.level} · ${formatMassKg(preview.costKg)} ore · → ${formatRateKgPerS(preview.nextRateKgPerS)}`
  }
  if (upgradeBtn) upgradeBtn.disabled = !preview.affordable
}
