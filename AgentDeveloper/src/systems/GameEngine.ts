import { GameState, GameStatus, GameConfig } from '@/types/GameState';
import { SaveManager } from '@/systems/SaveManager';

/**
 * Core game engine class responsible for managing the game loop,
 * coordinating systems, and handling game state transitions.
 * 
 * Follows SOLID principles with single responsibility for game orchestration.
 */
export class GameEngine {
  private static instance: GameEngine | null = null;
  
  private gameState: GameState;
  private saveManager: SaveManager;
  private config: GameConfig;
  private gameLoopId: number | null = null;
  private lastUpdateTime: number = 0;
  private deltaTime: number = 0;
  
  // Event listeners for React integration
  private listeners: Set<(state: GameState) => void> = new Set();
  
  private constructor(config: GameConfig) {
    this.config = config;
    this.saveManager = new SaveManager();
    this.gameState = this.initializeGameState();
  }
  
  /**
   * Singleton pattern to ensure single game engine instance
   */
  public static getInstance(config?: GameConfig): GameEngine {
    if (!GameEngine.instance) {
      if (!config) {
        throw new Error('GameEngine requires config for first initialization');
      }
      GameEngine.instance = new GameEngine(config);
    }
    return GameEngine.instance;
  }
  
  /**
   * Initialize default game state
   */
  private initializeGameState(): GameState {
    return {
      status: GameStatus.STOPPED,
      gameTime: 0,
      isInitialized: false,
      isPaused: false,
      isBackground: false,
      lastUpdate: Date.now(),
      version: '1.0.0',
      player: {
        rank: 1,
        rankPoints: 0,
        totalKills: 0,
        defensesWon: 0,
        defensesLost: 0,
        playTime: 0,
        lastLogin: Date.now(),
        achievements: [],
        username: 'Commander',
      },
      battlefield: {
        width: 100,
        height: 100,
        units: [],
        enemies: [],
      },
      timers: {
        nextReinforcement: 60000, // 60 seconds in ms
        nextAssault: 3600000, // 1 hour in ms
        lastSave: Date.now(),
        gameStarted: 0,
        lastUpdate: Date.now(),
      },
      settings: {
        autoSave: true,
        autoSaveInterval: 30000, // 30 seconds
        soundEnabled: true,
        musicEnabled: true,
        graphicsQuality: 'medium',
        showFPS: false,
        battleSpeed: 1.0,
        volume: {
          master: 1.0,
          sfx: 1.0,
          music: 0.7,
        },
      },
      statistics: {
        totalPlayTime: 0,
        unitsLost: 0,
        enemiesKilled: 0,
        defensesWon: 0,
        defensesLost: 0,
      }
    };
  }
  
  /**
   * Start the game engine and begin the game loop
   */
  public start(): void {
    if (this.gameState.status === GameStatus.RUNNING) {
      return;
    }
    
    this.gameState.status = GameStatus.RUNNING;
    this.gameState.isInitialized = true;
    this.gameState.timers.gameStarted = Date.now();
    this.lastUpdateTime = performance.now();
    this.startGameLoop();
    this.notifyListeners();
  }
  
  /**
   * Pause the game engine
   */
  public pause(): void {
    if (this.gameState.status !== GameStatus.RUNNING) {
      return;
    }
    
    this.gameState.status = GameStatus.PAUSED;
    this.stopGameLoop();
    this.notifyListeners();
  }
  
  /**
   * Stop the game engine
   */
  public stop(): void {
    this.gameState.status = GameStatus.STOPPED;
    this.stopGameLoop();
    this.notifyListeners();
  }
  
  /**
   * Main game loop using requestAnimationFrame for smooth performance
   */
  private startGameLoop(): void {
    const gameLoop = (currentTime: number) => {
      if (this.gameState.status !== GameStatus.RUNNING) {
        return;
      }
      
      // Calculate deltaTime with proper validation
      if (this.lastUpdateTime === 0) {
        this.deltaTime = 0; // First frame, no time elapsed
      } else {
        this.deltaTime = currentTime - this.lastUpdateTime;
        // Cap deltaTime to prevent huge jumps (max 100ms per frame)
        this.deltaTime = Math.min(this.deltaTime, 100);
      }
      
      this.lastUpdateTime = currentTime;
      
      // Update game systems only if deltaTime is valid
      if (this.deltaTime > 0 && !isNaN(this.deltaTime)) {
        this.update(this.deltaTime);
      }
      
      // Continue the loop
      this.gameLoopId = requestAnimationFrame(gameLoop);
    };
    
    this.gameLoopId = requestAnimationFrame(gameLoop);
  }
  
  /**
   * Stop the game loop
   */
  private stopGameLoop(): void {
    if (this.gameLoopId !== null) {
      cancelAnimationFrame(this.gameLoopId);
      this.gameLoopId = null;
    }
  }
  
