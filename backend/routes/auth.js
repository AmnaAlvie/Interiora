const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .exists()
    .withMessage('Password is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', authenticateToken, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        preferences: req.user.preferences,
        createdAt: req.user.createdAt
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
  authenticateToken,
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, preferences } = req.body;
    const updateData = {};
    
    if (name) updateData.name = name;
    if (preferences) updateData.preferences = preferences;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        preferences: user.preferences
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
});

// @route   GET /api/auth/test
// @desc    Test authentication
// @access  Private
router.get('/test', authenticateToken, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Authentication working!',
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
      }
    });
  } catch (error) {
    console.error('Test route error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during test'
    });
  }
});

// @route   GET /api/auth/liked-images
// @desc    Get user's liked images
// @access  Private
router.get('/liked-images', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('likedImages');
    
    res.json({
      success: true,
      likedImages: user.likedImages || [],
      count: user.likedImages ? user.likedImages.length : 0
    });

  } catch (error) {
    console.error('Get liked images error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching liked images'
    });
  }
});

// @route   POST /api/auth/liked-images
// @desc    Add image to liked images
// @access  Private
router.post('/liked-images', [
  authenticateToken,
  body('imageId').notEmpty().withMessage('Image ID is required'),
  body('imageUrl').isURL().withMessage('Valid image URL is required'),
  body('altDescription').optional().trim(),
  body('authorName').optional().trim(),
  body('authorUsername').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      imageId,
      imageUrl,
      fullImageUrl,
      regularImageUrl,
      altDescription,
      description,
      authorName,
      authorUsername,
      authorProfileImage,
      likes,
      unsplashUrl,
      tags
    } = req.body;

    const user = await User.findById(req.user._id);

    // Check if image is already liked
    const isAlreadyLiked = user.likedImages && user.likedImages.some(img => img.imageId === imageId);
    if (isAlreadyLiked) {
      return res.status(400).json({
        success: false,
        message: 'Image already liked'
      });
    }

    // Add image to liked images
    const newLikedImage = {
      imageId,
      imageUrl,
      fullImageUrl,
      regularImageUrl,
      altDescription: altDescription || 'Interior design',
      description: description || '',
      authorName: authorName || 'Unknown',
      authorUsername: authorUsername || '',
      authorProfileImage: authorProfileImage || '',
      likes: likes || 0,
      unsplashUrl: unsplashUrl || '',
      tags: tags || [],
      createdAt: new Date()
    };

    if (!user.likedImages) {
      user.likedImages = [];
    }
    user.likedImages.push(newLikedImage);

    await user.save();

    res.status(201).json({
      success: true,
      message: 'Image added to liked images',
      likedImage: newLikedImage,
      totalLiked: user.likedImages.length
    });

  } catch (error) {
    console.error('Add liked image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding liked image'
    });
  }
});

// @route   DELETE /api/auth/liked-images/:imageId
// @desc    Remove image from liked images
// @access  Private
router.delete('/liked-images/:imageId', authenticateToken, async (req, res) => {
  try {
    const { imageId } = req.params;

    const user = await User.findById(req.user._id);

    if (!user.likedImages || user.likedImages.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No liked images found'
      });
    }

    // Find and remove the image
    const initialLength = user.likedImages.length;
    user.likedImages = user.likedImages.filter(img => img.imageId !== imageId);

    if (user.likedImages.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: 'Image not found in liked images'
      });
    }

    await user.save();

    res.json({
      success: true,
      message: 'Image removed from liked images',
      totalLiked: user.likedImages.length
    });

  } catch (error) {
    console.error('Remove liked image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while removing liked image'
    });
  }
});

// PROJECT ROUTES

// @route   GET /api/auth/projects
// @desc    Get user's projects
// @access  Private
router.get('/projects', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('projects');
    
    res.json({
      success: true,
      projects: user.projects || [],
      count: user.projects ? user.projects.length : 0
    });

  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching projects'
    });
  }
});

