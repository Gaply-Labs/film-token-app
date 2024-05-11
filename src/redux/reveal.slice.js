import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import output from '../pages/api/data/output.json';
import revealNft from '../pages/api/revealinit';
import NftRevealData from '../pages/api/RevealNft';

export const revealData = createAsyncThunk('revealData', async (value, { rejectWithValue }) => {
  try {
    const data = await NftRevealData(value.id, value.wallet, value.metadata, value.isSecondReveal);
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
  isReveal2: false,
  singleLoading: false,
};

const RevealSlice = createSlice({
  name: 'burn',
  initialState,
  reducers: {
    getRevealData: (state, action) => {
      const id = action.payload;
      const findData = output.find((item) => item.edition === +id);
      state.data = findData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(revealData.pending, (state) => {
        state.singleLoading = true;
      })
      .addCase(revealData.fulfilled, (state, action) => {
        state.singleLoading = false;
        const data = JSON.parse(action.payload);
        state.reveal = data;
      })
      .addCase(revealData.rejected, (state, action) => {
        state.singleLoading = false;
        state.error = action?.payload;
      });
    //------------------------------------------
    builder
      .addCase(getRevelInit.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRevelInit.fulfilled, (state, action) => {
        state.loading = false;
        const data = action?.payload ? JSON.parse(action.payload) : false;
        state.isReveal = data ? data[0]?.account.revealed1 : false;
        state.isReveal2 = data ? data[0]?.account.revealed2 : false;
      })
      .addCase(getRevelInit.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      });
  },
});
export const { getRevealData } = RevealSlice.actions;
export default RevealSlice.reducer;
