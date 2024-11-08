import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import InputField from "../components/InputField";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import Button from "../components/ui/Button";
import { useUserStore } from "../store/useUserStore";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useUserStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="flex flex-col justify-center py-4 px-8 sm:px-6 lg:px-8">
      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-gray-800 py-2 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="mt-2 text-center text-xl font-semibold text-emerald-400">
            Create your account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              id="name"
              label="Name"
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
              placeholder="Name"
              icon={
                <UserPlus
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              }
            />
            <InputField
              id="email"
              label="Email"
              type="email"
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
              placeholder="you@example.com"
              icon={
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              }
            />
            <InputField
              id="passsword"
              label="Password"
              type="password"
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
              placeholder="********"
              icon={
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              }
            />
            <InputField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              required
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              value={formData.confirmPassword}
              placeholder="********"
              icon={
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              }
            />
            <Button disabled={loading} type="submit" width={"full"}>
              {loading ? (
                <>
                  <Loader
                    className="mr-2 h-5 w-5 animate-spin"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                <>
                  <User className="mr-2 h-5 w-5" aria-hidden="true" />
                  Sign up
                </>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-emerald-400 hover:text-emerald-300"
            >
              Login here <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
export default SignUpPage;
