import React, { useState } from 'react';
import { useAccount } from 'wagmi'

import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import MenuComponent from './MenuComponent';
import CreateLeagueButton from './CreateLeagueButton';
import ConnectWalletButton from './ConnectWalletButton';

const TopNavigation = () => {
  const {address} = useAccount();
  console.log('address:', address);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ marginBottom: 4 }}>
      <Toolbar>
        <MenuComponent anchorEl={anchorEl} setAnchorEl={setAnchorEl} handleClose={handleClose} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Leagacy
          </Link>
        </Typography>
        {address && (
          <CreateLeagueButton />
        )}
        <ConnectWalletButton accountStatus="address" chainStatus="none" label="Connect" showBalance={false} />
        
      </Toolbar>
    </AppBar>
  );
};

export default TopNavigation;