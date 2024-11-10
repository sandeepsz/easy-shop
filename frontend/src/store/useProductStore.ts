import { create } from "zustand";
import toast from "react-hot-toast";
import axios, { isAxiosError } from "../lib/axios";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isFeatured: true;
  quantity: number;
}
interface productStore {
  loading: boolean;
  products: Product[];
  orders: Product[];
  setProducts: (products: Product[]) => void;
  createProduct: (productData: {
    name: string;
    description: string;
    price: string;
    image: string;
  }) => Promise<void>;

  fetchAllProducts: () => Promise<void>;
  toggleFeaturedProduct: (productId: string) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  fetchProductsByCategory: (category: string) => Promise<void>;
  fetchFeaturedProducts: () => Promise<void>;
  fetchFetchOrders: () => Promise<void>;
}

export const useProductStore = create<productStore>((set) => ({
  products: [],
  loading: false,
  orders: [],
  setProducts: (products) => set({ products }),
  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      if (isAxiosError(error)) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("An error occurred during signup");
        }
      }
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products");
      set({ products: response.data.products, loading: false });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("An error occurred during signup");
        }
      }
    }
  },

  toggleFeaturedProduct: async (productId: string) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`/products/${productId}`);
      // this will update the isFeatured prop of the product
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: response.data.isFeatured }
            : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      if (isAxiosError(error)) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("An error occurred during signup");
        }
      }
    }
  },

  deleteProduct: async (productId: string) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);
      set((prevProducts) => ({
        products: prevProducts.products.filter(
          (product) => product._id !== productId
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      if (isAxiosError(error)) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("An error occurred during signup");
        }
      }
    }
  },

  fetchProductsByCategory: async (category: string) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/products/category/${category}`);
      set({ products: response.data.products, loading: false });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("An error occurred during signup");
        }
      }
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products/featured");
      set({ products: response.data, loading: false });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("An error occurred during signup");
        }
      }
    }
  },
  fetchFetchOrders: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products/orders");
      set({ orders: response.data, loading: false });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("An error occurred during signup");
        }
      }
    }
  },
}));
