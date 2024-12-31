// chains.js
import currencies from './currencies';
import { Base as BaseIcon } from '@leagacy/assets/icons/base';

export const chains = {
  base: {
    id: 1,
    name: 'Base',
    defaultCurrency: currencies.ether,
    allowedCurrencies: [
      currencies.ether,
      currencies.usdc,
      currencies.tether,
      currencies.brett
    ],
    icon: (<BaseIcon />),
  }
};

export default chains;