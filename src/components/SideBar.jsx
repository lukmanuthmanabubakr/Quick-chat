import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import moment from "moment";
import toast from "react-hot-toast";

// Confirmation Modal Component
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-gradient-to-b dark:from-[#2a1f3d] dark:to-[#1a1520] border border-gray-300 dark:border-[#80609F]/30 rounded-lg shadow-2xl w-full max-w-sm animate-scaleIn">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-[#80609F]/20">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-4 sm:p-5 border-t border-gray-200 dark:border-[#80609F]/20">
          <button
            onClick={onClose}
            className="flex-1 py-2 sm:py-2.5 px-4 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-md hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 sm:py-2.5 px-4 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md hover:from-red-600 hover:to-red-700 transition-all shadow-md"
          >
            Delete
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

const SideBar = ({ isMenuOpen, setIsMenuOpen }) => {
  const {
    chats,
    setSelectedChat,
    theme,
    setTheme,
    user,
    navigate,
    createNewChat,
    axios,
    setChats,
    fetchUsersChats,
    setToken,
    token,
  } = useAppContext();
  
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged out successfully");
  };

  const handleDeleteClick = (e, chatId) => {
    e.stopPropagation();
    setChatToDelete(chatId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const { data } = await axios.post(
        "/api/chat/delete",
        { chatId: chatToDelete },
        { headers: { Authorization: token } }
      );
      if (data.success) {
        setChats((prev) => prev.filter((chat) => chat._id !== chatToDelete));
        await fetchUsersChats();
        toast.success('Chat Deleted');
      }
      setShowDeleteModal(false);
      setChatToDelete(null);
    } catch (error) {
      toast.error(error.messages);
      setShowDeleteModal(false);
      setChatToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setChatToDelete(null);
  };

  return (
    <>
      <div
        className={`fixed md:static inset-y-0 left-0 z-50 flex flex-col h-screen w-full max-w-[280px] sm:max-w-xs md:min-w-72 p-4 sm:p-5 dark:bg-gradient-to-b 
    from-[#242124]/30 to-[#000000]/30 border-r border-[#80609F]/30 
    backdrop-blur-3xl transition-transform duration-300 ease-in-out ${
      !isMenuOpen ? "max-md:-translate-x-full" : "max-md:translate-x-0"
    }`}
      >
        {/* Logo Section */}
        <img
          src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
          alt=""
          className="w-full max-w-[160px] sm:max-w-48 mx-auto md:mx-0"
        />

        {/* New Chat Button */}
        <button
          onClick={createNewChat}
          className="flex justify-center items-center w-full py-2 sm:py-2.5 mt-6 sm:mt-10 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-xs sm:text-sm rounded-md cursor-pointer"
        >
          <span className="mr-2 text-lg sm:text-xl">+</span> New Chat
        </button>

        {/* Search Bar */}
        <div className="flex items-center gap-2 p-2.5 sm:p-3 mt-3 sm:mt-4 border border-gray-400 dark:border-white/20 rounded-md">
          <img
            src={assets.search_icon}
            className="w-3.5 sm:w-4 not-dark:invert"
            alt=""
          />
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            className="text-xs placeholder:text-gray-400 outline-none w-full bg-transparent"
            placeholder="Search conversations"
          />
        </div>

        {/* Recent Chats */}
        {chats.length > 0 && (
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-medium">
            Recent Chats
          </p>
        )}
        <div className="flex-1 overflow-y-auto mt-2 sm:mt-3 text-xs sm:text-sm space-y-2 sm:space-y-3">
          {chats
            .filter((chat) => {
              const text = chat.messages[0]
                ? chat.messages[0].content
                : chat.name;
              return text.toLowerCase().includes(search.toLowerCase());
            })
            .map((chat) => (
              <div
                onClick={() => {
                  navigate("/");
                  setSelectedChat(chat);
                  setIsMenuOpen(false);
                }}
                key={chat._id}
                className="p-2 px-3 sm:px-4 dark:bg-[#57317c]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between items-center group"
              >
                <div className="flex-1 min-w-0">
                  <p className="truncate w-full text-xs sm:text-sm">
                    {chat.messages.length > 0
                      ? chat.messages[0].content.slice(0, 28)
                      : chat.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-[#B1A6C0] mt-0.5">
                    {moment(chat.updatedAt).fromNow()}
                  </p>
                </div>

                <img
                  src={assets.bin_icon}
                  className="hidden group-hover:block w-3.5 sm:w-4 cursor-pointer not-dark:invert ml-2 flex-shrink-0"
                  alt=""
                  onClick={(e) => handleDeleteClick(e, chat._id)}
                />
              </div>
            ))}
        </div>

        {/* Community Images */}
        <div
          onClick={() => {
            navigate("/community");
            setIsMenuOpen(false);
          }}
          className="flex items-center gap-2 p-2.5 sm:p-3 mt-3 sm:mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-[1.02] transition-all"
        >
          <img
            src={assets.gallery_icon}
            alt=""
            className="w-4 sm:w-4.5 not-dark:invert flex-shrink-0"
          />
          <div className="flex flex-col text-xs sm:text-sm">
            <p>Community Images</p>
          </div>
        </div>

        {/* Credit Purchase Option */}
        <div
          onClick={() => {
            navigate("/credits");
            setIsMenuOpen(false);
          }}
          className="flex items-center gap-2 p-2.5 sm:p-3 mt-3 sm:mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-[1.02] transition-all"
        >
          <img
            src={assets.diamond_icon}
            alt=""
            className="w-4 sm:w-4.5 dark:invert flex-shrink-0"
          />
          <div className="flex flex-col text-xs sm:text-sm">
            <p>Credits: {user?.credits}</p>
            <p className="text-[10px] sm:text-xs text-gray-400">
              Purchase credits to use QuickGpt
            </p>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between gap-2 p-2.5 sm:p-3 mt-3 sm:mt-4 border border-gray-300 dark:border-white/15 rounded-md">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <img
              src={assets.theme_icon}
              className="w-3.5 sm:w-4 not-dark:invert"
              alt=""
            />
            <p>Dark Mode</p>
          </div>
          <label className="relative inline-flex cursor-pointer flex-shrink-0">
            <input
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              type="checkbox"
              className="sr-only peer"
              checked={theme === "dark"}
            />
            <div className="w-8 h-4.5 sm:w-9 sm:h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all"></div>
            <span className="absolute left-0.5 top-0.5 sm:left-1 sm:top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-3.5 sm:peer-checked:translate-x-4"></span>
          </label>
        </div>

        {/* User Account */}
        <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 mt-3 sm:mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group">
          <img
            src={assets.user_icon}
            alt=""
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0"
          />
          <p className="flex-1 text-xs sm:text-sm dark:text-primary truncate">
            {user ? user.name : "Login your account"}
          </p>
          {user && (
            <img
              onClick={logout}
              src={assets.logout_icon}
              className="h-4 sm:h-5 cursor-pointer hidden not-dark:invert group-hover:block flex-shrink-0"
              alt=""
            />
          )}
        </div>

        {/* Close Button (Mobile Only) */}
        <img
          onClick={() => setIsMenuOpen(false)}
          src={assets.close_icon}
          alt=""
          className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert"
        />
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Chat"
        message="Are you sure you want to delete this chat? This action cannot be undone."
      />
    </>
  );
};

export default SideBar;