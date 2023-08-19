import { categoryType } from "../../type/model";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import { setAuthToken } from "../../utils/SetAuthToken";
import AsyncStorage from "@react-native-async-storage/async-storage";

const categoryLists: categoryType[] = [];

const categoryRecord: categoryType = {
  id: "",
  name: "",
  is_hidden: false,
  created_at: "",
  updated_at: "",
  parent_id: null,
};

const initialState = {
  categoryLists,
  categoryRecord,
  status: "idle",
};

export const getAllCategories = createAsyncThunk(
  "category/index",
  async (_, { rejectWithValue }) => {
    // setAuthToken("token");
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      "Cache-Control": "no-cache",
    };
    try {
      const response = await axios.get("/v1/categories", { headers });

      return await response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const store = createAsyncThunk(
  "category/store",
  async (values: any, { rejectWithValue }) => {
    // setAuthToken("token");
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      "Cache-Control": "no-cache",
    };
    try {
      const storeResponse = await axios.post(`/v1/categories`, values, {
        headers,
      });
      return storeResponse.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCategoryById = createAsyncThunk(
  "category/show",
  async (id: string, { rejectWithValue }) => {
    // setAuthToken("token");
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      "Cache-Control": "no-cache",
    };
    try {
      const response = await axios.get(`/v1/categories/${id}`, { headers });

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const update = createAsyncThunk(
  "category/update",
  async (values: any, { rejectWithValue }) => {
    try {
      const id = values.get("id");
      const storeResponse = await axios.post(`/v1/categories/${id}`, values);
      return storeResponse.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// export const deleteCategory = createAsyncThunk(
//   "category/destroy",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(`/v1/categories/${id}`);
//       return await response.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        if (
          action.payload.hasOwnProperty("success") &&
          action.payload.success === true
        ) {
          state.status = "succeeded";
          state.categoryLists = action.payload.data;
        }
      })
      .addCase(getAllCategories.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getCategoryById.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        if (
          action.payload.hasOwnProperty("success") &&
          action.payload.success === true
        ) {
          state.status = "succeeded";
          state.categoryRecord = action.payload.data;
        }
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.status = "failed";
        state.categoryRecord = categoryRecord;
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
          state.categoryLists = action.payload.data;
        }
      })
      .addCase(store.rejected, (state, action) => {
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
          state.categoryRecord = action.payload.data;
        }
      })
      .addCase(update.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectAllCategories = (state: RootState) =>
  state.category.categoryLists;
export const selectCategoryStatus = (state: RootState) => state.category.status;
export const selectCategoryRecord = (state: RootState) =>
  state.category.categoryRecord;

export default categorySlice.reducer;
