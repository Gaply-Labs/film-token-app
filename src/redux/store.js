import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

//----------------------------------------
import burnSlice from './burn.slice';
import mintSlice from './mint.slice';
import RevealSlice from './reveel.slice';
import stateSlice from './state';

const allReducers = combineReducers({
  burn: burnSlice,
  mint: mintSlice,
  Reveal: RevealSlice,
  state: stateSlice,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return allReducers(state, action);
  }
};

const makeStore = () =>
  configureStore({
    reducer: masterReducer,
    devTools: process.env.NODE_ENV === 'development',
  });

export const wrapper = createWrapper(makeStore, {
  // debug: true,
  serializeState: (state) => JSON.stringify(state),
  deserializeState: (state) => JSON.parse(state),
});
