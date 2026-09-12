import { createSlice } from '@reduxjs/toolkit';

export interface Product {
  _id: string;
  title: string;
  subtitle: string;
  price: number;
  category: string;
  brand: string;
  section: string;
  images: string[];
  stock: number;
  rating: number;
  reviews: string[];
  sku: string;
  onSale: boolean;
  discount: number;
  discription: string;
  warranty_information: string;
  dimension: {
    weight: number;
    height: number;
    width: number;
  }
}

interface ProductState {
  products: Product[];
  latestProducts: Product[];
  tabProducts: Product[];
  categories: string[];
  singleproduct: Product | null;
  loader: boolean;
  error: string | null;
  total: number;
  totalPages: number | null;
  currentPage: number | null;
  nextCursor: string | null;
}

const initialState: ProductState = {
  products: [],
  latestProducts: [],
  tabProducts: [],
  categories: [],
  singleproduct: null,
  loader: false,
  error: null,
  total: 0,
  totalPages: null,
  currentPage: null,
  nextCursor: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setloading: (state) => {
      state.loader = true;
    },
    setproducts: (state, { payload }) => {
      state.loader = false;
      state.products = payload.append
        ? [...state.products, ...payload.products]
        : payload.products;
      state.total = payload.total;
      state.totalPages = payload.totalPages;
      state.currentPage = payload.currentPage;
      state.nextCursor = payload.nextCursor;
    },
    setproduct: (state, { payload }) => {
      state.loader = false;
      state.singleproduct = payload;
    },
    setLatestProducts: (state, { payload }) => {
      state.latestProducts = payload;
    },
    setTabProducts: (state, { payload }) => {
      state.tabProducts = payload;
    },
    setcategories: (state, { payload }) => {
      state.loader = false;
      state.categories = payload;
    },
  },
});

export const { setloading, setproducts, setproduct, setLatestProducts, setTabProducts, setcategories } = productSlice.actions;
export default productSlice.reducer;