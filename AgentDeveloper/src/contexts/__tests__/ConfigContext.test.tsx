import React from 'react';
import { render, renderHook, act } from '@testing-library/react';
import { 
  ConfigProvider, 
  useConfig, 
  useTheme, 
  usePerformanceConfig, 
  useAccessibilityConfig,
  AppConfig 
} from '@/contexts/ConfigContext';

/**
 * Test suite for ConfigContext and related hooks
 * Tests configuration management, persistence, and theme handling
 */

describe('ConfigContext', () => {
  beforeEach(() => {
    localStorage.clear();
    // Reset document attributes
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.className = '';
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('ConfigProvider', () => {
    it('should provide default configuration', () => {
      const TestComponent = () => {
        const { config } = useConfig();
        return <div>{config.theme}</div>;
      };

      const { getByText } = render(
        <ConfigProvider>
          <TestComponent />
        </ConfigProvider>
      );

      expect(getByText('auto')).toBeInTheDocument();
    });

    it('should accept initial configuration', () => {
      const initialConfig: Partial<AppConfig> = {
        theme: 'dark',
        language: 'es',
        debugMode: true,
      };

      const TestComponent = () => {
        const { config } = useConfig();
        return (
          <div>
            <span>{config.theme}</span>
            <span>{config.language}</span>
            <span>{config.debugMode.toString()}</span>
          </div>
        );
      };

      const { getByText } = render(
        <ConfigProvider initialConfig={initialConfig}>
          <TestComponent />
        </ConfigProvider>
      );

      expect(getByText('dark')).toBeInTheDocument();
      expect(getByText('es')).toBeInTheDocument();
      expect(getByText('true')).toBeInTheDocument();
    });

    it('should save config to localStorage', () => {
      const { result } = renderHook(() => useConfig(), {
        wrapper: ConfigProvider,
      });

      act(() => {
        result.current.updateConfig({ theme: 'light', debugMode: true });
      });

      const savedConfig = JSON.parse(localStorage.getItem('idle-warhammer40k-app-config') || '{}');
      expect(savedConfig.theme).toBe('light');
      expect(savedConfig.debugMode).toBe(true);
    });

    it('should load config from localStorage on initialization', () => {
      const savedConfig = {
        theme: 'dark',
        language: 'fr',
        highPerformanceMode: true,
      };
      localStorage.setItem('idle-warhammer40k-app-config', JSON.stringify(savedConfig));

      const { result } = renderHook(() => useConfig(), {
        wrapper: ConfigProvider,
      });

      expect(result.current.config.theme).toBe('dark');
      expect(result.current.config.language).toBe('fr');
      expect(result.current.config.highPerformanceMode).toBe(true);
    });
  });

  describe('useConfig hook', () => {
    it('should throw error when used outside provider', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        renderHook(() => useConfig());
      }).toThrow('useConfig must be used within a ConfigProvider');

      consoleError.mockRestore();
    });

    it('should update configuration', () => {
      const { result } = renderHook(() => useConfig(), {
        wrapper: ConfigProvider,
      });

      act(() => {
        result.current.updateConfig({
          theme: 'dark',
          animationsEnabled: false,
          maxFPS: 30,
        });
      });

      expect(result.current.config.theme).toBe('dark');
      expect(result.current.config.animationsEnabled).toBe(false);
      expect(result.current.config.maxFPS).toBe(30);
    });

    it('should reset configuration to defaults', () => {
      const { result } = renderHook(() => useConfig(), {
        wrapper: ConfigProvider,
      });

      // First modify the config
      act(() => {
        result.current.updateConfig({
          theme: 'dark',
          debugMode: true,
          highPerformanceMode: true,
        });
      });

      // Then reset it
      act(() => {
        result.current.resetConfig();
      });

      expect(result.current.config.theme).toBe('auto');
      expect(result.current.config.debugMode).toBe(false);
      expect(result.current.config.highPerformanceMode).toBe(false);
    });

    it('should export configuration as JSON', () => {
      const { result } = renderHook(() => useConfig(), {
        wrapper: ConfigProvider,
      });

      act(() => {
        result.current.updateConfig({
          theme: 'light',
          language: 'de',
          showFPS: true,
        });
      });

      const exportedConfig = result.current.exportConfig();
      const parsedConfig = JSON.parse(exportedConfig);

      expect(parsedConfig.theme).toBe('light');
      expect(parsedConfig.language).toBe('de');
      expect(parsedConfig.showFPS).toBe(true);
    });

    it('should import valid configuration', () => {
      const { result } = renderHook(() => useConfig(), {
        wrapper: ConfigProvider,
      });

      const configToImport = {
        theme: 'dark',
        language: 'zh',
        debugMode: true,
        maxFPS: 120,
      };

      act(() => {
        const success = result.current.importConfig(JSON.stringify(configToImport));
        expect(success).toBe(true);
      });

      expect(result.current.config.theme).toBe('dark');
      expect(result.current.config.language).toBe('zh');
      expect(result.current.config.debugMode).toBe(true);
      expect(result.current.config.maxFPS).toBe(120);
    });

    it('should reject invalid configuration', () => {
      const { result } = renderHook(() => useConfig(), {
        wrapper: ConfigProvider,
      });

      act(() => {
        const success = result.current.importConfig('invalid json');
        expect(success).toBe(false);
      });

      act(() => {
        const success = result.current.importConfig('null');
        expect(success).toBe(false);
      });
    });
  });

  describe('Convenience methods', () => {
    it('should toggle theme correctly', () => {
      const { result } = renderHook(() => useConfig(), {
        wrapper: ConfigProvider,
      });

      // Start with 'auto', should cycle through light -> dark -> auto
      expect(result.current.config.theme).toBe('auto');

      act(() => {
        result.current.toggleTheme();
      });
      expect(result.current.config.theme).toBe('light');

      act(() => {
        result.current.toggleTheme();
      });
      expect(result.current.config.theme).toBe('dark');

      act(() => {
        result.current.toggleTheme();
      });
      expect(result.current.config.theme).toBe('auto');
    });

    it('should toggle debug mode', () => {
      const { result } = renderHook(() => useConfig(), {
        wrapper: ConfigProvider,
      });

      expect(result.current.config.debugMode).toBe(false);

      act(() => {
        result.current.toggleDebugMode();
      });
      expect(result.current.config.debugMode).toBe(true);

      act(() => {
        result.current.toggleDebugMode();
      });
      expect(result.current.config.debugMode).toBe(false);
    });

    it('should toggle high performance mode and adjust related settings', () => {
      const { result } = renderHook(() => useConfig(), {
        wrapper: ConfigProvider,
      });

      expect(result.current.config.highPerformanceMode).toBe(false);
      expect(result.current.config.animationsEnabled).toBe(true);
      expect(result.current.config.particleEffects).toBe(true);

      act(() => {
        result.current.toggleHighPerformance();
      });

      expect(result.current.config.highPerformanceMode).toBe(true);
      expect(result.current.config.animationsEnabled).toBe(false);
      expect(result.current.config.particleEffects).toBe(false);
      expect(result.current.config.maxFPS).toBe(144);
    });

    it('should set language', () => {
      const { result } = renderHook(() => useConfig(), {
        wrapper: ConfigProvider,
      });

      act(() => {
        result.current.setLanguage('ru');
      });

      expect(result.current.config.language).toBe('ru');
    });

    it('should set font size', () => {
      const { result } = renderHook(() => useConfig(), {
        wrapper: ConfigProvider,
      });

      act(() => {
        result.current.setFontSize('large');
      });

      expect(result.current.config.fontSize).toBe('large');
    });
  });

  describe('useTheme hook', () => {
    it('should return effective theme based on system preference when auto', () => {
      // Mock matchMedia to simulate dark mode preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      const { result } = renderHook(() => useTheme(), {
        wrapper: ConfigProvider,
      });

      expect(result.current.theme).toBe('dark');
      expect(result.current.isAuto).toBe(true);
      expect(result.current.systemTheme).toBe('dark');
    });

    it('should return configured theme when not auto', () => {
      const ConfigWrapper = ({ children }: { children: React.ReactNode }) => (
        <ConfigProvider initialConfig={{ theme: 'light' }}>
          {children}
        </ConfigProvider>
      );

      const { result } = renderHook(() => useTheme(), {
        wrapper: ConfigWrapper,
      });

      expect(result.current.theme).toBe('light');
      expect(result.current.isAuto).toBe(false);
    });
  });

  describe('usePerformanceConfig hook', () => {
    it('should return performance-optimized settings', () => {
      const ConfigWrapper = ({ children }: { children: React.ReactNode }) => (
        <ConfigProvider initialConfig={{
          animationsEnabled: true,
          particleEffects: true,
          reducedMotion: false,
          highPerformanceMode: false,
          maxFPS: 60,
        }}>
          {children}
        </ConfigProvider>
      );

      const { result } = renderHook(() => usePerformanceConfig(), {
        wrapper: ConfigWrapper,
      });

      expect(result.current.shouldAnimate).toBe(true);
      expect(result.current.shouldShowParticles).toBe(true);
      expect(result.current.maxFPS).toBe(60);
      expect(result.current.isHighPerformance).toBe(false);
    });

    it('should respect reduced motion accessibility setting', () => {
      const ConfigWrapper = ({ children }: { children: React.ReactNode }) => (
        <ConfigProvider initialConfig={{
          animationsEnabled: true,
          reducedMotion: true,
        }}>
          {children}
        </ConfigProvider>
      );

      const { result } = renderHook(() => usePerformanceConfig(), {
        wrapper: ConfigWrapper,
      });

      expect(result.current.shouldAnimate).toBe(false); // Disabled due to reducedMotion
    });

    it('should disable particles in high performance mode', () => {
      const ConfigWrapper = ({ children }: { children: React.ReactNode }) => (
        <ConfigProvider initialConfig={{
          particleEffects: true,
          highPerformanceMode: true,
        }}>
          {children}
        </ConfigProvider>
      );

      const { result } = renderHook(() => usePerformanceConfig(), {
        wrapper: ConfigWrapper,
      });

      expect(result.current.shouldShowParticles).toBe(false); // Disabled due to highPerformanceMode
    });
  });

  describe('useAccessibilityConfig hook', () => {
    it('should return accessibility settings', () => {
      const ConfigWrapper = ({ children }: { children: React.ReactNode }) => (
        <ConfigProvider initialConfig={{
          reducedMotion: true,
          highContrast: true,
          fontSize: 'large',
          screenReaderSupport: true,
        }}>
          {children}
        </ConfigProvider>
      );

      const { result } = renderHook(() => useAccessibilityConfig(), {
        wrapper: ConfigWrapper,
      });

      expect(result.current.reducedMotion).toBe(true);
      expect(result.current.highContrast).toBe(true);
      expect(result.current.fontSize).toBe('large');
      expect(result.current.screenReaderSupport).toBe(true);
    });
  });
});
