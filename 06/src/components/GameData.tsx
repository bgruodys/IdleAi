import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Divider, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { resetGame } from '../store/gameSlice';
import { aggregateReinforcementsByType, calculateTotalReinforcements } from '../utils/reinforcementUtils';
import { ReinforcementIcon } from '../utils/reinforcementIcons';
import { clearGameStateFromStorage, clearSession } from '../utils/persistence';
import { cleanupSessionManager } from '../utils/sessionManager';
import { useCountdownTimer, formatTime } from '../hooks/useCountdownTimer';

const RESOURCE_INTERVAL = 60000; // 60 seconds
const REINFORCEMENT_INTERVAL = 5000; // 5 seconds

export const GameData: React.FC = () => {
  const dispatch = useAppDispatch();
  const gameState = useAppSelector((state) => state.game);
  const { gameStarted, player, planet, reinforcements, resources, sessionInfo } = gameState || {};
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // Calculate time until next resource generation (60 seconds)
  const resourceTimeRemaining = useCountdownTimer(RESOURCE_INTERVAL, gameStarted);
  const resourceProgress = ((RESOURCE_INTERVAL - resourceTimeRemaining) / RESOURCE_INTERVAL) * 100;

  // Calculate time until next reinforcement (5 seconds)
  const reinforcementTimeRemaining = useCountdownTimer(REINFORCEMENT_INTERVAL, gameStarted);
  const reinforcementProgress = ((REINFORCEMENT_INTERVAL - reinforcementTimeRemaining) / REINFORCEMENT_INTERVAL) * 100;

  const handleResetClick = () => {
    setResetDialogOpen(true);
  };

  const handleResetConfirm = () => {
    // Clear localStorage
    clearGameStateFromStorage();
    clearSession();
    
    // Cleanup session manager if session exists
    if (sessionInfo?.sessionId) {
      cleanupSessionManager(sessionInfo.sessionId);
    }
    
    // Reset game state
    dispatch(resetGame());
    
    // Close dialog
    setResetDialogOpen(false);
    
    // Reload page to ensure clean state
    window.location.reload();
  };

  const handleResetCancel = () => {
    setResetDialogOpen(false);
  };

  if (!gameStarted) {
    return (
      <Box p={2}>
        <Typography variant="h6">Game not started</Typography>
      </Box>
    );
  }

  const aggregatedReinforcements = aggregateReinforcementsByType(reinforcements || []);
  const totalUnits = calculateTotalReinforcements(reinforcements || []);

  return (
    <Box p={2}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          The Emperor's Call
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={handleResetClick}
          sx={{ minWidth: 120 }}
        >
          Reset Game
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Player Information */}
        {player && (
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Player Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1">
                <strong>Name:</strong> {player.name}
              </Typography>
              <Typography variant="body1">
                <strong>Rank:</strong> {player.rank} - {player.rankTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Experience: {player.experience.toLocaleString()} XP
              </Typography>
            </Paper>
          </Grid>
        )}

        {/* Planet Information */}
        {planet && (
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Planet Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1">
                <strong>Planet:</strong> {planet.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Discovered: {new Date(planet.discoveredAt).toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
        )}

        {/* Resources */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Resources
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress 
                  variant="determinate" 
                  value={resourceProgress} 
                  size={24}
                  thickness={4}
                />
                <Typography variant="body2" color="text.secondary">
                  Next: {formatTime(resourceTimeRemaining)}
                </Typography>
              </Box>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={resourceProgress} 
              sx={{ mb: 2, height: 6, borderRadius: 1 }}
            />
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body1">
                  <strong>Credits:</strong> {resources?.credits.toLocaleString() || 0}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body1">
                  <strong>Munitions:</strong> {resources?.munitions.toLocaleString() || 0}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body1">
                  <strong>Promethium:</strong> {resources?.promethium.toLocaleString() || 0}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body1">
                  <strong>Raw Materials:</strong> {resources?.rawMaterials.toLocaleString() || 0}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body1">
                  <strong>Imperial Favor:</strong> {resources?.imperialFavor.toLocaleString() || 0}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Reinforcements */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Reinforcements ({totalUnits} total units)
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress 
                  variant="determinate" 
                  value={reinforcementProgress} 
                  size={24}
                  thickness={4}
                />
                <Typography variant="body2" color="text.secondary">
                  Next: {formatTime(reinforcementTimeRemaining)}
                </Typography>
              </Box>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={reinforcementProgress} 
              sx={{ mb: 2, height: 6, borderRadius: 1 }}
            />
            <Divider sx={{ mb: 2 }} />
            {aggregatedReinforcements.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No reinforcements arrived yet
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {aggregatedReinforcements.map((reinforcement) => (
                  <Box
                    key={reinforcement.type}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      p: 1,
                      borderRadius: 1,
                      bgcolor: 'background.default',
                    }}
                  >
                    <ReinforcementIcon type={reinforcement.type} />
                    <Typography variant="body1">
                      {reinforcement.type} - {reinforcement.totalUnits} units
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Reset Game Confirmation Dialog */}
      <Dialog
        open={resetDialogOpen}
        onClose={handleResetCancel}
        aria-labelledby="reset-dialog-title"
        aria-describedby="reset-dialog-description"
      >
        <DialogTitle id="reset-dialog-title" color="error">
          Reset Game
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="reset-dialog-description">
            Are you sure you want to reset your game? This action cannot be undone.
            <br />
            <br />
            <strong>This will permanently delete:</strong>
            <ul>
              <li>All game progress</li>
              <li>All resources</li>
              <li>All reinforcements</li>
              <li>All saved game data</li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResetCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleResetConfirm} color="error" variant="contained" autoFocus>
            Reset Game
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
