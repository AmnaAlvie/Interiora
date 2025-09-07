import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const LikedImagesContext = createContext();

export const useLikedImages = () => {
  const context = useContext(LikedImagesContext);
  if (!context) {
    throw new Error('useLikedImages must be used within a LikedImagesProvider');
  }
  return context;
};

export const LikedImagesProvider = ({ children }) => {
  const [likedImages, setLikedImages] = useState(new Set());
  const [likedImagesData, setLikedImagesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated, token } = useAuth();

  // Load liked images when user logs in
  useEffect(() => {
    if (isAuthenticated && user && token) {
      loadLikedImages();
    } else {
      // Clear liked images when user logs out
      setLikedImages(new Set());
      setLikedImagesData([]);
    }
  }, [isAuthenticated, user, token]);

  // Test authentication
  const testAuth = async () => {
    if (!token) {
      console.log('No token available for testing');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/auth/test', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Auth test successful:', response.data);
    } catch (error) {
      console.error('Auth test failed:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
    }
  };

  // Load liked images from backend
  const loadLikedImages = async () => {
    console.log('Loading liked images...', { isAuthenticated, token: token ? 'exists' : 'missing' });
    
    if (!isAuthenticated || !token) {
      console.log('Not authenticated or no token, clearing liked images');
      setLikedImages(new Set());
      setLikedImagesData([]);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/auth/liked-images', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const likedData = response.data.likedImages || [];
      
      console.log('Loaded liked images:', likedData);
      
      // Create Set of image IDs for quick lookup
      const imageIds = new Set(likedData.map(img => img.imageId));
      setLikedImages(imageIds);
      setLikedImagesData(likedData);
    } catch (error) {
      console.error('Error loading liked images:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
      setLikedImages(new Set());
      setLikedImagesData([]);
    } finally {
      setLoading(false);
    }
  };

  // Toggle like status
  const toggleLike = async (imageData) => {
    console.log('Toggle like called', { isAuthenticated, token: token ? 'exists' : 'missing', imageData: imageData.id });
    
    if (!isAuthenticated || !token) {
      console.log('Please log in to like images - not authenticated or no token');
      return false;
    }

    const imageId = imageData.id;
    const isCurrentlyLiked = likedImages.has(imageId);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      console.log('Making API call with config:', config);

      if (isCurrentlyLiked) {
        // Unlike the image
        console.log('Unliking image:', imageId);
        await axios.delete(`http://localhost:5000/api/auth/liked-images/${imageId}`, config);
        
        // Update local state
        const newLikedImages = new Set(likedImages);
        newLikedImages.delete(imageId);
        setLikedImages(newLikedImages);
        
        // Remove from liked images data
        setLikedImagesData(prev => prev.filter(img => img.imageId !== imageId));
        
        console.log(`Successfully unliked image: ${imageId}`);
        return false;
      } else {
        // Like the image
        console.log('Liking image:', imageId);
        const likeData = {
          imageId: imageData.id,
          imageUrl: imageData.urls.small,
          fullImageUrl: imageData.urls.full,
          regularImageUrl: imageData.urls.regular,
          altDescription: imageData.alt_description || 'Interior design',
          description: imageData.description || '',
          authorName: imageData.user?.name || 'Unknown Author',
          authorUsername: imageData.user?.username || 'unknown',
          authorProfileImage: imageData.user?.profile_image?.medium || '',
          likes: imageData.likes || 0,
          unsplashUrl: imageData.links?.html || '',
          tags: imageData.tags ? imageData.tags.map(tag => tag.title).slice(0, 5) : []
        };

        await axios.post('http://localhost:5000/api/auth/liked-images', likeData, config);
        
        // Update local state
        const newLikedImages = new Set(likedImages);
        newLikedImages.add(imageId);
        setLikedImages(newLikedImages);
        
        // Add to liked images data
        setLikedImagesData(prev => [...prev, { ...likeData, createdAt: new Date().toISOString() }]);
        
        console.log(`Successfully liked image: ${imageId}`);
        return true;
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
      return null;
    }
  };

  // Check if image is liked
  const isImageLiked = (imageId) => {
    return likedImages.has(imageId);
  };

  // Get liked images count
  const getLikedCount = () => {
    return likedImages.size;
  };

  const value = {
    likedImages,
    likedImagesData,
    loading,
    toggleLike,
    isImageLiked,
    getLikedCount,
    loadLikedImages,
    testAuth
  };

  return (
    <LikedImagesContext.Provider value={value}>
      {children}
    </LikedImagesContext.Provider>
  );
};
