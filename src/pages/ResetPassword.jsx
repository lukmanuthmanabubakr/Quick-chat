import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { axios, navigate, theme, setTheme } = useAppContext();

  const getPasswordStrength = (pass) => {
    if (pass.length === 0) return { strength: "", color: "", text: "" };
    if (pass.length < 6) return { strength: "weak", color: "bg-red-500", text: "Weak" };
    if (pass.length < 8) return { strength: "fair", color: "bg-yellow-500", text: "Fair" };
    
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumbers = /\d/.test(pass);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    
    const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;
    
    if (strength >= 3 && pass.length >= 10) return { strength: "strong", color: "bg-green-500", text: "Strong" };
    if (strength >= 2 && pass.length >= 8) return { strength: "good", color: "bg-blue-500", text: "Good" };
    return { strength: "fair", color: "bg-yellow-500", text: "Fair" };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(`/api/user/reset-password/${token}`, { password });

      if (data.success) {
        toast.success(data.message || "Password reset successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(data.message || "Password reset failed");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Password reset failed";
      toast.error(errorMessage);
    } finally {
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
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A456F7] to-[#3D81F6] flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#A456F7] to-[#3D81F6] bg-clip-text text-transparent">
            Reset Password
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Create a new strong password
          </p>
        </div>

        {/* New Password Input */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            New Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter new password"
            className="border border-gray-300 dark:border-[#80609F]/30 bg-white dark:bg-[#583C79]/10 rounded-lg w-full p-3 outline-none focus:ring-2 focus:ring-[#A456F7] dark:text-white transition-all"
            type="password"
            minLength={8}
            required
          />

          {/* Password Strength Indicator */}
          {password && (
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                    style={{
                      width: passwordStrength.strength === "weak" ? "25%" :
                             passwordStrength.strength === "fair" ? "50%" :
                             passwordStrength.strength === "good" ? "75%" : "100%"
                    }}
                  ></div>
                </div>
                <span className={`text-xs font-medium ${
                  passwordStrength.strength === "weak" ? "text-red-500" :
                  passwordStrength.strength === "fair" ? "text-yellow-500" :
                  passwordStrength.strength === "good" ? "text-blue-500" : "text-green-500"
                }`}>
                  {passwordStrength.text}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Use 8+ characters with uppercase, lowercase, numbers & symbols
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Confirm Password
          </label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="Confirm new password"
            className="border border-gray-300 dark:border-[#80609F]/30 bg-white dark:bg-[#583C79]/10 rounded-lg w-full p-3 outline-none focus:ring-2 focus:ring-[#A456F7] dark:text-white transition-all"
            type="password"
            minLength={8}
            required
          />
          
          {/* Password Match Indicator */}
          {confirmPassword && (
            <p className={`text-xs mt-2 ${
              password === confirmPassword ? "text-green-500" : "text-red-500"
            }`}>
              {password === confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || password !== confirmPassword}
          className="bg-gradient-to-r from-[#A456F7] to-[#3D81F6] hover:from-[#8B4FD9] hover:to-[#3D81F6] text-white w-full py-3 rounded-lg font-semibold cursor-pointer transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Resetting Password...
            </span>
          ) : (
            "Reset Password"
          )}
        </button>

        {/* Security Note */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
          <p className="text-xs text-blue-800 dark:text-blue-300">
            <span className="font-semibold">🔒 Security Tip:</span> Choose a unique password you haven't used before.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;