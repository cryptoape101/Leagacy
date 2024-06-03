import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import MenuComponent from './MenuComponent';
import WalletMenu from './WalletMenuComponent';
import CreateLeagueButton from './CreateLeagueButton';
import ConnectWalletButton from './ConnectWalletButton';

const TopNavigation = () => {
  const walletAddress = useSelector((state) => state.app.walletAddress);
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
        {walletAddress ? (
          <>
            <CreateLeagueButton />
            <WalletMenu />
          </>
        ) : (
          <ConnectWalletButton color="inherit" />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopNavigation;