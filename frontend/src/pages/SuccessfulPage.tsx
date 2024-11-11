import { useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";

const SuccessfulPage = () => {
  const { total, cart, removeFromCart } = useCartStore();
  const [orderId, setOrderId] = useState(null);
  useEffect(() => {
    const confirmPaymentAndCreateOrder = async () => {
      try {
        const res = await axios.post(
          `https://easy-shop-dd7k.onrender.com/api/payment/order`,
          {
            products: cart,
            totalAmount: total,
          }
        );
        if (res.data.success) {
          setOrderId(res.data.data._id);
          for (const item of cart) {
            removeFromCart(item._id);
          }
        } else {
          toast.error("Failed to create order");
        }
      } catch (error) {
        console.error("Error creating order:", error);
        toast.error("Something went wrong while creating order");
      }
    };

    confirmPaymentAndCreateOrder();
  }, [cart, total]);
  return (
    <div className="h-screen flex items-center justify-center px-4">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />

      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-emerald-400 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2">
            Purchase Successful!
          </h1>

          <p className="text-gray-300 text-center mb-2">
            Thank you for your order. {"We're"} processing it now.
          </p>
          <p className="text-emerald-400 text-center text-sm mb-6">
            Check your email for order details and updates.
          </p>
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Order ID</span>
              <span className="text-sm font-semibold text-emerald-400">
                {orderId}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Estimated delivery</span>
              <span className="text-sm font-semibold text-emerald-400">
                2-3 days(Inside Kathmandu Valley)
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center"
            >
              <HandHeart className="mr-2" size={18} />
              Thanks for trusting us!
            </button>
            <Link
              to={"/"}
              className="w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center"
            >
              Continue Shopping
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulPage;
