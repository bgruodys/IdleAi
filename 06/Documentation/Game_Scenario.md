# The Emperor's Call: Planetary Scouting Mission

## Table of Contents
1. [Prologue: The Summoning](#prologue-the-summoning)
2. [Game Overview](#game-overview)
3. [Core Mechanics](#core-mechanics)
4. [Rank System](#rank-system)
5. [Combat System](#combat-system)
6. [Resource Management](#resource-management)
7. [Village Defense](#village-defense)
8. [Progression Path](#progression-path)
9. [Gameplay Flow](#gameplay-flow)

---

## Prologue: The Summoning

In the grim darkness of the far future, there is only war. You, a loyal servant of the Imperium, have been chosen by the Emperor Himself for a mission of utmost importance. A distress signal has been detected from an uncharted world on the fringes of known space—a planet shrouded in mystery and potential danger.

The Emperor's will is clear: you must establish a forward operating base, scout the hostile terrain, and eliminate any threats that stand against the Imperium. Your success will be measured by your rank, your victories, and your ability to secure resources for the ongoing war effort.

But beware, for the enemies of mankind are relentless. They will not rest until your outpost is destroyed, and with it, your standing in the eyes of the Emperor.

---

## Game Overview

**The Emperor's Call** is an idle strategy game set in the Warhammer 40,000 universe. Players take on the role of an Imperial commander tasked with establishing and defending a forward base on an unknown planet. The game combines idle resource generation with strategic combat decisions and rank-based progression.

### Key Features
- **Idle Resource Generation**: Resources flow automatically based on your rank
- **Active Combat System**: Engage enemies through scouting missions
- **Dynamic Rank System**: Rise through the ranks with victories, fall with defeats
- **Village Defense**: Protect your base from enemy attacks
- **Warhammer Lore Integration**: Immersive storytelling in the 40K universe

---

## Core Mechanics

### The Three Pillars of Gameplay

1. **Scouting & Combat**: Actively engage enemies to increase your rank
2. **Defense**: Protect your village from enemy assaults
3. **Resource Management**: Collect and utilize resources based on your rank

The game operates on a hybrid idle/active model. While resources generate automatically, players must actively participate in combat to progress. Failure to defend your base results in rank penalties, creating a risk-reward dynamic.

---

## Rank System

Your rank represents your standing in the Imperial hierarchy and directly impacts your resource generation rate. The rank system is the core progression mechanic of the game.

### Rank Tiers

| Rank | Title | Resource Multiplier | Description |
|------|-------|---------------------|-------------|
| 1 | Recruit | 1.0x | Fresh from the training grounds |
| 2 | Guardsman | 1.2x | Proven yourself in basic combat |
| 3 | Veteran Guardsman | 1.5x | Experienced in planetary warfare |
| 4 | Sergeant | 2.0x | Leading small squads effectively |
| 5 | Lieutenant | 2.5x | Commanding platoon-level operations |
| 6 | Captain | 3.0x | Battalion leadership achieved |
| 7 | Major | 4.0x | Regimental command authority |
| 8 | Colonel | 5.0x | Brigade-level strategic planning |
| 9 | General | 7.0x | Planetary theater command |
| 10 | Lord General | 10.0x | The Emperor's chosen commander |

### Rank Progression

**Rank Increases:**
- Successfully complete scouting missions
- Defeat enemies in combat
- Complete special objectives
- Each victory grants rank experience points (RP)

**Rank Decreases:**
- Enemy forces successfully attack and destroy your village
- Each village destruction results in rank loss
- Higher ranks lose more points per defeat (representing greater shame)

### Rank Experience Calculation

```
Victory RP = Base RP × (Enemy Difficulty × Rank Modifier)
Defeat RP Loss = Base Loss × Current Rank
```

**Example:**
- Defeating a standard enemy at Rank 3 grants 50 RP
- Losing your village at Rank 5 costs 100 RP
- Higher difficulty enemies provide exponentially more RP

---

## Combat System

### Scouting Missions

Players actively engage in scouting missions to explore the planet and eliminate threats. Each mission presents different challenges and rewards.

#### Mission Types

1. **Reconnaissance Patrol**
   - Low risk, low reward
   - Basic enemy encounters
   - RP Reward: 10-25 RP
   - Resource Bonus: Small cache

2. **Combat Sweep**
   - Medium risk, medium reward
   - Multiple enemy groups
   - RP Reward: 25-50 RP
   - Resource Bonus: Standard cache

3. **Deep Strike Operation**
   - High risk, high reward
   - Elite enemy units
   - RP Reward: 50-100 RP
   - Resource Bonus: Large cache + rare materials

4. **Boss Encounter**
   - Extreme risk, extreme reward
   - Named enemy commanders
   - RP Reward: 100-250 RP
   - Resource Bonus: Massive cache + unique items

### Combat Mechanics

**Victory Conditions:**
- Eliminate all enemy units
- Complete mission objectives
- Survive until extraction

**Defeat Conditions:**
- All player units eliminated
- Mission timer expires (for timed missions)
- Critical objective failure

**Combat Rewards:**
- Rank progression points
- Immediate resource drops
- Potential equipment/upgrades
- Unlock new mission types

---

## Resource Management

Resources are the lifeblood of your operation. They flow automatically based on your rank, but can also be earned through combat victories.

### Resource Types

1. **Imperial Credits**
   - Primary currency
   - Used for base upgrades
   - Purchasing equipment
   - Hiring additional forces

2. **Munitions**
   - Ammunition and weapons
   - Required for combat operations
   - Can be manufactured or scavenged

3. **Promethium**
   - Fuel for vehicles and generators
   - Powers base defenses
   - Essential for long-range operations

4. **Raw Materials**
   - Metal, stone, and other resources
   - Used for construction
   - Base expansion requirements

5. **Imperial Favor**
   - Special currency representing the Emperor's blessing
   - Earned through exceptional service
   - Used for rare upgrades and reinforcements

### Resource Generation

Resources generate automatically at regular intervals. The generation rate is directly tied to your rank.

**Base Generation Formula:**
```
Resources per Cycle = Base Rate × Rank Multiplier × Upgrades
```

**Example Generation Rates:**

| Rank | Credits/Hour | Munitions/Hour | Promethium/Hour |
|------|--------------|----------------|-----------------|
| Recruit (1) | 100 | 50 | 25 |
| Guardsman (2) | 120 | 60 | 30 |
| Veteran (3) | 150 | 75 | 38 |
| Sergeant (4) | 200 | 100 | 50 |
| Lieutenant (5) | 250 | 125 | 63 |
| Captain (6) | 300 | 150 | 75 |
| Major (7) | 400 | 200 | 100 |
| Colonel (8) | 500 | 250 | 125 |
| General (9) | 700 | 350 | 175 |
| Lord General (10) | 1000 | 500 | 250 |

**Combat Bonuses:**
- Each victory provides immediate resource drops
- Boss encounters grant rare resources
- Special missions offer bonus multipliers

---

## Village Defense

Your village serves as your forward operating base. It's both your greatest asset and your greatest vulnerability.

### Village Components

1. **Command Center**
   - Core structure
   - Houses your command staff
   - Destroying it ends the game

2. **Barracks**
   - Trains and houses troops
   - Higher levels = more defenders
   - Can be upgraded for better units

3. **Defensive Positions**
   - Gun emplacements
   - Watchtowers
   - Fortified walls

4. **Resource Storage**
   - Protects accumulated resources
   - Higher capacity with upgrades
   - Partial loss on destruction

5. **Manufacturing Facilities**
   - Produces munitions
   - Refines raw materials
   - Can be automated

### Enemy Attacks

Enemy forces will periodically launch attacks on your village. These attacks are automatic and occur based on game timers and your activity level.

**Attack Mechanics:**
- Attacks happen when you're away on missions
- Frequency increases with your rank (higher profile = more attention)
- Attack strength scales with your progress
- You receive warnings before major assaults

**Defense Outcomes:**

**Victory:**
- Village remains intact
- No rank penalty
- Potential resource rewards from defeated attackers
- Temporary attack cooldown

**Defeat:**
- Village structures damaged or destroyed
- **Rank decreases** (core penalty mechanic)
- Resources partially lost
- Must rebuild before full operations resume
- Attack frequency may temporarily increase

### Defense Strategies

Players can invest resources in:
- Stronger defensive structures
- More garrison troops
- Automated defense systems
- Early warning systems
- Emergency evacuation protocols

---

## Progression Path

### Early Game (Ranks 1-3)
**Focus:** Learning mechanics, basic combat, initial base setup

- Complete tutorial missions
- Build essential structures
- Establish resource generation
- Learn combat basics
- Survive first enemy attacks

**Key Milestones:**
- First victory
- First village defense
- Rank 2 achievement
- First resource cache discovery

### Mid Game (Ranks 4-6)
**Focus:** Expansion, optimization, strategic planning

- Upgrade village structures
- Unlock advanced missions
- Optimize resource generation
- Develop defense strategies
- Encounter elite enemies

**Key Milestones:**
- Rank 5 (Lieutenant)
- First boss encounter
- Major base upgrade completed
- Successful defense against major assault

### Late Game (Ranks 7-10)
**Focus:** Mastery, endgame content, prestige

- Challenge the most dangerous enemies
- Maximize resource efficiency
- Perfect defense systems
- Complete legendary missions
- Achieve Lord General rank

**Key Milestones:**
- Rank 7 (Major)
- Rank 10 (Lord General)
- Defeat legendary bosses
- Complete all mission types
- Achieve maximum base development

---

## Gameplay Flow

### Typical Session Cycle

1. **Check Status** (Idle Phase)
   - Review accumulated resources
   - Check rank and progression
   - Assess village condition
   - Review pending attacks

2. **Plan Actions** (Strategic Phase)
   - Decide on mission type
   - Allocate resources for upgrades
   - Prepare defenses if attack imminent
   - Manage inventory and equipment

3. **Execute Missions** (Active Phase)
   - Launch scouting mission
   - Engage in combat
   - Collect immediate rewards
   - Return to base

4. **Defend Village** (Reactive Phase)
   - Respond to enemy attacks
   - Deploy defensive measures
   - Recover from defeats
   - Rebuild damaged structures

5. **Upgrade & Optimize** (Management Phase)
   - Spend resources on improvements
   - Upgrade village structures
   - Enhance combat capabilities
   - Prepare for next cycle

### Idle vs Active Balance

**Idle Elements:**
- Resource generation continues offline
- Enemy attacks can occur while away
- Base operations run automatically
- Progress accumulates over time

**Active Elements:**
- Combat requires player engagement
- Strategic decisions on mission selection
- Resource allocation choices
- Defense preparation and response

**The Risk:**
Players must balance active play (to gain rank) with the risk of leaving their village undefended. Higher ranks generate more resources but attract stronger enemies. The idle nature means you can't always be present to defend, creating tension between progression and security.

---

## Strategic Considerations

### Risk Management

**Aggressive Strategy:**
- Focus on high-risk missions for faster rank gain
- Minimal defense investment
- High resource generation potential
- Greater vulnerability to attacks

**Defensive Strategy:**
- Invest heavily in village defenses
- Lower risk missions for steady progress
- Reduced attack vulnerability
- Slower but safer rank progression

**Balanced Approach:**
- Moderate mission difficulty
- Gradual defense improvements
- Steady rank advancement
- Sustainable long-term growth

### Resource Allocation Priorities

1. **Early Game:** Basic structures → Essential defenses → Resource generation
2. **Mid Game:** Advanced defenses → Combat upgrades → Expansion
3. **Late Game:** Optimization → Prestige content → Mastery achievements

---

## Conclusion

The Emperor's Call presents a unique challenge: balance the glory of combat with the responsibility of command. Your rank reflects not just your victories, but your ability to maintain the Emperor's presence on this hostile world. Every decision matters, every battle counts, and every defeat teaches a harsh lesson.

Will you rise through the ranks to become a Lord General, or will the enemies of mankind reduce you to a forgotten recruit? The choice, and the war, are yours to command.

**For the Emperor! For the Imperium!**

---

*This document serves as the foundational game design document for The Emperor's Call. It outlines the core mechanics, progression systems, and strategic elements that make the game engaging for both Warhammer enthusiasts and newcomers to the universe.*

