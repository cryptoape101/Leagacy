import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  leagues: [],
  // leagues: [ // mock data
  //   {
  //     id: 1,
  //     name: 'League 1',
  //     sport: 'NFL',
  //     year: 2024,
  //     commish: true,
  //   },
  //   {
  //     id: 2,
  //     name: 'League 2',
  //     sport: 'NBA',
  //     year: 2023,
  //     commish: false,
  //   },
  //   {
  //     id: 3,
  //     name: 'League 3',
  //     sport: 'MLB',
  //     year: 2022,
  //     commish: true,
  //   }
  // ],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLeagues(state, action) {
      state.leagues = action.payload;
    },
  },
});

export const { setLeagues } = appSlice.actions;

export default appSlice.reducer;