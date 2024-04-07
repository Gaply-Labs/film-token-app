import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import mintApi from '../pages/api/mint';
import getAllNFTData from '../pages/api/getAllNft';
export const mintNft = createAsyncThunk('mintNft', async (value, { rejectWithValue }) => {
  try {
    const data = mintApi(value.wallet, value.messageAccount);
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});

export const getAllNFT = createAsyncThunk('getAllNFT', async (value, { rejectWithValue }) => {
  try {
    const data = await getAllNFTData(value.wallet);
    const final = { wallet: value.wallet, data: data };
    return JSON.stringify(final);
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
    //--------------------------------------
    builder
      .addCase(getAllNFT.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllNFT.fulfilled, (state, action) => {
        state.loading = false;
        const data = JSON.parse(action.payload);
        const wallet = data.wallet;
        let nft = [];
        data.data.forEach((item) => {
          if (!item.account.used && item.account.authority === wallet.publicKey) {
            nft.push(item);
          }
        });

        const findal = nft.map((item, index) => {
          const random = Math.floor(Math.random() * 10) + 1;
          const data = {
            image: `/images/nft/Rectangle${random}.png`,
            title: `Test title ${index + 1}`,
            desc: `this is new desc about Test title ${index + 1}`,
            id: item.publicKey,
            quantity: 0,
          };
          return data;
        });

        state.data = findal;
      })
      .addCase(getAllNFT.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      });
  },
});

export default mintSlice.reducer;
