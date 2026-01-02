import React, { useMemo, useState } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Paper, 
  ListItemIcon,
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
import { useCountdownTimer, formatTime } from '../hooks/useCountdownTimer';
import { useResourceTimer } from '../hooks/useResourceTimer';

const REINFORCEMENT_INTERVAL = 5000; // 5 seconds
const RESOURCE_INTERVAL = 60000; // 60 seconds (1 minute)

export const GameData: React.FC = () => {
  const dispatch = useAppDispatch();
  const { player, planet, reinforcements, resources, gameStarted } = useAppSelector((state) => state.game);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  
  // Countdown timers
  const reinforcementTimeRemaining = useCountdownTimer(REINFORCEMENT_INTERVAL, gameStarted);
  const resourceTimeRemaining = useCountdownTimer(RESOURCE_INTERVAL, gameStarted);
  
  // Resource generation timer
  useResourceTimer(gameStarted);

  if (!gameStarted) {
    return (
      <Box p={2}>
        <Typography variant="h6">Game not started</Typography>
      </Box>
    );
  }

  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString();
  };

  // Aggregate reinforcements by type
  const reinforcementsByType = useMemo(() => {
    return aggregateReinforcementsByType(reinforcements);
  }, [reinforcements]);

  const totalUnits = useMemo(() => {
    return calculateTotalReinforcements(reinforcements);
  }, [reinforcements]);

  const handleResetClick = () => {
    setResetDialogOpen(true);
  };

  const handleResetConfirm = () => {
    // Clear all saved data
    clearGameStateFromStorage();
    clearSession();
    
    // Reset game state
    dispatch(resetGame());
    
    // Close dialog
    setResetDialogOpen(false);
    
    // Reload page to restart game
    window.location.reload();
  };

  const handleResetCancel = () => {
    setResetDialogOpen(false);
  };

  return (
    <Box p={2}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">
          The Emperor's Call
        </Typography>
        <Button 
          variant="outlined" 
          color="error" 
          onClick={handleResetClick}
          sx={{ ml: 2 }}
        >
          Reset Game
        </Button>
      </Box>

      <Dialog
        open={resetDialogOpen}
        onClose={handleResetCancel}
        aria-labelledby="reset-dialog-title"
        aria-describedby="reset-dialog-description"
      >
        <DialogTitle id="reset-dialog-title">
          Reset Game?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="reset-dialog-description">
            Are you sure you want to reset the game? This will permanently delete all your progress, including:
            <ul>
              <li>Your rank and rank title</li>
              <li>All resources</li>
              <li>All reinforcements</li>
              <li>Planet information</li>
            </ul>
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResetCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleResetConfirm} color="error" variant="contained" autoFocus>
            Confirm Reset
          </Button>
        </DialogActions>
      </Dialog>

      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Planet Information
        </Typography>
        {planet && (
          <List dense>
            <ListItem>
              <ListItemText primary="Planet Name" secondary={planet.name} />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Discovered At" 
                secondary={formatTimestamp(planet.discoveredAt)} 
              />
            </ListItem>
          </List>
        )}
      </Paper>

      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Player Information
        </Typography>
        {player && (
          <List dense>
            <ListItem>
              <ListItemText primary="Name" secondary={player.name} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Rank" secondary={`${player.rank} - ${player.rankTitle}`} />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Arrived At" 
                secondary={formatTimestamp(player.arrivedAt)} 
              />
            </ListItem>
          </List>
        )}
      </Paper>

      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6">
            Resources
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress
              size={24}
              variant="determinate"
              value={(1 - resourceTimeRemaining / RESOURCE_INTERVAL) * 100}
              thickness={4}
            />
            <Typography variant="caption" color="text.secondary">
              {formatTime(resourceTimeRemaining)}
            </Typography>
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={(1 - resourceTimeRemaining / RESOURCE_INTERVAL) * 100}
          sx={{ mb: 2, height: 6, borderRadius: 3 }}
        />
        {player && (
          <List dense>
            <ListItem>
              <ListItemText primary="Credits" secondary={resources.credits.toLocaleString()} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Munitions" secondary={resources.munitions.toLocaleString()} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Promethium" secondary={resources.promethium.toLocaleString()} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Raw Materials" secondary={resources.rawMaterials.toLocaleString()} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Imperial Favor" secondary={resources.imperialFavor.toLocaleString()} />
            </ListItem>
          </List>
        )}
      </Paper>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6">
            Reinforcements ({totalUnits.toLocaleString()} total units)
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress
              size={24}
              variant="determinate"
              value={(1 - reinforcementTimeRemaining / REINFORCEMENT_INTERVAL) * 100}
              thickness={4}
            />
            <Typography variant="caption" color="text.secondary">
              {formatTime(reinforcementTimeRemaining)}
            </Typography>
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={(1 - reinforcementTimeRemaining / REINFORCEMENT_INTERVAL) * 100}
          sx={{ mb: 2, height: 6, borderRadius: 3 }}
        />
        <List dense>
          {reinforcementsByType.length === 0 ? (
            <ListItem>
              <ListItemText primary="No reinforcements arrived yet" />
            </ListItem>
          ) : (
            reinforcementsByType.map((reinforcement) => (
              <ListItem key={reinforcement.type}>
                <ListItemIcon>
                  <ReinforcementIcon type={reinforcement.type} />
                </ListItemIcon>
                <ListItemText
                  primary={`${reinforcement.type} - ${reinforcement.totalUnits.toLocaleString()} units`}
                />
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
};

