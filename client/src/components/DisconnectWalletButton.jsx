import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { disconnectWallet } from '../redux/appSlice';

const DisconnectWalletButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(disconnectWallet());
  };

  return (
    <Button color="inherit" onClick={handleClick}>
      Disconnect
    </Button>
  );
};

export default DisconnectWalletButton;