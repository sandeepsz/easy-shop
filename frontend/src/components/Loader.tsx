import { Radiation } from "lucide-react";

const InitialLoader = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen bg-gray-900">
      <p className="text-3xl font-bold text-emerald-400">Easy Shop</p>
      <Radiation className="text-emerald-600 w-20 h-20 animate-spin" />
    </div>
  );
};

export default InitialLoader;
