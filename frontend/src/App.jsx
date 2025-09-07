// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1 className='text-red-500'>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


// import React from "react";
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <div className="bg-black text-white min-h-screen w-full">
//       <Navbar />
//       <div className="p-4">
//         <h1 className="text-4xl font-bold mb-4">Welcome to Your Spotify Clone 🎵</h1>
//         <p className="text-lg">Let’s build something amazing together!</p>
//       </div>
//     </div>
//   );
// }

// export default App;

// import React from "react";
// import Navbar from './components/Navbar';
// import PlaylistCard from "./components/PlaylistCard";
// import BrowseCard from "./BrowseCard";
// import TopBar from "./components/TopBar";
// import Sidebar from "./components/SideBar";


// import madeForYouImg from "./assets/made for you.png";
//  import Party from "./assets/party.png";
// import RandB from "./assets/R&B.png";
//  import hiphop from "./assets/hip-hop.png";
//  import newRel from "./assets/new releases.png";
//  import popImg from "./assets/pop.png";

// export default function App() {
//   return (
//     <div className="flex h-screen text-white overflow-hidden bg-black">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex flex-col flex-1 overflow-y-auto">
//         <TopBar />

//         {/* Browse Section */}
//         <section className="flex-1 px-8 py-6">
//           <h2 className="text-3xl font-bold mb-6">Browse All</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-5">
//             <BrowseCard title="Party" image={Party} bgColor="bg-pink-600" />
//             <BrowseCard title="Hip Hop" image={hiphop} bgColor="bg-purple-600" />
//             <BrowseCard title="Made For You" image={madeForYouImg} bgColor="bg-blue-800" />
//             <BrowseCard title="R&B" image={RandB} bgColor="bg-lime-500" />
//             <BrowseCard title="New Releases" image={newRel} bgColor="bg-orange-600" />
//             <BrowseCard title="Pop" image={popImg} bgColor="bg-sky-600" />
//           </div>
//         </section>
//       </div>

//       {/* Now Playing Panel */}
//       <aside className="w-1/4 bg-[#181818] p-4 flex flex-col justify-between">
//   <div>
//     <h3 className="text-lg font-semibold mb-4 text-center">Now Playing</h3>
//     <img
//       src="https://via.placeholder.com/300x300"
//       alt="Album Art"
//       className="rounded mb-4 w-full"
//     />
//     <div className="text-center">
//       <h4 className="text-xl font-bold">Song Title</h4>
//       <p className="text-sm text-gray-400">Artist Name</p>
//     </div>
//   </div>

//   <div className="mt-6">
//     <div className="flex items-center justify-center gap-4 mb-2">
//       <button className="hover:text-green-500">⏮️</button>
//       <button className="hover:text-green-500">▶️</button>
//       <button className="hover:text-green-500">⏭️</button>
//     </div>
//     <div className="h-1 bg-gray-600 rounded overflow-hidden">
//       <div className="w-1/3 h-full bg-green-500"></div>
//     </div>
//   </div>
// </aside>

//     </div>
//   );
// }








// import React, { useEffect, useState } from "react";
// import Navbar from './components/Navbar';
// import PlaylistCard from "./components/PlaylistCard";
// import BrowseCard from "./BrowseCard";
// import TopBar from "./components/TopBar";
// import Sidebar from "./components/SideBar";
// import SearchBar from "./components/SearchBar";
// import axios from "axios";

// import madeForYouImg from "./assets/made for you.png";
// import Party from "./assets/party.png";
// import RandB from "./assets/R&B.png";
// import hiphop from "./assets/hip-hop.png";
// import newRel from "./assets/new releases.png";
// import popImg from "./assets/pop.png";

// export default function App() {

// const [nowPlaying, setNowPlaying] = useState(null);
//   return (
//     <div className="flex h-screen text-white overflow-hidden bg-black">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex flex-col flex-1 overflow-y-auto">
//         <TopBar />

//        {/* 👉 New Integrated SearchBar Component 👇 */}
//   <div className="px-8 pb-6">
//     <SearchBar setNowPlaying={setNowPlaying} />
//   </div>

//         {/* Browse Section */}
//         <section className="flex-1 px-8 py-6">
//           <h2 className="text-3xl font-bold mb-6">Browse All</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-5">
//             <BrowseCard title="Party" image={Party} bgColor="bg-pink-600" />
//             <BrowseCard title="Hip Hop" image={hiphop} bgColor="bg-purple-600" />
//             <BrowseCard title="Made For You" image={madeForYouImg} bgColor="bg-blue-800" />
//             <BrowseCard title="R&B" image={RandB} bgColor="bg-lime-500" />
//             <BrowseCard title="New Releases" image={newRel} bgColor="bg-orange-600" />
//             <BrowseCard title="Pop" image={popImg} bgColor="bg-sky-600" />
//           </div>
//         </section>
//       </div>

//       {/* Now Playing Panel */}
//       {/* Now Playing Panel */}
// <aside className="w-1/4 bg-[#181818] p-4 flex flex-col justify-between">
//   {nowPlaying ? (
//     <div>
//       <h3 className="text-lg font-semibold mb-4 text-center">Now Playing</h3>
//       <img
//         src={nowPlaying.album.cover_medium}
//         alt="Album Art"
//         className="rounded mb-4 w-full"
//       />
//       <div className="text-center">
//         <h4 className="text-xl font-bold">{nowPlaying.title}</h4>
//         <p className="text-sm text-gray-400">{nowPlaying.artist.name}</p>
//       </div>
//       <audio controls autoPlay src={nowPlaying.preview} className="w-full mt-4" />
//     </div>
//   ) : (
//     <div className="text-center text-gray-500">
//       <p>No song playing</p>
//     </div>
//   )}
// </aside>

//     </div>
//   );
// }




import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LikedImagesProvider } from "./context/LikedImagesContext";
import { ProjectProvider } from "./context/ProjectContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Genre from "./pages/Genre";
import LikedSongs from "./pages/LikeSongs";
import Projects from "./pages/Projects";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";

export default function App() {
  return (
    <AuthProvider>
      <LikedImagesProvider>
        <ProjectProvider>
          <Router>
            <Routes>
              {/* Public routes - standalone without Layout */}
              <Route path="/" element={<Welcome />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes with nested Layout */}
              <Route path="/app" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/app/home" replace />} />
                <Route path="home" element={<Home />} />
                <Route path="search" element={<Search />} />
                <Route path="genre/:genre" element={<Genre />} />
                <Route path="liked-songs" element={<LikedSongs />} />
                <Route path="projects" element={<Projects />} />
              </Route>
              
              {/* Redirect /home to /app/home for backward compatibility */}
              <Route path="/home" element={<Navigate to="/app/home" replace />} />
              
              {/* Catch all route - redirect to welcome */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ProjectProvider>
      </LikedImagesProvider>
    </AuthProvider>
  );
}

