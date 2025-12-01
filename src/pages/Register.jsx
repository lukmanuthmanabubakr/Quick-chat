import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { axios, navigate, theme, setTheme } = useAppContext();

  const getPasswordStrength = (pass) => {
    if (pass.length === 0) return { strength: "", color: "", text: "" };
    if (pass.length < 6)
      return { strength: "weak", color: "bg-red-500", text: "Weak" };
    if (pass.length < 8)
      return { strength: "fair", color: "bg-yellow-500", text: "Fair" };

    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumbers = /\d/.test(pass);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    const strength = [
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
    ].filter(Boolean).length;

    if (strength >= 3 && pass.length >= 10)
      return { strength: "strong", color: "bg-green-500", text: "Strong" };
    if (strength >= 2 && pass.length >= 8)
      return { strength: "good", color: "bg-blue-500", text: "Good" };
    return { strength: "fair", color: "bg-yellow-500", text: "Fair" };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        toast.success(data.message || "Registration successful!");
        navigate("/check-email");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isPasswordStrongEnough =
    passwordStrength.strength === "good" ||
    passwordStrength.strength === "strong";

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
            Create Account
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Join QuickGPT today
          </p>
        </div>

        {/* Name Input */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter your name"
            className="border border-gray-300 dark:border-[#80609F]/30 bg-white dark:bg-[#583C79]/10 rounded-lg w-full p-3 outline-none focus:ring-2 focus:ring-[#A456F7] dark:text-white transition-all"
            type="text"
            required
          />
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

        {/* Password Input */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>

          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Create a strong password"
              className="border border-gray-300 dark:border-[#80609F]/30 bg-white dark:bg-[#583C79]/10 rounded-lg w-full p-3 pr-12 outline-none focus:ring-2 focus:ring-[#A456F7] dark:text-white transition-all"
              type={showPassword ? "text" : "password"}
              minLength={8}
              required
            />

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                    style={{
                      width:
                        passwordStrength.strength === "weak"
                          ? "25%"
                          : passwordStrength.strength === "fair"
                          ? "50%"
                          : passwordStrength.strength === "good"
                          ? "75%"
                          : "100%",
                    }}
                  ></div>
                </div>
                <span
                  className={`text-xs font-medium ${
                    passwordStrength.strength === "weak"
                      ? "text-red-500"
                      : passwordStrength.strength === "fair"
                      ? "text-yellow-500"
                      : passwordStrength.strength === "good"
                      ? "text-blue-500"
                      : "text-green-500"
                  }`}
                >
                  {passwordStrength.text}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Use 8+ characters with uppercase, lowercase, numbers & symbols
              </p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !isPasswordStrongEnough}
          className={`w-full py-3 rounded-lg font-semibold transition-all mt-2 text-white
    bg-gradient-to-r from-[#A456F7] to-[#3D81F6]
    hover:from-[#8B4FD9] hover:to-[#3D81F6]
    ${
      !isPasswordStrongEnough
        ? "opacity-40 blur-[1px] cursor-not-allowed"
        : "opacity-100"
    }
    ${loading ? "cursor-not-allowed" : "cursor-pointer"}
  `}
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#A456F7] hover:text-[#8B4FD9] font-semibold transition-colors"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
