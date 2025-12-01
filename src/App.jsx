import React, { useState } from "react";
import SideBar from "./components/SideBar";
import { Route, Routes, useLocation } from "react-router-dom";
import ChatBox from "./components/ChatBox";
import Credits from "./pages/Credits";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CheckEmail from "./pages/CheckEmail";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Loading from "./pages/Loading";
import { assets } from "./assets/assets";
import "./assets/prism.css";
import { useAppContext } from "./context/AppContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { user, loadingUser } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Show loading screen while checking authentication
  if (pathname === "/loading" || loadingUser) return <Loading />;

  // Public routes (no authentication required)
  const publicRoutes = [
    "/login",
    "/register",
    "/check-email",
    "/verify-email",
    "/forgot-password",
    "/reset-password"
  ];

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  return (
    <>
      <Toaster position="top-center" />
      
      {/* Public Routes */}
      {isPublicRoute && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      )}

      {/* Protected Routes (requires authentication) */}
      {!isPublicRoute && (
        <>
          {user ? (
            <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white">
              {/* Mobile Menu Toggle */}
              {!isMenuOpen && (
                <img
                  src={assets.menu_icon}
                  className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert z-50"
                  onClick={() => setIsMenuOpen(true)}
                  alt="Menu"
                />
              )}

              <div className="flex h-screen w-screen">
                <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <Routes>
                  <Route path="/" element={<ChatBox />} />
                  <Route path="/credits" element={<Credits />} />
                  <Route path="/community" element={<Community />} />
                </Routes>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#242124] dark:to-[#000000] flex items-center justify-center h-screen w-screen">
              <Login />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default App;