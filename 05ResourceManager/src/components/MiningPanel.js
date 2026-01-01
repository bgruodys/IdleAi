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
  Divider
} from '@mui/material';
import {
  Build as BuildIcon,
  Diamond as DiamondIcon,
  LocalFireDepartment as FireIcon,
  LocalShipping as ShippingIcon,
  MonetizationOn as GoldIcon,
  Power as PowerIcon,
  TrendingUp as UpgradeIcon
} from '@mui/icons-material';
import { useGameContext } from '../context/GameContext';

function MiningPanel() {
  const { state, dispatch, actions } = useGameContext();
  
  const mineConfig = {
    plasteelMine: { 
      name: 'Plasteel Mine', 
      resource: 'plasteel',
      color: '#8B4513',
      bgColor: '#3e2723',
      icon: <BuildIcon />,
      baseCost: { type: 'plasteel', amount: 10 }
    },
    adamantiumMine: { 
      name: 'Adamantium Mine', 
      resource: 'adamantium',
      color: '#C0C0C0',
      bgColor: '#424242',
      icon: <DiamondIcon />,
      baseCost: { type: 'plasteel', amount: 50 }
    },
    promethiumMine: { 
      name: 'Promethium Mine', 
      resource: 'promethium',
      color: '#FF4500',
      bgColor: '#bf360c',
      icon: <FireIcon />,
      baseCost: { type: 'plasteel', amount: 100 }
    },
    ceramiteMine: { 
      name: 'Ceramite Mine', 
      resource: 'ceramite',
      color: '#FFD700',
      bgColor: '#f57f17',
      icon: <ShippingIcon />,
      baseCost: { type: 'plasteel', amount: 200 }
    },
    goldMine: { 
      name: 'Gold Mine', 
      resource: 'gold',
      color: '#FFD700',
      bgColor: '#f9a825',
      icon: <GoldIcon />,
      baseCost: { type: 'plasteel', amount: 500 }
    }
  };

  const calculateUpgradeCost = (mineType) => {
    const mine = state.mining[mineType];
    const config = mineConfig[mineType];
    const baseCost = config.baseCost.amount;
    const levelMultiplier = Math.pow(1.5, mine.level - 1);
    return Math.floor(baseCost * levelMultiplier);
  };

  const canAffordUpgrade = (mineType) => {
    const cost = calculateUpgradeCost(mineType);
    const resourceType = mineConfig[mineType].baseCost.type;
    return state.resources[resourceType] >= cost;
  };

  const handleUpgrade = (mineType) => {
    const cost = calculateUpgradeCost(mineType);
    const resourceType = mineConfig[mineType].baseCost.type;
    
    dispatch({
      type: actions.UPGRADE_MINE,
      payload: {
        mineType,
        cost: { type: resourceType, amount: cost }
      }
    });
  };

  const handleToggleMine = (mineName) => {
    dispatch({
      type: actions.TOGGLE_MINE,
      payload: { mineName }
    });
  };

  const calculateProductionRate = (mine) => {
    const baseProduction = 1;
    return (baseProduction * mine.level * mine.efficiency * state.upgrades.miningEfficiency) / 10;
  };

  return (
    <Card sx={{ 
      bgcolor: 'rgba(26, 26, 46, 0.6)', 
      backdropFilter: 'blur(10px)',
      border: '2px solid #4a90e2',
      borderRadius: 2
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
          Mining Operations
        </Typography>
        
        <Grid container spacing={3}>
          {Object.entries(state.mining).map(([mineName, mine]) => {
            const config = mineConfig[mineName];
            const upgradeCost = calculateUpgradeCost(mineName);
            const canUpgrade = canAffordUpgrade(mineName);
            const productionRate = calculateProductionRate(mine);
            
            return (
              <Grid item xs={12} md={6} key={mineName}>
                <Card sx={{ 
                  bgcolor: 'rgba(15, 52, 96, 0.4)',
                  border: `2px solid ${mine.active ? '#00ff00' : '#4a90e2'}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 20px rgba(74, 144, 226, 0.4)'
                  }
                }}>
                  <CardContent>
                    {/* Mine Header */}
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
                          label={mine.active ? 'ACTIVE' : 'INACTIVE'}
                          color={mine.active ? 'success' : 'error'}
                          size="small"
                          icon={mine.active ? <PowerIcon /> : <PowerIcon />}
                        />
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

                    {/* Mine Stats */}
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'rgba(26, 26, 46, 0.5)', borderRadius: 1 }}>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                            {mine.level}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Level
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'rgba(26, 26, 46, 0.5)', borderRadius: 1 }}>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                            {mine.efficiency.toFixed(1)}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Efficiency
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'rgba(26, 26, 46, 0.5)', borderRadius: 1 }}>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                            {productionRate.toFixed(2)}/s
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Production
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'rgba(26, 26, 46, 0.5)', borderRadius: 1 }}>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                            {state.resources[config.resource].toFixed(1)}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Resource
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Button
                        variant="contained"
                        color={mine.active ? 'error' : 'success'}
                        startIcon={mine.active ? <PowerIcon /> : <PowerIcon />}
                        onClick={() => handleToggleMine(mineName)}
                        fullWidth
                        sx={{ 
                          fontWeight: 'bold',
                          textTransform: 'none'
                        }}
                      >
                        {mine.active ? 'Deactivate' : 'Activate'}
                      </Button>
                      
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<UpgradeIcon />}
                        onClick={() => handleUpgrade(mineName)}
                        disabled={!canUpgrade}
                        fullWidth
                        sx={{ 
                          fontWeight: 'bold',
                          textTransform: 'none'
                        }}
                      >
                        Upgrade
                      </Button>
                    </Box>

                    {/* Upgrade Cost */}
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Upgrade Cost: {upgradeCost} {config.baseCost.type}
                      </Typography>
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

export default MiningPanel;
