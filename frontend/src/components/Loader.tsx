import { Radiation } from "lucide-react";

const InitialLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative">
        <div className="animate-spin rounded-full absolute left-0 top-0">
          <Radiation className="text-emerald-600 w-20 h-20 animate-spin" />
        </div>
        <div className="sr-only">Loading</div>
      </div>
    </div>
  );
};

export default InitialLoader;
