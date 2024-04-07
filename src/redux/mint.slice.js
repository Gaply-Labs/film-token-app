import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import mintApi from '../pages/api/mint';

export const mintNft = createAsyncThunk('mintNft', async (value, { rejectWithValue }) => {
  try {
    const data = mintApi(value.wallet, value.messageAccount);
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const mintSlice = createSlice({
  name: 'burn',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(mintNft.pending, (state) => {
        state.loading = true;
      })
      .addCase(mintNft.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(mintNft.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      });
  },
});

export default mintSlice.reducer;
