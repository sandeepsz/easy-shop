import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import AdminPage from "./pages/AdminPage";
import InitialLoader from "./components/Loader";
import CategoryPage from "./pages/Category";
import { useCartStore } from "./store/useCartStore";
import CartPage from "./pages/CartPage";
import SuccessfulPage from "./pages/SuccessfulPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems, cart } = useCartStore();
  console.log(cart);

  useEffect(() => {
    checkAuth();
  }, []);
  useEffect(() => {
    if (!user || cart.length > 0) return;
    getCartItems();
  }, [user]);
  if (checkingAuth) return <InitialLoader />;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(0,255,2,0.3)_0%,rgba(77,153,77,0.3)_45%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div>

      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/dashboard"
            element={
              user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />
            }
          />

          <Route path="/category/:category" element={<CategoryPage />} />
          <Route
            path="/cart"
            element={user ? <CartPage /> : <Navigate to="/login" />}
          />
          <Route path="/successful" element={<SuccessfulPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
