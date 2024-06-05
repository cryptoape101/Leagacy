// mock data

const data = {
  leagues: [
    {
      id: 1,
      name: 'League 1',
      sport: 'NFL',
      year: [2024, 2025],
      archived: false,
      commish: true,
    },
    {
      id: 2,
      name: 'League 2',
      sport: 'NBA',
      year: [2023, 2024],
      archived: false,
      commish: false,
    },
    {
      id: 3,
      name: 'League 3',
      sport: 'MLB',
      year: [2022],
      archived: true,
      commish: true,
    }
  ]
};

export function fetchData() {
  return Promise.resolve(data);
}