import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const { token } = useParams();
  const { axios, setToken, navigate, theme, setTheme } = useAppContext();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Call backend using axios
        const { data } = await axios.get(`/api/user/verify/${token}`);

        if (data.success) {
          setStatus("success");
          setMessage(data.message || "Email verified successfully!");
          toast.success("Email verified! Redirecting...");

          // Save token so AppContext logs user in
          localStorage.setItem("token", data.token);
          setToken(data.token);

          // Redirect straight to chatbox (home route)
          setTimeout(() => {
            navigate("/");
          }, 1500);

        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed");
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Verification failed";
        setMessage(errorMessage);
        toast.error(errorMessage);
      }
    };

    if (token) verifyEmail();
  }, [token]);

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

        {status === "verifying" && (
          <>
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#A456F7] to-[#3D81F6] flex items-center justify-center shadow-lg">
                <svg className="animate-spin h-10 w-10 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Verifying Your Email</h2>
            <p className="text-gray-600 dark:text-gray-400">Please wait while we verify your email address...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg animate-bounce">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#A456F7] to-[#3D81F6] bg-clip-text text-transparent mb-2">
              Email Verified!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{message}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Redirecting you to your chatbox...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">Verification Failed</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>

            <button
              onClick={() => navigate("/register")}
              className="bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Try Registering Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
