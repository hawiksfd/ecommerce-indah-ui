import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { api, privateApi } from "../services/setupInterceptor";

export const getOrderbyUser = createAsyncThunk(
  "GET_ORDER_USER",
  async (uid) => {
    try {
      const resp = await privateApi.get(`get-order-user/${uid}`);
      let data = JSON.parse(resp.cartProduct);
      console.log(data);
      return resp;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  order: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    // builder.addCase(getCartbyUserUid.fulfilled, (state, action) => {
    //   state.order = action.payload;
    // });
  },
});

const { reducer } = orderSlice;
export default reducer;
