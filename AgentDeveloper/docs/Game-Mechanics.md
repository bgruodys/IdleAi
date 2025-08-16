# Game Mechanics - IdleWarhammer40k

## 1. Reinforcement System

### Automatic Reinforcements
- **Frequency**: Every 60 seconds
- **Scaling**: Based on current Imperial Rank
- **Delivery**: Units spawn randomly at friendly positions on the battlefield

### Reinforcement Calculation
```
Base Reinforcements = 5 + (Rank Level × 2)
Unit Quality = Floor(Rank Level / 3) + 1
Special Units Chance = Rank Level × 5%
```

### Unit Types by Rank
| Rank Level | Base Units | Elite Units Available | Special Abilities |
|------------|------------|----------------------|-------------------|
| 1-3 | Guardsmen | None | Basic training |
| 4-6 | Guardsmen, Veterans | Sergeants | Leadership bonus |
| 7-9 | Veterans, Sergeants | Heavy Weapons | Increased damage |
| 10-12 | Sergeants, Heavy Weapons | Commissars | Morale boost |
| 13-15 | Heavy Weapons, Commissars | Ogryns | Tank units |
| 16+ | All unit types | Space Marines | Elite reinforcements |

## 2. Rank System

### Rank Progression
- **Rank Points (RP)**: Earned by eliminating enemies
- **Promotion Requirements**: Exponential scaling
- **Rank Benefits**: Better reinforcements, improved defenses, special abilities

### Imperial Hierarchy
1. **Trooper** (0-100 RP)
2. **Lance Corporal** (101-300 RP)
3. **Corporal** (301-600 RP)
4. **Sergeant** (601-1,200 RP)
5. **Lieutenant** (1,201-2,500 RP)
6. **Captain** (2,501-5,000 RP)
7. **Major** (5,001-10,000 RP)
8. **Colonel** (10,001-20,000 RP)
9. **General** (20,001-40,000 RP)
10. **Lord General** (40,001+ RP)

### Rank Point Rewards
```
Enemy Kill RP = Base RP × Enemy Difficulty × Rank Multiplier
Base RP Values:
- Weak Enemy: 1 RP
- Standard Enemy: 2 RP
- Elite Enemy: 5 RP
- Boss Enemy: 10 RP
```

## 3. Battle System

### Battlefield Specifications
- **Grid Size**: 100 × 100 cells
- **Unit Capacity**: Maximum 200 units active simultaneously
- **Spawn Zones**: Friendly (bottom 20 rows), Enemy (top 20 rows), Neutral (middle 60 rows)

### Combat Mechanics
- **Movement**: Units move 1 cell per turn toward nearest enemy
- **Attack Range**: Melee (1 cell), Ranged (3-5 cells depending on weapon)
- **Combat Resolution**: Dice-based with unit stats modifiers
- **Terrain Effects**: Cover bonuses, movement penalties

### Unit Statistics
```
Unit Base Stats:
- Health Points (HP): 10-100
- Attack Damage: 5-50
- Armor Rating: 0-20
- Movement Speed: 1-3 cells/turn
- Attack Range: 1-5 cells
```

## 4. Outpost Defense System

### Hourly Assault Events
- **Frequency**: Every 60 minutes
- **Warning Period**: 5-minute countdown before assault
- **Escalation**: Attack strength scales with player rank

### Defense Mechanics
- **Defensive Structures**: Automated turrets, walls, shield generators
- **Garrison Troops**: Reserved units for base defense
- **Player Intervention**: Optional manual control during assault
- **Success/Failure**: Based on defensive strength vs. attack power

### Attack Scaling Formula
```
Attack Strength = Base Attack × (1 + Rank Level × 0.2) × Random(0.8-1.2)
Required Defense = Attack Strength × 1.1 (10% safety margin)
```

### Failure Consequences
- **Rank Point Loss**: 10-25% of current rank points
- **Unit Casualties**: 20-50% of current forces
- **Structure Damage**: Defensive buildings require repair time
- **Recovery Period**: Reduced reinforcement rate for next 30 minutes

## 5. Enemy Types and Behaviors

### Standard Enemies
- **Ork Boyz**: High health, low accuracy, aggressive movement
- **Chaos Cultists**: Balanced stats, unpredictable behavior
- **Genestealer**: Fast movement, high damage, low health
- **Traitor Guard**: Similar to player units but corrupted

### Elite Enemies
- **Ork Nobs**: Heavy armor, area damage, slower movement
- **Chaos Space Marines**: High stats across the board
- **Tyranid Warriors**: Regeneration, ranged attacks
- **Daemon Princes**: Rare spawns with devastating abilities

### Boss Encounters
- **Warboss**: Massive Ork leader with multiple phases
- **Chaos Lord**: Corrupted commander with dark powers
- **Hive Tyrant**: Swarm controller with psychic abilities
- **Daemon Greater**: Reality-warping entity
