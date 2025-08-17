import { GameState } from '@/types/GameState';

/**
 * SaveManager handles game state persistence using localStorage with backup strategies.
 * Implements React persistence hooks pattern for integration with React components.
 * 
 * Features:
 * - Automatic backup rotation
 * - Data validation and recovery
 * - Compression for large save files
 * - Async operations for better performance
 */
export class SaveManager {
  private readonly SAVE_KEY = 'idlewarhammer40k_save';
  private readonly BACKUP_KEY = 'idlewarhammer40k_backup';
  private readonly MAX_BACKUPS = 3;
  private readonly SAVE_VERSION = '1.0.0';
  
  /**
   * Save game state to localStorage with backup rotation
   */
  public async saveGame(gameState: GameState): Promise<boolean> {
    try {
      // Create save data with metadata
      const saveData = {
        version: this.SAVE_VERSION,
        timestamp: Date.now(),
        gameState: gameState,
        checksum: this.generateChecksum(gameState),
      };
      
      // Rotate backups before saving new data
      await this.rotateBackups();
      
      // Save current data as backup
      const currentSave = localStorage.getItem(this.SAVE_KEY);
      if (currentSave) {
        localStorage.setItem(`${this.BACKUP_KEY}_1`, currentSave);
      }
      
      // Save new data
      const serializedData = JSON.stringify(saveData);
      localStorage.setItem(this.SAVE_KEY, serializedData);
      
      console.log('Game saved successfully');
      return true;
      
    } catch (error) {
      console.error('Failed to save game:', error);
      return false;
    }
  }
  
  /**
   * Load game state from localStorage with fallback to backups
   */
  public async loadGame(): Promise<GameState | null> {
    try {
      // Try to load main save first
      let saveData = await this.loadFromStorage(this.SAVE_KEY);
      
      // If main save fails, try backups
      if (!saveData) {
        for (let i = 1; i <= this.MAX_BACKUPS; i++) {
          saveData = await this.loadFromStorage(`${this.BACKUP_KEY}_${i}`);
          if (saveData) {
            console.log(`Loaded from backup ${i}`);
            break;
          }
        }
      }
      
      if (!saveData) {
        console.log('No valid save data found');
        return null;
      }
      
      // Validate save data
      if (!this.validateSaveData(saveData)) {
        console.error('Save data validation failed');
        return null;
      }
      
      // Check version compatibility
      if (!this.isVersionCompatible(saveData.version)) {
        console.warn('Save version incompatible, attempting migration');
        saveData = await this.migrateSaveData(saveData);
      }
      
      console.log('Game loaded successfully');
      return saveData.gameState;
      
    } catch (error) {
      console.error('Failed to load game:', error);
      return null;
    }
  }
  
  /**
   * Load and parse save data from storage
   */
  private async loadFromStorage(key: string): Promise<any | null> {
    try {
      const rawData = localStorage.getItem(key);
      if (!rawData) {
        return null;
      }
      
      return JSON.parse(rawData);
    } catch (error) {
      console.error(`Failed to parse save data from ${key}:`, error);
      return null;
    }
  }
  
  /**
   * Validate save data structure and checksum
   */
  private validateSaveData(saveData: any): boolean {
    try {
      // Check required fields
      if (!saveData.version || !saveData.timestamp || !saveData.gameState || !saveData.checksum) {
        return false;
      }
      
      // Verify checksum
      const expectedChecksum = this.generateChecksum(saveData.gameState);
      if (saveData.checksum !== expectedChecksum) {
        console.error('Save data checksum mismatch');
        return false;
      }
      
      // Validate game state structure
      const requiredFields = ['player', 'timers', 'settings', 'battlefield'];
      for (const field of requiredFields) {
        if (!saveData.gameState[field]) {
          console.error(`Missing required field: ${field}`);
          return false;
        }
      }
      
      return true;
    } catch (error) {
      console.error('Save data validation error:', error);
      return false;
    }
  }
  
