import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import GameHeader from './components/GameHeader';
import ResourcePanel from './components/ResourcePanel';
import MiningPanel from './components/MiningPanel';
import UpgradePanel from './components/UpgradePanel';
import WarehousePanel from './components/WarehousePanel';
import OfflineSummaryModal from './components/OfflineSummaryModal';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <GameProvider>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'url("/Images/Background.jpg") no-repeat center center fixed',
          backgroundSize: 'cover',
          color: '#ffffff',
          fontFamily: 'Courier New, monospace',
          position: 'relative',
          
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(10, 10, 10, 0.7)',
            zIndex: 1
          }
        }}
      >
        <Box
          sx={{
            width: '100%',
            padding: '20px',
            position: 'relative',
            zIndex: 2
          }}
        >
          <GameHeader />
          
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 3fr 1fr' },
              gap: '20px',
              marginTop: '20px'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <ResourcePanel />
              <UpgradePanel />
            </Box>
            <MiningPanel />
            <WarehousePanel />
          </Box>
        </Box>
        
        <OfflineSummaryModal />
      </Box>
    </GameProvider>
  );
}

export default App;
