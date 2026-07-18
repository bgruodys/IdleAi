import React from 'react';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SecurityIcon from '@mui/icons-material/Security';
import ExploreIcon from '@mui/icons-material/Explore';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HealingIcon from '@mui/icons-material/Healing';
import ScienceIcon from '@mui/icons-material/Science';
import EngineeringIcon from '@mui/icons-material/Engineering';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import { SvgIconComponent } from '@mui/icons-material';

/**
 * Get icon component for a reinforcement type based on category
 */
function getReinforcementIcon(type: string): SvgIconComponent {
  const lowerType = type.toLowerCase();
  
  // Medical personnel
  if (lowerType.includes('medic') || lowerType.includes('surgeon') || 
      lowerType.includes('apothecary') || lowerType.includes('healer') ||
      lowerType.includes('medicae') || lowerType.includes('pharmaceutical')) {
    return HealingIcon;
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
    return ScienceIcon;
  }
  
  // Engineers and technicians
  if (lowerType.includes('engineer') || lowerType.includes('enginseer') ||
      lowerType.includes('mechanic') || lowerType.includes('technician') ||
      lowerType.includes('armorer') || lowerType.includes('weaponsmith') ||
      lowerType.includes('tech-adept') || lowerType.includes('servitor') ||
      lowerType.includes('cybernetics') || lowerType.includes('maintenance')) {
    return EngineeringIcon;
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
    return WorkIcon;
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
    return BusinessIcon;
  }
  
  // Specialists (navigators, psykers, etc.)
  if (lowerType.includes('navigator') || lowerType.includes('astropath') ||
      lowerType.includes('psyker') || lowerType.includes('interrogator') ||
      lowerType.includes('inquisitorial') || lowerType.includes('arbites') ||
      lowerType.includes('enforcer') || lowerType.includes('intelligence')) {
    return PersonIcon;
  }
  
  // Vehicle operators and pilots
  if (lowerType.includes('pilot') || lowerType.includes('driver') ||
      lowerType.includes('gunner') || lowerType.includes('operator') ||
      lowerType.includes('crewman') || lowerType.includes('co-pilot')) {
    return SecurityIcon;
  }
  
  // Combat units - default to military icons
  if (lowerType.includes('guardsman') || lowerType.includes('trooper') ||
      lowerType.includes('commissar') || lowerType.includes('stormtrooper') ||
      lowerType.includes('sniper') || lowerType.includes('grenadier') ||
      lowerType.includes('flamer') || lowerType.includes('plasma') ||
      lowerType.includes('melta') || lowerType.includes('sergeant') ||
      lowerType.includes('corporal') || lowerType.includes('officer') ||
      lowerType.includes('commander') || lowerType.includes('cavalry') ||
      lowerType.includes('rough rider') || lowerType.includes('ogryn') ||
      lowerType.includes('bullgryn') || lowerType.includes('ratling') ||
      lowerType.includes('specialist') || lowerType.includes('fighter') ||
      lowerType.includes('artillery') || lowerType.includes('mortar') ||
      lowerType.includes('missile') || lowerType.includes('bolter') ||
      lowerType.includes('cannon') || lowerType.includes('lasgun') ||
      lowerType.includes('autogun') || lowerType.includes('shotgun') ||
      lowerType.includes('bayonet') || lowerType.includes('combat')) {
    return MilitaryTechIcon;
  }
  
  // Scouts and reconnaissance
  if (lowerType.includes('scout') || lowerType.includes('reconnaissance')) {
    return ExploreIcon;
  }
  
  // Heavy weapons and firepower
  if (lowerType.includes('heavy') || lowerType.includes('weapon') ||
      lowerType.includes('firepower') || lowerType.includes('armored')) {
    return LocalFireDepartmentIcon;
  }
  
  // Default fallback
  return GroupsIcon;
}

/**
 * Render icon for a reinforcement type
 */
export function ReinforcementIcon({ type }: { type: string }): React.ReactElement {
  const IconComponent = getReinforcementIcon(type);
  return <IconComponent />;
}


