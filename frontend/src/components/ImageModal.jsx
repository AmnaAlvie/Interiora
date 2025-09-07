import React, { useState } from 'react';
import { FaTimes, FaHeart, FaRegHeart, FaDownload, FaExternalLinkAlt, FaFolder, FaPlus } from 'react-icons/fa';
import { useLikedImages } from '../context/LikedImagesContext';
import { useProjects } from '../context/ProjectContext';

const SaveToProjectModal = ({ isOpen, onClose, image, projects, onSaveToProject }) => {
  const [selectedProject, setSelectedProject] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (selectedProject && image) {
      onSaveToProject(selectedProject, image, notes);
      setSelectedProject('');
      setNotes('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Save to Project</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Project
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9513C]/20 focus:border-[#A9513C]"
            >
              <option value="">Choose a project...</option>
              {projects.map(project => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9513C]/20 focus:border-[#A9513C]"
              rows="3"
              placeholder="Add your thoughts about this design..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!selectedProject}
              className="flex-1 px-4 py-2 bg-[#A9513C] text-white rounded-lg hover:bg-[#944630] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Save to Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageModal = ({ image, isOpen, onClose }) => {
  const { isImageLiked, toggleLike } = useLikedImages();
  const { projects, addImageToProject } = useProjects();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  
  if (!isOpen || !image) return null;

  const isLiked = isImageLiked(image.id);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleToggleLike = async (e) => {
    e.stopPropagation();
    await toggleLike(image);
  };

  const handleSaveToProject = async (projectId, imageData, notes) => {
    const saveData = {
      imageId: imageData.id,
      imageUrl: imageData.urls.small,
      fullImageUrl: imageData.urls.full,
      regularImageUrl: imageData.urls.regular,
      altDescription: imageData.alt_description || 'Interior design',
      authorName: imageData.user?.name || 'Unknown',
      notes: notes
    };

    const success = await addImageToProject(projectId, saveData);
    if (success) {
      console.log('Image saved to project successfully');
    }
  };

  const handleDownload = () => {
    // Trigger download of the image
    const link = document.createElement('a');
    link.href = image.urls.full;
    link.download = `interior-design-${image.id}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
      >
        <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
          >
            <FaTimes className="w-5 h-5 text-gray-700" />
          </button>

          {/* Image */}
          <div className="relative">
            <img
              src={image.urls.regular}
              alt={image.alt_description || 'Interior design'}
              className="w-full max-h-[70vh] object-contain"
            />
            
            {/* Action buttons overlay */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={handleToggleLike}
                className={`p-3 rounded-full backdrop-blur-md transition-all duration-200 ${
                  isLiked
                    ? 'bg-red-500 text-white'
                    : 'bg-white/90 text-gray-700 hover:bg-white'
                }`}
              >
                {isLiked ? <FaHeart className="w-5 h-5" /> : <FaRegHeart className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => setIsSaveModalOpen(true)}
                className="p-3 rounded-full bg-white/90 text-gray-700 hover:bg-white backdrop-blur-md transition-all duration-200"
                title="Save to Project"
              >
                <FaFolder className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleDownload}
                className="p-3 rounded-full bg-white/90 text-gray-700 hover:bg-white backdrop-blur-md transition-all duration-200"
              >
                <FaDownload className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Image details */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {image.alt_description || 'Beautiful Interior Design'}
                </h3>
                <p className="text-gray-600 mb-3">
                  {image.description || 'Discover this stunning interior design inspiration.'}
                </p>
              </div>
            </div>

            {/* Author and stats */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <img
                  src={image.user.profile_image.medium}
                  alt={image.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">{image.user.name}</p>
                  <p className="text-sm text-gray-500">@{image.user.username}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>❤️ {image.likes} likes</span>
                <span>📥 {image.downloads || 0} downloads</span>
                <a
                  href={image.links.html}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#A9513C] hover:text-[#944630] transition-colors duration-200"
                >
                  <FaExternalLinkAlt className="w-3 h-3" />
                  View on Unsplash
                </a>
              </div>
            </div>

            {/* Tags if available */}
            {image.tags && image.tags.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Related tags:</p>
                <div className="flex flex-wrap gap-2">
                  {image.tags.slice(0, 8).map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tag.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save to Project Modal */}
      <SaveToProjectModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        image={image}
        projects={projects}
        onSaveToProject={handleSaveToProject}
      />
    </>
  );
};

export default ImageModal;
