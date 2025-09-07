# 🚀 Quick Setup Guide

## 🔑 Required API Keys & Services

### 1. MongoDB Atlas (Database)
- Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a free account
- Create a new cluster
- Get your connection string
- Format: `mongodb+srv://username:password@cluster.mongodb.net/interiora`

### 2. Unsplash API (Images)
- Go to [Unsplash Developers](https://unsplash.com/developers)
- Create a developer account
- Create a new application
- Get your Access Key
- Free tier: 50 requests/hour

## ⚡ Quick Start Commands

```bash
# Clone and setup
git clone https://github.com/AmnaAlvie/interiora.git
cd interiora

# Backend setup
cd backend
cp .env.example .env
# Edit .env with your actual values
npm install
npm start

# Frontend setup (in new terminal)
cd frontend
cp .env.example .env
# Edit .env with your actual values
npm install
npm run dev
```

## 🔧 Environment Variables Setup

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/interiora
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
VITE_API_URL=http://localhost:5000
```

## 🎯 Default URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## ❗ Important Notes
- Never commit `.env` files to GitHub
- Use strong, unique JWT secrets in production
- Keep your API keys secure
- The `.env.example` files show the required format
