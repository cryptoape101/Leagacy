// currencies.js

export const currencies = {
  ether: {
    contract: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
    iconName: 'ETH'
  },
  usdc: {
    contract: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
    decimals: 6,
    name: 'USDC',
    symbol: 'USDC',
    iconName: 'USDC'
  },
  tether: {
    contract: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2',
    decimals: 6,
    name: 'Tether USD',
    symbol: 'USDT',
    iconName: 'USDT'
  }
};

export default currencies;