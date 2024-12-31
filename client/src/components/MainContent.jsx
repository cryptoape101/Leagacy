import React from 'react';
import { useAccount } from 'wagmi'

import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import ConnectWalletButton from './ConnectWalletButton';

const MainContent = () => {
  const {address} = useAccount();

  return (
    <Box sx={{ padding: 2 }}>
      {!address ? (
        // Displayed when the wallet is not connected
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome to Leagacy
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Your one-stop solution for managing Fantasy Football Leagues. Connect your wallet to create a new league or manage your existing leagues.
          </Typography>
          <ConnectWalletButton variant="contained" color="primary" />
        </Box>
      ) : (
        // Displayed when the wallet is connected
        <Box>
          <Typography variant="h2" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Manage your Leagues or start a new adventure by creating a new league.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mr: 2 }} component={Link} to="/create">
            Create New League
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/leagues">
            Manage Your Leagues
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MainContent;