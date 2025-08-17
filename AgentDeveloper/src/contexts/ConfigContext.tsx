import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * Game Configuration Management with React Context
 * Handles app-level configuration settings separate from game state
 */

export interface AppConfig {
  // Display settings
  theme: 'light' | 'dark' | 'auto';
  language: 'en' | 'es' | 'fr' | 'de' | 'ru' | 'zh';
  timezone: string;
  
  // Performance settings
  animationsEnabled: boolean;
  particleEffects: boolean;
  highPerformanceMode: boolean;
  maxFPS: number;
  
  // Accessibility settings
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  screenReaderSupport: boolean;
  
  // Developer settings
  debugMode: boolean;
  showFPS: boolean;
  enableLogging: boolean;
  logLevel: 'error' | 'warn' | 'info' | 'debug';
  
  // Network settings
  autoSyncEnabled: boolean;
  syncInterval: number; // in milliseconds
  offlineMode: boolean;
  
  // Feature flags
  experimentalFeatures: boolean;
  betaFeatures: boolean;
  
  // UI Layout
  sidebarCollapsed: boolean;
  compactMode: boolean;
  showTooltips: boolean;
}

export interface ConfigContextType {
  config: AppConfig;
  updateConfig: (updates: Partial<AppConfig>) => void;
  resetConfig: () => void;
  exportConfig: () => string;
  importConfig: (configJson: string) => boolean;
  
  // Convenience methods
  toggleTheme: () => void;
  toggleDebugMode: () => void;
  toggleHighPerformance: () => void;
  setLanguage: (language: AppConfig['language']) => void;
  setFontSize: (size: AppConfig['fontSize']) => void;
}

const defaultConfig: AppConfig = {
  // Display settings
  theme: 'auto',
  language: 'en',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  
  // Performance settings
  animationsEnabled: true,
  particleEffects: true,
  highPerformanceMode: false,
  maxFPS: 60,
  
  // Accessibility settings
  reducedMotion: false,
  highContrast: false,
  fontSize: 'medium',
  screenReaderSupport: false,
  
  // Developer settings
  debugMode: false,
  showFPS: false,
  enableLogging: true,
  logLevel: 'info',
  
  // Network settings
  autoSyncEnabled: true,
  syncInterval: 30000, // 30 seconds
  offlineMode: false,
  
  // Feature flags
  experimentalFeatures: false,
  betaFeatures: false,
  
  // UI Layout
  sidebarCollapsed: false,
  compactMode: false,
  showTooltips: true,
};

const CONFIG_STORAGE_KEY = 'idle-warhammer40k-app-config';

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

interface ConfigProviderProps {
  children: ReactNode;
  initialConfig?: Partial<AppConfig>;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ 
  children, 
  initialConfig 
}) => {
  const [config, setConfig] = useState<AppConfig>(() => {
    // Load config from localStorage on initialization
    try {
      const savedConfig = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        return { ...defaultConfig, ...parsedConfig, ...initialConfig };
      }
    } catch (error) {
      console.error('Failed to load config from localStorage:', error);
    }
    
    return { ...defaultConfig, ...initialConfig };
  });

  // Save config to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Failed to save config to localStorage:', error);
    }
  }, [config]);

  // Apply theme changes to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (config.theme === 'auto') {
      // Use system preference with fallback
      let prefersDark = false;
      if (typeof window !== 'undefined' && window.matchMedia) {
        try {
          prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        } catch (error) {
          console.warn('Unable to access matchMedia, using default theme');
        }
      }
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', config.theme);
    }
    
    // Apply accessibility settings
    root.style.setProperty('--base-font-size', getFontSizeValue(config.fontSize));
    root.classList.toggle('reduced-motion', config.reducedMotion);
    root.classList.toggle('high-contrast', config.highContrast);
  }, [config.theme, config.fontSize, config.reducedMotion, config.highContrast]);

  const updateConfig = (updates: Partial<AppConfig>) => {
    setConfig(prevConfig => ({ ...prevConfig, ...updates }));
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
  };

  const exportConfig = (): string => {
    return JSON.stringify(config, null, 2);
  };

  const importConfig = (configJson: string): boolean => {
    try {
      const parsedConfig = JSON.parse(configJson);
      
      // Validate the config structure
      if (typeof parsedConfig === 'object' && parsedConfig !== null) {
        // Merge with default config to ensure all required fields exist
        const validatedConfig = { ...defaultConfig, ...parsedConfig };
        setConfig(validatedConfig);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Failed to import config:', error);
      return false;
    }
  };

  // Convenience methods
  const toggleTheme = () => {
    const themes: AppConfig['theme'][] = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(config.theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    updateConfig({ theme: themes[nextIndex] });
  };

  const toggleDebugMode = () => {
    updateConfig({ debugMode: !config.debugMode });
  };

  const toggleHighPerformance = () => {
    updateConfig({ 
      highPerformanceMode: !config.highPerformanceMode,
      // Automatically adjust other settings for performance
      animationsEnabled: config.highPerformanceMode, // Inverse logic
      particleEffects: config.highPerformanceMode,
      maxFPS: config.highPerformanceMode ? 60 : 144,
    });
  };

  const setLanguage = (language: AppConfig['language']) => {
    updateConfig({ language });
  };

  const setFontSize = (fontSize: AppConfig['fontSize']) => {
    updateConfig({ fontSize });
  };

  const contextValue: ConfigContextType = {
    config,
    updateConfig,
    resetConfig,
    exportConfig,
    importConfig,
    toggleTheme,
    toggleDebugMode,
    toggleHighPerformance,
    setLanguage,
    setFontSize,
  };

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  );
};

// Custom hook to use the config context
export const useConfig = (): ConfigContextType => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};

// Helper function to get CSS font size value
function getFontSizeValue(size: AppConfig['fontSize']): string {
  switch (size) {
    case 'small':
      return '14px';
    case 'medium':
      return '16px';
    case 'large':
      return '18px';
    case 'extra-large':
      return '20px';
    default:
      return '16px';
  }
}

// Helper hook for responsive theme detection
export const useTheme = () => {
  const { config } = useConfig();
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const effectiveTheme = config.theme === 'auto' ? systemTheme : config.theme;
  
  return {
    theme: effectiveTheme,
    isAuto: config.theme === 'auto',
    systemTheme,
  };
};

// Helper hook for performance-sensitive components
export const usePerformanceConfig = () => {
  const { config } = useConfig();
  
  return {
    shouldAnimate: config.animationsEnabled && !config.reducedMotion,
    shouldShowParticles: config.particleEffects && !config.highPerformanceMode,
    maxFPS: config.maxFPS,
    isHighPerformance: config.highPerformanceMode,
  };
};

// Helper hook for accessibility settings
export const useAccessibilityConfig = () => {
  const { config } = useConfig();
  
  return {
    reducedMotion: config.reducedMotion,
    highContrast: config.highContrast,
    fontSize: config.fontSize,
    screenReaderSupport: config.screenReaderSupport,
  };
};
