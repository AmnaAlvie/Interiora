// src/components/Sidebar.jsx
import React from 'react';
import { FaHome, FaSearch, FaBook, FaPlus, FaHeart, FaFolder } from 'react-icons/fa';

import logo from "../assets/logo.png";

import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen  bg-amber-950 text-white p-4 flex flex-col justify-between">
      <div>
        <div className="mb-6 space-y-9">
            <div className='flex gap-4 '>
          <img src={logo} alt="Interiora" className="w-10 h-10 mb-6" />
          <h3 className=" text-3xl font-['Playfair_Display'] font-bold">Interiora</h3>
</div>
          <nav className="space-y-8">
  <Link to="/app/home" className="flex items-center gap-3 hover:text-amber-200 transition-colors text-xl font-['Playfair_Display'] ">
    <FaHome /> Home
  </Link>
  <Link to="/app/search" className="flex items-center gap-3 hover:text-amber-200 transition-colors text-xl font-['Playfair_Display'] ">
    <FaSearch /> Search
  </Link>
  <Link to="/app/projects" className="flex items-center gap-3 hover:text-amber-200 transition-colors text-xl font-['Playfair_Display'] ">
    <FaFolder /> My Projects
  </Link>
  <Link to="/app/liked-songs" className="flex items-center gap-3 hover:text-amber-200 transition-colors text-xl font-['Playfair_Display'] ">
    <FaHeart /> Liked Designs
  </Link>
</nav>

        </div>

        {/* <div className="space-y-3 mt-8">
          <Link to="/create" className="flex items-center gap-3 hover:text-white">
  <FaPlus className="text-white bg-gray-600 p-1 rounded" /> Create Playlist
</Link>
<Link to="/liked" className="flex items-center text-white gap-3 hover:text-white">
  <FaHeart className="text-white bg-pink-600 p-1 rounded" /> Liked Songs
</Link>

        </div> */}
      </div>

      <footer className="text-xs text-gray-500 mt-6 space-y-1">
        <p>Legal • Privacy • Cookies</p>
        <p>&copy; 2025 Interiora</p>
      </footer>
    </div>
  );
}
