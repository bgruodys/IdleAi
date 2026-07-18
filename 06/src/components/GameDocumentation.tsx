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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RANK_DATA_EXPORT, REINFORCEMENT_TYPES_EXPORT, getRankMultiplier, getAvailableReinforcementTypes } from '../store/gameSlice';
import { ReinforcementIcon } from '../utils/reinforcementIcons';

// Rank descriptions are now in RANK_DATA_EXPORT

/**
 * Generate description for a reinforcement type based on its category
 */
function getReinforcementDescription(type: string): string {
  const lowerType = type.toLowerCase();
  
  // Medical personnel
  if (lowerType.includes('medic') || lowerType.includes('surgeon') || 
      lowerType.includes('apothecary') || lowerType.includes('healer') ||
      lowerType.includes('medicae') || lowerType.includes('pharmaceutical')) {
    return 'Medical personnel providing essential healthcare and battlefield medicine to Imperial forces';
  }
  
  // Scientists and researchers
  if (lowerType.includes('scientist') || lowerType.includes('researcher') ||
      lowerType.includes('biologis') || lowerType.includes('chemist') ||
      lowerType.includes('xenobiologist') || lowerType.includes('xenologist') ||
      lowerType.includes('archaeologist') || lowerType.includes('analyst') ||
      lowerType.includes('genetor') || lowerType.includes('magos') ||
      lowerType.includes('explorator') || lowerType.includes('archmagos') ||
      lowerType.includes('tech-priest') || lowerType.includes('data specialist') ||
      lowerType.includes('laboratory')) {
    return 'Scientific personnel conducting research, analysis, and technological advancement for the Imperium';
  }
  
  // Engineers and technicians
  if (lowerType.includes('engineer') || lowerType.includes('enginseer') ||
      lowerType.includes('mechanic') || lowerType.includes('technician') ||
      lowerType.includes('armorer') || lowerType.includes('weaponsmith') ||
      lowerType.includes('tech-adept') || lowerType.includes('servitor') ||
      lowerType.includes('cybernetics') || lowerType.includes('maintenance')) {
    return 'Technical specialists maintaining and repairing equipment, vehicles, and weapons systems';
  }
  
  // Workers and laborers
  if (lowerType.includes('worker') || lowerType.includes('laborer') ||
      lowerType.includes('miner') || lowerType.includes('construction') ||
      lowerType.includes('factory') || lowerType.includes('refinery') ||
      lowerType.includes('quarry') || lowerType.includes('lumberjack') ||
      lowerType.includes('farmer') || lowerType.includes('harvester') ||
      lowerType.includes('loader') || lowerType.includes('dock') ||
      lowerType.includes('warehouse') || lowerType.includes('smelter') ||
      lowerType.includes('forge') || lowerType.includes('assembly') ||
      lowerType.includes('inspector')) {
    return 'Industrial workers and laborers essential for resource extraction, construction, and manufacturing';
  }
  
  // Administrators and support staff
  if (lowerType.includes('clerk') || lowerType.includes('administrator') ||
      lowerType.includes('quartermaster') || lowerType.includes('supply') ||
      lowerType.includes('logistics') || lowerType.includes('records') ||
      lowerType.includes('accountant') || lowerType.includes('scribe') ||
      lowerType.includes('archivist') || lowerType.includes('messenger') ||
      lowerType.includes('courier') || lowerType.includes('cook') ||
      lowerType.includes('chef') || lowerType.includes('inventory') ||
      lowerType.includes('diplomat') || lowerType.includes('interpreter')) {
    return 'Administrative and support personnel managing logistics, records, and essential services';
  }
  
  // Specialists (navigators, psykers, etc.)
  if (lowerType.includes('navigator') || lowerType.includes('astropath') ||
      lowerType.includes('psyker') || lowerType.includes('interrogator') ||
      lowerType.includes('inquisitorial') || lowerType.includes('arbites') ||
      lowerType.includes('enforcer') || lowerType.includes('intelligence')) {
    return 'Specialized personnel with unique abilities essential for Imperial operations';
  }
  
  // Vehicle operators and pilots
  if (lowerType.includes('pilot') || lowerType.includes('driver') ||
      lowerType.includes('gunner') || lowerType.includes('operator') ||
      lowerType.includes('crewman') || lowerType.includes('co-pilot')) {
    return 'Vehicle crew members operating and maintaining Imperial war machines';
  }
  
  // Scouts and reconnaissance
  if (lowerType.includes('scout') || lowerType.includes('reconnaissance') ||
      lowerType.includes('pathfinder') || lowerType.includes('observer') ||
      lowerType.includes('infiltrator') || lowerType.includes('saboteur')) {
    return 'Reconnaissance specialists gathering intelligence, observing enemy positions, and operating behind enemy lines';
  }
  
  // Heavy weapons specialists
  if (lowerType.includes('heavy') && (lowerType.includes('weapon') || lowerType.includes('gunner') || lowerType.includes('operator'))) {
    return 'Heavy weapons specialists providing sustained firepower and anti-armor capabilities';
  }
  
  // Officers and commanders
  if (lowerType.includes('commissar') || lowerType.includes('commander') ||
      lowerType.includes('officer') || lowerType.includes('sergeant') ||
      lowerType.includes('corporal')) {
    return 'Command personnel leading and coordinating Imperial forces in battle';
  }
  
  // Elite combat units
  if (lowerType.includes('veteran') || lowerType.includes('stormtrooper') ||
      lowerType.includes('ogryn') || lowerType.includes('bullgryn')) {
    return 'Elite combat units with superior training and battlefield experience';
  }
  
  // Standard combat units - default
  return 'Imperial Guard personnel serving the Emperor with unwavering loyalty and dedication';
}

