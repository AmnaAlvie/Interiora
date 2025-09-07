import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaFolder, FaImage, FaHeart } from "react-icons/fa";
import { useProjects } from "../context/ProjectContext";
import { useLikedImages } from "../context/LikedImagesContext";
import ImageModal from "../components/ImageModal";

const CreateProjectModal = ({ isOpen, onClose, onSubmit, project = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    roomType: 'other',
    style: 'other',
    notes: ''
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        roomType: project.roomType || 'other',
        style: project.style || 'other',
        notes: project.notes || ''
      });
    } else {
      setFormData({
        name: '',
        description: '',
        roomType: 'other',
        style: 'other',
        notes: ''
      });
    }
  }, [project, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  const roomTypes = [
    { value: 'living-room', label: 'Living Room' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'bathroom', label: 'Bathroom' },
    { value: 'dining-room', label: 'Dining Room' },
    { value: 'office', label: 'Office' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'other', label: 'Other' }
  ];

  const styles = [
    { value: 'modern', label: 'Modern' },
    { value: 'traditional', label: 'Traditional' },
    { value: 'scandinavian', label: 'Scandinavian' },
    { value: 'boho', label: 'Boho' },
    { value: 'minimalist', label: 'Minimalist' },
    { value: 'rustic', label: 'Rustic' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'eclectic', label: 'Eclectic' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {project ? 'Edit Project' : 'Create New Project'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9513C]/20 focus:border-[#A9513C]"
              placeholder="e.g., My Dream Living Room"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9513C]/20 focus:border-[#A9513C]"
              rows="2"
              placeholder="Brief description of your project..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Type
            </label>
            <select
              value={formData.roomType}
              onChange={(e) => setFormData(prev => ({ ...prev, roomType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9513C]/20 focus:border-[#A9513C]"
            >
              {roomTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Style
            </label>
            <select
              value={formData.style}
              onChange={(e) => setFormData(prev => ({ ...prev, style: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9513C]/20 focus:border-[#A9513C]"
            >
              {styles.map(style => (
                <option key={style.value} value={style.value}>{style.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9513C]/20 focus:border-[#A9513C]"
              rows="3"
              placeholder="Ideas, color schemes, budget notes, etc..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#A9513C] text-white rounded-lg hover:bg-[#944630] transition-colors"
            >
              {project ? 'Update' : 'Create'} Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, onEdit, onDelete, onViewProject }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRoomTypeLabel = (roomType) => {
    const types = {
      'living-room': 'Living Room',
      'bedroom': 'Bedroom',
      'kitchen': 'Kitchen',
      'bathroom': 'Bathroom',
      'dining-room': 'Dining Room',
      'office': 'Office',
      'outdoor': 'Outdoor',
      'other': 'Other'
    };
    return types[roomType] || 'Other';
  };

  const getStyleLabel = (style) => {
    const styles = {
      'modern': 'Modern',
      'traditional': 'Traditional',
      'scandinavian': 'Scandinavian',
      'boho': 'Boho',
      'minimalist': 'Minimalist',
      'rustic': 'Rustic',
      'industrial': 'Industrial',
      'eclectic': 'Eclectic',
      'other': 'Other'
    };
    return styles[style] || 'Other';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
            <span>{getRoomTypeLabel(project.roomType)}</span>
            <span>•</span>
            <span>{getStyleLabel(project.style)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(project)}
            className="p-2 text-gray-400 hover:text-[#A9513C] transition-colors"
          >
            <FaEdit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(project._id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <FaTrash className="w-4 h-4" />
          </button>
        </div>
      </div>

      {project.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <FaImage className="w-4 h-4" />
            <span>{project.images?.length || 0} images</span>
          </div>
          <span className="text-xs text-gray-400">
            Created {formatDate(project.createdAt)}
          </span>
        </div>
        <button
          onClick={() => onViewProject(project)}
          className="px-4 py-2 text-[#A9513C] border border-[#A9513C] rounded-lg hover:bg-[#A9513C] hover:text-white transition-colors text-sm"
        >
          View Project
        </button>
      </div>
    </div>
  );
};

export default function Projects() {
  const { projects, loading, createProject, updateProject, deleteProject } = useProjects();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleCreateProject = async (projectData) => {
    const success = await createProject(projectData);
    if (success) {
      console.log('Project created successfully');
    }
  };

  const handleUpdateProject = async (projectData) => {
    if (editingProject) {
      const success = await updateProject(editingProject._id, projectData);
      if (success) {
        console.log('Project updated successfully');
        setEditingProject(null);
      }
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const success = await deleteProject(projectId);
      if (success) {
        console.log('Project deleted successfully');
      }
    }
  };

  const openImageModal = (image) => {
    // Convert project image back to Unsplash format for modal
    const unsplashImage = {
      id: image.imageId,
      urls: {
        small: image.imageUrl,
        regular: image.regularImageUrl || image.imageUrl,
        full: image.fullImageUrl || image.imageUrl
      },
      alt_description: image.altDescription,
      user: {
        name: image.authorName,
        username: image.authorName,
        profile_image: { medium: 'https://via.placeholder.com/40' }
      },
      likes: 0,
      links: { html: '' },
      tags: []
    };
    
    setSelectedImage(unsplashImage);
    setIsImageModalOpen(true);
  };

  if (loading) {
    return (
      <div className="px-8 py-6 bg-white min-h-screen">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#A9513C]"></div>
          <p className="mt-4 text-gray-600">Loading your projects...</p>
        </div>
      </div>
    );
  }

  if (selectedProject) {
    return (
      <div className="px-8 py-6 bg-white min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <div>
            <button
              onClick={() => setSelectedProject(null)}
              className="text-[#A9513C] hover:text-[#944630] mb-2"
            >
              ← Back to Projects
            </button>
            <h2 className="text-3xl font-bold text-[#A9513C] font-['Playfair_Display']">
              {selectedProject.name}
            </h2>
            <p className="text-gray-600 mt-1">{selectedProject.description}</p>
          </div>
          <button
            onClick={() => setEditingProject(selectedProject)}
            className="px-4 py-2 bg-[#A9513C] text-white rounded-lg hover:bg-[#944630] transition-colors flex items-center gap-2"
          >
            <FaEdit className="w-4 h-4" />
            Edit Project
          </button>
        </div>

        {selectedProject.notes && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-amber-800 mb-2">Project Notes</h4>
            <p className="text-amber-700">{selectedProject.notes}</p>
          </div>
        )}

        {selectedProject.images && selectedProject.images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {selectedProject.images.map((image) => (
              <div 
                key={image.imageId}
                className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => openImageModal(image)}
              >
                <div className="relative">
                  <img
                    src={image.imageUrl}
                    alt={image.altDescription}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      Click to expand
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {image.altDescription || 'Interior design inspiration'}
                  </p>
                  {image.notes && (
                    <p className="text-xs text-gray-500 italic">"{image.notes}"</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No images in this project yet</h3>
            <p className="text-gray-500 mb-6">
              Start adding images by liking designs and saving them to this project.
            </p>
          </div>
        )}

        {/* Image Modal */}
        <ImageModal
          image={selectedImage}
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
        />

        {/* Edit Project Modal */}
        <CreateProjectModal
          isOpen={!!editingProject}
          onClose={() => setEditingProject(null)}
          onSubmit={handleUpdateProject}
          project={editingProject}
        />
      </div>
    );
  }

  return (
    <div className="px-8 py-6 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#A9513C] font-['Playfair_Display'] mb-2">
            My Projects
          </h2>
          <p className="text-gray-600">
            {projects.length === 0 
              ? "Create your first design project to get started!" 
              : `You have ${projects.length} project${projects.length === 1 ? '' : 's'}`
            }
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-6 py-3 bg-[#A9513C] text-white rounded-xl hover:bg-[#944630] transition-colors flex items-center gap-2"
        >
          <FaPlus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-8xl mb-6">🏠</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">No projects yet</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Create your first project to organize your design ideas by room, style, or theme. 
            Perfect for planning renovations or gathering inspiration!
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-8 py-3 bg-[#A9513C] text-white rounded-xl hover:bg-[#944630] transition-colors"
          >
            Create Your First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={setEditingProject}
              onDelete={handleDeleteProject}
              onViewProject={setSelectedProject}
            />
          ))}
        </div>
      )}

      {/* Create/Edit Project Modal */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProject}
      />

      <CreateProjectModal
        isOpen={!!editingProject}
        onClose={() => setEditingProject(null)}
        onSubmit={handleUpdateProject}
        project={editingProject}
      />
    </div>
  );
}
