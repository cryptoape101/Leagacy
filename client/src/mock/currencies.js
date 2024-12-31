// currencies.js
import { Eth as EthIcon } from '@leagacy/assets/icons/eth';
import { Tether as TetherIcon } from '@leagacy/assets/icons/tether';
import { Usdc as UsdcIcon } from '@leagacy/assets/icons/usdc';

export const currencies = {
  ether: {
    contract: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
    icon: (<EthIcon />)
  },
  usdc: {
    contract: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
    decimals: 6,
    name: 'USDC',
    symbol: 'USDC',
    icon: (<UsdcIcon />)
  },
  tether: {
    contract: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2',
    decimals: 6,
    name: 'Tether USD',
    symbol: 'USDT',
    icon: (<TetherIcon />)
  },
  brett: {
    contract: '0x532f27101965dd16442E59d40670FaF5eBB142E4',
    decimals: 18,
    name: 'Brett',
    symbol: 'BRETT'
  }
};

export default currencies;