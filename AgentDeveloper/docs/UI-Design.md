# User Interface Design - IdleWarhammer40k

## UI/UX Principles

### Design Philosophy
- **Grimdark Aesthetic**: Dark color scheme reflecting Warhammer 40k atmosphere
- **Information Density**: Efficient display of multiple data streams
- **Idle-Friendly**: Clear status indicators for AFK gameplay
- **Responsive Design**: Adapts to different screen sizes and orientations

### Color Palette
```css
:root {
  /* Primary Colors */
  --imperial-gold: #DAA520;
  --deep-red: #8B0000;
  --steel-gray: #2F4F4F;
  
  /* Background Colors */
  --void-black: #0A0A0A;
  --charcoal: #1C1C1C;
  --iron-gray: #3C3C3C;
  
  /* Accent Colors */
  --warning-amber: #FF8C00;
  --success-green: #228B22;
  --danger-crimson: #DC143C;
  --info-blue: #4682B4;
}
```

## Main Interface Layout

### Screen Regions
```
┌─────────────────────────────────────────────────────────┐
│ Header Bar (Rank, RP, Next Events)                     │
├─────────────────┬───────────────────────┬───────────────┤
│ Battlefield     │ Unit Panel           │ Status Panel  │
│ (100x100 grid)  │ - Active Units       │ - Timers      │
│                 │ - Reinforcements     │ - Statistics  │
│                 │ - Queue              │ - Settings    │
├─────────────────┼───────────────────────┼───────────────┤
│ Combat Log      │ Defense Status       │ Rank Progress │
│ - Recent kills  │ - Outpost health     │ - XP bar      │
│ - Battle events │ - Defensive units    │ - Next rank   │
└─────────────────┴───────────────────────┴───────────────┘
```

## Component Specifications

### 1. Header Component (`GameHeader.tsx`)
```typescript
interface GameHeaderProps {
  currentRank: number;
  rankName: string;
  rankPoints: number;
  nextRankPoints: number;
  reinforcementTimer: number;
  assaultTimer: number;
  activeUnits: number;
  maxUnits: number;
  totalKills: number;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  currentRank,
  rankName,
  rankPoints,
  nextRankPoints,
  reinforcementTimer,
  assaultTimer,
  activeUnits,
  maxUnits,
  totalKills
}) => {
  return (
    <header className="bg-charcoal border-b border-steel-gray p-4">
      <div className="flex justify-between items-center">
        <RankDisplay 
          current={currentRank}
          name={rankName}
          points={rankPoints}
          nextRank={nextRankPoints}
        />
        <TimerDisplay 
          reinforcementTime={reinforcementTimer}
          assaultTime={assaultTimer}
        />
        <ResourceDisplay 
          activeUnits={activeUnits}
          maxUnits={maxUnits}
          totalKills={totalKills}
        />
      </div>
    </header>
  );
};
```

### 2. Battlefield Component (`BattlefieldView.tsx`)
```typescript
interface BattlefieldViewProps {
  width: number;
  height: number;
  zoom: number;
  className?: string;
  onUnitSelect?: (unitId: string) => void;
}

export const BattlefieldView: React.FC<BattlefieldViewProps> = ({
  width,
  height,
  zoom,
  className,
  onUnitSelect
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { battlefield } = useBattlefield();
  
  return (
    <div className={`relative ${className}`}>
      <canvas 
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-steel-gray cursor-crosshair"
        onClick={(e) => handleCanvasClick(e, onUnitSelect)}
      />
      <BattlefieldControls 
        zoom={zoom}
        onZoomChange={handleZoomChange}
      />
    </div>
  );
};
```

### 3. Unit Panel Component (`UnitPanel.tsx`)
```typescript
interface UnitPanelProps {
  selectedTab?: 'active' | 'reinforcements' | 'casualties';
  onTabChange?: (tab: string) => void;
}

export const UnitPanel: React.FC<UnitPanelProps> = ({
  selectedTab = 'active',
  onTabChange
}) => {
  const { unitsList } = useUnits();
  const [activeTab, setActiveTab] = useState(selectedTab);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };
  
  return (
    <div className="bg-charcoal border border-steel-gray rounded-lg">
      <TabNavigation 
        tabs={['Active Units', 'Reinforcements', 'Casualties']}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <div className="p-4">
        <UnitList 
          units={getFilteredUnits(unitsList, activeTab)}
          onUnitSelect={handleUnitSelect}
        />
      </div>
    </div>
  );
};
```

