# Balance and Progression - IdleWarhammer40k

## Balance Philosophy

### Core Principles
1. **Meaningful Progression**: Each rank advancement feels significant
2. **Risk vs Reward**: Higher ranks face greater challenges but better rewards
3. **Player Agency**: Choices matter even in idle gameplay
4. **Sustainable Growth**: Exponential scaling prevents infinite power creep
5. **Failure Recovery**: Setbacks are temporary, not permanent

### Balance Goals
- **Session Length**: 15-30 minutes of active engagement
- **AFK Viability**: 4-8 hours of productive idle time
- **Progression Rate**: New rank every 2-4 hours of play
- **Challenge Scaling**: Difficulty increases slightly faster than power

## Reinforcement Progression

### Base Reinforcement Formula
```
Reinforcements per minute = 5 + (Rank Level × 2)
Unit Quality Distribution:
- Basic Units: 70% - (Rank Level × 3%)
- Veteran Units: 25% + (Rank Level × 2%)
- Elite Units: 5% + (Rank Level × 1%)
```

### Unit Power Scaling
| Rank | Reinforcements/Min | Basic | Veteran | Elite | Special |
|------|-------------------|-------|---------|-------|---------|
| 1    | 7                 | 70%   | 25%     | 5%    | 0%      |
| 5    | 15                | 55%   | 33%     | 10%   | 2%      |
| 10   | 25                | 40%   | 41%     | 15%   | 4%      |
| 15   | 35                | 25%   | 49%     | 20%   | 6%      |
| 20   | 45                | 10%   | 57%     | 25%   | 8%      |

### Unit Statistics Progression
```javascript
const getUnitStats = (baseStats, rankLevel) => ({
  health: baseStats.health * (1 + rankLevel * 0.1),
  attack: baseStats.attack * (1 + rankLevel * 0.08),
  armor: baseStats.armor + Math.floor(rankLevel / 3),
  speed: baseStats.speed, // Remains constant
  morale: Math.min(100, baseStats.morale + rankLevel * 2)
});
```

## Rank Point Economy

### Earning Rates
```javascript
const calculateRankPoints = (enemyType, playerRank) => {
  const basePoints = {
    grunt: 1,
    soldier: 2,
    veteran: 4,
    elite: 8,
    boss: 20
  };
  
  const rankMultiplier = 1 + (playerRank * 0.05);
  return Math.floor(basePoints[enemyType] * rankMultiplier);
};
```

### Rank Requirements
```javascript
const getRankRequirement = (rank) => {
  return Math.floor(100 * Math.pow(1.8, rank - 1));
};

// Example progression:
// Rank 1: 0 RP
// Rank 2: 100 RP
// Rank 3: 180 RP
// Rank 4: 324 RP
// Rank 5: 583 RP
// Rank 10: 4,300 RP
// Rank 15: 31,640 RP
```

### Rank Benefits
| Rank | Title | Reinforcements | Special Ability | Defense Bonus |
|------|-------|----------------|-----------------|---------------|
| 1 | Trooper | +0% | None | +0% |
| 3 | Corporal | +20% | Leadership | +10% |
| 5 | Sergeant | +40% | Rally Troops | +25% |
| 8 | Lieutenant | +80% | Tactical Strike | +50% |
| 12 | Captain | +140% | Orbital Support | +100% |
| 16 | Major | +220% | Artillery Barrage | +175% |
| 20 | Colonel | +320% | Air Support | +275% |

## Enemy Scaling System

### Base Enemy Strength
```javascript
const getEnemyStats = (type, wave, playerRank) => {
  const baseStats = EnemyTypes[type];
  const waveMultiplier = 1 + (wave * 0.1);
  const rankChallenge = 1 + (playerRank * 0.15);
  
  return {
    health: baseStats.health * waveMultiplier * rankChallenge,
    attack: baseStats.attack * waveMultiplier * rankChallenge,
    armor: baseStats.armor + Math.floor(playerRank / 2),
    count: Math.ceil(baseStats.count * waveMultiplier)
  };
};
```

