import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    cartIsVisible: false,
    checkoutIsVisible: false,
    orderSuccessIsVisible: false,
  },
  reducers: {
    toggleCart(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    toggleOrderSuccess(state) {
      state.orderSuccessIsVisible = !state.orderSuccessIsVisible;
    },
    toggleCheckout(state) {
      state.checkoutIsVisible = !state.checkoutIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
