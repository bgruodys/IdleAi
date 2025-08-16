import { ReactNode } from 'react';
import { 
  LinearProgress, 
  Box, 
  Typography, 
  Stack,
  Chip
} from '@mui/material';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  variant?: 'determinate' | 'indeterminate';
}

export const ProgressBar = ({
  current,
  max,
  label,
  showPercentage = true,
  color = 'primary',
  variant = 'determinate',
}: ProgressBarProps) => {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));
  
  return (
    <Box sx={{ width: '100%' }}>
      {label && (
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          {showPercentage && (
            <Typography variant="caption" color="text.secondary">
              {current.toLocaleString()} / {max.toLocaleString()}
            </Typography>
          )}
        </Stack>
      )}
      <LinearProgress
        variant={variant}
        value={percentage}
        color={color}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
          },
        }}
      />
      {showPercentage && !label && (
        <Box textAlign="center" mt={1}>
          <Typography variant="caption" color="text.secondary">
            {Math.round(percentage)}%
          </Typography>
        </Box>
      )}
    </Box>
  );
};

interface StatDisplayProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export const StatDisplay = ({
  label,
  value,
  icon,
  color = 'default',
}: StatDisplayProps) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" alignItems="center" spacing={1}>
        {icon && <Box>{icon}</Box>}
        <Typography variant="body2" color="text.secondary">
          {label}:
        </Typography>
      </Stack>
      <Chip
        label={typeof value === 'number' ? value.toLocaleString() : value}
        size="small"
        color={color}
        variant="outlined"
      />
    </Stack>
  );
};
