import React from "react";

export default function NowPlaying({ nowPlaying }) {
  return (
    <aside className="w-1/4 bg-[#181818] p-4 flex flex-col justify-between">
      {nowPlaying ? (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-center">Now Playing</h3>
          <img src={nowPlaying.album.cover_medium} alt="Album Art" className="rounded mb-4 w-full" />
          <div className="text-center">
            <h4 className="text-xl font-bold">{nowPlaying.title}</h4>
            <p className="text-sm text-gray-400">{nowPlaying.artist.name}</p>
          </div>
          <audio controls autoPlay src={nowPlaying.preview} className="w-full mt-4" />
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>No song playing</p>
        </div>
      )}
    </aside>
  );
}
