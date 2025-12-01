import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";

const NotVerified = () => {
  const location = useLocation();
  const email = location.state?.email || "";
  const [loading, setLoading] = useState(false);
  const { axios, theme, setTheme } = useAppContext();

  const handleResendEmail = async () => {
    if (!email) {
      toast.error("Email address is required");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post("/api/user/resend-verification", { email });

      if (data.success) {
        toast.success(data.message || "Verification email sent!");
      } else {
        toast.error(data.message || "Failed to send email");
      }
    } catch (error) {
      console.error("Resend verification error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to send email";
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

      <div className="max-w-md w-full bg-white dark:bg-gradient-to-b dark:from-[#2a1f3d] dark:to-[#1a1520] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#80609F]/30 p-8 text-center">
        {/* Warning Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Header */}
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#A456F7] to-[#3D81F6] bg-clip-text text-transparent mb-4">
          Email Not Verified
        </h2>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          Your account is not verified yet. Please check your email inbox for the verification link.
        </p>

        {email && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            We sent a verification email to <strong className="text-[#A456F7]">{email}</strong>
          </p>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <span className="font-semibold">💡 What to do:</span>
          </p>
          <ul className="text-sm text-blue-800 dark:text-blue-300 mt-2 space-y-1 list-disc list-inside">
            <li>Check your email inbox</li>
            <li>Look for an email from QuickGPT</li>
            <li>Click the verification link</li>
            <li>If not found, check spam folder</li>
          </ul>
        </div>

        {/* Resend Email Button */}
        <button
          onClick={handleResendEmail}
          disabled={loading || !email}
          className="w-full py-3 rounded-lg font-semibold transition-all mb-4 text-white
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
              Sending...
            </span>
          ) : (
            "Resend Verification Email"
          )}
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-[#1a1520] text-gray-500 dark:text-gray-400">
              or
            </span>
          </div>
        </div>

        {/* Back to Login */}
        <Link
          to="/login"
          className="inline-block text-[#A456F7] hover:text-[#8B4FD9] font-semibold transition-colors"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default NotVerified;