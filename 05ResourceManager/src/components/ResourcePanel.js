import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
  Chip
} from '@mui/material';
import {
  Diamond as DiamondIcon,
  LocalShipping as ShippingIcon,
  LocalFireDepartment as FireIcon,
  Construction as ConstructionIcon,
  MonetizationOn as GoldIcon
} from '@mui/icons-material';
import { useGameContext } from '../context/GameContext';

function ResourcePanel() {
  const { state } = useGameContext();
  
  const resourceConfig = {
    plasteel: { 
      color: '#8B4513', 
      name: 'Plasteel',
      icon: <ConstructionIcon />,
      bgColor: '#3e2723'
    },
    adamantium: { 
      color: '#C0C0C0', 
      name: 'Adamantium',
      icon: <DiamondIcon />,
      bgColor: '#424242'
    },
    promethium: { 
      color: '#FF4500', 
      name: 'Promethium',
      icon: <FireIcon />,
      bgColor: '#bf360c'
    },
    ceramite: { 
      color: '#FFD700', 
      name: 'Ceramite',
      icon: <ShippingIcon />,
      bgColor: '#f57f17'
    },
    gold: { 
      color: '#FFD700', 
      name: 'Gold',
      icon: <GoldIcon />,
      bgColor: '#f9a825'
    }
  };

  const calculateProductionRate = (resourceType) => {
    const mineName = `${resourceType}Mine`;
    const mine = state.mining[mineName];
    
    if (!mine.active) return 0;
    
    const baseProduction = 1;
    const totalProduction = baseProduction * mine.level * mine.efficiency * state.upgrades.miningEfficiency;
    return totalProduction / 10; // Per second
  };



  return (
    <Card sx={{ 
      bgcolor: 'rgba(26, 26, 46, 0.15)', 
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(74, 144, 226, 0.3)',
      borderRadius: 2,
      height: 'fit-content',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
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
          Imperial Resources
        </Typography>
        
        <Grid container spacing={2}>
          {Object.entries(state.resources).map(([resourceType, amount]) => {
            const config = resourceConfig[resourceType];
            const productionRate = calculateProductionRate(resourceType);
            
            return (
              <Grid item xs={12} key={resourceType}>
                <Card sx={{ 
                  bgcolor: 'rgba(15, 52, 96, 0.4)',
                  border: '1px solid #4a90e2',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(74, 144, 226, 0.4)'
                  }
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: config.bgColor, 
                          color: 'white',
                          mr: 2,
                          width: 40,
                          height: 40
                        }}
                      >
                        {config.icon}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ color: '#4a90e2', fontWeight: 'bold' }}>
                          {config.name}
                        </Typography>
                        <Typography variant="h4" sx={{ color: 'white', textAlign: 'center' }}>
                          {amount.toFixed(1)}
                        </Typography>
                      </Box>
                    </Box>
                    
                                                                     <Box sx={{ textAlign: 'center', mb: 2 }}>
                              <Chip 
                                label={`+${productionRate.toFixed(2)}/s`}
                                color="success"
                                size="small"
                              />
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

export default ResourcePanel;
