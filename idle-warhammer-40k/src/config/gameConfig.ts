/**
 * @fileoverview Game configuration for IdleWarhammer40k
 * @author AI Assistant
 * @version 1.0.0
 */

import { GameConfig } from '../models/types/GameTypes';

export const GAME_CONFIG: GameConfig = {
  // Reinforcement every 1 minute (60,000 milliseconds)
  reinforcementInterval: 60000,
  
  // Ork attacks every 10 seconds (10,000 milliseconds)
  attackInterval: 10000,
  
  // Maximum units allowed
  maxUnits: 10,
  maxEnemyUnits: 10,
  
  // Starting resources
  startingResources: {
    credits: 0,
    materials: 0,
    experience: 0
  }
};

// Combat configuration
export const COMBAT_CONFIG = {
  // Base damage calculation
  baseDamageMultiplier: 1.0,
  criticalHitChance: 0.1,
  criticalHitMultiplier: 2.0,
  
  // Attack cooldowns (in milliseconds)
  unitAttackCooldown: 1000,
  unitMoveCooldown: 500,
  
  // Experience gain
  experiencePerKill: 10,
  experiencePerVictory: 50,
  
  // Resource rewards
  creditsPerKill: 5,
  materialsPerKill: 2
};

// UI configuration
export const UI_CONFIG = {
  // Update intervals (in milliseconds)
  gameLoopInterval: 100,
  uiUpdateInterval: 50,
  
  // Animation durations
  combatAnimationDuration: 1000,
  unitSpawnAnimationDuration: 500,
  
  // Display settings
  maxCombatLogEntries: 10,
  showDamageNumbers: true,
  showHealthBars: true
};

// Audio configuration
export const AUDIO_CONFIG = {
  // Volume levels (0-1)
  masterVolume: 0.7,
  musicVolume: 0.5,
  sfxVolume: 0.8,
  
  // Audio files
  sounds: {
    combat: {
      attack: '/assets/sounds/sfx/combat/attack.mp3',
      hit: '/assets/sounds/sfx/combat/hit.mp3',
      death: '/assets/sounds/sfx/combat/death.mp3',
      victory: '/assets/sounds/sfx/combat/victory.mp3'
    },
    ui: {
      button: '/assets/sounds/sfx/ui/button.mp3',
      notification: '/assets/sounds/sfx/ui/notification.mp3'
    },
    ambient: {
      background: '/assets/sounds/music/background.mp3'
    }
  }
}; 