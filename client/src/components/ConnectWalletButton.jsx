// ConnectWalletButton.jsx
import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setWalletAddress } from '../redux/appSlice';

const ConnectWalletButton = (props) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setWalletAddress('0x123...456'));
  };

  return (
    <Button onClick={handleClick} {...props}>
      Connect Wallet
    </Button>
  );
};

export default ConnectWalletButton;