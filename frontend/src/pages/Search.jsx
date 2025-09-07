// import React from "react";
// import SearchBar from "../components/SearchBar";
// import { useOutletContext } from "react-router-dom";

// export default function Search() {
//   const { setNowPlaying } = useOutletContext();

//   return (
//     <div className="px-8 py-6">
//       <SearchBar setNowPlaying={setNowPlaying} />
//     </div>
//   );
  
// }

// import React from "react";
// import SearchBar from "../components/SearchBar";
// import { useOutletContext } from "react-router-dom";

// export default function Search() {
//   const { setNowPlaying } = useOutletContext();

//   const likeSong = async (song) => {
//     const liked = {
//       title: song.title,
//       artist: song.artist.name,
//       album: song.album.title,
//       cover: song.album.cover,
//       preview: song.preview
//     };

//     try {
//       await fetch('http://localhost:3000/likedSongs', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(liked)
//       });
//     } catch (error) {
//       console.error("Error liking song:", error);
//     }
//   };

//   return (
//     <div className="px-8 py-6">
//       <SearchBar setNowPlaying={setNowPlaying} likeSong={likeSong} />
//     </div>
//   );
// }

import React, { useState } from "react";
import { FaSearch, FaHeart, FaRegHeart } from "react-icons/fa";
import ImageModal from "../components/ImageModal";
import { useLikedImages } from "../context/LikedImagesContext";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { isImageLiked, toggleLike, testAuth } = useLikedImages();

  console.log('Search component rendering');

  const performSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    console.log('Searching for:', query);

    try {
      const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
      const searchQuery = `${query} interior design`;
      
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=20&client_id=${accessKey}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await performSearch(searchTerm);
  };

  const handleSuggestionClick = async (suggestion) => {
    setSearchTerm(suggestion);
    await performSearch(suggestion);
  };

  const handleToggleLike = async (image, event) => {
    event.stopPropagation(); // Prevent opening modal when clicking heart
    await toggleLike(image);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="px-8 py-6 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-[#A9513C] font-['Playfair_Display']">Search Interior Designs</h2>
      
      {/* Temporary debug button
      <button 
        onClick={testAuth}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test Auth
      </button> */}
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-2xl">
          <input
            type="text"
            placeholder="Search for design styles, rooms, colors, furniture..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-4 pl-12 pr-24 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A9513C]/20 focus:border-[#A9513C] transition-all duration-200 text-gray-900"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#A9513C] hover:bg-[#944630] disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Search suggestions */}
      {!searchTerm && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Popular searches:</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'modern living room', 'scandinavian bedroom', 'rustic kitchen', 
              'minimalist bathroom', 'boho dining room', 'industrial office',
              'cozy reading nook', 'luxury bedroom', 'small apartment'
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 bg-gray-100 hover:bg-[#A9513C]/10 text-gray-700 hover:text-[#A9513C] rounded-full text-sm transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#A9513C]"></div>
          <p className="mt-4 text-gray-600">Searching for beautiful designs...</p>
        </div>
      )}

      {/* Search results */}
      {searchResults.length > 0 && !loading && (
        <div>
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Found {searchResults.length} designs for "{searchTerm}"
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((image) => (
              <div 
                key={image.id} 
                className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => openImageModal(image)}
              >
                <div className="relative">
                  <img
                    src={image.urls.small}
                    alt={image.alt_description || 'Interior design'}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Like button overlay */}
                  <button
                    onClick={(e) => handleToggleLike(image, e)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
                      isImageLiked(image.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-700 hover:bg-white/90'
                    }`}
                  >
                    {isImageLiked(image.id) ? 
                      <FaHeart className="w-4 h-4" /> : 
                      <FaRegHeart className="w-4 h-4" />
                    }
                  </button>

                  {/* Click to expand hint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      Click to expand
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {image.alt_description || 'Beautiful interior design'}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>By {image.user.name}</span>
                    <span>❤️ {image.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {searchTerm && searchResults.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No designs found</h3>
          <p className="text-gray-500 mb-6">
            We couldn't find any designs for "{searchTerm}". Try different keywords or check the suggestions above.
          </p>
          <button
            onClick={() => setSearchTerm("")}
            className="px-6 py-3 bg-[#A9513C] text-white rounded-xl hover:bg-[#944630] transition-colors duration-200"
          >
            Clear Search
          </button>
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

