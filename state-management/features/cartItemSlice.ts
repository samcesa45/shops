import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import axios from 'axios';
import {cartItemType} from '../../type/model';
import AsyncStorage from '@react-native-async-storage/async-storage';

const cartItemLists: cartItemType[] = [];

const cartItemRecord: cartItemType = {
  id: '',
  qty: 0,
  qty_uom: '',
  final_unit_price: 0.0,
  unit_discount_pct: 0,
  status: '',
  product_id: '',
};

const initialState = {
  cartItemLists,
  cartItemRecord,
  getStatus: 'idle',
};

export const getAllCartItems = createAsyncThunk('cartItems/index', async () => {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    throw new Error('token not found');
  }

  const config = {
    headers: {Authorization: `Bearer ${token}`},
    'Cache-Control': 'no-cache',
  };

  try {
    const response = await axios.get(`/v1/cart-items`, config);
    return await response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch cartItems');
  }
});

export const store = createAsyncThunk(
  `cartItems/store`,
  async (values: cartItemType, {rejectWithValue}) => {
    try {
      const response = await axios.post(`/v1/cart-items`, values);
      return await response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCartItemById = createAsyncThunk(
  `cartItems/show`,
  async (id: string, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('token no found');
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
    };

    try {
      const response = await axios.get(`/v1/cart-items/${id}`, {headers});
      return await response.data;
    } catch (err: any) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const update = createAsyncThunk(
  `cartItems/update`,
  async (values: cartItemType, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('token no found');
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
    };
    try {
      // const id = values['id'];
      const response = await axios.put(
        `/v1/cart-items/${values.product_id}`,
        values,
        {
          headers,
        }
      );
      console.log(response.data);
      return await response.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCartItems = createAsyncThunk(
  'cartItems/destroy',
  async (id: string, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No cartItem found');
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
    };
    try {
      const response = await axios.delete(`/v1/cart-items/${id}`, {headers});
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const cartItemSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const itemInCart = state.cartItemLists.find(
        item => item.id === newItem.id
      );
      if (itemInCart) {
        state.cartItemLists = state.cartItemLists.map(item => {
          if (item.id === newItem.id) {
            return {
              ...item,
              qty: item.qty + 1,
              final_unit_price:
                item.final_unit_price + newItem.final_unit_price,
            };
          }
          return item;
        });
      } else {
        state.cartItemLists.push({
          ...newItem,
          qty: 1,
          final_unit_price: newItem.final_unit_price,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItemLists = state.cartItemLists?.filter(
        item => item.id !== action.payload
      );
    },
    incrementQty: (state, action) => {
      const item = state.cartItemLists.find(item => item.id === action.payload);
      if (item) {
        console.log(item.qty);
        item.qty++;
        item.final_unit_price = item.final_unit_price * item.qty;
      }
    },
    decrementQty: (state, action) => {
      const itemIndex = state.cartItemLists.findIndex(
        item => item.id === action.payload
      );
      if (itemIndex !== -1) {
        if (state.cartItemLists[itemIndex].qty === 1) {
          state.cartItemLists.splice(itemIndex, 1);
        } else {
          state.cartItemLists[itemIndex].qty--;
          state.cartItemLists[itemIndex].final_unit_price =
            state.cartItemLists[itemIndex].final_unit_price *
            state.cartItemLists[itemIndex].qty;
        }
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllCartItems.pending, state => {
        state.getStatus = 'pending';
      })
      .addCase(getAllCartItems.fulfilled, (state, action) => {
        if (
          action.payload.hasOwnProperty('success') &&
          action.payload.success === true
        ) {
          state.getStatus = 'succeeded';
          state.cartItemLists = action.payload.data;
        }
      })
      .addCase(getAllCartItems.rejected, state => {
        state.getStatus = 'failed';
      })
      .addCase(store.pending, state => {
        state.getStatus = 'pending';
      })
      .addCase(store.fulfilled, (state, action) => {
        if (
          action.payload.hasOwnProperty('success') &&
          action.payload.success === true
        ) {
          state.getStatus = 'succeeded';
        }
      })
      .addCase(store.rejected, state => {
        state.getStatus = 'failed';
      })
      .addCase(getCartItemById.pending, state => {
        state.getStatus = 'pending';
      })
      .addCase(getCartItemById.fulfilled, (state, action) => {
        if (
          action.payload.hasOwnProperty('success') &&
          action.payload.success === true
        ) {
          state.getStatus = 'succeeded';
          state.cartItemRecord = action.payload.data;
        }
      })
      .addCase(getCartItemById.rejected, state => {
        state.getStatus = 'failed';
      })
      .addCase(update.pending, state => {
        state.getStatus = 'pending';
      })
      .addCase(update.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        console.log(updatedItem);
        const updatedItemIndex = state.cartItemLists.findIndex(
          cartItem => cartItem.id === updatedItem.id
        );
        if (updatedItemIndex !== -1) {
          state.cartItemLists[updatedItemIndex] = updatedItem;
        }
      })

      .addCase(update.rejected, state => {
        state.getStatus = 'failed';
      })
      .addCase(deleteCartItems.pending, state => {
        state.getStatus = 'failed';
      })
      .addCase(deleteCartItems.fulfilled, (state, action) => {
        const deleteCartItemId = action.payload.id;
        state.cartItemLists = state.cartItemLists.filter(
          item => item.id != deleteCartItemId
        );
      })
      .addCase(deleteCartItems.rejected, state => {
        state.getStatus = 'failed';
      });
  },
});

export const selectAllCartItems = (state: RootState) =>
  state.cartItem.cartItemLists;
export const selectCartItemStatus = (state: RootState) =>
  state.cartItem.getStatus;
export const selectCartItemRecord = (state: RootState) =>
  state.cartItem.cartItemRecord;

export const {addToCart, removeFromCart, incrementQty, decrementQty} =
  cartItemSlice.actions;
export default cartItemSlice.reducer;
