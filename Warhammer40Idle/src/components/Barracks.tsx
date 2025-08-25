'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Upgrade,
  Security,
} from '@mui/icons-material';
import { Barracks as BarracksType } from '@/types/game';
import { getBarracksUpgradeCost } from '@/lib/gameLogic';

interface BarracksProps {
  barracks: BarracksType;
  onToggleTraining: (barracksId: string) => void;
  onUpgrade: (barracksId: string) => void;
  canAffordUpgrade: boolean;
}

export function Barracks({ barracks, onToggleTraining, onUpgrade, canAffordUpgrade }: BarracksProps) {
  const capacityPercentage = (barracks.soldiers.length / barracks.maxCapacity) * 100;
  const upgradeCost = getBarracksUpgradeCost(barracks);

  return (
    <Card sx={{ minWidth: 300, m: 1 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="div">
            Barracks #{barracks.id.split('_')[1]}
          </Typography>
          <Chip 
            label={`Level ${barracks.level}`} 
            color="primary" 
            size="small" 
          />
        </Box>

        <Box mb={2}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Soldiers: {barracks.soldiers.length}/{barracks.maxCapacity}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={capacityPercentage} 
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        <Box mb={2}>
          <Typography variant="body2" color="text.secondary">
            Training Speed: {barracks.trainingSpeed.toFixed(1)}/s
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Next Level Cost: {upgradeCost} Gold
          </Typography>
        </Box>

        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            color={barracks.isTraining ? "error" : "success"}
            startIcon={barracks.isTraining ? <Pause /> : <PlayArrow />}
            onClick={() => onToggleTraining(barracks.id)}
            fullWidth
          >
            {barracks.isTraining ? 'Pause' : 'Start'} Training
          </Button>
          
          <Tooltip title={!canAffordUpgrade ? "Not enough gold" : "Upgrade barracks"}>
            <span>
              <IconButton
                color="primary"
                onClick={() => onUpgrade(barracks.id)}
                disabled={!canAffordUpgrade}
                sx={{ border: 1, borderColor: 'primary.main' }}
              >
                <Upgrade />
              </IconButton>
            </span>
          </Tooltip>
        </Box>

        {barracks.soldiers.length > 0 && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Recent Soldiers:
            </Typography>
            <Box display="flex" gap={0.5} flexWrap="wrap">
              {barracks.soldiers.slice(-5).map((soldier, index) => (
                <Tooltip
                  key={soldier.id}
                  title={`ATK: ${soldier.attack} | DEF: ${soldier.defense} | HP: ${soldier.health}`}
                >
                  <Chip
                    icon={<Security />}
                    label={`Lv.${soldier.level}`}
                    size="small"
                    variant="outlined"
                    color="secondary"
                  />
                </Tooltip>
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
