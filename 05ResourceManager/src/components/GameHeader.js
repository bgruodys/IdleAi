import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import {
  Save as SaveIcon,
  BugReport as DebugIcon,
  PlayArrow as TestIcon,
  Timer as TimerIcon,
  Storage as StorageIcon,
  Build as BuildIcon,
  AccountBalance as ResourceIcon
} from '@mui/icons-material';
import { useGameContext } from '../context/GameContext';

// Cookie utility function for GameHeader
const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      try {
        return JSON.parse(decodeURIComponent(c.substring(nameEQ.length, c.length)));
      } catch (error) {
        console.error('Failed to parse cookie:', error);
        return null;
      }
    }
  }
  return null;
};

function GameHeader() {
  const { state, dispatch, actions } = useGameContext();
  
  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  const formatLastSave = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    return formatTime(diff);
  };

  const testOfflineSummary = () => {
    const testSummary = {
      timeOffline: 3600000, // 1 hour
      resourcesGained: {
        plasteel: 25.5,
        adamantium: 12.3
      },
      minesActive: 2
    };
    dispatch({ type: actions.SHOW_OFFLINE_SUMMARY, payload: testSummary });
  };

  const manualSave = () => {
    try {
      const gameData = {
        ...state,
        lastSave: Date.now()
      };
      
      // Set cookie with 1 year expiration
      const expires = new Date();
      expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));
      document.cookie = `idleWarhammer40k=${encodeURIComponent(JSON.stringify(gameData))};expires=${expires.toUTCString()};path=/`;
      
      // Verify the save worked
      const savedData = getCookie('idleWarhammer40k');
      if (savedData && savedData.lastSave === gameData.lastSave) {
        console.log('Manual save to cookies completed at:', new Date().toLocaleTimeString());
        console.log('Cookie save verification successful - Data size:', JSON.stringify(gameData).length);
        dispatch({ type: actions.SAVE_GAME });
      } else {
        console.error('Cookie save verification failed - data mismatch');
      }
    } catch (error) {
      console.error('Manual save to cookies failed:', error);
    }
  };

  const debugStorage = () => {
    const savedGame = getCookie('idleWarhammer40k');
    console.log('=== DEBUG: Cookie Contents ===');
    console.log('Raw cookie data:', savedGame);
    console.log('All cookies:', document.cookie);
    if (savedGame) {
      try {
        console.log('Parsed game data:', savedGame);
        console.log('Last save:', new Date(savedGame.lastSave).toLocaleString());
        console.log('Current time:', new Date().toLocaleString());
        console.log('Time difference:', Date.now() - savedGame.lastSave, 'ms');
      } catch (error) {
        console.error('Failed to parse saved game from cookie:', error);
      }
    } else {
      console.log('No saved game found in cookies');
    }
    console.log('Current state:', state);
    console.log('=====================================');
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)' }}>
      <Toolbar>
        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
          <Tooltip title="Test Offline Summary">
            <IconButton 
              color="inherit" 
              onClick={testOfflineSummary}
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <TestIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Save Game">
            <IconButton 
              color="inherit" 
              onClick={manualSave}
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Debug Storage">
            <IconButton 
              color="inherit" 
              onClick={debugStorage}
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <DebugIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Title */}
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          IDLE WARHAMMER 40K
        </Typography>
        
        {/* Auto-Save Status */}
        <Chip 
          label="Auto-Save Active" 
          color="success" 
          size="small"
          sx={{ mr: 2 }}
        />
      </Toolbar>

      {/* Subtitle */}
      <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.2)', py: 1 }}>
        <Typography variant="subtitle1" align="center" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          Imperial Mining Operations - The Emperor's Resources
        </Typography>
      </Box>

      {/* Game Stats */}
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <TimerIcon sx={{ fontSize: 40, color: '#81c784', mb: 1 }} />
                <Typography variant="h6" color="inherit">
                  {formatTime(state.totalPlayTime)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Total Play Time
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <StorageIcon sx={{ fontSize: 40, color: '#64b5f6', mb: 1 }} />
                <Typography variant="h6" color="inherit">
                  {formatLastSave(state.lastSave)} ago
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Last Save
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <BuildIcon sx={{ fontSize: 40, color: '#ffb74d', mb: 1 }} />
                <Typography variant="h6" color="inherit">
                  {Object.values(state.mining).filter(mine => mine.active).length}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Active Mines
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          
        </Grid>
      </Box>
    </AppBar>
  );
}

export default GameHeader;
