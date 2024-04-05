import { createSlice } from '@reduxjs/toolkit';
import { NFTitems } from '../utils/setting';

const burnSlice = createSlice({
  name: 'burn',
  initialState: {
    shop: [],
    data: NFTitems,
  },
  reducers: {
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
  },
});

export const { addBrnToShop, addBurnQuantity, minBurnQuantity } = burnSlice.actions;

export default burnSlice.reducer;