### Assault Event Scaling
```javascript
const calculateAssaultStrength = (playerRank, hoursSinceStart) => {
  const baseStrength = 100;
  const rankFactor = playerRank * 25;
  const timeFactor = Math.floor(hoursSinceStart / 24) * 50;
  const randomFactor = Math.random() * 0.4 + 0.8; // ±20% variance
  
  return Math.floor((baseStrength + rankFactor + timeFactor) * randomFactor);
};
```

## Defense Mechanics Balance

### Outpost Health Scaling
```javascript
const getOutpostHealth = (playerRank, upgradeLevel) => {
  const baseHealth = 1000;
  const rankBonus = playerRank * 100;
  const upgradeBonus = upgradeLevel * 250;
  
  return baseHealth + rankBonus + upgradeBonus;
};
```

### Defensive Structure Effectiveness
| Structure | Base Defense | Cost | Rank Requirement |
|-----------|-------------|------|------------------|
| Basic Turret | 50 | 500 RP | Rank 3 |
| Heavy Turret | 120 | 1,200 RP | Rank 6 |
| Shield Generator | 200 | 2,000 RP | Rank 9 |
| Command Bunker | 300 | 3,500 RP | Rank 12 |
| Fortress Wall | 500 | 6,000 RP | Rank 15 |

### Defense Success Calculation
```javascript
const calculateDefenseSuccess = (totalDefense, attackStrength) => {
  const defenseRatio = totalDefense / attackStrength;
  
  if (defenseRatio >= 1.2) return 'complete_victory';
  if (defenseRatio >= 1.0) return 'victory';
  if (defenseRatio >= 0.8) return 'pyrrhic_victory';
  if (defenseRatio >= 0.6) return 'defeat';
  return 'crushing_defeat';
};
```

## Failure and Recovery System

### Rank Point Loss
```javascript
const calculateRankPointLoss = (defenseResult, currentRP) => {
  const lossRates = {
    pyrrhic_victory: 0.05,
    defeat: 0.15,
    crushing_defeat: 0.25
  };
  
  return Math.floor(currentRP * lossRates[defenseResult]);
};
```

### Recovery Bonuses
- **Reduced Loss**: 50% RP loss reduction for first failure in 24 hours
- **Comeback Bonus**: +25% RP gain for 1 hour after major defeat
- **Emergency Reinforcements**: Double reinforcement rate for 30 minutes
- **Morale Boost**: +20% unit effectiveness for 2 hours

## Long-term Progression

### Prestige System (Rank 25+)
- **Ascension**: Reset to Rank 1 with permanent bonuses
- **Legacy Bonuses**: +2% to all stats per prestige level
- **New Content**: Unlock Chaos corruption mechanics
- **Special Units**: Access to Space Marine reinforcements

### Endgame Challenges
- **Waaagh! Events**: Massive Ork invasions every 7 days
- **Chaos Incursions**: Reality-bending enemy abilities
- **Tyranid Swarms**: Overwhelming numbers with adaptation
- **Necron Tomb Awakening**: High-tech enemy advantages

## Monetization Balance (Future Consideration)

### Ethical Guidelines
- **No Pay-to-Win**: Premium features enhance experience, not power
- **Fair Progression**: Free players can achieve 100% of content
- **Cosmetic Focus**: Premium items are visual/audio enhancements
- **Time Respect**: Premium reduces grind, doesn't bypass it

### Premium Features (Optional)
- **Cosmetic Themes**: Visual customization options
- **Audio Packs**: Enhanced sound effects and music
- **Convenience Features**: Auto-save, extended offline progress
- **Accelerated Learning**: Faster tutorial completion

## Testing and Iteration

### Balance Testing Metrics
- **Time to Rank 10**: Target 8-12 hours
- **Defense Success Rate**: 70-80% overall
- **Player Retention**: 60% return after first failure
- **Progression Smoothness**: No difficulty spikes >150%

### Feedback Integration
- **Player Analytics**: Track progression rates and pain points
- **Community Input**: Regular surveys and feedback collection
- **A/B Testing**: Compare different balance approaches
- **Iterative Updates**: Monthly balance patches based on data

### Emergency Rebalancing
- **Hotfix Triggers**: >50% player drop-off, broken progression
- **Rollback Capability**: Revert changes if they worsen experience
- **Communication**: Clear explanation of balance changes
- **Compensation**: RP bonuses for players affected by major changes
