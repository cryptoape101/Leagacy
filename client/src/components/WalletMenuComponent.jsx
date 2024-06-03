import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Menu, MenuItem, Button } from '@mui/material';

import DisconnectWalletButton from './DisconnectWalletButton';

const WalletMenu = () => {
  const walletAddress = useSelector((state) => state.app.walletAddress);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    // This code will run whenever walletAddress changes
    console.log('walletAddress has changed:', walletAddress);
  }, [walletAddress]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    walletAddress && (
      <>
        <Button onClick={handleClick} color="inherit">
          {walletAddress}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <DisconnectWalletButton />
          </MenuItem>
        </Menu>
      </>
    )
  );
};

export default WalletMenu;