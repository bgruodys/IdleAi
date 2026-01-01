import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import {
  Diamond as DiamondIcon,
  LocalShipping as ShippingIcon,
  LocalFireDepartment as FireIcon,
  Construction as ConstructionIcon,
  MonetizationOn as GoldIcon,
  Warehouse as WarehouseIcon,
  Storage as StorageIcon
} from '@mui/icons-material';
import { useGameContext } from '../context/GameContext';

function WarehousePanel() {
  const { state } = useGameContext();
  
  const resourceConfig = {
    plasteel: { 
      color: '#8B4513', 
      name: 'Plasteel',
      icon: <ConstructionIcon />,
      bgColor: '#3e2723',
      description: 'Basic construction material'
    },
    adamantium: { 
      color: '#C0C0C0', 
      name: 'Adamantium',
      icon: <DiamondIcon />,
      bgColor: '#424242',
      description: 'Ultra-durable metal alloy'
    },
    promethium: { 
      color: '#FF4500', 
      name: 'Promethium',
      icon: <FireIcon />,
      bgColor: '#bf360c',
      description: 'High-energy fuel source'
    },
    ceramite: { 
      color: '#FFD700', 
      name: 'Ceramite',
      icon: <ShippingIcon />,
      bgColor: '#f57f17',
      description: 'Advanced ceramic compound'
    },
    gold: { 
      color: '#FFD700', 
      name: 'Gold',
      icon: <GoldIcon />,
      bgColor: '#f9a825',
      description: 'Precious conductive metal'
    }
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <WarehouseIcon sx={{ fontSize: 30, color: '#4a90e2', mr: 1 }} />
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              textAlign: 'center', 
              color: '#4a90e2',
              fontWeight: 'bold'
            }}
          >
            Imperial Warehouse
          </Typography>
        </Box>



        <Divider sx={{ my: 2, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Individual Resource Storage */}
        <Typography 
          variant="h6" 
          sx={{ 
            textAlign: 'center', 
            mb: 2, 
            color: '#4a90e2',
            fontWeight: 'bold'
          }}
        >
          Resource Storage
        </Typography>
        
        <Grid container spacing={2}>
          {Object.entries(state.resources).map(([resourceType, amount]) => {
            const config = resourceConfig[resourceType];
            
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
                  <CardContent sx={{ py: 2 }}>
                    {/* Resource Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: config.bgColor, 
                          color: 'white',
                          mr: 1.5,
                          width: 35,
                          height: 35
                        }}
                      >
                        {config.icon}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" sx={{ color: '#4a90e2', fontWeight: 'bold' }}>
                          {config.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {config.description}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Storage Info */}
                    <Box sx={{ textAlign: 'center', mb: 1.5 }}>
                      <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                        {amount.toFixed(1)}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        units stored
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

export default WarehousePanel;
