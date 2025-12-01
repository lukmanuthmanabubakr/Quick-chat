import React from "react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const CheckEmail = () => {
  const { theme, setTheme } = useAppContext();

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
        {/* Email Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#A456F7] to-[#3D81F6] flex items-center justify-center shadow-lg">
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Header */}
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#A456F7] to-[#3D81F6] bg-clip-text text-transparent mb-4">
          Check Your Email
        </h2>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
        </p>

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <span className="font-semibold">💡 Tip:</span> Check your spam folder if you don't see the email in your inbox.
          </p>
        </div>

        {/* Instructions */}
        <div className="text-left mb-6">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            What's next?
          </p>
          <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-decimal list-inside">
            <li>Open your email inbox</li>
            <li>Find the verification email from QuickGPT</li>
            <li>Click the verification link</li>
            <li>You'll be automatically logged in</li>
          </ol>
        </div>

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

        {/* Back to Login Link */}
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

export default CheckEmail;