import React from 'react';

import { Eth as EthIcon } from '@leagacy/assets/icons/eth';
import { Tether as TetherIcon } from '@leagacy/assets/icons/tether';
import { Usdc as UsdcIcon } from '@leagacy/assets/icons/usdc';

export const getCurrencyIcon = (iconName) => {
  switch (iconName) {
    case 'ETH':
      return <EthIcon />;
    case 'USDC':
      return <UsdcIcon />;
    case 'USDT':
      return <TetherIcon />;
    default:
      return null;
  }
};