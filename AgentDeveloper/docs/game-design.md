# Game Design Document

## Table of Contents
- [Game Overview](#game-overview)
- [Core Mechanics](#core-mechanics)
- [Progression Systems](#progression-systems)
- [User Interface Design](#user-interface-design)
- [Balance and Difficulty](#balance-and-difficulty)
- [Future Features](#future-features)

## Game Overview

### Vision Statement
Create an engaging idle/incremental game set in the Warhammer 40,000 universe that combines strategic decision-making with automatic progression, allowing players to command Imperial forces in an endless war.

### Target Audience
- Strategy game enthusiasts
- Warhammer 40k fans
- Idle/incremental game players
- Mobile and desktop users

### Core Pillars
1. **Authentic 40k Experience** - Faithful to the grimdark universe
2. **Strategic Depth** - Meaningful choices with long-term consequences
3. **Accessible Gameplay** - Easy to learn, difficult to master
4. **Continuous Progression** - Always something to work towards

## Core Mechanics

### Idle Progression System

#### Time-Based Advancement
- Game continues when closed (up to 24 hours offline progress)
- Real-time unit generation and resource accumulation
- Periodic assault events that occur automatically

#### Active vs Passive Play
- **Passive**: Units fight automatically, resources generate over time
- **Active**: Strategic decisions, upgrades, special abilities
- **Hybrid**: Optional manual control during critical moments

### Resource Management

#### Primary Resources
1. **Rank Points (RP)** - Experience gained from combat
2. **Personnel** - Available soldiers for recruitment
3. **Equipment** - Weapons and gear for units
4. **Morale** - Affects unit performance and availability

#### Resource Generation
- **Rank Points**: Earned through combat victories
- **Personnel**: Arrives via reinforcement schedules
- **Equipment**: Produced by logistics or found in battle
- **Morale**: Maintained through victories, lost through defeats

### Combat System

#### Battlefield Mechanics
- **Grid-Based**: 100x100 battlefield with tactical positioning
- **Real-Time**: Continuous combat with pause/resume capability
- **Autonomous**: Units act independently based on AI behaviors
- **Scalable**: Battle size increases with player progression

#### Unit Interactions
- **Rock-Paper-Scissors**: Unit types have advantages/disadvantages
- **Formation Bonuses**: Grouped units receive tactical benefits
- **Terrain Effects**: Different areas provide strategic advantages
- **Line of Sight**: Ranged units require clear firing lanes

### Progression Mechanics

#### Rank Advancement
```
Rank 1: Guard Recruit (0 RP required)
Rank 2: Trooper (100 RP)
Rank 3: Corporal (250 RP)
Rank 4: Sergeant (500 RP)
...continuing with exponential scaling
```

#### Reinforcement Scaling
- Higher ranks receive more frequent reinforcements
- Better unit types become available
- Special abilities unlock at milestone ranks

## Progression Systems

### Player Advancement

#### Rank System
- **Linear Progression**: Clear path from recruit to commander
- **Exponential Requirements**: Each rank requires significantly more RP
- **Meaningful Rewards**: New capabilities unlock at each rank
- **Prestige Options**: Late-game reset mechanics for massive bonuses

#### Skill Trees
- **Command Abilities**: Improve unit coordination and tactics
- **Logistics**: Enhance resource generation and efficiency
- **Technology**: Unlock advanced equipment and upgrades
- **Strategy**: Access to special battlefield maneuvers

### Unit Development

#### Unit Types
1. **Infantry**: Basic soldiers with rifles and close combat weapons
2. **Heavy Weapons**: Specialists with powerful ranged armaments
3. **Vehicles**: Armored units with high damage and survivability
4. **Specialists**: Unique units with special abilities

#### Upgrade Paths
- **Equipment Upgrades**: Better weapons and armor
- **Experience Levels**: Units gain efficiency through combat
- **Specializations**: Focus units for specific roles
- **Elite Variants**: Rare, powerful versions of standard units

### Base Development

#### Facility Construction
- **Barracks**: Increases personnel capacity and training speed
- **Armory**: Improves equipment quality and availability
- **Command Center**: Enhances tactical capabilities
- **Medical Bay**: Reduces casualty rates and recovery time

#### Research System
- **Technology Trees**: Unlock new equipment and abilities
- **Research Projects**: Long-term investments with major benefits
- **Field Studies**: Learn from combat experience
- **Archaeological Finds**: Discover ancient technologies

## User Interface Design

### Design Principles

#### Information Hierarchy
1. **Critical Information**: Always visible (health, resources, time)
2. **Contextual Data**: Shown when relevant (battle details, upgrades)
3. **Optional Details**: Available on demand (statistics, history)

#### Accessibility Features
- **Color Blind Support**: Patterns and symbols supplement color
- **Screen Reader**: ARIA labels and semantic HTML
- **Keyboard Navigation**: Full functionality without mouse
- **Scalable Text**: Adjustable font sizes

### Screen Layout

#### Main Interface
```
┌─────────────────────────────────────────────────────────────┐
│ Header: Rank | RP | Resources | Settings                   │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ │
│ │   Battlefield   │ │   Unit Status   │ │   Commands      │ │
│ │                 │ │                 │ │                 │ │
│ │ • Visual Grid   │ │ • Active Units  │ │ • Abilities     │ │
│ │ • Unit Positions│ │ • Health/Ammo   │ │ • Upgrades      │ │
│ │ • Battle Events │ │ • Experience    │ │ • Research      │ │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ Footer: Game Time | Next Reinforcement | Battle Log        │
└─────────────────────────────────────────────────────────────┘
```

#### Mobile Adaptations
- **Tabbed Interface**: Separate screens for different functions
- **Gesture Controls**: Swipe and pinch for navigation
- **Simplified View**: Essential information only
- **Quick Actions**: One-tap access to common commands

### Visual Design

#### Warhammer 40k Theming
- **Color Palette**: Imperial colors (gold, blue, red, black)
- **Typography**: Gothic, militaristic fonts
- **Iconography**: Imperial eagles, skulls, gothic architecture
- **Sound Design**: Atmospheric music and combat effects

#### UI Components
- **Progress Bars**: Rank advancement, resource generation
- **Status Indicators**: Unit health, morale, equipment
- **Interactive Maps**: Battlefield overview and tactical display
- **Information Panels**: Detailed statistics and descriptions

## Balance and Difficulty

### Difficulty Scaling

#### Early Game (Ranks 1-5)
- **Learning Phase**: Tutorial and basic mechanics
- **Forgiving**: Low penalty for mistakes
- **Quick Progress**: Rapid rank advancement
- **Simple Choices**: Few options to avoid overwhelm

#### Mid Game (Ranks 6-15)
- **Strategy Phase**: Complex decisions become important
- **Balanced**: Moderate penalties and rewards
- **Steady Progress**: Consistent but slower advancement
- **Multiple Paths**: Various strategies become viable

#### Late Game (Ranks 16+)
- **Mastery Phase**: Deep strategic optimization
- **Challenging**: Significant consequences for poor decisions
- **Slow Progress**: Long-term planning required
- **Specialization**: Focus on specific strategies

### Economic Balance

#### Resource Curves
- **Linear Growth**: Basic resource generation increases steadily
- **Exponential Costs**: Upgrades become increasingly expensive
- **Diminishing Returns**: Efficiency gains level off over time
- **Strategic Choices**: Cannot optimize everything simultaneously

#### Prestige Mechanics
- **Reset Benefits**: Start over with permanent bonuses
- **Meta Progression**: Progress continues beyond individual runs
- **Variety**: Different prestige paths offer replayability
- **Long-term Goals**: Massive projects requiring multiple resets

## Future Features

### Planned Expansions

#### Campaign Mode
- **Story Missions**: Narrative-driven scenarios
- **Unique Challenges**: Special victory conditions
- **Character Development**: Named units with personalities
- **Branching Paths**: Player choices affect story progression

#### Multiplayer Features
- **Competitive Modes**: Player vs player battles
- **Cooperative Play**: Team up against AI threats
- **Guilds/Alliances**: Social features and group activities
- **Tournaments**: Scheduled competitive events

#### Advanced Systems
- **Diplomacy**: Negotiate with other Imperial factions
- **Espionage**: Gather intelligence and sabotage enemies
- **Politics**: Navigate Imperial bureaucracy and favor
- **Exploration**: Discover new worlds and battlefields

### Quality of Life Improvements

#### Automation Options
- **Auto-Management**: Automated resource allocation
- **Battle Presets**: Saved tactical configurations
- **Notification System**: Alerts for important events
- **Bulk Operations**: Mass unit commands and upgrades

#### Customization Features
- **Unit Naming**: Personalize individual soldiers
- **Color Schemes**: Customize Imperial colors
- **UI Layouts**: Rearrange interface elements
- **Difficulty Options**: Adjust challenge level

#### Analytics and Feedback
- **Performance Metrics**: Detailed statistics and analysis
- **Optimization Suggestions**: AI-powered improvement tips
- **Progress Tracking**: Visual progression charts
- **Achievement System**: Goals and rewards for various playstyles

This design document serves as the foundation for development priorities and ensures all features align with the core vision of creating an engaging, authentic Warhammer 40k idle strategy experience.
