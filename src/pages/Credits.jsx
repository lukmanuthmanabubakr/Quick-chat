import React, { useEffect, useState } from "react";
import { dummyPlans } from "../assets/assets";
import Loading from "./Loading";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Credits = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, axios } = useAppContext();

  const fetchPlans = async () => {
    try {
      const { data } = await axios.get("/api/credit/plan", {
        headers: { Authorization: token },
      });

      if (data.success) {
        setPlans(data.plans);
      } else {
        toast.error(data.message || "Failed to fetch plans");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch plans";
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  const purchasePlan = async (planId) => {
    try {
      const { data } = await axios.post(
        "/api/credit/purchase",
        { planId },
        { headers: { Authorization: token } }
      );

      if (data.session && data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.message || "Purchase failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Purchase failed. Please try again.";
      toast.error(errorMessage);
      throw error;
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12 xl:mt-20">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-[#A456F7] to-[#3D81F6] bg-clip-text text-transparent">
          Choose Your Plan
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Select the perfect credit package for your needs
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => {
          const isPro = plan.id === "pro";
          return (
            <div
              key={plan._id}
              className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {isPro && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    POPULAR
                  </span>
                </div>
              )}

              <div
                className={`relative h-full rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
                  isPro
                    ? "bg-gradient-to-br from-[#A456F7]/10 to-[#3D81F6]/10 dark:from-[#A456F7]/20 dark:to-[#3D81F6]/20 border-2 border-[#A456F7] dark:border-[#8B4FD9] shadow-xl hover:shadow-2xl scale-105"
                    : "bg-white/50 dark:bg-[#583C79]/10 border border-gray-300 dark:border-[#80609F]/30 hover:border-[#A456F7]/50 dark:hover:border-[#A456F7]/50 shadow-md hover:shadow-xl hover:scale-105"
                }`}
              >
                <div className="flex flex-col h-full">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#A456F7] to-[#3D81F6] mb-4 shadow-lg">
                      <span className="text-2xl sm:text-3xl">💎</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[#A456F7] to-[#3D81F6] bg-clip-text text-transparent">
                        ${plan.price}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
                      <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#A456F7] to-transparent"></div>
                      <span className="text-lg sm:text-xl font-semibold">
                        {plan.credits}
                      </span>
                      <span className="text-sm">credits</span>
                      <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#3D81F6] to-transparent"></div>
                    </div>

                    {plan.features && plan.features.length > 0 && (
                      <ul className="space-y-2 text-left w-full">
                        {plan.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                          >
                            <svg
                              className="w-5 h-5 text-[#A456F7] dark:text-[#8B4FD9] flex-shrink-0 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      toast.promise(purchasePlan(plan._id), {
                        loading: "Processing...",
                        success: "Redirecting to payment...",
                        error: "Purchase failed",
                      });
                    }}
                    className={`w-full py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                      isPro
                        ? "bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-white shadow-lg hover:shadow-xl hover:scale-105"
                        : "bg-white dark:bg-[#583C79]/30 text-gray-900 dark:text-white border border-gray-300 dark:border-[#80609F]/30 hover:bg-gradient-to-r hover:from-[#A456F7] hover:to-[#3D81F6] hover:text-white hover:border-transparent hover:shadow-lg"
                    }`}
                  >
                    Purchase Now
                  </button>
                </div>

                {isPro && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#A456F7]/20 to-[#3D81F6]/20 blur-xl -z-10 group-hover:blur-2xl transition-all duration-300"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Need a custom plan? Contact our support team
        </p>
      </div>
    </div>
  );
};

export default Credits;
