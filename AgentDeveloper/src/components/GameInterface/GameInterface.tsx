import { 
  Box, 
  Typography, 
  Stack,
  Chip
} from '@mui/material';
import { 
  Save as SaveIcon, 
  Settings as SettingsIcon,
  AccessTime as TimeIcon,
  Star as RankIcon,
  Psychology as KillsIcon
} from '@mui/icons-material';
import { Panel } from '@/components/common/Layout';
import { Button } from '@/components/common/Button';
import { StatDisplay } from '@/components/common/ProgressBar';

interface GameInterfaceProps {}

export const GameInterface = ({}: GameInterfaceProps) => {
  return (
    <Box sx={{ height: '100%', p: 1 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 3, 
          height: '100%',
          flexDirection: { xs: 'column', lg: 'row' }
        }}
      >
        {/* Battlefield Column */}
        <Box sx={{ flex: { xs: 1, lg: 2 } }}>
          <Panel title="Battlefield" elevation={3}>
            <Box 
              sx={{ 
                height: 500,
                backgroundColor: 'background.default',
                borderRadius: 1,
                border: 1,
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <Box
                component="canvas"
                width={600}
                height={400}
                sx={{ 
                  border: 1,
                  borderColor: 'primary.main',
                  backgroundColor: '#000',
                  imageRendering: 'pixelated'
                }}
              />
            </Box>
          </Panel>
        </Box>

        {/* Right Column - Game Info */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Stack spacing={3}>
            {/* Player Status */}
            <Panel title="Command Status" elevation={2}>
              <Stack spacing={2}>
                <StatDisplay
                  label="Rank"
                  value="Trooper (1)"
                  icon={<RankIcon color="primary" />}
                  color="primary"
                />
                <StatDisplay
                  label="Rank Points"
                  value="0 / 100"
                  color="success"
                />
                <StatDisplay
                  label="Total Kills"
                  value="0"
                  icon={<KillsIcon color="error" />}
                  color="error"
                />
              </Stack>
            </Panel>

            {/* Timers */}
            <Panel title="Operations" elevation={2}>
              <Stack spacing={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <TimeIcon color="info" />
                    <Typography variant="body2" color="text.secondary">
                      Next Reinforcements:
                    </Typography>
                  </Stack>
                  <Chip 
                    label="00:60" 
                    size="small" 
                    color="info" 
                    variant="outlined"
                  />
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <TimeIcon color="warning" />
                    <Typography variant="body2" color="text.secondary">
                      Next Assault:
                    </Typography>
                  </Stack>
                  <Chip 
                    label="59:60" 
                    size="small" 
                    color="warning" 
                    variant="outlined"
                  />
                </Box>
              </Stack>
            </Panel>

            {/* Quick Actions */}
            <Panel title="Actions" elevation={2}>
              <Stack spacing={2}>
                <Button 
                  variant="primary" 
                  size="medium"
                  startIcon={<SaveIcon />}
                  fullWidth
                >
                  Manual Save
                </Button>
                <Button 
                  variant="secondary" 
                  size="medium"
                  startIcon={<SettingsIcon />}
                  fullWidth
                >
                  Settings
                </Button>
              </Stack>
            </Panel>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
