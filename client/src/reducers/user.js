import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { api, privateApi } from "../services/setupInterceptor";

export const getUser = createAsyncThunk("USERS", async (uid) => {
  try {
    const user = await privateApi.get(`get-user/${uid}`);
    return user;
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
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

const { reducer } = userSlice;
export default reducer;