// @route   POST /api/auth/projects
// @desc    Create new project
// @access  Private
router.post('/projects', [
  authenticateToken,
  body('name').trim().isLength({ min: 1 }).withMessage('Project name is required'),
  body('description').optional().trim(),
  body('roomType').optional().isIn(['living-room', 'bedroom', 'kitchen', 'bathroom', 'dining-room', 'office', 'outdoor', 'other']),
  body('style').optional().isIn(['modern', 'traditional', 'scandinavian', 'boho', 'minimalist', 'rustic', 'industrial', 'eclectic', 'other'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, description, roomType, style, notes, budget } = req.body;

    const user = await User.findById(req.user._id);

    const newProject = {
      name,
      description: description || '',
      roomType: roomType || 'other',
      style: style || 'other',
      notes: notes || '',
      budget: budget || {},
      images: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (!user.projects) {
      user.projects = [];
    }
    user.projects.push(newProject);

    await user.save();

    // Get the created project (last one added)
    const createdProject = user.projects[user.projects.length - 1];

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project: createdProject,
      totalProjects: user.projects.length
    });

  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating project'
    });
  }
});

// @route   PUT /api/auth/projects/:projectId
// @desc    Update project
// @access  Private
router.put('/projects/:projectId', [
  authenticateToken,
  body('name').optional().trim().isLength({ min: 1 }),
  body('description').optional().trim(),
  body('roomType').optional().isIn(['living-room', 'bedroom', 'kitchen', 'bathroom', 'dining-room', 'office', 'outdoor', 'other']),
  body('style').optional().isIn(['modern', 'traditional', 'scandinavian', 'boho', 'minimalist', 'rustic', 'industrial', 'eclectic', 'other'])
], async (req, res) => {
  try {
    const { projectId } = req.params;
    const updateData = req.body;

    const user = await User.findById(req.user._id);
    const project = user.projects.id(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Update fields
    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        project[key] = updateData[key];
      }
    });
    project.updatedAt = new Date();

    await user.save();

    res.json({
      success: true,
      message: 'Project updated successfully',
      project: project
    });

  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating project'
    });
  }
});

// @route   DELETE /api/auth/projects/:projectId
// @desc    Delete project
// @access  Private
router.delete('/projects/:projectId', authenticateToken, async (req, res) => {
  try {
    const { projectId } = req.params;

    const user = await User.findById(req.user._id);
    const project = user.projects.id(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    user.projects.pull(projectId);
    await user.save();

    res.json({
      success: true,
      message: 'Project deleted successfully',
      totalProjects: user.projects.length
    });

  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting project'
    });
  }
});

// @route   POST /api/auth/projects/:projectId/images
// @desc    Add image to project
// @access  Private
router.post('/projects/:projectId/images', [
  authenticateToken,
  body('imageId').notEmpty().withMessage('Image ID is required'),
  body('imageUrl').isURL().withMessage('Valid image URL is required')
], async (req, res) => {
  try {
    const { projectId } = req.params;
    const { imageId, imageUrl, fullImageUrl, regularImageUrl, altDescription, authorName, notes } = req.body;

    const user = await User.findById(req.user._id);
    const project = user.projects.id(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if image already exists in project
    const imageExists = project.images.some(img => img.imageId === imageId);
    if (imageExists) {
      return res.status(400).json({
        success: false,
        message: 'Image already exists in this project'
      });
    }

    const newImage = {
      imageId,
      imageUrl,
      fullImageUrl: fullImageUrl || imageUrl,
      regularImageUrl: regularImageUrl || imageUrl,
      altDescription: altDescription || 'Interior design',
      authorName: authorName || 'Unknown',
      notes: notes || '',
      addedAt: new Date()
    };

    project.images.push(newImage);
    project.updatedAt = new Date();

    await user.save();

    res.status(201).json({
      success: true,
      message: 'Image added to project successfully',
      project: project
    });

  } catch (error) {
    console.error('Add image to project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding image to project'
    });
  }
});

// @route   DELETE /api/auth/projects/:projectId/images/:imageId
// @desc    Remove image from project
// @access  Private
router.delete('/projects/:projectId/images/:imageId', authenticateToken, async (req, res) => {
  try {
    const { projectId, imageId } = req.params;

    const user = await User.findById(req.user._id);
    const project = user.projects.id(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const initialLength = project.images.length;
    project.images = project.images.filter(img => img.imageId !== imageId);

    if (project.images.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: 'Image not found in project'
      });
    }

    project.updatedAt = new Date();
    await user.save();

    res.json({
      success: true,
      message: 'Image removed from project successfully',
      project: project
    });

  } catch (error) {
    console.error('Remove image from project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while removing image from project'
    });
  }
});

module.exports = router;