### 4. Defense Status Component (`DefenseStatus.tsx`)
```typescript
interface DefenseStatusProps {
  alertLevel: 1 | 2 | 3 | 4 | 5;
  outpostHealth: number;
  maxOutpostHealth: number;
  structures: DefensiveStructure[];
  garrisonCount: number;
}

export const DefenseStatus: React.FC<DefenseStatusProps> = ({
  alertLevel,
  outpostHealth,
  maxOutpostHealth,
  structures,
  garrisonCount
}) => {
  const alertColor = getAlertColor(alertLevel);
  
  return (
    <div className={`bg-charcoal border-2 border-${alertColor} rounded-lg p-4`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-imperial-gold font-bold">Defense Status</h3>
        <AlertIndicator level={alertLevel} />
      </div>
      
      <HealthBar 
        current={outpostHealth}
        max={maxOutpostHealth}
        label="Outpost Integrity"
      />
      
      <div className="mt-4 space-y-2">
        {structures.map(structure => (
          <StructureStatus 
            key={structure.id}
            structure={structure}
          />
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <span className="text-success-green">
          Garrison Forces: {garrisonCount}
        </span>
      </div>
    </div>
  );
};
```

## Visual Design Elements

### Typography
```css
/* Install fonts via npm or CDN */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600&display=swap');

/* Tailwind CSS custom font configuration */
.font-heading {
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.font-body {
  font-family: 'Exo 2', sans-serif;
  font-weight: 400;
  line-height: 1.4;
}
```

### Icon System
- **Unit Icons**: Distinctive silhouettes for each unit type
- **Status Icons**: Health, ammunition, morale indicators
- **Faction Symbols**: Imperial Aquila, Chaos Star, Ork Glyphs
- **Equipment Icons**: Weapons, armor, special gear

### Animation Guidelines
```css
/* Tailwind CSS animations and custom keyframes */
@keyframes pulse-warning {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

@keyframes slide-in-right {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

/* React component animations with Tailwind */
.animate-pulse-warning {
  animation: pulse-warning 2s ease-in-out infinite;
}

.animate-slide-in {
  animation: slide-in-right 0.3s ease-out;
}

/* Smooth transitions for React state changes */
.transition-all {
  transition: all 0.3s ease-in-out;
}
```

## Responsive Breakpoints

### Desktop (1920x1080)
- Full layout with all panels visible
- Large battlefield view (800x600)
- Detailed unit information panels

### Tablet (1024x768)
- Collapsible side panels
- Medium battlefield view (600x450)
- Tabbed interface for secondary information

### Mobile (375x667)
- Single-panel navigation
- Simplified battlefield view (350x350)
- Essential information only
- Touch-optimized controls

## Accessibility Features

### Screen Reader Support
```typescript
// React component with proper accessibility
export const BattlefieldView: React.FC = () => {
  const { battlefield, announcements } = useBattlefield();
  
  return (
    <main role="main" aria-label="Game Interface">
      <section aria-label="Battlefield View">
        <canvas 
          ref={canvasRef}
          aria-label="Battle Grid" 
          role="img"
          aria-describedby="battle-description"
        />
        <div 
          id="battle-description"
          className="sr-only"
          aria-live="polite"
        >
          {announcements.map(msg => (
            <p key={msg.id}>{msg.text}</p>
          ))}
        </div>
      </section>
    </main>
  );
};
```

### Keyboard Navigation
- Tab order follows logical flow
- Arrow keys for battlefield navigation
- Spacebar for pause/resume
- Enter for unit selection

### Visual Accessibility
- High contrast mode option
- Colorblind-friendly palette
- Scalable UI elements
- Clear focus indicators

## Interactive Elements

### Hover States
- Unit cards expand with detailed stats
- Battlefield cells highlight potential targets
- Buttons show action previews

### Click/Touch Actions
- Single click: Select unit or structure
- Double click: Focus/center on selection
- Long press: Context menu (mobile)
- Drag: Pan battlefield view

### Feedback Systems
- Visual: Color changes, animations, particles
- Audio: Sound effects for actions and events
- Haptic: Vibration for mobile alerts (optional)

## Theme Customization

### Theme Options
1. **Imperial Standard**: Gold and red on dark background
2. **Chaos Corruption**: Red and black with distorted elements
3. **Mechanicus**: Orange and steel with tech aesthetics
4. **High Contrast**: Black and white for accessibility

### Customizable Elements
- Color schemes
- UI element sizes
- Animation speeds
- Information density levels
- Sound volume controls
