import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { api, privateApi } from "../services/setupInterceptor";

export const getCartbyUserUid = createAsyncThunk("CART", async (uid) => {
  try {
    const resp = await privateApi.get(`get-chart-by-user/${uid}`);
    return resp.Chart.chart_items;
  } catch (error) {
    console.log(error);
  }
});

export const addToCart = createAsyncThunk(
  "ADD_CART",
  async ({ pid, uid, qty }) => {
    try {
      let response = await privateApi.post(`add-to-chart/${pid}/${uid}`, {
        qty,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateToChart = createAsyncThunk(
  "UPD_TO_CART",
  async ({ pid, crtid, qty }) => {
    try {
      let response = await privateApi.patch(`update-to-chart/${pid}/${crtid}`, {
        qty,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateChart = createAsyncThunk(
  "UPD_CART",
  async ({ crtid, qty }) => {
    try {
      let response = await privateApi.patch(`update-chart/${crtid}`, {
        qty,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteChartUid = createAsyncThunk("DEL_CARTUID", async (cuid) => {
  try {
    const resp = await privateApi.delete(`delete-chart/${cuid}`);
    return resp;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  cartuid: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCartbyUserUid.fulfilled, (state, action) => {
      state.cartuid = action.payload;
    });
  },
});

const { reducer } = cartSlice;
export default reducer;
