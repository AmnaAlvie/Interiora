const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxLength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  preferences: {
    favoriteStyles: [String], // Store liked interior design styles
    savedDesigns: [String],   // Store saved design IDs
  },
  likedImages: [{
    imageId: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    fullImageUrl: String,
    regularImageUrl: String,
    altDescription: {
      type: String,
      default: 'Interior design'
    },
    description: String,
    authorName: {
      type: String,
      default: 'Unknown'
    },
    authorUsername: String,
    authorProfileImage: String,
    likes: {
      type: Number,
      default: 0
    },
    unsplashUrl: String,
    tags: [String],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  projects: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    roomType: {
      type: String,
      enum: ['living-room', 'bedroom', 'kitchen', 'bathroom', 'dining-room', 'office', 'outdoor', 'other'],
      default: 'other'
    },
    style: {
      type: String,
      enum: ['modern', 'traditional', 'scandinavian', 'boho', 'minimalist', 'rustic', 'industrial', 'eclectic', 'other'],
      default: 'other'
    },
    notes: {
      type: String,
      trim: true
    },
    budget: {
      min: Number,
      max: Number
    },
    images: [{
      imageId: {
        type: String,
        required: true
      },
      imageUrl: {
        type: String,
        required: true
      },
      fullImageUrl: String,
      regularImageUrl: String,
      altDescription: String,
      authorName: String,
      notes: String, // User's personal notes for this image
      addedAt: {
        type: Date,
        default: Date.now
      }
    }],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Hash password before saving to database
userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);
