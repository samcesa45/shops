import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import axios from 'axios';
import {productType} from '../../type/model';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAuthToken} from '../../utils/SetAuthToken';

const productLists: productType[] = [];

const productRecord: productType = {
  id: '',
  name: '',
  description: '',
  qty: 0,
  qty_uom: 1,
  final_unit_price: 0.0,
  unit_discount_price: 0.0,
  image_url: '',
  category_id: '',
  created_at: '',
  updated_at: '',
};

const initialState = {
  productLists,
  productRecord,
  status: 'idle',
};

export const getAllProducts = createAsyncThunk('products/index', async () => {
  // setAuthToken("token");
  const token = await AsyncStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  const config = {
    headers: {Authorization: `Bearer ${token}`},
    'Cache-Control': 'no-cache',
    // params: { sort: sortingOption, value: true },
  };

  try {
    const response = await axios.get(`/v1/products`, config);

    return await response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch products');
  }
});

export const store = createAsyncThunk(
  'products/store',
  async (values: any, {rejectWithValue}) => {
    try {
      const response = await axios.post(`/v1/products`, values);
      return await response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProductById = createAsyncThunk(
  'products/show',
  async (id: string, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No product found');
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
    };
    try {
      const response = await axios.get(`/v1/products/${id}`, {headers});
      return await response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const update = createAsyncThunk(
  'products/update',
  async (values: any, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No product found');
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
    };
    try {
      const id = values.get('id');
      const response = await axios.put(`/v1/products/${id}`, values, {
        headers,
      });
      console.log(response.data);
      return await response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  'products/destroy',
  async (id: string, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No product found');
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
    };
    try {
      const response = await axios.delete(`/v1/products/${id}`, {headers});
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllProducts.pending, state => {
        state.status = 'pending';
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        if (
          action.payload.hasOwnProperty('success') &&
          action.payload.success === true
        ) {
          state.status = 'succeeded';

          state.productLists = action.payload.data;
        }
      })
      .addCase(getAllProducts.rejected, state => {
        state.status = 'failed';
      })
      .addCase(store.pending, state => {
        state.status = 'pending';
      })
      .addCase(store.fulfilled, (state, action) => {
        if (
          action.payload.hasOwnProperty('success') &&
          action.payload.success === true
        ) {
          state.status = 'succeeded';
        }
      })
      .addCase(store.rejected, state => {
        state.status = 'failed';
      })
      .addCase(getProductById.pending, state => {
        state.status = 'pending';
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        if (
          action.payload.hasOwnProperty('success') &&
          action.payload.success === true
        ) {
          state.status = 'succeeded';
          state.productRecord = action.payload.data;
        }
      })
      .addCase(getProductById.rejected, state => {
        state.status = 'failed';
      })
      .addCase(update.pending, state => {
        state.status = 'pending';
      })
      .addCase(update.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        console.log(updatedProduct);
        const updatedProductIndex = state.productLists.findIndex(
          product => product.id === updatedProduct.id
        );
        if (updatedProductIndex !== -1) {
          //replace the old product with the updated one
          state.productLists[updatedProductIndex] = updatedProduct;
        }
      })
      .addCase(update.rejected, state => {
        state.status = 'failed';
      })
      .addCase(deleteProduct.pending, state => {
        state.status = 'pending';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const deletedProductId = action.payload.id;
        state.productLists = state.productLists.filter(
          product => product.id !== deletedProductId
        );
        console.log('deleted');
      })
      .addCase(deleteProduct.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const selectAllProducts = (state: RootState) =>
  state.product.productLists;
export const selectProductStatus = (state: RootState) => state.product.status;
export const selectProductRecord = (state: RootState) =>
  state.product.productRecord;

export default productSlice.reducer;
