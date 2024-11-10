import { create } from "zustand";
import { Product } from "./useProductStore";
import axios, { isAxiosError } from "../lib/axios";
import { toast } from "react-hot-toast";
import { khaltiPayloadProps } from "../components/OrderSummary";

interface Coupon {
  _id: string;
  name: string;
  code: string;
  discountPercentage: number;
}
interface CartStore {
  cart: Product[];
  loading: boolean;
  coupon: Coupon | null;
  total: number;
  subtotal: number;
  isCouponApplied: boolean;

  addToCart: (product: Product) => void;
  getCartItems: () => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  calculateTotals: () => void;
  getMyCoupon: () => void;
  removeCoupon: () => void;
  applyCoupon: (code: string) => void;
  createPayment: (khaltiPayload: khaltiPayloadProps) => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  loading: false,
  isCouponApplied: false,

  getMyCoupon: async () => {
    try {
      const response = await axios.get("/coupons");
      set({ coupon: response.data });
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

  applyCoupon: async (code: string) => {
    try {
      const response = await axios.post("/coupons/validate", { code });
      set({ coupon: response.data, isCouponApplied: true });
      get().calculateTotals();
      toast.success("Coupon applied successfully");
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
  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals();
    toast.success("Coupon removed");
  },
  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      set({ cart: res.data });
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
  addToCart: async (product: Product) => {
    try {
      await axios.post("/cart", { productId: product._id });
      toast.success("Product added to cart");

      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id
        );
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });
      get().calculateTotals();
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
  removeFromCart: async (productId: string) => {
    await axios.delete(`/cart`, { data: { productId } });
    set((prevState) => ({
      cart: prevState.cart.filter((item) => item._id !== productId),
    }));
  },

  updateQuantity: async (productId: string, quantity: number) => {
    if (quantity === 0) {
      get().removeFromCart(productId);
      return;
    }

    await axios.put(`/cart/${productId}`, { quantity });
    set((prevState) => ({
      cart: prevState.cart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      ),
    }));
    get().calculateTotals();
  },

  calculateTotals: () => {
    const { cart, coupon } = get();

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    let total = subtotal;

    if (coupon) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }

    set({ subtotal, total });
  },

  createPayment: async (khaltiPayload: khaltiPayloadProps) => {
    try {
      const res = await axios.post(`/payment/khalti`, khaltiPayload, {
        withCredentials: true,
      });
      window.location.href = res.data.data.payment_url;
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
