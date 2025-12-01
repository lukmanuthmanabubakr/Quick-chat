import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { axios, setToken, theme, setTheme, navigate } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/user/login", { email, password });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message || "Login successful!");
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#242124] dark:to-[#000000] px-4">
      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed top-4 right-4 p-2 rounded-lg bg-white dark:bg-[#583C79]/20 border border-gray-300 dark:border-white/20 hover:scale-110 transition-transform"
      >
        {theme === "dark" ? "🌞" : "🌙"}
      </button>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 p-8 py-10 w-full max-w-md bg-white dark:bg-gradient-to-b dark:from-[#2a1f3d] dark:to-[#1a1520] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#80609F]/30"
      >
        {/* Header */}
        <div className="text-center mb-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#A456F7] to-[#3D81F6] bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Login to continue to QuickGPT
          </p>
        </div>

        {/* Email Input */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            type="email"
            required
            className="border border-gray-300 dark:border-[#80609F]/30 bg-white dark:bg-[#583C79]/10 rounded-lg w-full p-3 outline-none focus:ring-2 focus:ring-[#A456F7] dark:text-white transition-all"
          />
        </div>

        {/* Password Input */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              required
              className="border border-gray-300 dark:border-[#80609F]/30 bg-white dark:bg-[#583C79]/10 rounded-lg w-full p-3 pr-12 outline-none focus:ring-2 focus:ring-[#A456F7] dark:text-white transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-[#A456F7] hover:text-[#8B4FD9] transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold transition-all mt-2 text-white
            bg-gradient-to-r from-[#A456F7] to-[#3D81F6] hover:from-[#8B4FD9] hover:to-[#3D81F6]
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#A456F7] hover:text-[#8B4FD9] font-semibold transition-colors"
          >
            Create one here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
