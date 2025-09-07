import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const ProjectContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated, token } = useAuth();

  // Load projects when user logs in
  useEffect(() => {
    if (isAuthenticated && user && token) {
      loadProjects();
    } else {
      setProjects([]);
    }
  }, [isAuthenticated, user, token]);

  // Load projects from backend
  const loadProjects = async () => {
    if (!isAuthenticated || !token) {
      setProjects([]);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/auth/projects', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProjects(response.data.projects || []);
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // Create new project
  const createProject = async (projectData) => {
    if (!isAuthenticated || !token) {
      console.log('Please log in to create projects');
      return null;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/projects', projectData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const newProject = response.data.project;
      setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (error) {
      console.error('Error creating project:', error);
      return null;
    }
  };

  // Update project
  const updateProject = async (projectId, updateData) => {
    if (!isAuthenticated || !token) {
      return null;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/auth/projects/${projectId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const updatedProject = response.data.project;
      setProjects(prev => prev.map(p => p._id === projectId ? updatedProject : p));
      return updatedProject;
    } catch (error) {
      console.error('Error updating project:', error);
      return null;
    }
  };

  // Delete project
  const deleteProject = async (projectId) => {
    if (!isAuthenticated || !token) {
      return false;
    }

    try {
      await axios.delete(`http://localhost:5000/api/auth/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProjects(prev => prev.filter(p => p._id !== projectId));
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  };

  // Add image to project
  const addImageToProject = async (projectId, imageData) => {
    if (!isAuthenticated || !token) {
      return false;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/auth/projects/${projectId}/images`, imageData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const updatedProject = response.data.project;
      setProjects(prev => prev.map(p => p._id === projectId ? updatedProject : p));
      return true;
    } catch (error) {
      console.error('Error adding image to project:', error);
      return false;
    }
  };

  // Remove image from project
  const removeImageFromProject = async (projectId, imageId) => {
    if (!isAuthenticated || !token) {
      return false;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/api/auth/projects/${projectId}/images/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const updatedProject = response.data.project;
      setProjects(prev => prev.map(p => p._id === projectId ? updatedProject : p));
      return true;
    } catch (error) {
      console.error('Error removing image from project:', error);
      return false;
    }
  };

  const value = {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    addImageToProject,
    removeImageFromProject,
    loadProjects
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
