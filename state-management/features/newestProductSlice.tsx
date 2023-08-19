import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { productType } from "../../type/model";

const newestProductLists: productType[] = [];
const initialState = {
  newestProductLists,
  status: false,
};

export const getAllNewProducts = createAsyncThunk(
  "getNewestProduct",
  async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Cache-Control": "no-cache",
    };

    try {
      const response = await axios.get("/v1/newest-products", { headers });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch newest products");
    }
  }
);

const newestProductSlice = createSlice({
  name: "newestproducts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllNewProducts.pending, (state) => {
        state.status = false;
      })
      .addCase(getAllNewProducts.fulfilled, (state, action) => {
        if (
          action.payload.hasOwnProperty("success") &&
          action.payload.success === true
        ) {
          state.status = true;
          state.newestProductLists = action.payload.data;
        }
      })
      .addCase(getAllNewProducts.rejected, (state) => {
        state.status = false;
      });
  },
});

export const selectAllNewProducts = (state: RootState) =>
  state.newestProduct.newestProductLists;

export default newestProductSlice.reducer;
