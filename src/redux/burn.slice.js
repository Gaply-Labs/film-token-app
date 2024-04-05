import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NFTitems } from '../utils/setting';

export const getBurnFromNFT = createAsyncThunk('getBurnFromNFT', (value) => {
  try {
    console.log(value);
    const id = value.id;
    return id;
  } catch (error) {
    console.log(error);
  }
});

const burnSlice = createSlice({
  name: 'burn',
  initialState: {
    shop: [],
    data: NFTitems,
    item: {},
    loading: false,
  },
  reducers: {
    addNFTQuantity: (state, action) => {
      const id = action.payload;
      const findData = state.data.find((item) => item.id == id);
      findData.quantity = findData.quantity + 1;
      state.item = findData;
    },
    minNFTQuantity: (state, action) => {
      const id = action.payload;
      const findData = state.data.find((item) => item.id == id);
      if (findData.quantity === 0) {
        findData.quantity = 0;
      } else {
        findData.quantity = findData.quantity - 1;
        state.item = findData;
      }
    },
    addBrnToShop: (state, action) => {
      const id = action.payload.id;
      const findData = state.data.find((item) => item.id === id);
      findData.quantity = 1;
      state.data = [...state.data];
      const items = { ...action.payload, quantity: 1 };
      state.shop.push(items);
    },
    addBurnQuantity: (state, action) => {
      const id = action.payload;
      const findData = state.data.find((item) => item.id === id);
      const findDataInShop = state.shop.find((item) => item.id === id);
      findData.quantity = findData.quantity + 1;
      state.data = [...state.data];
      findDataInShop.quantity = findDataInShop.quantity + 1;
      state.shop = [...state.shop];
    },
    minBurnQuantity: (state, action) => {
      const id = action.payload;
      const findData = state.data.find((item) => item.id === id);
      const findDataInShop = state.shop.find((item) => item.id === id);
      findData.quantity = findData.quantity - 1;
      findDataInShop.quantity = findDataInShop.quantity - 1;
      if (findDataInShop.quantity === 0) {
        const filter = state.shop.filter((item) => item.id !== id);
        state.shop = filter;
      } else {
        state.shop = [...state.shop];
      }
      state.data = [...state.data];
    },
    findBurnData: (state, action) => {
      const id = action.payload.id;
      const findData = state.data.find((item) => item.id == id);
      findData.quantity = findData?.quantity ? findData?.quantity : 0;
      state.item = findData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBurnFromNFT.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBurnFromNFT.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        const data = state.data.find((item) => item.id == +id);
        console.log(data);
        state.item = data;
      })
      .addCase(getBurnFromNFT.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addBrnToShop, addBurnQuantity, minBurnQuantity, findBurnData, addNFTQuantity, minNFTQuantity } =
  burnSlice.actions;

export default burnSlice.reducer;
