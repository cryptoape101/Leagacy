import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const MainContent = ({ walletAddress }) => {
  return (
    <Box sx={{ padding: 3 }}>
      {!walletAddress ? (
        // Displayed when the wallet is not connected
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome to Leagacy
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Your one-stop solution for managing Fantasy Football Leagues. Connect your wallet to create a new league or manage your existing leagues.
          </Typography>
          <Button variant="contained" color="primary">
            Connect Wallet
          </Button>
        </Box>
      ) : (
        // Displayed when the wallet is connected
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Manage your Leagues or start a new adventure by creating a new league.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
            Create a League
          </Button>
          <Button variant="contained" color="secondary">
            Manage Your Leagues
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MainContent;