import {
  setloading,
  setproduct,
  setproducts,
  setLatestProducts,
  setTabProducts,
  setcategories,
} from '../slices/productSlice';
import type { AppDispatch } from '../store';
import apis from '../../config/apis';
import axios from 'axios';

interface Filters {
  title?: string;
  category?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  sort?: string;
  page?: string;
  cursor?: string;
  limit?: string;
}

export const getproducts =
  (filters: Filters = {}) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setloading());

      const finalFilters: Filters = {
        limit: '12',
        ...filters,
      };

      const params = new URLSearchParams(
        Object.entries(finalFilters).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            acc[key] = value;
          }
          return acc;
        }, {} as Record<string, string>)
      );

      const { data } = await axios.get(`${apis.prod}?${params}`);

      const { products, total, totalPages, currentPage, nextCursor } = data;

      dispatch(
        setproducts({
          products: products || [],
          total: total || 0,
          totalPages: totalPages ?? null,
          currentPage: currentPage ?? null,
          nextCursor: nextCursor ?? null,
          append: !!filters.cursor,
        })
      );

      if (!filters.cursor) {
        dispatch(setTabProducts(products || []));
      }
    } catch (err: unknown) {
      dispatch(setloading());
      console.log((err as Error).message);
    }
  };

export const getLatestProducts = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axios.get(`${apis.prod}?sort=-createdAt&limit=10`);
    const { products } = data;
    dispatch(setLatestProducts(products || []));
  } catch (err: unknown) {
    console.log((err as Error).message);
  }
};

export const getproduct = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setloading());
    const { data } = await axios.get(`${apis.prod}/${id}`);
    const { singleproduct } = data;
    dispatch(setproduct(singleproduct));
  } catch (err: unknown) {
    dispatch(setloading());
    console.log((err as Error).message);
  }
};

export const getcategories = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setloading());
    const { data } = await axios.get(`${apis.prod}/category`);
    const { categories } = data;
    dispatch(setcategories(categories));
  } catch (err: unknown) {
    dispatch(setloading());
    console.log((err as Error).message);
  }
};