import { Link } from "react-router-dom";
import { FaCartShopping, FaLock, FaUserPlus } from "react-icons/fa6";
import { HiLogout } from "react-icons/hi";
import Button from "./ui/Button";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";
import { ListOrdered } from "lucide-react";

const Navbar = () => {
  const { user, logout, loading } = useUserStore();
  const isAdmin = user && user.role === "admin";

  const { cart } = useCartStore();
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-md shadow-lg z-40 border-b border-emerald-800">
      <div className="container mx-auto px-8 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-emerald-400 mb-4 md:mb-0 items-center space-x-2 flex"
          >
            Easy Shop
          </Link>
          <nav className="flex flex-wrap items-center gap-4">
            <Link to="/" className="">
              Home
            </Link>
            {user && (
              <Link
                to="/cart"
                className="relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                <FaCartShopping
                  className="inline-block mr-1 group-hover:text-emerald-400"
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {isAdmin && (
              <Link
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center"
                to={"/dashboard"}
              >
                <FaLock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}
            {isAdmin && (
              <Link
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center"
                to={"/orders"}
              >
                <ListOrdered className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Orders</span>
              </Link>
            )}

            {user ? (
              <Button
                size={"md"}
                className="text-sm sm:text-base"
                onClick={logout}
                icon={<HiLogout size={18} />}
              >
                {loading ? "Logging out..." : "Logout"}
              </Button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <FaUserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
