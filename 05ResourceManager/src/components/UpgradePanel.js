import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  Avatar,
  LinearProgress,
  Divider,
  Tooltip
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Storage as StorageIcon,
  Timer as TimerIcon,
  TrendingUp as UpgradeIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useGameContext } from '../context/GameContext';

function UpgradePanel() {
  const { state, dispatch, actions } = useGameContext();
  
  const upgradeConfig = {
    miningEfficiency: {
      name: 'Mining Efficiency',
      description: 'Increases the production rate of all active mines by 20% per level.',
      costType: 'plasteel',
      baseCost: 25,
      increase: 0.2,
      currentValue: state.upgrades.miningEfficiency,
      icon: <SpeedIcon />,
      bgColor: '#1976d2'
    },
    storageCapacity: {
      name: 'Storage Capacity',
      description: 'Increases the maximum storage capacity for all resources by 500 per level.',
      costType: 'plasteel',
      baseCost: 50,
      increase: 500,
      currentValue: state.upgrades.storageCapacity,
      icon: <StorageIcon />,
      bgColor: '#388e3c'
    },
    offlineMultiplier: {
      name: 'Offline Progress',
      description: 'Increases offline resource generation by 25% per level.',
      costType: 'gold',
      baseCost: 100,
      increase: 0.25,
      currentValue: state.upgrades.offlineMultiplier,
      icon: <TimerIcon />,
      bgColor: '#f57c00'
    }
  };

  const calculateUpgradeCost = (upgradeType) => {
    const config = upgradeConfig[upgradeType];
    const currentLevel = Math.floor((state.upgrades[upgradeType] - 1) / config.increase) + 1;
    const baseCost = config.baseCost;
    const levelMultiplier = Math.pow(1.8, currentLevel - 1);
    return Math.floor(baseCost * levelMultiplier);
  };

  const canAffordUpgrade = (upgradeType) => {
    const cost = calculateUpgradeCost(upgradeType);
    const costType = upgradeConfig[upgradeType].costType;
    return state.resources[costType] >= cost;
  };

  const handleUpgrade = (upgradeType) => {
    const cost = calculateUpgradeCost(upgradeType);
    const costType = upgradeConfig[upgradeType].costType;
    const increase = upgradeConfig[upgradeType].increase;
    
    dispatch({
      type: actions.PURCHASE_UPGRADE,
      payload: {
        upgradeType,
        cost: { type: costType, amount: cost },
        increase
      }
    });
  };

  const getCurrentLevel = (upgradeType) => {
    const config = upgradeConfig[upgradeType];
    if (upgradeType === 'storageCapacity') {
      return Math.floor((state.upgrades[upgradeType] - 1000) / config.increase) + 1;
    }
    return Math.floor((state.upgrades[upgradeType] - 1) / config.increase) + 1;
  };

  const getNextValue = (upgradeType) => {
    const config = upgradeConfig[upgradeType];
    const currentValue = state.upgrades[upgradeType];
    return currentValue + config.increase;
  };

  return (
    <Card sx={{ 
      bgcolor: 'rgba(26, 26, 46, 0.6)', 
      backdropFilter: 'blur(10px)',
      border: '2px solid #4a90e2',
      borderRadius: 2,
      height: 'fit-content'
    }}>
      <CardContent>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            textAlign: 'center', 
            mb: 3, 
            color: '#4a90e2',
            fontWeight: 'bold',
            borderBottom: '2px solid #4a90e2',
            pb: 1
          }}
        >
          Imperial Upgrades
        </Typography>
        
        <Grid container spacing={3}>
          {Object.entries(upgradeConfig).map(([upgradeType, config]) => {
            const upgradeCost = calculateUpgradeCost(upgradeType);
            const canUpgrade = canAffordUpgrade(upgradeType);
            const currentLevel = getCurrentLevel(upgradeType);
            const nextValue = getNextValue(upgradeType);
            
            return (
              <Grid item xs={12} key={upgradeType}>
                <Card sx={{ 
                  bgcolor: 'rgba(15, 52, 96, 0.4)',
                  border: '1px solid #4a90e2',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(74, 144, 226, 0.3)'
                  }
                }}>
                  <CardContent>
                    {/* Upgrade Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: config.bgColor, 
                          color: 'white',
                          mr: 2,
                          width: 50,
                          height: 50
                        }}
                      >
                        {config.icon}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ color: '#4a90e2', fontWeight: 'bold' }}>
                          {config.name}
                        </Typography>
                        <Chip 
                          label={`Lv.${currentLevel}`}
                          color="primary"
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </Box>

                    {/* Description */}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.8)', 
                        mb: 3, 
                        lineHeight: 1.4,
                        fontStyle: 'italic'
                      }}
                    >
                      {config.description}
                    </Typography>

                    <Divider sx={{ my: 2, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

                    {/* Upgrade Stats */}
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'rgba(26, 26, 46, 0.5)', borderRadius: 1 }}>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                            {upgradeType === 'storageCapacity' 
                              ? config.currentValue.toFixed(0)
                              : config.currentValue.toFixed(2)
                            }
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Current
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'rgba(26, 26, 46, 0.5)', borderRadius: 1 }}>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                            {upgradeType === 'storageCapacity' 
                              ? nextValue.toFixed(0)
                              : nextValue.toFixed(2)
                            }
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Next Level
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Upgrade Button */}
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<UpgradeIcon />}
                      onClick={() => handleUpgrade(upgradeType)}
                      disabled={!canUpgrade}
                      fullWidth
                      sx={{ 
                        mb: 2,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        py: 1.5
                      }}
                    >
                      Upgrade
                    </Button>

                    {/* Cost Display */}
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Cost: {upgradeCost} {config.costType}
                      </Typography>
                    </Box>

                    {/* Info Icon */}
                    <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                      <Tooltip title={`Current Level: ${currentLevel}`}>
                        <InfoIcon sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 20 }} />
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default UpgradePanel;
