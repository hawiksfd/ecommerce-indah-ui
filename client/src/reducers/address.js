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
    // let newDataCity = dataCity.unshift({
    //   province_id: "0",
    //   province: "--- Pilih Provinsi ---",
    //   disabled: true,
    // });
    console.log(newDataCity);
    return newDataCity;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  provinsi: [],
  kota: [],
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
  },
});

const { reducer } = AddressSlice;
export default reducer;
