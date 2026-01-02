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
  LinearProgress,
  Tooltip,
  IconButton
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { resetGame } from '../store/gameSlice';
import { aggregateReinforcementsByType, calculateTotalReinforcements } from '../utils/reinforcementUtils';
import { ReinforcementIcon } from '../utils/reinforcementIcons';
import { clearGameStateFromStorage, clearSession } from '../utils/persistence';
import { useCountdownTimer, formatTime } from '../hooks/useCountdownTimer';
import { useResourceTimer } from '../hooks/useResourceTimer';
import { GameDocumentation } from './GameDocumentation';

const REINFORCEMENT_INTERVAL = 5000; // 5 seconds
const RESOURCE_INTERVAL = 60000; // 60 seconds (1 minute)

export const GameData: React.FC = () => {
  const dispatch = useAppDispatch();
  const { player, planet, reinforcements, resources, gameStarted } = useAppSelector((state) => state.game);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [showDocumentation, setShowDocumentation] = useState(false);
  
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h4">
            The Emperor's Call
          </Typography>
          <Tooltip title="View game documentation">
            <IconButton 
              size="small" 
              onClick={() => setShowDocumentation(!showDocumentation)}
              color="primary"
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Button 
          variant="outlined" 
          color="error" 
          onClick={handleResetClick}
          sx={{ ml: 2 }}
        >
          Reset Game
        </Button>
      </Box>

      {showDocumentation && (
        <Box sx={{ mb: 3 }}>
          <GameDocumentation />
        </Box>
      )}

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography variant="h6">
            Planet Information
          </Typography>
          <Tooltip title="The planet where you've been deployed. Each planet has unique challenges and opportunities.">
            <InfoIcon fontSize="small" color="action" />
          </Tooltip>
        </Box>
        {planet && (
          <List dense>
            <ListItem>
              <Tooltip title="The name of the planet where your mission takes place">
                <ListItemText primary="Planet Name" secondary={planet.name} />
              </Tooltip>
            </ListItem>
            <ListItem>
              <Tooltip title="When you first arrived on this planet">
                <ListItemText 
                  primary="Discovered At" 
                  secondary={formatTimestamp(planet.discoveredAt)} 
                />
              </Tooltip>
            </ListItem>
          </List>
        )}
      </Paper>

      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography variant="h6">
            Player Information
          </Typography>
          <Tooltip title="Your commander profile. Rank determines resource generation rate.">
            <InfoIcon fontSize="small" color="action" />
          </Tooltip>
        </Box>
        {player && (
          <List dense>
            <ListItem>
              <Tooltip title="Your Imperial Commander designation">
                <ListItemText primary="Name" secondary={player.name} />
              </Tooltip>
            </ListItem>
            <ListItem>
              <Tooltip title={`Rank ${player.rank}: ${player.rankTitle}. Higher ranks generate resources faster. Click the info icon above to see all ranks.`}>
                <ListItemText primary="Rank" secondary={`${player.rank} - ${player.rankTitle}`} />
              </Tooltip>
            </ListItem>
            <ListItem>
              <Tooltip title="When you began your mission on this planet">
                <ListItemText 
                  primary="Arrived At" 
                  secondary={formatTimestamp(player.arrivedAt)} 
                />
              </Tooltip>
            </ListItem>
          </List>
        )}
      </Paper>

      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6">
              Resources
            </Typography>
            <Tooltip title="Resources generate automatically every 60 seconds. Amount depends on your rank. Click the info icon above to learn more.">
              <InfoIcon fontSize="small" color="action" />
            </Tooltip>
          </Box>
          <Tooltip title="Time until next resource generation">
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
          </Tooltip>
        </Box>
        <Tooltip title="Progress until next resource generation">
          <LinearProgress
            variant="determinate"
            value={(1 - resourceTimeRemaining / RESOURCE_INTERVAL) * 100}
            sx={{ mb: 2, height: 6, borderRadius: 3 }}
          />
        </Tooltip>
        {player && (
          <List dense>
            <ListItem>
              <Tooltip title="Primary currency for upgrades, equipment, and hiring forces">
                <ListItemText primary="Credits" secondary={resources.credits.toLocaleString()} />
              </Tooltip>
            </ListItem>
            <ListItem>
              <Tooltip title="Ammunition and weapons required for combat operations">
                <ListItemText primary="Munitions" secondary={resources.munitions.toLocaleString()} />
              </Tooltip>
            </ListItem>
            <ListItem>
              <Tooltip title="Fuel for vehicles, generators, and base defenses">
                <ListItemText primary="Promethium" secondary={resources.promethium.toLocaleString()} />
              </Tooltip>
            </ListItem>
            <ListItem>
              <Tooltip title="Metal, stone, and materials for construction and expansion">
                <ListItemText primary="Raw Materials" secondary={resources.rawMaterials.toLocaleString()} />
              </Tooltip>
            </ListItem>
            <ListItem>
              <Tooltip title="Special currency representing the Emperor's blessing. Earned through exceptional service.">
                <ListItemText primary="Imperial Favor" secondary={resources.imperialFavor.toLocaleString()} />
              </Tooltip>
            </ListItem>
          </List>
        )}
      </Paper>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6">
              Reinforcements ({totalUnits.toLocaleString()} total units)
            </Typography>
            <Tooltip title="Reinforcements arrive every 5 seconds. Each includes a random type and 1-10 units. Click the info icon above to see all types.">
              <InfoIcon fontSize="small" color="action" />
            </Tooltip>
          </Box>
          <Tooltip title="Time until next reinforcement arrives">
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
          </Tooltip>
        </Box>
        <Tooltip title="Progress until next reinforcement arrival">
          <LinearProgress
            variant="determinate"
            value={(1 - reinforcementTimeRemaining / REINFORCEMENT_INTERVAL) * 100}
            sx={{ mb: 2, height: 6, borderRadius: 3 }}
          />
        </Tooltip>
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

