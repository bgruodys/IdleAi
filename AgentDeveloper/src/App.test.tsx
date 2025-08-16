import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

// Create test theme
const testTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFD700',
    },
  },
});

// Mock the stores and components since they may not be fully implemented yet
jest.mock('@/stores/gameStore', () => ({
  useGameStore: () => ({
    isInitialized: false,
    initializeGame: jest.fn(),
  }),
}));

jest.mock('@/components/GameInterface/GameInterface', () => ({
  GameInterface: () => <div data-testid="game-interface">Game Interface</div>,
}));

jest.mock('@/components/common/ErrorBoundary', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Wrapper component for tests
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={testTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

describe('App Component with Material UI', () => {
  it('renders the main application', () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );
    
    // Check for the main title
    expect(screen.getByText('IDLE WARHAMMER 40K')).toBeInTheDocument();
    
    // Check for the subtitle
    expect(screen.getByText('"In the grim darkness of the far future, there is only war..."')).toBeInTheDocument();
    
    // Check for footer
    expect(screen.getByText(/For the Emperor!/)).toBeInTheDocument();
  });

  it('displays the game interface', () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );
    
    expect(screen.getByTestId('game-interface')).toBeInTheDocument();
  });

  it('renders with Material UI components', () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );
    
    // Check that Material UI AppBar is rendered
    const appBar = screen.getByRole('banner');
    expect(appBar).toBeInTheDocument();
    
    // Check that Container is rendered
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });
});
