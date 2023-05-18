import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, privateApi } from "../services/setupInterceptor";

export const discountPrice = (price, disc) => {
  let afterDisc = price - (price * disc) / 100;
  let priceFrmt = formatRupiahId(afterDisc);
  return priceFrmt;
};

export const formatRupiahId = (price) => {
  let priceRup = price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return priceRup;
};

// buat control get product
export const getProducts = createAsyncThunk("getProducts", async () => {
  const response = await api.get("get-all-product");
  return response.data;
});

// buat control create product
export const createProducts = createAsyncThunk(
  "createProduct",
  async ({ title, price }) => {
    const response = await privateApi.post("XXXXXXXXXXXXXX", {
      title,
      price,
    });
    return response.data;
  }
);

// buat control edit product
export const editProduct = createAsyncThunk(
  "editProduct",
  async ({ id, title, price }) => {
    const response = await privateApi.patch(`products/${id}`, {
      title,
      price,
    });
    return response.data;
  }
);

// buat control delete product
export const deleteProducts = createAsyncThunk(
  "products/deleteProduct",
  async (uuid) => {
    await privateApi.delete(`products/${uuid}`);
    return uuid;
  }
);

// buat control get product dari id
export const getProduct = createAsyncThunk("getProduct", async (prdid) => {
  const response = await privateApi.get(`get-product/${prdid}`);
  console.log(response);
  return response;
});

const initialState = {
  product: [],
  prdbyid: [],
};

// buat createslice product
const productSlice = createSlice({
  name: "product",
  // initialState: productEntity.getInitialState(),
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.prdbyid = action.payload;
      });
  },
});

export default productSlice.reducer;
