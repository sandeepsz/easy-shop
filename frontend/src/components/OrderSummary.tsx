import { motion } from "framer-motion";
import { useCartStore } from "./../store/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export interface khaltiPayloadProps {
  return_url: string | undefined;
  website_url: string | undefined;
  amount: number;
  purchase_order_id: string;
  purchase_order_name: string;
  customer_info: {
    name: string;
    email: string;
    phone: string;
  };
}

const OrderSummary = () => {
  const {
    total,
    subtotal,
    coupon,
    isCouponApplied,
    calculateTotals,
    createPayment,
  } = useCartStore();
  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = Number(total.toFixed(0));
  const formattedSavings = savings.toFixed(2);

  const handlePayment = async () => {
    try {
      const khaltiPayload: khaltiPayloadProps = {
        return_url: "https://easy-shop-dd7k.onrender.com/successful",
        website_url: "https://easy-shop-dd7k.onrender.com",
        amount: formattedTotal,
        purchase_order_id: "testy",
        purchase_order_name: "test",
        customer_info: {
          name: "Sandip Nepali",
          email: "codesandip@gmail.com",
          phone: "9821557346",
        },
      };
      createPayment(khaltiPayload);
    } catch (error) {
      console.error("🍾🍾", error);
      toast.error("Something Went Wrong");
      return null;
    } finally {
      console.log("Payment Successfull");
    }
  };

  useEffect(() => {
    calculateTotals();
  }, [calculateTotals]);

  return (
    <motion.div
      className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl font-semibold text-emerald-400">Order summary</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-300">
              Original price
            </dt>
            <dd className="text-base font-medium text-white">
              Rs.{formattedSubtotal}
            </dd>
          </dl>

          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">Savings</dt>
              <dd className="text-base font-medium text-emerald-400">
                -Rs.{formattedSavings}
              </dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">
                Coupon ({coupon.code})
              </dt>
              <dd className="text-base font-medium text-emerald-400">
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}
          <dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
            <dt className="text-base font-bold text-white">Total</dt>
            <dd className="text-base font-bold text-emerald-400">
              Rs.{formattedTotal}
            </dd>
          </dl>
        </div>

        <motion.button
          className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
        >
          Proceed to Checkout
        </motion.button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-400">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline"
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default OrderSummary;
