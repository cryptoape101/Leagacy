import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adaptBlockchainLeagues/*, adaptFrontendToBlockchain */} from '@leagacy/utils/adapters';

// Create an async thunk for fetching blockchain data
export const fetchBlockchainData = createAsyncThunk(
  'app/fetchBlockchainData',
  async () => {
    // Replace with actual blockchain data fetching
    const response = await fetch('/api/blockchain-data');
    return await response.json();
  }
);

const initialState = {
  leagues: [],
  loading: false,
  error: null
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLeagues(state, action) {
      state.leagues = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlockchainData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlockchainData.fulfilled, (state, action) => {
        state.loading = false;
        // Use adapter to convert blockchain data to frontend format
        state.leagues = adaptBlockchainLeagues(action.payload);
      })
      .addCase(fetchBlockchainData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setLeagues } = appSlice.actions;

export default appSlice.reducer;