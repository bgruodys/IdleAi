'use client';

import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add,
  Security,
  Star,
  MonetizationOn,
} from '@mui/icons-material';
import { Barracks } from './Barracks';
import { useGameState } from '@/lib/useGameState';
import { getBarracksUpgradeCost } from '@/lib/gameLogic';

export function Game() {
  const [isClient, setIsClient] = useState(false);
  const { gameState, toggleBarracksTraining, upgradeBarracksLevel, addBarracks } = useGameState();
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

  const canAffordNewBarracks = gameState.resources.gold >= 500;

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
          </Box>
        </Box>
      </Paper>

      {/* Add New Barracks Button */}
      <Box mb={3}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={addBarracks}
          disabled={!canAffordNewBarracks}
          size="large"
        >
          Build New Barracks (500 Gold)
        </Button>
      </Box>

      {/* Barracks Grid */}
      <Grid container spacing={2}>
        {gameState.barracks.map((barracks) => {
          const canAffordUpgrade = gameState.resources.gold >= getBarracksUpgradeCost(barracks);
          
          return (
            <Grid item xs={12} sm={6} md={4} key={barracks.id}>
              <Barracks
                barracks={barracks}
                onToggleTraining={toggleBarracksTraining}
                onUpgrade={upgradeBarracksLevel}
                canAffordUpgrade={canAffordUpgrade}
              />
            </Grid>
          );
        })}
      </Grid>

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
          Welcome back! Your barracks have been training while you were away.
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
              Total Barracks
            </Typography>
            <Typography variant="h6">
              {gameState.barracks.length}
            </Typography>
          </Grid>
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
              Active Barracks
            </Typography>
            <Typography variant="h6">
              {gameState.barracks.filter(b => b.isTraining).length}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
