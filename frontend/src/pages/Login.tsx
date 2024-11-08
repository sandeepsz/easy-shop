import React from "react";
import InputField from "../components/InputField";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { User, ArrowRight, Lock, Mail, Loader } from "lucide-react";
import Button from "../components/ui/Button";
import { useState } from "react";
import { useUserStore } from "../store/useUserStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = false;

  const { login } = useUserStore();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
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
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              id="email"
              label="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              icon={
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              }
            />

            <InputField
              id="passsword"
              label="Password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
                  Login
                </>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-medium text-emerald-400 hover:text-emerald-300"
            >
              Sign up <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