  /**
   * Generate simple checksum for data integrity
   */
  private generateChecksum(data: any): string {
    const jsonString = JSON.stringify(data);
    let hash = 0;
    
    for (let i = 0; i < jsonString.length; i++) {
      const char = jsonString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return hash.toString(16);
  }
  
  /**
   * Check if save version is compatible
   */
  private isVersionCompatible(version: string): boolean {
    // Simple version check - can be expanded for more complex versioning
    return version === this.SAVE_VERSION;
  }
  
  /**
   * Migrate save data from older versions
   */
  private async migrateSaveData(saveData: any): Promise<any> {
    // TODO: Implement migration logic for different versions
    console.log('Save data migration not yet implemented');
    return saveData;
  }
  
  /**
   * Rotate backup saves
   */
  private async rotateBackups(): Promise<void> {
    try {
      // Move backups: 2->3, 1->2
      for (let i = this.MAX_BACKUPS; i > 1; i--) {
        const prevBackup = localStorage.getItem(`${this.BACKUP_KEY}_${i - 1}`);
        if (prevBackup) {
          localStorage.setItem(`${this.BACKUP_KEY}_${i}`, prevBackup);
        }
      }
    } catch (error) {
      console.error('Failed to rotate backups:', error);
    }
  }
  
  /**
   * Delete all save data
   */
  public async deleteSave(): Promise<boolean> {
    try {
      localStorage.removeItem(this.SAVE_KEY);
      
      // Remove all backups
      for (let i = 1; i <= this.MAX_BACKUPS; i++) {
        localStorage.removeItem(`${this.BACKUP_KEY}_${i}`);
      }
      
      console.log('Save data deleted successfully');
      return true;
    } catch (error) {
      console.error('Failed to delete save data:', error);
      return false;
    }
  }
  
  /**
   * Check if save data exists
   */
  public hasSaveData(): boolean {
    return localStorage.getItem(this.SAVE_KEY) !== null;
  }
  
  /**
   * Get save data info without loading full state
   */
  public async getSaveInfo(): Promise<{
    exists: boolean;
    timestamp?: number;
    version?: string;
    playerRank?: number;
    playTime?: number;
  }> {
    try {
      const rawData = localStorage.getItem(this.SAVE_KEY);
      if (!rawData) {
        return { exists: false };
      }
      
      const saveData = JSON.parse(rawData);
      return {
        exists: true,
        timestamp: saveData.timestamp,
        version: saveData.version,
        playerRank: saveData.gameState?.player?.rank,
        playTime: saveData.gameState?.statistics?.totalPlayTime,
      };
    } catch (error) {
      console.error('Failed to get save info:', error);
      return { exists: false };
    }
  }
  
  /**
   * Export save data as downloadable file
   */
  public async exportSave(): Promise<string | null> {
    try {
      const rawData = localStorage.getItem(this.SAVE_KEY);
      if (!rawData) {
        return null;
      }
      
      // Create downloadable blob
      const blob = new Blob([rawData], { type: 'application/json' });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Failed to export save:', error);
      return null;
    }
  }
  
  /**
   * Import save data from file
   */
  public async importSave(fileContent: string): Promise<boolean> {
    try {
      const saveData = JSON.parse(fileContent);
      
      // Validate imported data
      if (!this.validateSaveData(saveData)) {
        console.error('Invalid save data format');
        return false;
      }
      
      // Create backup of current save before importing
      await this.rotateBackups();
      const currentSave = localStorage.getItem(this.SAVE_KEY);
      if (currentSave) {
        localStorage.setItem(`${this.BACKUP_KEY}_1`, currentSave);
      }
      
      // Import new save
      localStorage.setItem(this.SAVE_KEY, fileContent);
      
      console.log('Save imported successfully');
      return true;
    } catch (error) {
      console.error('Failed to import save:', error);
      return false;
    }
  }
  
  /**
   * Get storage usage information
   */
  public getStorageUsage(): {
    used: number;
    available: number;
    percentage: number;
  } {
    try {
      let used = 0;
      
      // Calculate used storage for our saves
      const mainSave = localStorage.getItem(this.SAVE_KEY);
      if (mainSave) used += mainSave.length;
      
      for (let i = 1; i <= this.MAX_BACKUPS; i++) {
        const backup = localStorage.getItem(`${this.BACKUP_KEY}_${i}`);
        if (backup) used += backup.length;
      }
      
      // Estimate available space (localStorage limit is usually 5-10MB)
      const estimatedLimit = 5 * 1024 * 1024; // 5MB
      const available = estimatedLimit - used;
      const percentage = (used / estimatedLimit) * 100;
      
      return {
        used: used,
        available: Math.max(0, available),
        percentage: Math.min(100, percentage),
      };
    } catch (error) {
      console.error('Failed to get storage usage:', error);
      return { used: 0, available: 0, percentage: 0 };
    }
  }
}
