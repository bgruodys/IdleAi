# The Emperor's Call: Planetary Scouting Mission

## Table of Contents
1. [Prologue: The Summoning](#prologue-the-summoning)
2. [Game Overview](#game-overview)
3. [Core Mechanics](#core-mechanics)
4. [Rank System](#rank-system)
5. [Resource Management](#resource-management)
6. [Reinforcements](#reinforcements)
7. [Planetary Map System](#planetary-map-system)
8. [Offline Earnings & Persistence](#offline-earnings--persistence)
9. [Session Management](#session-management)
10. [Combat System](#combat-system) *(Planned)*
11. [Village Defense](#village-defense) *(Planned)*
12. [Progression Path](#progression-path)
13. [Gameplay Flow](#gameplay-flow)

---

## Prologue: The Summoning

In the grim darkness of the far future, there is only war. You, a loyal servant of the Imperium, have been chosen by the Emperor Himself for a mission of utmost importance. A distress signal has been detected from an uncharted world on the fringes of known space—a planet shrouded in mystery and potential danger.

The Emperor's will is clear: you must establish a forward operating base, scout the hostile terrain, and eliminate any threats that stand against the Imperium. Your success will be measured by your rank, your victories, and your ability to secure resources for the ongoing war effort.

But beware, for the enemies of mankind are relentless. They will not rest until your outpost is destroyed, and with it, your standing in the eyes of the Emperor.

---

## Game Overview

**The Emperor's Call** is an idle strategy game set in the Warhammer 40,000 universe. Players take on the role of an Imperial commander tasked with establishing and defending a forward base on an unknown planet. The game combines idle resource generation with strategic combat decisions and rank-based progression.

### Key Features (Currently Implemented)
- **Idle Resource Generation**: Resources flow automatically every 60 seconds based on your rank multiplier
- **Experience-Based Rank System**: 30 ranks from Recruit to Emperor's Champion, determined by experience points
- **Automatic Reinforcements**: New units arrive every 5 seconds with random types and unit counts
- **Offline Earnings**: Resources and reinforcements continue to accumulate while you're away
- **Persistence System**: Game state automatically saves to localStorage (export/import functions exist but UI not yet implemented)
- **Session Management**: Multi-tab detection prevents duplicate game sessions
- **Visual Progress Indicators**: Countdown timers and progress bars show time until next resource generation and reinforcement arrival
- **In-Game Documentation**: Interactive documentation viewer with rank tables, reinforcement types, and game mechanics
- **Reinforcement Icons**: Visual icons for each reinforcement type (Imperial Guardsmen, Heavy Weapons Team, Scout Squad, Veteran Squad, Armored Support)
- **Reinforcement Aggregation**: Reinforcements are automatically grouped by type with total unit counts
- **Planetary Map System**: Interactive map showing terrain, enemy locations, and threat levels across the planet
- **Warhammer Lore Integration**: Immersive storytelling in the 40K universe

### Planned Features
- **Combat System**: Engage enemies through scouting missions to gain experience
- **Scouting Missions**: Send scouts to reveal enemy positions and gather intelligence
- **Combat Deployments**: Deploy warriors to engage and eliminate enemy forces
- **Village Defense**: Protect your base from enemy attacks (rank penalties on defeat)

---

## Core Mechanics

### Current Implementation

The game currently operates as a **pure idle game** with automatic progression:

1. **Automatic Resource Generation**: Resources generate every 60 seconds based on your rank multiplier
2. **Automatic Reinforcements**: New units arrive every 5 seconds automatically
3. **Experience-Based Progression**: Rank is determined by total experience points (currently static, combat system planned)
4. **Offline Progression**: Resources and reinforcements continue to accumulate while you're away

### Planned Mechanics

Once the combat system is implemented, the game will transition to a **hybrid idle/active model**:

1. **Scouting & Combat**: Actively engage enemies to gain experience and increase rank
2. **Defense**: Protect your village from enemy assaults (rank penalties on defeat)
3. **Risk-Reward Balance**: Higher ranks generate more resources but attract stronger enemies

---

## Rank System

Your rank represents your standing in the Imperial hierarchy and directly impacts your resource generation rate. The rank system is the core progression mechanic of the game.

### Rank Determination

Ranks are determined by **total experience points**. The game automatically calculates your rank based on accumulated experience. Currently, experience is static (combat system to be implemented), but the full rank progression system is in place.

### Rank Multiplier Formula

The resource generation multiplier uses logarithmic scaling:

```
Multiplier = 1.0 + (Rank - 1) × 0.15
Minimum: 1.0x (Rank 1)
```

This means each rank increases the multiplier by 0.15x, providing smooth progression.

### Complete Rank Tiers (30 Ranks)

| Rank | Title | Required Experience | Multiplier | Description |
|------|-------|---------------------|------------|-------------|
| 1 | Recruit | 0 | 1.00x | Fresh from the training grounds |
| 2 | Guardsman | 100 | 1.15x | Proven yourself in basic combat |
| 3 | Veteran Guardsman | 250 | 1.30x | Experienced in planetary warfare |
| 4 | Corporal | 500 | 1.45x | First step into leadership |
| 5 | Sergeant | 1,000 | 1.60x | Leading small squads effectively |
| 6 | Staff Sergeant | 1,750 | 1.75x | Senior non-commissioned officer |
| 7 | Master Sergeant | 2,750 | 1.90x | Elite squad leadership |
| 8 | Sergeant Major | 4,000 | 2.05x | Highest enlisted rank |
| 9 | Warrant Officer | 5,500 | 2.20x | Specialized technical expertise |
| 10 | Chief Warrant Officer | 7,500 | 2.35x | Master of specialized fields |
| 11 | Second Lieutenant | 10,000 | 2.50x | First commissioned officer rank |
| 12 | Lieutenant | 13,500 | 2.65x | Commanding platoon-level operations |
| 13 | First Lieutenant | 18,000 | 2.80x | Senior platoon commander |
| 14 | Captain | 24,000 | 2.95x | Battalion leadership achieved |
| 15 | Major | 32,000 | 3.10x | Regimental command authority |
| 16 | Lieutenant Colonel | 42,000 | 3.25x | Battalion command |
| 17 | Colonel | 55,000 | 3.40x | Brigade-level strategic planning |
| 18 | Brigadier General | 72,000 | 3.55x | Brigade command |
| 19 | Major General | 95,000 | 3.70x | Division command |
| 20 | Lieutenant General | 125,000 | 3.85x | Corps command |
| 21 | General | 165,000 | 4.00x | Planetary theater command |
| 22 | Lord General | 220,000 | 4.15x | The Emperor's chosen commander |
| 23 | Warmaster | 300,000 | 4.30x | Supreme military commander |
| 24 | High Marshal | 400,000 | 4.45x | Master of multiple theaters |
| 25 | Grand Marshal | 550,000 | 4.60x | Imperial military council member |
| 26 | Lord Marshal | 750,000 | 4.75x | Sector-wide command authority |
| 27 | Imperial Marshal | 1,000,000 | 4.90x | Regional command of multiple sectors |
| 28 | Supreme Marshal | 1,350,000 | 5.05x | One of the Emperor's finest |
| 29 | Marshal of the Imperium | 1,800,000 | 5.20x | Legendary commander |
| 30 | Emperor's Champion | 2,500,000 | 5.35x | The ultimate honor, chosen by the Emperor Himself |

### Rank Progression (Planned)

**Rank Increases (Combat System - To Be Implemented):**
- Successfully complete scouting missions
- Defeat enemies in combat
- Complete special objectives
- Each victory grants experience points

**Rank Decreases (Village Defense - To Be Implemented):**
- Enemy forces successfully attack and destroy your village
- Each village destruction results in experience loss
- Higher ranks lose more points per defeat (representing greater shame)

---

## Reinforcements

Reinforcements are the backbone of your Imperial forces. They arrive automatically to bolster your ranks.

### Reinforcement Arrival System

**Arrival Frequency:**
- New reinforcements arrive every **5 seconds**
- First reinforcement arrives immediately when the game starts
- Reinforcements continue arriving even when you're away (offline)

### Reinforcement Types

Each reinforcement includes:
- **Random Type**: One of five possible unit types
- **Random Unit Count**: 1-10 units per reinforcement
- **Arrival Timestamp**: Recorded for tracking and offline calculations

**Available Reinforcement Types:**

1. **Imperial Guardsmen**
   - Standard infantry units, the backbone of the Imperial Guard
   - Most common reinforcement type

2. **Heavy Weapons Team**
   - Specialized units equipped with heavy weapons for sustained firepower
   - Provides superior firepower

3. **Scout Squad**
   - Elite reconnaissance units for forward observation and intelligence gathering
   - Specialized in reconnaissance

4. **Veteran Squad**
   - Battle-hardened veterans with superior combat experience
   - Elite infantry units

5. **Armored Support**
   - Heavy armored vehicles providing mobile firepower and protection
   - Provides heavy firepower and protection

### Reinforcement Display

The game aggregates reinforcements by type, showing:
- Total units per type (automatically calculated and grouped)
- Visual icons for each reinforcement type:
  - **Imperial Guardsmen**: Groups icon
  - **Heavy Weapons Team**: Fire department icon
  - **Scout Squad**: Explore icon
  - **Veteran Squad**: Military tech icon
  - **Armored Support**: Security icon
- Reinforcement aggregation utilities calculate totals and organize by type

### Offline Reinforcements

When you return to the game after being away:
- The system calculates how many reinforcements should have arrived
- All missed reinforcements are added automatically (capped at 100 to prevent overwhelming the UI)
- Each offline reinforcement follows the same random type and unit count rules

---

## Planetary Map System

As you emerge from your drop pod onto this hostile world, the first thing that strikes you is the vastness of the terrain stretching in every direction. The planet's surface is a patchwork of dangerous landscapes, each hiding potential threats or valuable resources. Your tactical display shows a real-time map of the surrounding area, but much of it remains shrouded in darkness—you must send scouts to reveal what lies beyond your immediate vision.

The Planetary Map System is your primary tool for understanding the battlefield and planning your operations. It displays the terrain surrounding your forward operating base and marks known enemy positions, but remember: intelligence is only as good as your reconnaissance efforts.

### Map Overview

The planetary map is divided into **sectors**—distinct regions of terrain that may contain enemy forces, resources, or both. Each sector represents a potential mission location where you can deploy scouts to gather intelligence or warriors to engage in combat.

**Map Features:**
- **Interactive Terrain Display**: Visual representation of the planet's surface using Voronoi-based region generation
- **Enemy Location Markers**: Known enemy positions are marked with colored indicators
- **Threat Level Indicators**: Each sector displays its threat level (0-10) to help you assess danger
- **Resource Information**: Hover over sectors to see potential resource caches

### Terrain Types

The planet's surface is composed of ten distinct terrain types, each presenting unique challenges and opportunities:

1. **Wasteland**
   - Barren wasteland scarred by war
   - Color: Brown (#8B7355)
   - Often contains remnants of past conflicts

2. **Forest**
   - Dense alien forest teeming with unknown dangers
   - Color: Dark Green (#2d5016)
   - Provides cover but limits visibility

3. **Mountain Range**
   - Towering peaks and treacherous passes
   - Color: Gray (#5a5a5a)
   - Natural defensive positions but difficult to traverse

4. **Desert**
   - Endless dunes under a harsh sun
   - Color: Tan (#d4a574)
   - Open terrain with minimal cover

5. **Swamp**
   - Toxic swamplands with hidden perils
   - Color: Dark Green (#3d5a3d)
   - Difficult terrain that slows movement

6. **Ruins**
   - Ancient ruins of a forgotten civilization
   - Color: Gray (#6b6b6b)
   - May contain valuable artifacts and resources

7. **Industrial Zone**
   - Abandoned industrial complex
   - Color: Dark Gray (#4a4a4a)
   - Potential for resource extraction

8. **Plains**
   - Open grasslands stretching to the horizon
   - Color: Olive Green (#6b8e23)
   - Fast movement but exposed positions

9. **Volcanic Region**
   - Volcanic region with active lava flows
   - Color: Brown (#8b4513)
   - Extreme danger but rich in rare materials

10. **Ice Fields**
    - Frozen wasteland of ice and snow
    - Color: Light Blue (#b0c4de)
    - Harsh conditions but strategic value

### Enemy Types

The enemies of mankind have established footholds across the planet. Each enemy type presents different tactical challenges:

1. **Orks** (Green - #228B22)
   - Savage greenskin warbands roaming the area
   - Aggressive and numerous, but disorganized
   - Threat Level: Variable (1-8)

2. **Chaos Forces** (Dark Red - #8B0000)
   - Chaos corruption taints the land
   - Highly dangerous, unpredictable tactics
   - Threat Level: Variable (1-8)

3. **Tyranids** (Purple - #4B0082)
   - Tyranid bioforms have been sighted
   - Swarming tactics, overwhelming numbers
   - Threat Level: Variable (1-8)

4. **Necrons** (Dark Slate - #2F4F4F)
   - Necron tomb structures detected
   - Ancient technology, difficult to destroy
   - Threat Level: Variable (1-8)

5. **Eldar** (Pink - #FF1493)
   - Eldar activity reported
   - Fast, elusive, hit-and-run tactics
   - Threat Level: Variable (1-8)

6. **Tau** (Blue - #1E90FF)
   - Tau forces have established presence
   - Advanced technology, ranged combat
   - Threat Level: Variable (1-8)

**No Enemy Presence** (Transparent)
- Safe sectors with no detected threats
- Still may contain valuable resources
- Ideal for resource gathering operations

### Threat Levels

Each sector with enemy presence is assigned a **Threat Level** ranging from 0 to 10:

- **0**: No enemy presence detected
- **1-3**: Light resistance - Small enemy patrols, minimal danger
- **4-6**: Moderate threat - Organized enemy forces, requires careful planning
- **7-8**: Extreme threat - Major enemy concentrations, high risk operations
- **9-10**: Critical threat - Maximum danger, elite enemy units (planned for future implementation)

**Threat Level Indicators:**
- Visual stroke width on map regions (thicker = higher threat)
- Color-coded threat chips in sector information
- Enemy count correlates with threat level (10-1000+ units)

### Map Interaction

**Hover Information:**
- Move your cursor over any sector to see detailed information
- Information panel displays:
  - Sector name (e.g., "Alpha Sector", "Beta Zone", "Nexus Point")
  - Terrain type with color-coded chip
  - Enemy type and unit count (if present)
  - Threat level indicator
  - Terrain description and enemy presence details

**Map Controls:**
- **Drag**: Rotate the map view to see different angles
- **Scroll Wheel**: Zoom in/out (0.3x to 2.0x zoom range)
- **Zoom In/Out Buttons**: Adjust zoom level
- **Reset View Button**: Return to default rotation and zoom

### Scouting System (Planned)

The map shows terrain and known enemy positions, but much of the planet remains unexplored. To reveal enemy locations and gather intelligence, you must deploy **Scout Squads**.

**Scouting Mechanics (To Be Implemented):**
- Deploy Scout Squads to unexplored sectors
- Scouts reveal enemy positions, threat levels, and resource caches
- Scouting missions take time to complete
- Higher threat sectors require more scouts or take longer
- Successful scouting provides intelligence for combat planning
- Scouts may encounter enemies and require extraction

**Scout Deployment:**
- Select an unexplored sector on the map
- Assign Scout Squad units to the mission
- Mission duration depends on distance and threat level
- Upon completion, sector information is revealed
- Intelligence gathered helps plan warrior deployments

### Combat Deployment (Planned)

Once you've identified enemy positions through scouting, you can deploy your **Warriors** to engage and eliminate threats.

**Combat Deployment Mechanics (To Be Implemented):**
- Select a sector with known enemy presence
- Deploy appropriate warrior units (Imperial Guardsmen, Heavy Weapons Teams, Veteran Squads, Armored Support)
- Combat success depends on:
  - Number and type of units deployed
  - Enemy threat level and unit count
  - Terrain advantages/disadvantages
  - Your rank and tactical bonuses
- Victory grants experience points, resources, and clears the sector
- Defeat results in unit losses and potential rank penalties

**Strategic Considerations:**
- Higher threat sectors offer greater rewards but require more forces
- Terrain affects combat effectiveness (mountains favor defense, plains favor mobility)
- Enemy types have different weaknesses (scouts gather this intelligence)
- Resource caches are revealed after successful combat

### Resource Discovery

Each sector contains potential resource caches that can be claimed after clearing enemy forces:

**Resource Types Found:**
- **Imperial Credits**: 50-500+ per sector (scales with threat level)
- **Munitions**: 20-200+ per sector
- **Promethium**: 10-100+ per sector
- **Raw Materials**: 30-300+ per sector

**Resource Multiplier:**
- Higher threat sectors contain more resources
- Resource amount = Base Resources × (1 + Threat Level × 0.1)
- Example: Threat Level 5 sector has 1.5x base resources

### Map Generation

The planetary map is procedurally generated using Voronoi-based region algorithms:

- **Region Count**: 200 sectors per map
- **Random Distribution**: Terrain types and enemy positions are randomly assigned
- **Enemy Probability**: 70% chance of enemy presence in each sector
- **Threat Distribution**: Threat levels range from 1-8 for sectors with enemies
- **Unique Sector Names**: Sectors are named using Imperial designation system (Alpha Sector, Beta Zone, etc.) or thematic Warhammer names (Nexus Point, Void Reach, Blood Fields, etc.)

### Current Implementation Status

**✅ Implemented:**
- Interactive map display with terrain visualization
- Enemy location markers with color coding
- Threat level indicators
- Hover information panels
- Multiple map styles (Hex, Grid, Voronoi)
- Map views with zoom controls
- Resource information display
- Procedural map generation

**🚧 Planned Features:**
- Scouting mission system
- Warrior deployment interface
- Combat resolution mechanics
- Sector exploration/fog of war
- Mission planning interface
- Real-time enemy movement (future expansion)

### Strategic Map Usage

**Early Game:**
- Focus on low-threat sectors (Threat Level 1-3)
- Scout nearby sectors to build intelligence network
- Identify resource-rich areas for future operations
- Avoid high-threat sectors until you have sufficient forces

**Mid Game:**
- Expand scouting operations to moderate-threat sectors (Threat Level 4-6)
- Deploy warriors to clear low-threat sectors for resources
- Build up forces before tackling dangerous areas
- Use terrain knowledge to plan optimal attack routes

**Late Game:**
- Challenge extreme-threat sectors (Threat Level 7-8)
- Coordinate multi-sector operations
- Maximize resource extraction from cleared sectors
- Establish secure supply lines across the map

The planetary map is your window into the war-torn world you've been sent to conquer. Use it wisely, commander. Every sector you scout brings you closer to understanding your enemy. Every battle you win brings you closer to the Emperor's favor. But remember: in the grim darkness of the far future, knowledge without action is meaningless. You must not only see the battlefield—you must command it.

---

## Offline Earnings & Persistence

The game features a comprehensive persistence system that ensures your progress is never lost and continues even when you're away.

### Automatic Save System

**LocalStorage Persistence:**
- Game state automatically saves to browser localStorage
- Saves occur automatically during gameplay
- Session information is tracked for multi-tab detection
- **Includes SHA-256 hash for integrity verification** - prevents manual tampering

**Save Data Includes:**
- Player information (name, rank, experience, arrival time)
- Planet information (name, discovery time)
- All resources (credits, munitions, promethium, raw materials, imperial favor)
- All reinforcements (grouped by type with unit counts)
- Session information (session ID, last active time, last save time)
- **Hash field**: SHA-256 hash of game state data (prevents manual editing)

### Offline Earnings Calculation

When you return to the game, the system automatically calculates and displays your offline earnings in a welcome dialog.

**Offline Earnings Dialog:**
- Automatically appears when you return after being away for at least 1 minute
- Shows the total time you were away (formatted as days, hours, minutes, or seconds)
- Displays all resources earned during your absence
- Shows the number of reinforcements that arrived
- Displays your current rank and rank title
- Click "Continue" to dismiss and return to gameplay

**Time Away Calculation:**
- Minimum offline time: 1 minute (dialog only appears if away for at least 1 minute)
- Time away = Current Time - Last Active Time
- Time is displayed in a human-readable format (e.g., "2h 30m", "5d 12h", "45m 30s")

**Resource Generation (Offline):**
```
Offline Resources = Base Rate × Rank Multiplier × Hours Away
```

Resources generated offline:
- Credits: Based on rank multiplier
- Munitions: Based on rank multiplier
- Promethium: Based on rank multiplier
- Raw Materials: 50% of Credits generated
- Imperial Favor: 0 (only earned through combat)

**Reinforcement Generation (Offline):**
```
Offline Reinforcements = Time Away (seconds) / 5 seconds
Capped at 100 reinforcements to prevent UI overload
```

**Dialog Display Logic:**
- Dialog appears automatically when:
  - Player was away for at least 1 minute
  - AND (resources were earned OR reinforcements arrived)
- If away for less than 1 minute, no dialog appears (earnings are still added silently)
- All earnings and reinforcements are automatically added to your account when the dialog appears

### File Export/Import

The game includes full export and import functionality accessible through the game interface.

**Export Game State:**
- Click the "Save Game" button in the game header
- Game state is exported to a JSON file
- File name: `emperors-call-save.json`
- Includes version information and save timestamp
- **Includes SHA-256 hash for integrity verification** - prevents manual tampering
- Can be saved to your computer for backup or transfer
- Button is disabled if game is not started

**Import Game State:**
- Click the "Load Game" button in the game header
- Select a previously saved `emperors-call-save.json` file
- System validates file format before loading
- **System verifies file integrity using SHA-256 hash** - rejects tampered files
- Confirmation dialog appears before replacing current game state
- Replaces current game state with loaded state
- Session information is restored if present
- Success/error messages inform you of the result

**File Format:**
- JSON format with all game state data
- Includes player, planet, resources, reinforcements, and session info
- Version information ensures compatibility
- Timestamp shows when the save was created
- **Hash field**: SHA-256 hash of game state data (prevents manual editing)

**Save File Integrity:**
- All save files include a cryptographic hash (SHA-256)
- Hash is calculated from game state data + secret key
- On load, the hash is recalculated and verified
- If hash doesn't match, the file is rejected as tampered
- This prevents players from manually editing save files to cheat
- Old save files without hashes are still accepted for backward compatibility

### Game Reset

Players can reset their game at any time:
- Clears all localStorage data
- Clears session information
- Resets game state to initial values
- Requires confirmation dialog to prevent accidental resets

**Warning:** Reset permanently deletes:
- All rank and experience progress
- All resources
- All reinforcements
- Planet information
- Cannot be undone

---

## Session Management

The game includes sophisticated session management to prevent duplicate game sessions and ensure data integrity.

### Multi-Tab Detection

**BroadcastChannel System:**
- Uses browser BroadcastChannel API for real-time communication between tabs
- Detects when multiple tabs/windows are running the game
- Prevents starting a new game if another session is active

**Session Heartbeat:**
- Active sessions send heartbeats every 2 seconds
- Other tabs detect these heartbeats
- If no heartbeat received for 5 seconds, session is considered inactive

### Session Protection

**New Game Protection:**
- If another tab has an active session, new games are blocked
- Alert shown: "Another game session is already active. Please close other tabs/windows."
- Prevents data corruption from multiple simultaneous sessions

**Session Timeout:**
- Sessions expire after 5 minutes of inactivity
- Expired sessions are automatically cleared
- Allows new game to start after timeout

### Session Information

Each game session includes:
- **Session ID**: Unique identifier for the session
- **Last Active Time**: Timestamp of last player activity
- **Last Save Time**: Timestamp of last save operation

### Activity Tracking

- Session activity updates every 30 seconds during active gameplay
- Used to calculate offline earnings accurately
- Ensures accurate time-away calculations

---

## Combat System

> **Status: Planned Feature - Not Yet Implemented**

The combat system will allow players to actively engage enemies to gain experience and progress through ranks.

### Planned Scouting Missions

Players will actively engage in scouting missions to explore the planet and eliminate threats. Each mission will present different challenges and rewards.

#### Planned Mission Types

1. **Reconnaissance Patrol**
   - Low risk, low reward
   - Basic enemy encounters
   - Experience Reward: 10-25 XP
   - Resource Bonus: Small cache

2. **Combat Sweep**
   - Medium risk, medium reward
   - Multiple enemy groups
   - Experience Reward: 25-50 XP
   - Resource Bonus: Standard cache

3. **Deep Strike Operation**
   - High risk, high reward
   - Elite enemy units
   - Experience Reward: 50-100 XP
   - Resource Bonus: Large cache + rare materials

4. **Boss Encounter**
   - Extreme risk, extreme reward
   - Named enemy commanders
   - Experience Reward: 100-250 XP
   - Resource Bonus: Massive cache + unique items

### Planned Combat Mechanics

**Victory Conditions:**
- Eliminate all enemy units
- Complete mission objectives
- Survive until extraction

**Defeat Conditions:**
- All player units eliminated
- Mission timer expires (for timed missions)
- Critical objective failure

**Combat Rewards:**
- Experience points for rank progression
- Immediate resource drops
- Potential equipment/upgrades
- Unlock new mission types

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

Resources are the lifeblood of your operation. They flow automatically every 60 seconds based on your rank multiplier.

### Resource Types

1. **Imperial Credits**
   - Primary currency
   - Base rate: 100 per hour (at Rank 1)
   - Used for base upgrades, purchasing equipment, and hiring additional forces

2. **Munitions**
   - Ammunition and weapons
   - Base rate: 50 per hour (at Rank 1)
   - Required for combat operations (when implemented)

3. **Promethium**
   - Fuel for vehicles and generators
   - Base rate: 25 per hour (at Rank 1)
   - Powers base defenses and essential for long-range operations

4. **Raw Materials**
   - Metal, stone, and other resources
   - Base rate: 50% of Credits generation
   - Used for construction and base expansion

5. **Imperial Favor**
   - Special currency representing the Emperor's blessing
   - Currently: 0 (only earned through combat - to be implemented)
   - Used for rare upgrades and reinforcements

### Resource Generation Formula

Resources generate automatically every **60 seconds** (1 minute). The calculation is:

```
Resources per Cycle = Base Rate × Rank Multiplier × (60 seconds / 3600 seconds)
Resources per Hour = Base Rate × Rank Multiplier
```

**Base Rates (per hour at Rank 1):**
- Credits: 100/hour
- Munitions: 50/hour
- Promethium: 25/hour
- Raw Materials: 50/hour (50% of Credits)

**Example Generation Rates (per 60-second cycle):**

| Rank | Title | Multiplier | Credits/Cycle | Munitions/Cycle | Promethium/Cycle | Raw Materials/Cycle |
|------|-------|------------|--------------|-----------------|------------------|---------------------|
| 1 | Recruit | 1.00x | 1.67 | 0.83 | 0.42 | 0.83 |
| 5 | Sergeant | 1.60x | 2.67 | 1.33 | 0.67 | 1.33 |
| 10 | Chief Warrant Officer | 2.35x | 3.92 | 1.96 | 0.98 | 1.96 |
| 15 | Major | 3.10x | 5.17 | 2.58 | 1.29 | 2.58 |
| 20 | Lieutenant General | 3.85x | 6.42 | 3.21 | 1.61 | 3.21 |
| 25 | Grand Marshal | 4.60x | 7.67 | 3.83 | 1.92 | 3.83 |
| 30 | Emperor's Champion | 5.35x | 8.92 | 4.46 | 2.23 | 4.46 |

**Note:** Values are rounded down to whole numbers in the game, so you'll see integer values accumulate over time.

### Planned Combat Bonuses

Once the combat system is implemented:
- Each victory provides immediate resource drops
- Boss encounters grant rare resources
- Special missions offer bonus multipliers

---

## Village Defense

> **Status: Planned Feature - Not Yet Implemented**

Your village will serve as your forward operating base. It will be both your greatest asset and your greatest vulnerability.

### Planned Village Components

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

### Planned Enemy Attacks

Enemy forces will periodically launch attacks on your village. These attacks will be automatic and occur based on game timers and your activity level.

**Planned Attack Mechanics:**
- Attacks happen when you're away on missions
- Frequency increases with your rank (higher profile = more attention)
- Attack strength scales with your progress
- You receive warnings before major assaults

**Planned Defense Outcomes:**

**Victory:**
- Village remains intact
- No experience penalty
- Potential resource rewards from defeated attackers
- Temporary attack cooldown

**Defeat:**
- Village structures damaged or destroyed
- **Experience loss** (core penalty mechanic)
- Resources partially lost
- Must rebuild before full operations resume
- Attack frequency may temporarily increase

### Planned Defense Strategies

Players will be able to invest resources in:
- Stronger defensive structures
- More garrison troops
- Automated defense systems
- Early warning systems
- Emergency evacuation protocols

---

## Progression Path

### Current Implementation (Idle Progression)

**Current Focus:** Idle resource accumulation and reinforcement gathering

**Available Actions:**
- Monitor automatic resource generation (every 60 seconds)
- Watch reinforcements arrive (every 5 seconds)
- View rank progression (currently static, experience system ready)
- Review accumulated resources and units
- Access in-game documentation
- Reset game if desired

**Current Milestones:**
- First reinforcement arrival
- First resource generation cycle
- Understanding rank multiplier system
- Accumulating resources over time

### Planned Early Game (Ranks 1-10)
**Focus:** Learning mechanics, basic combat, initial base setup

- Complete tutorial missions
- Build essential structures
- Establish resource generation
- Learn combat basics
- Survive first enemy attacks

**Planned Key Milestones:**
- First combat victory
- First village defense
- Rank 2 (Guardsman) achievement
- First resource cache discovery

### Planned Mid Game (Ranks 11-20)
**Focus:** Expansion, optimization, strategic planning

- Upgrade village structures
- Unlock advanced missions
- Optimize resource generation
- Develop defense strategies
- Encounter elite enemies

**Planned Key Milestones:**
- Rank 12 (Lieutenant)
- First boss encounter
- Major base upgrade completed
- Successful defense against major assault

### Planned Late Game (Ranks 21-30)
**Focus:** Mastery, endgame content, prestige

- Challenge the most dangerous enemies
- Maximize resource efficiency
- Perfect defense systems
- Complete legendary missions
- Achieve Emperor's Champion rank (Rank 30)

**Planned Key Milestones:**
- Rank 21 (General)
- Rank 25 (Grand Marshal)
- Rank 30 (Emperor's Champion)
- Defeat legendary bosses
- Complete all mission types
- Achieve maximum base development

---

## Gameplay Flow

### Current Session Cycle (Idle Game)

1. **Game Initialization**
   - Game automatically starts when page loads
   - Random planet is assigned
   - Player starts at Rank 1 (Recruit) with 0 experience
   - First reinforcement arrives immediately

2. **Idle Progression**
   - Resources generate every 60 seconds based on rank
   - Reinforcements arrive every 5 seconds
   - Countdown timers show time until next generation/arrival (formatted as MM:SS)
   - Circular progress spinners show countdown progress
   - Linear progress bars visualize countdown progress
   - Both timers automatically reset when they reach zero

3. **Monitoring Progress**
   - View current rank and experience
   - Check accumulated resources
   - Review reinforcement totals by type (aggregated with visual icons)
   - Monitor countdown timers for next resource generation and reinforcement arrival
   - View progress bars showing countdown progress
   - Access in-game documentation component (GameDocumentation) with detailed rank tables and mechanics

4. **Offline Return**
   - Game automatically loads saved state
   - Offline earnings calculated and added
   - Offline reinforcements added (capped at 100)
   - Session activity updated

5. **Game Management**
   - Save Game button: Export current game state to JSON file
   - Load Game button: Import previously saved game state from file
   - Reset game button (with confirmation dialog)
   - Reset clears all localStorage, session data, and reloads the page
   - In-game documentation viewer (GameDocumentation component) with:
     - Complete rank table with all 30 ranks
     - Reinforcement type descriptions with icons
     - Resource type explanations
     - Game mechanics overview
   - Monitor session status

### Planned Session Cycle (Hybrid Idle/Active)

Once combat and defense systems are implemented:

1. **Check Status** (Idle Phase)
   - Review accumulated resources
   - Check rank and experience progression
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

### Current Idle vs Active Balance

**Current Idle Elements (Implemented):**
- Resource generation continues automatically every 60 seconds
- Reinforcements arrive automatically every 5 seconds
- Progress accumulates while you're away (offline earnings)
- Game state saves automatically

**Planned Active Elements:**
- Combat will require player engagement
- Strategic decisions on mission selection
- Resource allocation choices
- Defense preparation and response

**Planned Risk-Reward Balance:**
Once implemented, players must balance active play (to gain experience) with the risk of leaving their village undefended. Higher ranks generate more resources but attract stronger enemies. The idle nature means you can't always be present to defend, creating tension between progression and security.

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

**Current State:** The Emperor's Call is currently an idle game focused on automatic resource generation and reinforcement accumulation. The foundation is in place with a complete rank system (30 ranks), persistence system, offline earnings, session management, and a fully interactive planetary map system showing terrain and enemy positions.

**Future Vision:** Once the combat and defense systems are implemented, The Emperor's Call will present a unique challenge: balance the glory of combat with the responsibility of command. Your rank will reflect not just your victories, but your ability to maintain the Emperor's presence on this hostile world. Every decision will matter, every battle will count, and every defeat will teach a harsh lesson.

Will you rise through the ranks to become the Emperor's Champion, or will the enemies of mankind reduce you to a forgotten recruit? The choice, and the war, are yours to command.

**For the Emperor! For the Imperium!**

---

## Implementation Status Summary

### ✅ Implemented Features
- **Rank System**: Complete 30-rank progression system with experience-based determination
- **Resource Generation**: Automatic generation every 60 seconds based on rank multiplier
- **Reinforcements**: Automatic arrival every 5 seconds with random types and unit counts
- **Offline Earnings**: Resources and reinforcements continue while away
- **Persistence**: Automatic save/load to localStorage with export/import UI buttons
- **Session Management**: Multi-tab detection and prevention using BroadcastChannel API
- **Planetary Map System**: 
  - Interactive map display with terrain visualization (10 terrain types)
  - Enemy location markers with color coding (6 enemy types)
  - Threat level indicators (0-10 scale)
  - Hover information panels showing sector details
  - Multiple map styles (Hexagonal, Grid, Voronoi)
  - Map views with zoom controls (0.3x to 2.0x)
  - Procedural map generation (200 sectors per map)
  - Resource information display per sector
- **UI System**: 
  - Countdown timers (CircularProgress and LinearProgress) showing time until next event
  - Progress bars visualizing countdown progress
  - Reinforcement icons for each unit type
  - In-game documentation viewer (GameDocumentation component)
  - Reset game button with confirmation dialog
- **Reinforcement Utilities**: Automatic aggregation by type with total unit calculations
- **Countdown Timer Hook**: Reusable hook for tracking time remaining with automatic reset
- **Game Reset**: Ability to reset game with confirmation (clears localStorage, session, and reloads page)

### 🚧 Planned Features
- **Scouting System**: Deploy scouts to reveal enemy positions and gather intelligence
- **Combat Deployment**: Deploy warriors to engage and eliminate enemy forces
- **Combat System**: Scouting missions and enemy encounters with experience rewards
- **Village Defense**: Base defense mechanics and enemy attacks
- **Experience Gain**: Combat victories grant experience points
- **Rank Decreases**: Experience loss from village defeats
- **Resource Spending**: Upgrades, equipment, and base improvements
- **Fog of War**: Unexplored sectors hidden until scouted
- **Mission Planning Interface**: UI for selecting sectors and deploying units

---

*This document serves as the foundational game design document for The Emperor's Call. It outlines both the currently implemented mechanics and the planned progression systems that will make the game engaging for both Warhammer enthusiasts and newcomers to the universe.*


