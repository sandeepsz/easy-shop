import { create } from "zustand";
import { toast } from "react-hot-toast";

import axios, { isAxiosError } from "./../lib/axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  // Add other user properties as needed
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  checkingAuth: boolean;
  signup: (credentials: SignupCredentials) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const useUserStore = create<AuthStore>((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({
    name,
    email,
    password,
    confirmPassword,
  }: SignupCredentials): Promise<void> => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post<User>("/auth/signup", {
        name,
        email,
        password,
      });

      set({ user: res.data, loading: false });
    } catch (error) {
      set({ loading: false });

      if (error) {
        toast.error("An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  },
  login: async ({ email, password }: LoginCredentials): Promise<void> => {
    set({ loading: true });
    try {
      const res = await axios.post<User>("/auth/login", {
        email,
        password,
      });

      set({ user: res.data, loading: false });
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
  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
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

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.data?.message) {
          console.log(error.response?.data?.message);
        } else {
          toast.error("An error occurred during signup");
        }
      }
      set({ checkingAuth: false, user: null });
    }
  },

  refreshToken: async () => {
    if (get().checkingAuth) return;
    set({ checkingAuth: true });
    try {
      const response = await axios.post("/auth/refresh-token");
      set({ checkingAuth: false });
      return response.data;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },
}));

let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (refreshPromise!) {
          await refreshPromise;
          return axios(originalRequest);
        }

        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
