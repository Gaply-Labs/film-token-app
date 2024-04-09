import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import output from '../pages/api/data/output.json';
import revelApi from '../pages/api/reveal';
import revealNft from '../pages/api/revealinit';

export const revealData = createAsyncThunk('revealData', async (value, { rejectWithValue }) => {
  try {
    const data = await revelApi(value.wallet, value.messageAccount);
    return JSON.stringify(data);
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

export const getRevelInit = createAsyncThunk('getRevelInit', async (value, { rejectWithValue }) => {
  try {
    const data = await revealNft(value.wallet);
    return JSON.stringify(data);
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const initialState = {
  loading: false,
  error: null,
  data: null,
  reveal: '',
  isReveal: true,
};

const reveelSlice = createSlice({
  name: 'burn',
  initialState,
  reducers: {
    getReveelData: (state, action) => {
      const id = action.payload;
      const findData = output.find((item) => item.edition === +id);
      state.data = findData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(revealData.pending, (state) => {
        state.loading = true;
      })
      .addCase(revealData.fulfilled, (state, action) => {
        state.loading = false;
        const data = JSON.parse(action.payload);
        state.reveal = data;
      })
      .addCase(revealData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      });
    //------------------------------------------
    builder
      .addCase(getRevelInit.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRevelInit.fulfilled, (state, action) => {
        state.loading = false;
        const data = action?.payload ?  JSON.parse(action.payload) : false;
        state.isReveal = data ? data[0].account.reveal : false;
      })
      .addCase(getRevelInit.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      });
  },
});
export const { getReveelData } = reveelSlice.actions;
export default reveelSlice.reducer;
