'use client';

import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Security,
  Star,
  MonetizationOn,
  Timer,
} from '@mui/icons-material';
import { Battle } from './Battle';
import { useGameState } from '@/lib/useGameState';
import { BattleUnit } from '@/types/battle';

export function Game() {
  const [isClient, setIsClient] = useState(false);
  const { gameState } = useGameState();
  const [showOfflineAlert, setShowOfflineAlert] = useState(false);

  // Ensure we're on the client side
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Check for offline progress on mount
  React.useEffect(() => {
    if (!isClient) return; // Only run on client side
    
    try {
      const lastSaveTime = localStorage.getItem('warhammer40idle_last_save');
      if (lastSaveTime) {
        const timeOffline = Date.now() - parseInt(lastSaveTime);
        if (timeOffline > 5000) { // More than 5 seconds
          setShowOfflineAlert(true);
        }
      }
    } catch (error) {
      console.error('Error checking offline progress:', error);
    }
  }, [isClient]);

  // Don't render until we're on the client side
  if (!isClient) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <Typography variant="h6">Loading...</Typography>
        </Box>
      </Container>
    );
  }

  // Calculate time until next soldier spawn
  const timeUntilNextSpawn = Math.max(0, 10000 - (Date.now() - gameState.lastSoldierSpawn));
  const secondsUntilNextSpawn = Math.ceil(timeUntilNextSpawn / 1000);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header with Resources */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
          <Typography variant="h4" component="h1" color="primary">
            Warhammer 40K Idle
          </Typography>
          
          <Box display="flex" gap={2} alignItems="center">
            <Chip
              icon={<MonetizationOn />}
              label={`${gameState.resources.gold.toLocaleString()} Gold`}
              color="warning"
              variant="outlined"
            />
            <Chip
              icon={<Star />}
              label={`${gameState.resources.experience.toLocaleString()} XP`}
              color="secondary"
              variant="outlined"
            />
            <Chip
              icon={<Security />}
              label={`${gameState.totalSoldiers.toLocaleString()} Soldiers`}
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<Timer />}
              label={`Next Soldier: ${secondsUntilNextSpawn}s`}
              color="info"
              variant="outlined"
            />
          </Box>
        </Box>
      </Paper>

      {/* Battle Component */}
      <Battle
        battleField={gameState.battleField}
        battleStats={gameState.battleStats}
      />

      {/* Offline Progress Alert */}
      <Snackbar
        open={showOfflineAlert}
        autoHideDuration={6000}
        onClose={() => setShowOfflineAlert(false)}
      >
        <Alert 
          onClose={() => setShowOfflineAlert(false)} 
          severity="info" 
          sx={{ width: '100%' }}
        >
          Welcome back! Soldiers have been spawning automatically while you were away.
        </Alert>
      </Snackbar>

      {/* Game Stats */}
      <Paper elevation={2} sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Game Statistics
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="text.secondary">
              Total Soldiers
            </Typography>
            <Typography variant="h6">
              {gameState.totalSoldiers.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="text.secondary">
              Total Experience
            </Typography>
            <Typography variant="h6">
              {gameState.totalExperience.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="text.secondary">
              Soldiers in Battle
            </Typography>
            <Typography variant="h6">
              {gameState.battleField.units.filter((u: BattleUnit) => u.type === 'soldier' && u.isAlive).length}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="text.secondary">
              Battles Won
            </Typography>
            <Typography variant="h6" color="success.main">
              {gameState.battleStats.battlesWon}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
