// store/productsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './index';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  brand: string;
  stock: string;
  thumbnail: string;
}

interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsLoading(state) {
      state.status = 'loading';
    },
    productsReceived(state, action: PayloadAction<Product[]>) {
      state.status = 'succeeded';
      state.products = action.payload;
    },
    productsError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    deleteProduct(state, action: PayloadAction<any>) {
      state.products = state.products.filter(product => product.id !== action.payload.id);
    },
  },
});

export const { productsLoading, productsReceived, productsError, addProduct, deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;

export const fetchProducts = (): AppThunk => async (dispatch) => {
  debugger
  dispatch(productsLoading());
  try {
    const response = await axios.get<Product[]>('/api/products');
    
    dispatch(productsReceived(response.data?.products?.products));
  } catch (error) {
    dispatch(productsError('Failed to fetch products.'));
  }
};