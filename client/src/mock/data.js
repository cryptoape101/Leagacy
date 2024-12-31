import chains from './chains';
import currencies from './currencies';
// mock data

console.log('chains: ', chains);
console.log('currencies: ', currencies);

const data = {
  leagues: [
    {
      id: 1,
      name: 'League 1',
      sport: 'NFL',
      year: [2024, 2025],
      archived: false,
      commish: true,
      fee: 0.1,
      currency: currencies.ether,
      chain: chains.base
    },
    {
      id: 2,
      name: 'League 2',
      sport: 'NBA',
      year: [2023, 2024],
      archived: false,
      commish: false,
      fee: 20,
      currency: currencies.usdc,
      chain: chains.base
    },
    {
      id: 3,
      name: 'League 3',
      sport: 'MLB',
      year: [2022],
      archived: true,
      commish: false,
      fee: 20,
      currency: currencies.tether,
      chain: chains.base
    },
    {
      id: 4,
      name: 'League 4',
      sport: 'E-Sports',
      year: [2021],
      archived: true,
      commish: true,
      fee: 20,
      currency: currencies.brett,
      chain: chains.base
    }
  ]
};

export function fetchData() {
  return Promise.resolve(data);
}