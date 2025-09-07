# 🏠 Interiora - Interior Design Inspiration Platform

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4.svg)](https://tailwindcss.com/)

> Transform your space with curated interior design inspiration. Discover, save, and organize design ideas across multiple aesthetics from minimalist to bohemian styles.

## ✨ Features

- 🎨 **Explore Design Styles** - Browse 6+ curated interior design categories
- 🔍 **Smart Search** - Search with auto-suggestions using Unsplash API
- ❤️ **Save Favorites** - Heart and organize your favorite design inspirations
- 📁 **Project Management** - Create custom projects and mood boards
- 🖼️ **High-Quality Images** - 50K+ professional interior design photos
- 🔐 **Secure Authentication** - JWT-based user authentication system
- 📱 **Responsive Design** - Beautiful UI that works on all devices

## 📸 Screenshots

### 🏠 Welcome Page
![Welcome Page](./assets/welcome.png)
*Professional landing page with curated design showcase*

### 🎨 Browse Design Styles  
![Home Page](./assets/home.png)
*Explore 6+ interior design categories with beautiful layouts*

### 🖼️ Design Gallery
![Gallery View](./assets/search.png)
*High-quality interior design images from Unsplash API*

### 📁 Project Management
![Projects Dashboard](./assets/project.png)
*Create and organize custom mood boards and design collections*


## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- MongoDB Atlas account
- Unsplash API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AmnaAlvie/interiora.git
   cd interiora
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` in the backend folder:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

   Create `.env` in the frontend folder:
   ```env
   VITE_UNSPLASH_ACCESS_KEY=your_unsplash_api_key
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the application**
   ```bash
   # Terminal 1: Start backend server
   cd backend
   npm start

   # Terminal 2: Start frontend development server
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

**Frontend**
- React 18 with Vite, Tailwind CSS for styling
- React Router for navigation
- Framer Motion for animations
- Axios for API calls

**Backend**
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing

**APIs & Services**
- Unsplash API for high-quality images
- MongoDB Atlas for cloud database

## 📂 Project Structure

```
interiora/
├── frontend/                 
│   ├── src/
│   │   ├── components/      
│   │   ├── pages/          
│   │   ├── context/        
│   │   └── assets/         
├── backend/                 
│   ├── models/             
│   ├── routes/             
│   └── middleware/         
└── README.md
```


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


---

<p align="center">Made with ❤️ for interior design enthusiasts</p>
