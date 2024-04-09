import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getAllNFTData from '../pages/api/getAllNft';

const initialState = {
  shop: [],
  data: [],
  item: {},
  loading: false,
  storage: [],
};

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
export const getAllNFTByID = createAsyncThunk('getAllNFTBYId', async (value, { rejectWithValue }) => {
  try {
    const data = await getAllNFTData(value.wallet);
    const final = { wallet: value.wallet, data: data, id: value.id };
    return JSON.stringify(final);
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});

const burnSlice = createSlice({
  name: 'burn',
  initialState,
  reducers: {
    resetState: () => initialState,
    resetData: (state) => {
      state.data = [];
      state.shop = [];
    },
    addNFTQuantity: (state, action) => {
      const item = action.payload;

      state.item = item;
    },
    minNFTQuantity: (state, action) => {
      const item = action.payload;
      if (item.quantity === 0) {
        item.quantity = 0;
      } else {
        item.quantity = item.quantity - 1;
        state.item = item;
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
      console.log(id);
      const findData = state.data.find((item) => item.id == id);
      if (!findData) {
        state.item = null;
      } else {
        findData.quantity = findData?.quantity ? findData?.quantity : 0;
        state.item = findData;
      }
    },
    getStorage: (state) => {
      const data = JSON.parse(window.localStorage.getItem('shops'));
      state.storage = data;
    },
    addStorage: (state, action) => {
      const data = action.payload;
      state.storage = data;
    },
  },
  extraReducers: (builder) => {
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
        let storage = [];
        data.data.forEach((item) => {
          if (!item.account.used && item.account.authority === wallet.publicKey) {
            nft.push(item);
          } else if (item.account.used && item.account.authority === wallet.publicKey) {
            storage.push(item);
          }
        });

        const findal = nft.map((item, index) => {
          console.log(item);
          const data = {
            image: `/images/nft/FC-NFT${(index % 4) + 1}.png`,
            title: `The Fortune Cookie`,
            desc: `Immersive Access Pass`,
            id: item.publicKey,
            quantity: 0,
            price: '1 FTM',
            metadata: item.account.metadata,
            account: item.account,
          };
          return data;
        });
        const finalStorage = storage.map((item, index) => {
          const data = {
            image: `/images/nft/FC-NFT${(index % 4) + 1}.png`,
            title: `The Fortune Cookie`,
            desc: `Immersive Access Pass`,
            id: item.publicKey,
            quantity: 0,
            price: '1 FTM',
            metadata: item.account.metadata,
            account: item.account,
          };
          return data;
        });
        state.storage = finalStorage;
        state.data = findal;
      })
      .addCase(getAllNFT.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      });
    //---------------------------------------------
    builder
      .addCase(getAllNFTByID.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllNFTByID.fulfilled, (state, action) => {
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
          const data = {
            image: `/images/nft/FC-NFT${(index % 5) + 1}.png`,
            title: `FC${String(index + 1).padStart(2, '0')}`,
            desc: `this is new desc about Test title ${index + 1}`,
            id: item.publicKey,
            quantity: 0,
            price: '1 FTM',
          };
          return data;
        });
        const findData = findal.find((item) => item.id === data.id);
        state.item = findData;
      })
      .addCase(getAllNFTByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      });
  },
});

export const {
  resetState,
  addBrnToShop,
  addBurnQuantity,
  minBurnQuantity,
  findBurnData,
  addNFTQuantity,
  minNFTQuantity,
  getStorage,
  addStorage,
  resetData,
} = burnSlice.actions;

export default burnSlice.reducer;
