import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios, { isAxiosError } from "../lib/axios";
import toast from "react-hot-toast";
import InitialLoader from "./Loader";
import { Product } from "../store/useProductStore";

const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get("/products/recommendations");
        setRecommendations(res.data);
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.data?.message) {
            toast.error(error.response?.data?.message);
          } else {
            toast.error("An error occurred during signup");
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (isLoading) return <InitialLoader />;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-emerald-400">
        People also bought
      </h3>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg: grid-col-3">
        {recommendations.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default PeopleAlsoBought;
