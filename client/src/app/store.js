import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/auth";
import productSlice from "../reducers/productSlice";
import userSlice from "../reducers/user";
import cartSlice from "../reducers/cart";
import AddressSlice from "../reducers/address";

import { persistStore } from "redux-persist";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productSlice,
    user: userSlice,
    cart: cartSlice,
    address: AddressSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
