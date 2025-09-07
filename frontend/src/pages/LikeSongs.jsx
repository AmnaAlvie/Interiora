import React, { useState, useEffect } from "react";
import { FaHeart, FaDownload, FaExternalLinkAlt, FaUser } from "react-icons/fa";
import ImageModal from "../components/ImageModal";
import { useLikedImages } from "../context/LikedImagesContext";

export default function LikedDesigns() {
  const { likedImagesData, loading, loadLikedImages, getLikedCount } = useLikedImages();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Ensure we have the latest liked images
    loadLikedImages();
  }, []);

  const openImageModal = (imageData) => {
    // Convert our stored image data back to Unsplash format for the modal
    const unsplashImage = {
      id: imageData.imageId,
      urls: {
        small: imageData.imageUrl,
        regular: imageData.regularImageUrl || imageData.imageUrl,
        full: imageData.fullImageUrl || imageData.imageUrl
      },
      alt_description: imageData.altDescription,
      description: imageData.description,
      user: {
        name: imageData.authorName,
        username: imageData.authorUsername,
        profile_image: {
          medium: imageData.authorProfileImage || 'https://via.placeholder.com/40'
        }
      },
      likes: imageData.likes,
      links: {
        html: imageData.unsplashUrl || ''
      },
      tags: imageData.tags ? imageData.tags.map(tag => ({ title: tag })) : []
    };
    
    setSelectedImage(unsplashImage);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="px-8 py-6 bg-white min-h-screen">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#A9513C]"></div>
          <p className="mt-4 text-gray-600">Loading your liked designs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-6 bg-white min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#A9513C] font-['Playfair_Display'] mb-2">
          Liked Designs
        </h2>
        <p className="text-gray-600">
          {getLikedCount() === 0 
            ? "You haven't liked any designs yet. Start exploring and save your favorites!" 
            : `You have ${getLikedCount()} liked design${getLikedCount() === 1 ? '' : 's'}`
          }
        </p>
      </div>

      {likedImagesData.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-8xl mb-6">💝</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">No liked designs yet</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Discover beautiful interior designs by searching or browsing different styles. 
            Click the heart icon on any design to save it here.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/app/search"
              className="px-6 py-3 bg-[#A9513C] text-white rounded-xl hover:bg-[#944630] transition-colors duration-200"
            >
              Start Searching
            </a>
            <a
              href="/app/home"
              className="px-6 py-3 border border-[#A9513C] text-[#A9513C] rounded-xl hover:bg-[#A9513C] hover:text-white transition-colors duration-200"
            >
              Browse Styles
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {likedImagesData.map((imageData) => (
            <div 
              key={imageData.imageId} 
              className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => openImageModal(imageData)}
            >
              <div className="relative">
                <img
                  src={imageData.imageUrl}
                  alt={imageData.altDescription}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Liked indicator */}
                <div className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full">
                  <FaHeart className="w-4 h-4" />
                </div>

                {/* Date liked overlay */}
                {imageData.createdAt && (
                  <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
                    Liked {formatDate(imageData.createdAt)}
                  </div>
                )}

                {/* Click to expand hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                    Click to expand
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {imageData.altDescription || 'Beautiful interior design'}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <div className="flex items-center gap-1">
                    <FaUser className="w-3 h-3" />
                    <span>{imageData.authorName}</span>
                  </div>
                  <span>❤️ {imageData.likes}</span>
                </div>

                {/* Tags if available */}
                {imageData.tags && imageData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {imageData.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Modal */}
      <ImageModal
        image={selectedImage}
        isOpen={isModalOpen}
        onClose={closeImageModal}
      />
    </div>
  );
}
