import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  Divider
} from '@mui/material';
import {
  Timer as TimerIcon,
  Power as PowerIcon,
  TrendingUp as ResourceIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useGameContext } from '../context/GameContext';

const formatTime = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''}, ${hours % 24} hour${hours % 24 !== 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}, ${minutes % 60} minute${minutes % 60 !== 1 ? 's' : ''}`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}, ${seconds % 60} second${seconds % 60 !== 1 ? 's' : ''}`;
  return `${seconds} second${seconds !== 1 ? 's' : ''}`;
};

const resourceNames = {
  plasteel: 'Plasteel',
  adamantium: 'Adamantium',
  promethium: 'Promethium',
  ceramite: 'Ceramite',
  gold: 'Gold'
};

const resourceColors = {
  plasteel: '#8B4513',
  adamantium: '#C0C0C0',
  promethium: '#FF4500',
  ceramite: '#FFD700',
  gold: '#FFD700'
};

function OfflineSummaryModal() {
  const { state, dispatch, actions } = useGameContext();
  
  if (!state.offlineSummary) {
    return null;
  }
  
  const handleClose = () => {
    dispatch({ type: actions.SHOW_OFFLINE_SUMMARY, payload: null });
  };
  
  const { timeOffline, resourcesGained, minesActive } = state.offlineSummary;
  const hasResourcesGained = Object.keys(resourcesGained).length > 0;
  
  return (
    <Dialog 
      open={true} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'rgba(26, 26, 46, 0.98)',
          border: '3px solid #4a90e2',
          borderRadius: 3,
          backdropFilter: 'blur(10px)'
        }
      }}
    >
      <DialogTitle sx={{ 
        textAlign: 'center', 
        color: '#4a90e2',
        borderBottom: '2px solid #4a90e2',
        pb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
          <PowerIcon sx={{ fontSize: 40, color: '#4a90e2', mr: 2 }} />
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
            Welcome Back, Commander!
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {/* Time Offline */}
          <Grid item xs={12}>
            <Card sx={{ 
              bgcolor: 'rgba(74, 144, 226, 0.2)', 
              border: '1px solid #4a90e2',
              borderRadius: 2
            }}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <TimerIcon sx={{ fontSize: 30, color: '#4a90e2', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    You were away for <strong>{formatTime(timeOffline)}</strong>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Mines Active */}
          {minesActive > 0 && (
            <Grid item xs={12}>
              <Card sx={{ 
                bgcolor: 'rgba(255, 165, 0, 0.2)', 
                border: '1px solid #ffa500',
                borderRadius: 2
              }}>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    <PowerIcon sx={{ fontSize: 30, color: '#ffa500', mr: 1 }} />
                    <Typography variant="h6" sx={{ color: '#ffa500' }}>
                      <strong>{minesActive} mine{minesActive !== 1 ? 's' : ''}</strong> were active during your absence
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
          
          {/* Resources Gained */}
          {hasResourcesGained && (
            <Grid item xs={12}>
              <Card sx={{ 
                bgcolor: 'rgba(15, 52, 96, 0.6)', 
                border: '1px solid #4a90e2',
                borderRadius: 2
              }}>
                <CardContent>
                  <Typography variant="h6" sx={{ 
                    textAlign: 'center', 
                    mb: 3, 
                    color: '#00ff00',
                    fontWeight: 'bold'
                  }}>
                    <ResourceIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Resources Generated
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {Object.entries(resourcesGained).map(([resourceType, amount]) => (
                      <Grid item xs={12} sm={6} md={4} key={resourceType}>
                        <Card sx={{ 
                          bgcolor: 'rgba(26, 26, 46, 0.5)',
                          border: '1px solid #4a90e2',
                          borderRadius: 2
                        }}>
                          <CardContent sx={{ textAlign: 'center', py: 2 }}>
                            <Avatar 
                              sx={{ 
                                bgcolor: resourceColors[resourceType], 
                                color: 'white',
                                width: 40,
                                height: 40,
                                mx: 'auto',
                                mb: 1
                              }}
                            >
                              {resourceType.charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography variant="h6" sx={{ color: '#4a90e2', fontWeight: 'bold' }}>
                              {resourceNames[resourceType]}
                            </Typography>
                            <Typography variant="h5" sx={{ color: '#00ff00', fontWeight: 'bold' }}>
                              +{amount.toFixed(1)}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleClose}
          startIcon={<CloseIcon />}
          sx={{ 
            px: 4, 
            py: 1.5,
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: '1.1rem'
          }}
        >
          Continue Mining Operations
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default OfflineSummaryModal;
