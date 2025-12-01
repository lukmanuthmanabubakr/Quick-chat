import React, { useEffect, useState } from "react";
import { dummyPublishedImages } from "../assets/assets";
import Loading from "./Loading";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Community = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios } = useAppContext();

  const fetchImages = async () => {
    try {
      const { data } = await axios.get("/api/user/published-images");
      if (data.success) {
        setImages(data.images);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-4 sm:p-6 pt-12 xl:px-12 2xl:px-20 w-full mx-auto h-full overflow-y-scroll">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#A456F7] to-[#3D81F6] bg-clip-text text-transparent mb-2">
                Community Gallery
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Explore creative AI-generated artwork from our community
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#A456F7]/10 to-[#3D81F6]/10 border border-[#A456F7]/30">
              <span className="text-xl">🎨</span>
              <span className="text-sm font-semibold text-gray-700 dark:text-white">
                {images.length} Images
              </span>
            </div>
          </div>
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
            {images.map((item, index) => (
              <a
                key={index}
                href={item.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-xl overflow-hidden bg-white dark:bg-[#583C79]/10 border border-gray-200 dark:border-[#80609F]/30 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-in fade-in zoom-in-95 duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={`Created by ${item.userName}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#A456F7] to-[#3D81F6] flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {item.userName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">
                          {item.userName}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <svg
                        className="w-4 h-4 text-gray-700 dark:text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-[#A456F7]/50 transition-all duration-300"></div>
              </a>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#A456F7]/20 to-[#3D81F6]/20 flex items-center justify-center mb-6">
              <span className="text-4xl">🖼️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
              No Images Yet
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
              Be the first to share your AI-generated artwork with the community
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
