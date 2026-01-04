import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
  Chip,
} from '@mui/material';
import { Resources } from '../store/gameSlice';
import { ReinforcementIcon } from '../utils/reinforcementIcons';

interface OfflineEarningsDialogProps {
  open: boolean;
  onClose: () => void;
  timeAwayMs: number;
  earnings: Resources;
  reinforcements: number;
  reinforcementsByType: Map<string, { count: number; totalUnits: number }>;
  playerRank: number;
  playerRankTitle: string;
}

/**
 * Format milliseconds into a human-readable duration string
 */
function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    const remainingHours = hours % 24;
    if (remainingHours > 0) {
      return `${days}d ${remainingHours}h`;
    }
    return `${days}d`;
  }

  if (hours > 0) {
    const remainingMinutes = minutes % 60;
    if (remainingMinutes > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${hours}h`;
  }

  if (minutes > 0) {
    const remainingSeconds = seconds % 60;
    if (remainingSeconds > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${minutes}m`;
  }

  return `${seconds}s`;
}

export const OfflineEarningsDialog: React.FC<OfflineEarningsDialogProps> = ({
  open,
  onClose,
  timeAwayMs,
  earnings,
  reinforcements,
  reinforcementsByType,
  playerRank,
  playerRankTitle,
}) => {
  const hasEarnings =
    earnings.credits > 0 ||
    earnings.munitions > 0 ||
    earnings.promethium > 0 ||
    earnings.rawMaterials > 0;

  const duration = formatDuration(timeAwayMs);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="offline-earnings-dialog-title"
    >
      <DialogTitle id="offline-earnings-dialog-title">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h5" component="span">
            Welcome Back, Commander
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Time Away */}
          <Paper elevation={1} sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
            <Typography variant="subtitle2" gutterBottom>
              Time Away
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {duration}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
              Rank {playerRank} - {playerRankTitle}
            </Typography>
          </Paper>

          {/* Resources Earned */}
          {hasEarnings ? (
            <Box>
              <Typography variant="h6" gutterBottom>
                Resources Earned
              </Typography>
              <List dense>
                {earnings.credits > 0 && (
                  <ListItem>
                    <ListItemText
                      primary="Imperial Credits"
                      secondary={earnings.credits.toLocaleString()}
                    />
                    <Chip label={`+${earnings.credits.toLocaleString()}`} color="success" size="small" />
                  </ListItem>
                )}
                {earnings.munitions > 0 && (
                  <ListItem>
                    <ListItemText
                      primary="Munitions"
                      secondary={earnings.munitions.toLocaleString()}
                    />
                    <Chip label={`+${earnings.munitions.toLocaleString()}`} color="success" size="small" />
                  </ListItem>
                )}
                {earnings.promethium > 0 && (
                  <ListItem>
                    <ListItemText
                      primary="Promethium"
                      secondary={earnings.promethium.toLocaleString()}
                    />
                    <Chip label={`+${earnings.promethium.toLocaleString()}`} color="success" size="small" />
                  </ListItem>
                )}
                {earnings.rawMaterials > 0 && (
                  <ListItem>
                    <ListItemText
                      primary="Raw Materials"
                      secondary={earnings.rawMaterials.toLocaleString()}
                    />
                    <Chip label={`+${earnings.rawMaterials.toLocaleString()}`} color="success" size="small" />
                  </ListItem>
                )}
                {earnings.imperialFavor > 0 && (
                  <ListItem>
                    <ListItemText
                      primary="Imperial Favor"
                      secondary={earnings.imperialFavor.toLocaleString()}
                    />
                    <Chip label={`+${earnings.imperialFavor.toLocaleString()}`} color="warning" size="small" />
                  </ListItem>
                )}
              </List>
            </Box>
          ) : (
            <Paper elevation={1} sx={{ p: 2, bgcolor: 'grey.100' }}>
              <Typography variant="body2" color="text.secondary">
                No resources earned (away for less than 1 minute)
              </Typography>
            </Paper>
          )}

          {/* Reinforcements */}
          {reinforcements > 0 && (
            <>
              <Divider />
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6">
                    Reinforcements Arrived
                  </Typography>
                  <Chip 
                    label={`${reinforcements.toLocaleString()} Total`} 
                    color="info" 
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  />
                </Box>
                {reinforcementsByType.size > 0 ? (
                  <List dense>
                    {Array.from(reinforcementsByType.entries())
                      .sort((a, b) => a[0].localeCompare(b[0]))
                      .map(([type, data]) => (
                        <ListItem key={type}>
                          <ListItemIcon>
                            <ReinforcementIcon type={type} />
                          </ListItemIcon>
                          <ListItemText
                            primary={type}
                            secondary={`${data.count} ${data.count === 1 ? 'arrival' : 'arrivals'} • ${data.totalUnits.toLocaleString()} ${data.totalUnits === 1 ? 'unit' : 'units'}`}
                          />
                          <Chip 
                            label={`+${data.totalUnits.toLocaleString()}`} 
                            color="info" 
                            size="small"
                            variant="outlined"
                          />
                        </ListItem>
                      ))}
                  </List>
                ) : (
                  <Paper elevation={1} sx={{ p: 2, bgcolor: 'info.light', color: 'info.contrastText' }}>
                    <Typography variant="h5" fontWeight="bold">
                      {reinforcements.toLocaleString()} {reinforcements === 1 ? 'Reinforcement' : 'Reinforcements'}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                      {reinforcements > 100
                        ? 'Capped at 100 reinforcements to prevent UI overload'
                        : 'All reinforcements have been added to your forces'}
                    </Typography>
                  </Paper>
                )}
                {reinforcements > 100 && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                    Note: Display shows breakdown for first 100 reinforcements. All {reinforcements.toLocaleString()} have been added to your forces.
                  </Typography>
                )}
              </Box>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary" autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

