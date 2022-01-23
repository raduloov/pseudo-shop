import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    cartIsVisible: false,
    orderScreenIsVisible: false,
  },
  reducers: {
    toggleCart(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    toggleOrderScreen(state) {
      state.orderScreenIsVisible = !state.orderScreenIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