  /**
   * Update all game systems
   */
  private update(deltaTime: number): void {
    // Update game time
    this.gameState.gameTime += deltaTime;
    this.gameState.statistics.totalPlayTime += deltaTime;
    
    // Update timers
    this.updateTimers(deltaTime);
    
    // Process reinforcements
    this.processReinforcements();
    
    // Process assaults
    this.processAssaults();
    
    // Update battlefield
    this.updateBattlefield(deltaTime);
    
    // Auto-save if enabled
    this.processAutoSave();
    
    // Notify React components of state changes
    this.notifyListeners();
  }
  
  /**
   * Update game timers
   */
  private updateTimers(deltaTime: number): void {
    this.gameState.timers.nextReinforcement -= deltaTime;
    this.gameState.timers.nextAssault -= deltaTime;
    this.gameState.timers.lastUpdate = Date.now();
  }
  
  /**
   * Process reinforcement spawning
   */
  private processReinforcements(): void {
    if (this.gameState.timers.nextReinforcement <= 0) {
      this.spawnReinforcements();
      this.gameState.timers.nextReinforcement = 60000; // Reset to 60 seconds
    }
  }
  
  /**
   * Process assault events
   */
  private processAssaults(): void {
    if (this.gameState.timers.nextAssault <= 0) {
      this.triggerAssault();
      this.gameState.timers.nextAssault = 3600000; // Reset to 1 hour
    }
  }
  
  /**
   * Spawn reinforcements based on player rank
   */
  private spawnReinforcements(): void {
    const reinforcementCount = Math.floor(this.gameState.player.rank * this.config.baseReinforcementRate);
    
    // TODO: Implement unit spawning logic
    console.log(`Spawning ${reinforcementCount} reinforcements`);
  }
  
  /**
   * Trigger assault event
   */
  private triggerAssault(): void {
    // TODO: Implement assault logic
    console.log('Assault triggered!');
  }
  
  /**
   * Update battlefield state
   */
  private updateBattlefield(_deltaTime: number): void {
    // TODO: Implement battlefield update logic
    // This will include unit movement, combat resolution, etc.
  }
  
  /**
   * Process auto-save
   */
  private processAutoSave(): void {
    if (this.gameState.settings.autoSave) {
      // Auto-save every 30 seconds
      const timeSinceLastSave = Date.now() - this.gameState.timers.lastUpdate;
      if (timeSinceLastSave >= this.gameState.settings.autoSaveInterval) {
        this.saveGame();
      }
    }
  }
  
  /**
   * Save game state
   */
  public saveGame(): Promise<boolean> {
    return this.saveManager.saveGame(this.gameState);
  }
  
  /**
   * Load game state
   */
  public async loadGame(): Promise<boolean> {
    const loadedState = await this.saveManager.loadGame();
    if (loadedState) {
      this.gameState = { ...this.gameState, ...loadedState };
      this.notifyListeners();
      return true;
    }
    return false;
  }
  
  /**
   * Get current game state (read-only)
   */
  public getGameState(): Readonly<GameState> {
    return { ...this.gameState };
  }
  
  /**
   * Subscribe to game state changes for React integration
   */
  public subscribe(listener: (state: GameState) => void): () => void {
    this.listeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }
  
  /**
   * Notify all React listeners of state changes
   */
  private notifyListeners(): void {
    const state = this.getGameState();
    this.listeners.forEach(listener => listener(state));
  }
  
  /**
   * Add rank points and check for rank promotion
   */
  public addRankPoints(points: number): void {
    this.gameState.player.rankPoints += points;
    this.checkRankPromotion();
    this.notifyListeners();
  }
  
  /**
   * Check if player should be promoted
   */
  private checkRankPromotion(): void {
    const requiredPoints = this.config.rankRequirements[this.gameState.player.rank];
    if (requiredPoints && this.gameState.player.rankPoints >= requiredPoints) {
      this.gameState.player.rank++;
      this.gameState.player.rankPoints -= requiredPoints;
      console.log(`Promoted to rank ${this.gameState.player.rank}!`);
    }
  }
  
  /**
   * Record enemy kill
   */
  public recordKill(): void {
    this.gameState.player.totalKills++;
    this.gameState.statistics.enemiesKilled++;
    this.addRankPoints(this.config.baseRankPointsPerKill);
  }
  
  /**
   * Update game configuration
   */
  public updateConfig(newConfig: Partial<GameConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
  
  /**
   * Get current configuration
   */
  public getConfig(): Readonly<GameConfig> {
    return { ...this.config };
  }
  
  /**
   * Clean up resources
   */
  public destroy(): void {
    this.stop();
    this.listeners.clear();
    GameEngine.instance = null;
  }
}
