import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
type minMaxType = {
  min: number;
  max: number;
};
// type priceType = {
//   price: minMaxType
// };

// type catType = {
//   category: string[];
// };

// type sizeType = {
//   size: string[];
// };

// const price: minMaxType = {
//   min: 0,
//   max: 100,
// };

const initialState = {
  price: [0, 100],
  category: [''],
  brand: [''],
  size: [''],
  color: '',
};
const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPriceFilter: (state, action) => {
      state.price = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.category = action.payload;
    },
    setBrandFilter: (state, action) => {
      state.brand = action.payload;
    },
    setSizeFilter: (state, action) => {
      state.size = action.payload;
    },
    setColorFilter: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const {
  setPriceFilter,
  setCategoryFilter,
  setBrandFilter,
  setSizeFilter,
  setColorFilter,
} = filterSlice.actions;

export const filters = (state: RootState) => state.filter;
export default filterSlice.reducer;
