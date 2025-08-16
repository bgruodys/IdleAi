/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, ProgressBar } from '../common';
import { Panel } from '../common/Layout';

// Create a test theme for Material UI components
const testTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFD700',
    },
  },
});

// Wrapper component for Material UI theme
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={testTheme}>{children}</ThemeProvider>
);

describe('UI Components Library with Material UI', () => {
  describe('Button Component', () => {
    it('renders button with text', () => {
      render(
        <ThemeWrapper>
          <Button>Test Button</Button>
        </ThemeWrapper>
      );
      expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    it('renders primary variant button', () => {
      render(
        <ThemeWrapper>
          <Button variant="primary">Primary Button</Button>
        </ThemeWrapper>
      );
      const button = screen.getByText('Primary Button');
      expect(button).toBeInTheDocument();
      expect(button.closest('button')).toHaveClass('MuiButton-contained');
    });

    it('renders secondary variant button', () => {
      render(
        <ThemeWrapper>
          <Button variant="secondary">Secondary Button</Button>
        </ThemeWrapper>
      );
      const button = screen.getByText('Secondary Button');
      expect(button).toBeInTheDocument();
      expect(button.closest('button')).toHaveClass('MuiButton-contained');
    });

    it('shows loading state', () => {
      render(
        <ThemeWrapper>
          <Button loading>Loading Button</Button>
        </ThemeWrapper>
      );
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('ProgressBar Component', () => {
    it('renders progress bar with correct value', () => {
      render(
        <ThemeWrapper>
          <ProgressBar current={50} max={100} />
        </ThemeWrapper>
      );
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    });

    it('displays label when provided', () => {
      render(
        <ThemeWrapper>
          <ProgressBar current={30} max={100} label="Health" />
        </ThemeWrapper>
      );
      expect(screen.getByText('Health')).toBeInTheDocument();
      expect(screen.getByText('30 / 100')).toBeInTheDocument();
    });

    it('calculates percentage correctly', () => {
      render(
        <ThemeWrapper>
          <ProgressBar current={75} max={100} />
        </ThemeWrapper>
      );
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '75');
    });
  });

  describe('Panel Component', () => {
    it('renders panel with title and content', () => {
      render(
        <ThemeWrapper>
          <Panel title="Test Panel">
            <div>Panel Content</div>
          </Panel>
        </ThemeWrapper>
      );
      
      expect(screen.getByText('Test Panel')).toBeInTheDocument();
      expect(screen.getByText('Panel Content')).toBeInTheDocument();
    });

    it('renders panel without title', () => {
      render(
        <ThemeWrapper>
          <Panel>
            <div>Content Only</div>
          </Panel>
        </ThemeWrapper>
      );
      
      expect(screen.getByText('Content Only')).toBeInTheDocument();
    });

    it('renders panel with header actions', () => {
      render(
        <ThemeWrapper>
          <Panel 
            title="Panel with Actions" 
            headerActions={<button>Action</button>}
          >
            <div>Content</div>
          </Panel>
        </ThemeWrapper>
      );
      
      expect(screen.getByText('Panel with Actions')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });
});
