import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { api, privateApi } from "../services/setupInterceptor";

export const getUser = createAsyncThunk("USERS", async (uid) => {
  try {
    const user = await privateApi.get(`get-user/${uid}`);
    const cityObj = JSON.parse(user?.city);
    const resCity = cityObj.city;
    const resCityId = cityObj.cityId;
    const provObj = JSON.parse(user?.province);
    const resProv = provObj.province;
    const resProvId = provObj.provId;

    return { user, resCity, resProv, resCityId, resProvId };
  } catch (error) {
    console.log(error);
  }
});

export const editProfile = createAsyncThunk(
  "UPDATE_USER",
  async ({ uid, formData }) => {
    try {
      const resp = await privateApi.patch(`edit-user/${uid}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      // return user;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editAddress = createAsyncThunk(
  "UPDATE_ADDRESS",
  async ({ uid, formData }) => {
    try {
      const resp = await privateApi.patch(
        `edit-address-user/${uid}`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      // return user;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  user: {},
  resCity: "",
  resProv: "",
  resCityId: "",
  resProvId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.resCity = action.payload.resCity;
      state.resProv = action.payload.resProv;
      state.resCityId = action.payload.resCityId;
      state.resProvId = action.payload.resProvId;
    });
  },
});

const { reducer } = userSlice;
export default reducer;
