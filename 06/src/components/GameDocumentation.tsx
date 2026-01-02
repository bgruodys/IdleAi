import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RANK_DATA_EXPORT, REINFORCEMENT_TYPES_EXPORT, getRankMultiplier } from '../store/gameSlice';
import { ReinforcementIcon } from '../utils/reinforcementIcons';

// Rank descriptions are now in RANK_DATA_EXPORT

const REINFORCEMENT_DESCRIPTIONS: Record<string, string> = {
  'Imperial Guardsmen': 'Standard infantry units, the backbone of the Imperial Guard',
  'Heavy Weapons Team': 'Specialized units equipped with heavy weapons for sustained firepower',
  'Scout Squad': 'Elite reconnaissance units for forward observation and intelligence gathering',
  'Veteran Squad': 'Battle-hardened veterans with superior combat experience',
  'Armored Support': 'Heavy armored vehicles providing mobile firepower and protection',
};

export const GameDocumentation: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>('ranks');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Game Documentation
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Learn about ranks, reinforcements, and game mechanics
      </Typography>

      {/* Ranks Section */}
      <Accordion expanded={expanded === 'ranks'} onChange={handleChange('ranks')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Rank System</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Your rank is determined by experience points. Higher ranks generate resources faster. Gain experience through combat victories.
          </Typography>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Rank</strong></TableCell>
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Required XP</strong></TableCell>
                  <TableCell><strong>Multiplier</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {RANK_DATA_EXPORT.map((rankInfo) => {
                  const multiplier = getRankMultiplier(rankInfo.rank);
                  return (
                    <TableRow key={rankInfo.rank}>
                      <TableCell>{rankInfo.rank}</TableCell>
                      <TableCell>
                        <Chip label={rankInfo.title} size="small" color="primary" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={rankInfo.requiredExperience.toLocaleString()} 
                          size="small" 
                          color="info" 
                        />
                      </TableCell>
                      <TableCell>
                        <Chip label={`${multiplier.toFixed(2)}x`} size="small" color="secondary" />
                      </TableCell>
                      <TableCell>{rankInfo.description}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/* Reinforcements Section */}
      <Accordion expanded={expanded === 'reinforcements'} onChange={handleChange('reinforcements')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Reinforcement Types</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Reinforcements arrive every 5 seconds. Each type has unique capabilities and strengths.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {REINFORCEMENT_TYPES_EXPORT.map((type) => (
              <Paper key={type} elevation={1} sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <ReinforcementIcon type={type} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {REINFORCEMENT_DESCRIPTIONS[type] || 'No description available'}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Resources Section */}
      <Accordion expanded={expanded === 'resources'} onChange={handleChange('resources')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Resources</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Imperial Credits
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Primary currency used for base upgrades, purchasing equipment, and hiring additional forces.
              </Typography>
            </Paper>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Munitions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ammunition and weapons required for combat operations. Can be manufactured or scavenged.
              </Typography>
            </Paper>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Promethium
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fuel for vehicles and generators. Powers base defenses and essential for long-range operations.
              </Typography>
            </Paper>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Raw Materials
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Metal, stone, and other resources used for construction and base expansion.
              </Typography>
            </Paper>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Imperial Favor
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Special currency representing the Emperor's blessing. Earned through exceptional service and used for rare upgrades.
              </Typography>
            </Paper>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
            Resources generate automatically every 60 seconds based on your current rank multiplier.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Game Mechanics Section */}
      <Accordion expanded={expanded === 'mechanics'} onChange={handleChange('mechanics')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Game Mechanics</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Reinforcement Arrival
              </Typography>
              <Typography variant="body2" color="text.secondary">
                New reinforcements arrive every 5 seconds. Each reinforcement includes a random type and unit count (1-10 units).
              </Typography>
            </Paper>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Resource Generation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Resources are generated automatically every 60 seconds. The amount depends on your rank multiplier. Higher ranks generate more resources per cycle.
              </Typography>
            </Paper>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Offline Earnings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                When you return to the game, you'll receive resources and reinforcements based on the time you were away, calculated using your rank multiplier.
              </Typography>
            </Paper>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

