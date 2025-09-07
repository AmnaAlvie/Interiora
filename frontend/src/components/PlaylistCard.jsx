import React from 'react';

export default function PlaylistCard({ title, image }) {
  return (
    <div className="bg-[#242424] p-4 rounded-lg hover:bg-[#2a2a2a] transition-colors cursor-pointer">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded mb-3" />
      <h3 className="text-white font-semibold text-lg">{title}</h3>
    </div>
  );
}
