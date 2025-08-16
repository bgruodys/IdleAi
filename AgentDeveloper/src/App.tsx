import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useGameStore } from '@/stores/gameStore';
import { GameInterface } from '@/components/GameInterface/GameInterface';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

function App() {
  const { isInitialized, initializeGame } = useGameStore();

  // Initialize game on first load
  if (!isInitialized) {
    initializeGame();
  }

  return (
    <ErrorBoundary>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                flexGrow: 1, 
                textAlign: 'center',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              IDLE WARHAMMER 40K
            </Typography>
          </Toolbar>
          <Box sx={{ textAlign: 'center', pb: 1 }}>
            <Typography variant="body2" sx={{ fontStyle: 'italic', opacity: 0.9 }}>
              "In the grim darkness of the far future, there is only war..."
            </Typography>
          </Box>
        </AppBar>
        
        <Container component="main" sx={{ flexGrow: 1, py: 2 }}>
          <GameInterface />
        </Container>
        
        <Box 
          component="footer" 
          sx={{ 
            backgroundColor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider',
            py: 1,
            textAlign: 'center'
          }}
        >
          <Typography variant="caption" color="text.secondary">
            For the Emperor! • Version 1.0.0 • © 2025 IdleAi
          </Typography>
        </Box>
      </Box>
    </ErrorBoundary>
  );
}

export default App;