export const GameDocumentation: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>('ranks');

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
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
                          label={rankInfo.experienceRequired.toLocaleString()} 
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
                      {getReinforcementDescription(type)}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Reinforcement Availability by Rank Section */}
      <Accordion expanded={expanded === 'reinforcement-availability'} onChange={handleChange('reinforcement-availability')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Reinforcement Availability by Rank</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Reinforcement types are unlocked progressively as you advance in rank. Higher ranks gain access to more specialized and elite units.
          </Typography>
          
          {/* Entry Level */}
          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Entry Level (Ranks 1-10)
            </Typography>
            <Chip 
              label={`${getAvailableReinforcementTypes(10).length} types available`} 
              color="primary" 
              size="small" 
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              New recruits start with only the most basic units:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {getAvailableReinforcementTypes(10).map((type) => (
                <Chip
                  key={type}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ReinforcementIcon type={type} />
                      <span>{type}</span>
                    </Box>
                  }
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Paper>

          {/* Junior NCO */}
          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Junior NCO (Ranks 11-20)
            </Typography>
            <Chip 
              label={`${getAvailableReinforcementTypes(20).length} types available`} 
              color="primary" 
              size="small" 
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              As you prove your leadership capabilities, more combat units and basic support personnel become available:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {getAvailableReinforcementTypes(20).map((type) => (
                <Chip
                  key={type}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ReinforcementIcon type={type} />
                      <span>{type}</span>
                    </Box>
                  }
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Paper>

          {/* Senior NCO */}
          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Senior NCO (Ranks 21-30)
            </Typography>
            <Chip 
              label={`${getAvailableReinforcementTypes(30).length} types available`} 
              color="primary" 
              size="small" 
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Senior non-commissioned officers gain access to specialized weapons, advanced scouts, and technical support personnel:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {getAvailableReinforcementTypes(30).map((type) => (
                <Chip
                  key={type}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ReinforcementIcon type={type} />
                      <span>{type}</span>
                    </Box>
                  }
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Paper>

          {/* Junior Officers */}
          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Junior Officers (Ranks 31-40)
            </Typography>
            <Chip 
              label={`${getAvailableReinforcementTypes(40).length} types available`} 
              color="primary" 
              size="small" 
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Commissioned officers unlock elite combat units, heavy weapons teams, and advanced specialists:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {getAvailableReinforcementTypes(40).map((type) => (
                <Chip
                  key={type}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ReinforcementIcon type={type} />
                      <span>{type}</span>
                    </Box>
                  }
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Paper>

          {/* Senior Officers */}
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Senior Officers (Ranks 41-50)
            </Typography>
            <Chip 
              label={`${getAvailableReinforcementTypes(50).length} types available`} 
              color="primary" 
              size="small" 
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              At the highest ranks, you have access to the full might of the Imperial Guard, including all {getAvailableReinforcementTypes(50).length} unit types:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {getAvailableReinforcementTypes(50).map((type) => (
                <Chip
                  key={type}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ReinforcementIcon type={type} />
                      <span>{type}</span>
                    </Box>
                  }
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Paper>
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
    </Box>
  );
};

