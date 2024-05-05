import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import stateApi from '../pages/api/state';
import createMasterApi from '../pages/api/maseter';

export const getState = createAsyncThunk('getState', async (value, { rejectWithValue }) => {
  try {
    const data = await stateApi(value.wallet);
    return JSON.stringify(data);
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});

export const createMaster = createAsyncThunk('createMaster', async (value, { rejectWithValue }) => {
  try {
    const data = await createMasterApi(value.state, value.wallet);
    return JSON.stringify(data);
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const initialState = {
  loading: false,
  error: null,
  state: null,
  data: null,
  singleLoading: false,
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
        const data = JSON.parse(action.payload);
        const stateData = data[0]?.publicKey;
        state.state = stateData;
        state.data = data[0];
      })
      .addCase(getState.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      });
    //-----------------------------------------
    builder
      .addCase(createMaster.pending, (state) => {
        state.singleLoading = true;
      })
      .addCase(createMaster.fulfilled, (state, action) => {
        state.singleLoading = false;
        const data = JSON.parse(action.payload);
        const stateData = data[0]?.publicKey;
        state.state = stateData;
      })
      .addCase(createMaster.rejected, (state, action) => {
        state.singleLoading = false;
        state.error = action?.payload;
      });
  },
});

export default stateSlice.reducer;
