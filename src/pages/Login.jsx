import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { axios, setToken, theme, setTheme, navigate } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("=== LOGIN ATTEMPT STARTED ===");
    console.log("1. Email:", email);
    console.log("2. Password length:", password.length);
    console.log("3. API Base URL:", axios.defaults.baseURL);

    try {
      console.log("4. Sending login request to /api/user/login");
      const { data } = await axios.post("/api/user/login", { email, password });
      
      console.log("5. Login response received:", data);
      console.log("6. Response success:", data.success);
      console.log("7. Response token:", data.token ? "Token exists" : "No token");
      console.log("8. Response message:", data.message);

      if (data.success) {
        console.log("9. Login successful! Setting token...");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        console.log("10. Token saved to localStorage");
        console.log("11. Token value:", localStorage.getItem("token"));
        toast.success(data.message || "Login successful!");
        console.log("12. Navigating to home page");
        navigate("/");
      } else {
        console.log("9. Login failed - data.success is false");
        console.log("10. Checking if user is verified...");
        console.log("11. data.isVerified:", data.isVerified);
        
        // Check if user is not verified
        if (data.isVerified === false) {
          console.log("12. User is NOT verified");
          toast.error(data.message || "Please verify your email");
          navigate("/not-verified", { state: { email: data.email || email } });
        } else {
          console.log("12. Other login error");
          toast.error(data.message || "Login failed");
        }
      }
    } catch (error) {
      console.log("=== LOGIN ERROR CAUGHT ===");
      console.error("Error object:", error);
      console.log("Error response:", error.response);
      console.log("Error response status:", error.response?.status);
      console.log("Error response data:", error.response?.data);
      console.log("Error message:", error.message);
      
      const errorData = error.response?.data;
      console.log("Parsed error data:", errorData);
      console.log("Error isVerified:", errorData?.isVerified);
      
      // Check if user is not verified
      if (errorData?.isVerified === false) {
        console.log("User is NOT verified (from error)");
        toast.error(errorData.message || "Please verify your email");
        navigate("/not-verified", { state: { email: errorData.email || email } });
      } else {
        console.log("Other error - showing error message");
        const errorMessage = errorData?.message || error.message || "Login failed";
        console.log("Error message to display:", errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      console.log("=== LOGIN ATTEMPT FINISHED ===");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#242124] dark:to-[#000000] transition-colors duration-300 px-4">
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
            className="border border-gray-300 dark:border-[#80609F]/30 bg-white dark:bg-[#583C79]/10 rounded-lg w-full p-3 outline-none focus:ring-2 focus:ring-[#A456F7] dark:text-white transition-all"
            type="email"
            required
          />
        </div>

        {/* Password Input with Eye Icon */}
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
              className="border border-gray-300 dark:border-[#80609F]/30 bg-white dark:bg-[#583C79]/10 rounded-lg w-full p-3 pr-12 outline-none focus:ring-2 focus:ring-[#A456F7] dark:text-white transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Forgot Password Link */}
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
          className="bg-gradient-to-r from-[#A456F7] to-[#3D81F6] hover:from-[#8B4FD9] hover:to-[#3D81F6] text-white w-full py-3 rounded-lg font-semibold cursor-pointer transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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