import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import jwt_decoded from "jwt-decode";
import { api, privateApi } from "../services/setupInterceptor";

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }) => {
    try {
      const response = await api.post("register", {
        username,
        email,
        password,
      });
      // dispatch(registerSuccess(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    try {
      let response = await api.post("login", {
        username,
        password,
      });
      const datas = response.data;
      const decoded = jwt_decoded(datas.accessToken);
      const expire = decoded.exp;
      let resp = { datas, expire };
      // if (datas.accessToken) {
      localStorage.setItem("tkn", JSON.stringify(datas.accessToken));
      localStorage.setItem("exp", JSON.stringify(expire));
      //   localStorage.setItem("user", JSON.stringify(datas.userId));
      // }
      return resp;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (dispatch) => {
  try {
    await api.delete("logout");
    // dispatch(logoutSuccess());
    localStorage.removeItem("tkn");
    // localStorage.removeItem("user");
    localStorage.removeItem("exp");
  } catch (error) {
    console.log(error);
  }
});

export const getUser = createAsyncThunk("USERS", async (uid) => {
  try {
    const user = await privateApi.get(`get-user/${uid}`);
    return user;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  uid: "",
  // tkn: "",
  // exp: "",
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  // reducers: {
  //   loginSuccess(state, action) {
  //     state.token = action.payload.accessToken;
  //     // state.username = action.payload.username;
  //     state.isAuthenticated = true;
  //   },
  //   logoutSuccess(state) {
  //     state.token = null;
  //     state.username = {};
  //     state.isAuthenticated = false;
  //   },
  //   registerSuccess(state, action) {
  //     state.token = action.payload.token;
  //     // state.username = action.payload.username;
  //     state.isAuthenticated = true;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        // state.user = action.payload;
        state.uid = action.payload.datas.userId;
        // state.tkn = action.payload.datas.accessToken;
        // state.exp = action.payload.expire;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        // state.user = {};
        state.uid = "";
        // state.tkn = "";
        // state.exp = "";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        // state.user = {};
        state.uid = "";
        // state.tkn = "";
        // state.exp = "";
      });
    // .addCase(getUser.fulfilled, (state, action) => {
    //   state.user = action.payload;
    // });
  },
});

const persistConfig = {
  key: "auth",
  storage,
};

// const { reducer } = authSlice;
export default persistReducer(persistConfig, authSlice.reducer);
