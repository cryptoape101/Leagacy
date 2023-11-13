import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const TopNavigation = ({ walletAddress }) => {
  return (
    <AppBar position="static" sx={{ marginBottom: 4 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Leagacy
        </Typography>
        {walletAddress ? (
          <Typography variant="body1">{walletAddress}</Typography>
        ) : (
          <Button color="inherit">Connect Wallet</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopNavigation;