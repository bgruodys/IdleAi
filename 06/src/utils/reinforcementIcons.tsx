import React from 'react';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SecurityIcon from '@mui/icons-material/Security';
import ExploreIcon from '@mui/icons-material/Explore';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { SvgIconComponent } from '@mui/icons-material';

const REINFORCEMENT_ICONS: Record<string, SvgIconComponent> = {
  'Imperial Guardsmen': GroupsIcon,
  'Heavy Weapons Team': LocalFireDepartmentIcon,
  'Scout Squad': ExploreIcon,
  'Veteran Squad': MilitaryTechIcon,
  'Armored Support': SecurityIcon,
};

/**
 * Get icon component for a reinforcement type
 */
export function getReinforcementIcon(type: string): SvgIconComponent | null {
  return REINFORCEMENT_ICONS[type] || null;
}

/**
 * Render icon for a reinforcement type
 */
export function ReinforcementIcon({ type }: { type: string }): React.ReactElement | null {
  const IconComponent = getReinforcementIcon(type);
  
  if (!IconComponent) {
    return null;
  }
  
  return <IconComponent />;
}

