import { ReactNode } from 'react';
import { 
  Tabs as MuiTabs, 
  Tab, 
  Paper, 
  Typography, 
  Box, 
  Card as MuiCard,
  CardContent,
  Stack,
  Divider
} from '@mui/material';

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactElement;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children?: ReactNode;
}

export const Tabs = ({
  tabs,
  activeTab,
  onTabChange,
  children,
}: TabsProps) => {
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    onTabChange(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <MuiTabs
        value={activeTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 600,
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            value={tab.id}
            label={tab.label}
            icon={tab.icon}
            iconPosition="start"
            disabled={tab.disabled}
          />
        ))}
      </MuiTabs>
      <Box sx={{ mt: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

interface PanelProps {
  title?: string;
  children: ReactNode;
  headerActions?: ReactNode;
  elevation?: number;
}

export const Panel = ({
  title,
  children,
  headerActions,
  elevation = 2,
}: PanelProps) => {
  return (
    <Paper elevation={elevation} sx={{ overflow: 'hidden' }}>
      {title && (
        <>
          <Box sx={{ p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography 
                variant="h6" 
                component="h3" 
                color="primary"
                sx={{ 
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                {title}
              </Typography>
              {headerActions && (
                <Box>
                  {headerActions}
                </Box>
              )}
            </Stack>
          </Box>
          <Divider />
        </>
      )}
      <Box sx={{ p: 2 }}>
        {children}
      </Box>
    </Paper>
  );
};

interface CardProps {
  children: ReactNode;
  hoverable?: boolean;
  selected?: boolean;
  onClick?: () => void;
  elevation?: number;
}

export const Card = ({
  children,
  hoverable = false,
  selected = false,
  onClick,
  elevation = 1,
}: CardProps) => {
  return (
    <MuiCard
      elevation={selected ? 4 : elevation}
      onClick={onClick}
      sx={{
        cursor: hoverable || onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease-in-out',
        border: selected ? 2 : 0,
        borderColor: selected ? 'primary.main' : 'transparent',
        '&:hover': hoverable || onClick ? {
          elevation: 4,
          transform: 'translateY(-2px)',
          borderColor: 'primary.main',
        } : {},
      }}
    >
      <CardContent>
        {children}
      </CardContent>
    </MuiCard>
  );
};
