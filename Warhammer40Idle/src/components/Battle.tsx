'use client';

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Refresh,
  Security,
  BugReport,
} from '@mui/icons-material';
import { BattleField, BattleUnit } from '@/types/battle';
import { BATTLE_CONSTANTS } from '@/lib/battleLogic';

interface BattleProps {
  battleField: BattleField;
  battleStats: {
    totalBattles: number;
    battlesWon: number;
    soldiersLost: number;
    orcsKilled: number;
  };
}

export function Battle({ battleField, battleStats }: BattleProps) {
  const cellSize = 20; // pixels per cell
  const fieldWidth = BATTLE_CONSTANTS.FIELD_WIDTH * cellSize;
  const fieldHeight = BATTLE_CONSTANTS.FIELD_HEIGHT * cellSize;

  // Get unit at specific position
  const getUnitAt = (x: number, y: number): BattleUnit | null => {
    return battleField.units.find(unit => unit.x === x && unit.y === y && unit.isAlive) || null;
  };

  // Get unit color based on type and health
  const getUnitColor = (unit: BattleUnit): string => {
    const healthPercentage = unit.health / unit.maxHealth;
    
    if (unit.type === 'soldier') {
      if (healthPercentage > 0.7) return '#4CAF50'; // Green
      if (healthPercentage > 0.3) return '#FF9800'; // Orange
      return '#F44336'; // Red
    } else {
      if (healthPercentage > 0.7) return '#8B4513'; // Brown
      if (healthPercentage > 0.3) return '#A0522D'; // Saddle Brown
      return '#654321'; // Dark Brown
    }
  };

  // Render battlefield cell
  const renderCell = (x: number, y: number) => {
    const unit = getUnitAt(x, y);
    const isSpawnPoint = (x === BATTLE_CONSTANTS.SOLDIER_SPAWN_X) || (x === BATTLE_CONSTANTS.ORC_SPAWN_X);
    
    return (
      <Box
        key={`${x}-${y}`}
        sx={{
          width: cellSize,
          height: cellSize,
          border: '1px solid #333',
          backgroundColor: isSpawnPoint ? '#2a2a2a' : '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {unit && (
          <Tooltip
            title={`${unit.type.toUpperCase()}
HP: ${unit.health}/${unit.maxHealth}
ATK: ${unit.attack}
DEF: ${unit.defense}
Pos: (${unit.x}, ${unit.y})`}
          >
            <Box
              sx={{
                width: cellSize - 2,
                height: cellSize - 2,
                backgroundColor: getUnitColor(unit),
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8px',
                color: 'white',
                fontWeight: 'bold',
                textShadow: '1px 1px 1px rgba(0,0,0,0.8)',
              }}
            >
              {unit.type === 'soldier' ? 'S' : 'O'}
            </Box>
          </Tooltip>
        )}
      </Box>
    );
  };

  // Count units
  const aliveSoldiers = battleField.units.filter(u => u.type === 'soldier' && u.isAlive).length;
  const aliveOrcs = battleField.units.filter(u => u.type === 'orc' && u.isAlive).length;

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2" color="primary">
          Battlefield
        </Typography>
        
        <Box display="flex" gap={1}>
          <Chip
            label="Continuous Battle"
            color="success"
            variant="outlined"
            size="small"
          />
        </Box>
      </Box>

      {/* Battle Stats */}
      <Box display="flex" gap={2} mb={2} flexWrap="wrap">
        <Chip
          icon={<Security />}
          label={`${aliveSoldiers} Soldiers Alive`}
          color="primary"
          variant="outlined"
        />
        <Chip
          icon={<BugReport />}
          label={`${aliveOrcs} Orcs Alive`}
          color="error"
          variant="outlined"
        />
        <Chip
          label={`Turn: ${battleField.turn}`}
          color="secondary"
          variant="outlined"
        />
        <Chip
          label={`Battles Won: ${battleStats.battlesWon}/${battleStats.totalBattles}`}
          color="success"
          variant="outlined"
        />
      </Box>

      {/* Battlefield */}
      <Box
        sx={{
          width: fieldWidth,
          height: fieldHeight,
          border: '2px solid #444',
          backgroundColor: '#0a0a0a',
          overflow: 'hidden',
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${BATTLE_CONSTANTS.FIELD_WIDTH}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${BATTLE_CONSTANTS.FIELD_HEIGHT}, ${cellSize}px)`,
          }}
        >
          {Array.from({ length: BATTLE_CONSTANTS.FIELD_HEIGHT }, (_, y) =>
            Array.from({ length: BATTLE_CONSTANTS.FIELD_WIDTH }, (_, x) =>
              renderCell(x, y)
            )
          ).flat()}
        </Box>
      </Box>

      {/* Legend */}
      <Box mt={2} display="flex" gap={2} flexWrap="wrap" justifyContent="center">
        <Box display="flex" alignItems="center" gap={1}>
          <Box sx={{ width: 16, height: 16, backgroundColor: '#4CAF50', borderRadius: '2px' }} />
          <Typography variant="body2">Soldier (Healthy)</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box sx={{ width: 16, height: 16, backgroundColor: '#FF9800', borderRadius: '2px' }} />
          <Typography variant="body2">Soldier (Wounded)</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box sx={{ width: 16, height: 16, backgroundColor: '#8B4513', borderRadius: '2px' }} />
          <Typography variant="body2">Orc (Healthy)</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box sx={{ width: 16, height: 16, backgroundColor: '#A0522D', borderRadius: '2px' }} />
          <Typography variant="body2">Orc (Wounded)</Typography>
        </Box>
      </Box>

      {/* Battle Statistics */}
      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          Battle Statistics
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="text.secondary">
              Total Battles
            </Typography>
            <Typography variant="h6">
              {battleStats.totalBattles}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="text.secondary">
              Battles Won
            </Typography>
            <Typography variant="h6" color="success.main">
              {battleStats.battlesWon}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="text.secondary">
              Soldiers Lost
            </Typography>
            <Typography variant="h6" color="error.main">
              {battleStats.soldiersLost}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="text.secondary">
              Orcs Killed
            </Typography>
            <Typography variant="h6" color="warning.main">
              {battleStats.orcsKilled}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
