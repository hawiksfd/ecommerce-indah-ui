import axios from "axios";
import jwt_decoded from "jwt-decode";
const API_URL = "http://localhost:5500/";

export const API_RAJA = axios.create({
  // method: "GET",
  baseURL: "https://api.rajaongkir.com/starter/",
  qs: { id: "39", province: "5" },
  headers: { key: "50e78f1d48dc9102210f039917c07de8" },
});

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const privateApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

privateApi.interceptors.request.use(
  async (config) => {
    try {
      const currentDate = new Date();
      const token = JSON.parse(localStorage.getItem("tkn"));
      const exp = JSON.parse(localStorage.getItem("exp"));

      if (exp * 1000 > currentDate.getTime()) {
        config.headers["Authorization"] = "Bearer " + token;
      }

      // else if (exp * 3000 + 10000 < currentDate.getTime()) {
      //   await axios.delete("http://localhost:5500/logout");
      // localStorage.removeItem("persist:auth");
      // localStorage.removeItem("exp");
      // localStorage.removeItem("tkn");
      // }
      else {
        const response = await api.get("rtoken");
        const decoded = jwt_decoded(response.data.accessToken);
        const expire = decoded.exp;
        localStorage.setItem("tkn", JSON.stringify(response.data.accessToken));
        localStorage.setItem("exp", JSON.stringify(expire));
        config.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
      }
    } catch (error) {
      console.log(error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateApi.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);
