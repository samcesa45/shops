import { brandType } from "../../type/model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { RootState } from "../store";

const brandLists: brandType[] = [];

const brandRecord: brandType = {
  id: "",
  name: "",
  created_at: "",
  updated_at: "",
};

const initialState = {
  brandLists,
  brandRecord,
  status: "idle",
};

export const getAllBrands = createAsyncThunk("brand/index", async () => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const headers = {
    Authorization: `Bearer ${token}`,
    "Cache-Control": "no-cache",
  };
  try {
    const response = await axios.get(`/v1/brands`, { headers });
    return response.data;
  } catch (error) {
    throw new Error("failed to fetch brands");
  }
});

export const store = createAsyncThunk(
  "brands/store",
  async (values: any, { rejectWithValue }) => {
    try {
      const storeResponse = await axios.post(`/v1/brands`, values);
      return storeResponse.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBrandById = createAsyncThunk(
  "brands/show",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/v1/brands/${id}`);
      return response.data;
    } catch (err: any) {
      rejectWithValue(err.response.data);
    }
  }
);

export const update = createAsyncThunk(
  "brands/update",
  async (values: any, { rejectWithValue }) => {
    try {
      const id = values.get("id");
      const response = await axios.post(`/v1/brands/${id}`, values);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrands.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        if (
          action.payload.hasOwnProperty("success") &&
          action.payload.success === true
        ) {
          state.status = "succeeded";
          state.brandLists = action.payload.data;
        }
      })
      .addCase(getAllBrands.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getBrandById.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getBrandById.fulfilled, (state, action) => {
        if (
          action.payload.hasOwnProperty("success") &&
          action.payload.success === true
        ) {
          state.status = "succeeded";
          state.brandRecord = action.payload.data;
        }
      })
      .addCase(getBrandById.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(store.pending, (state) => {
        state.status = "pending";
      })
      .addCase(store.fulfilled, (state, action) => {
        if (
          action.payload.hasOwnProperty("success") &&
          action.payload.success === true
        ) {
          state.status = "succeeded";
          state.brandLists = action.payload.data;
        }
      })
      .addCase(store.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(update.pending, (state) => {
        state.status = "pending";
      })
      .addCase(update.fulfilled, (state, action) => {
        if (
          action.payload.hasOwnProperty("success") &&
          action.payload.success === true
        ) {
          state.status = "succeeded";
          state.brandRecord = action.payload.data;
        }
      })
      .addCase(update.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectAllBrands = (state: RootState) => state.brand.brandLists;
export const selectBrandStatus = (state: RootState) => state.brand.status;
export const selectBrandRecord = (state: RootState) => state.brand.brandRecord;

export default brandSlice.reducer;
