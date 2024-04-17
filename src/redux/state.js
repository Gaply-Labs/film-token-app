import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import stateApi from '../pages/api/state';

export const getState = createAsyncThunk('getState', async (value, { rejectWithValue }) => {
  try {
    const data = await stateApi(value.wallet);
    return JSON.stringify(data);
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});

const initialState = {
  loading: false,
  error: null,
  state: null,
};

const stateSlice = createSlice({
  name: 'state',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getState.pending, (state) => {
        state.loading = true;
      })
      .addCase(getState.fulfilled, (state, action) => {
        state.loading = false;
        const data = JSON.parse(action.payload)
        const stateData = data[0]?.publicKey;
        state.state = stateData;
      })
      .addCase(getState.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      });

  },
});

export default stateSlice.reducer;
