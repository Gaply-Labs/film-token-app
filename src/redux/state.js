import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import stateApi from '../pages/api/state';
import createMasterApi from '../pages/api/maseter';
import createInitApi from '../pages/api/initialize';
import getInitApi from '../pages/api/getInit';
import createRevealApi from '../pages/api/revealData';

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

export const createReveal = createAsyncThunk('createReveal', async (value, { rejectWithValue }) => {
  try {
    const data = await createRevealApi(value.init, value.wallet);
    return JSON.stringify(data);
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

export const createInit = createAsyncThunk('createInit', async (value, { rejectWithValue }) => {
  try {
    const data = await createInitApi(value.init, value.wallet, value.args);
    return JSON.stringify(data);
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

export const getInit = createAsyncThunk('getInit', async (value, { rejectWithValue }) => {
  try {
    const data = await getInitApi(value.wallet);
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
  data: null,
  singleLoading: false,
  init: null,
  initKey: null,
  reveal: null,
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
    //-----------------------------------------
    builder
      .addCase(createInit.pending, (state) => {
        state.singleLoading = true;
      })
      .addCase(createInit.fulfilled, (state, action) => {
        state.singleLoading = false;
        const data = JSON.parse(action.payload);
        const stateData = data[0]?.publicKey;
        state.init = stateData;
      })
      .addCase(createInit.rejected, (state, action) => {
        state.singleLoading = false;
        state.error = action?.payload;
      });
    //---------------------------------------------
    builder
      .addCase(getInit.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInit.fulfilled, (state, action) => {
        state.loading = false;
        const data = JSON.parse(action.payload);
        const stateData = data[0]?.publicKey;
        state.initKey = stateData;
        state.init = data[0];
      })
      .addCase(getInit.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      });
    //-----------------------------------------
    builder
      .addCase(createReveal.pending, (state) => {
        state.singleLoading = true;
      })
      .addCase(createReveal.fulfilled, (state, action) => {
        state.singleLoading = false;
        const data = JSON.parse(action.payload);
        const stateData = data[0]?.publicKey;
        state.reveal = stateData;
      })
      .addCase(createReveal.rejected, (state, action) => {
        state.singleLoading = false;
        state.error = action?.payload;
      });
    //-----------------------------------------
  },
});

export default stateSlice.reducer;
