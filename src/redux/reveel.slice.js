import { createSlice } from '@reduxjs/toolkit';
import output from '../pages/api/data/output.json';

const initialState = {
  loading: false,
  error: null,
  data: null,
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
});
export const  {getReveelData}  = reveelSlice.actions
export default reveelSlice.reducer;
