import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, privateApi, API_RAJA } from "../services/setupInterceptor";

export const getProvince = createAsyncThunk("GET_PRVNC", async () => {
  try {
    const resp = await api.get("provinsi");
    let dataProv = JSON.stringify(resp.data.rajaongkir.results);
    let newDataProv = JSON.parse(dataProv);
    let datadis = {
      province_id: "0",
      province: "--- Pilih Provinsi ---",
      disabled: true,
    };
    newDataProv.unshift(datadis);
    return newDataProv;
  } catch (error) {
    console.log(error);
  }
});

export const getCity = createAsyncThunk("GET_CITY", async (id) => {
  try {
    const resp = await api.get(`kota/${id}`);
    let dataCity = JSON.stringify(resp.data.rajaongkir.results);
    let newDataCity = JSON.parse(dataCity);
    let citydis = {
      city_id: "0",
      city_name: "--- Pilih Kota ---",
      disabled: true,
    };
    newDataCity.unshift(citydis);
    return newDataCity;
  } catch (error) {
    console.log(error);
  }
});

export const getShipCost = createAsyncThunk(
  "GET_SHIPCOST",
  async ({ asal, tujuan, berat, kurir }) => {
    try {
      const respCost = await api.get(
        `/ongkos/${asal}/${tujuan}/${berat}/${kurir}`
      );
      let shipCost = JSON.stringify(respCost.data.rajaongkir.results);
      let newshipCost = JSON.parse(shipCost);
      // console.log(newshipCost);
      return newshipCost;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "EDIT_ADDRESS",
  async ({ uid, formDataAddress }) => {
    try {
      const resp = await privateApi.patch(
        `edit-address-user/${uid}`,
        formDataAddress,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      return resp;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  provinsi: [],
  kota: [],
  ongkir: [],
};

const AddressSlice = createSlice({
  name: "address",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProvince.fulfilled, (state, action) => {
      state.provinsi = action.payload;
    });
    builder.addCase(getCity.fulfilled, (state, action) => {
      state.kota = action.payload;
    });
    builder.addCase(getShipCost.fulfilled, (state, action) => {
      state.ongkir = action.payload;
    });
  },
});

const { reducer } = AddressSlice;
export default reducer;
