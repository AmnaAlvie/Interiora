// src/pages/Genre.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// export default function Genre() {
//   const { genreName } = useParams();
//   const [tracks, setTracks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const genreMap = {
//     pop: 132,
//     hiphop: 116,
//     party: 113, // you can adjust this or hardcode popular playlists
//     randb: 165,
//     'madeforyou': 0, // fallback
//     'newreleases': 0, // fallback
//   };

//   const genreId = genreMap[genreName.toLowerCase()] || 132;

//   useEffect(() => {
//     const fetchTracks = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`https://api.deezer.com/genre/${genreId}/artists&output=jsonp`);
//         const text = await res.text();

//         // Deezer API returns JSONP, extract the actual JSON
//         const json = JSON.parse(text.match(/\((.*)\)/)[1]);

//         setTracks(json.data || []);
//       } catch (err) {
//         console.error("Error fetching genre data:", err);
//         setTracks([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTracks();
//   }, [genreId]);

//   return (
//     <section className="p-6">
//       <h2 className="text-3xl font-bold mb-4 capitalize">{genreName}</h2>
//       {loading ? (
//         <p>Loading tracks...</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {tracks.map((artist) => (
//             <div key={artist.id} className="bg-gray-900 p-4 rounded-lg text-white text-center">
//               <img src={artist.picture_medium} alt={artist.name} className="w-full h-40 object-cover rounded-md mb-2" />
//               <h4 className="font-semibold">{artist.name}</h4>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ImageModal from "../components/ImageModal";
import { useLikedImages } from "../context/LikedImagesContext";

// Map genre from URL to prettier search queries if needed
const genreMap = {
  minimal: "minimal interior design",
  boho: "boho interior design",
  scandinavian: "scandinavian interior architecture", 
  modern: "modern interior design",
  rustic: "rustic home interior design",
  bohemian: "boho interior design",
  japandi: "japandi interior design",
  eclectic: "eclectic room",
  classic: "classic furniture"
};

export default function Genre() {
  const { genre } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { isImageLiked, toggleLike } = useLikedImages();

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
      const query = genreMap[genre.toLowerCase()] || `${genre} interior design`;

      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20&client_id=${accessKey}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        
        const data = await response.json();
        setImages(data.results || []);
      } catch (error) {
        console.error("Error fetching Unsplash images:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [genre]);

  const handleToggleLike = async (image, event) => {
    if (event) {
      event.stopPropagation(); // Prevent opening modal when clicking heart
    }
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
    <section className="px-6 py-4 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 capitalize text-[#A9513C] font-['Playfair_Display']">
        {genre} Designs
      </h2>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#A9513C]"></div>
          <p className="mt-4 text-gray-600">Loading beautiful {genre} designs...</p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-gray-600">
            Found {images.length} inspiring {genre} designs
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img) => (
              <div 
                key={img.id} 
                className="group relative bg-[#f8f1ee] rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => openImageModal(img)}
              >
                <div className="relative">
                  <img
                    src={img.urls.small}
                    alt={img.alt_description || `${genre} interior design`}
                    className="rounded-t-xl w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Like button overlay */}
                  <button
                    onClick={(e) => handleToggleLike(img, e)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
                      isImageLiked(img.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-700 hover:bg-white/90'
                    }`}
                  >
                    {isImageLiked(img.id) ? 
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
                
                <div className="p-3">
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {img.alt_description || `Beautiful ${genre} interior design`}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>By {img.user.name}</span>
                    <span>❤️ {img.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {images.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No designs found</h3>
              <p className="text-gray-500">
                We couldn't find any {genre} designs at the moment. Try refreshing the page.
              </p>
            </div>
          )}
        </>
      )}
      
      {/* Image Modal */}
      <ImageModal
        image={selectedImage}
        isOpen={isModalOpen}
        onClose={closeImageModal}
      />
    </section>
  );
}
