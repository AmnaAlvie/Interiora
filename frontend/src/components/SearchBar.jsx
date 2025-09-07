// import React, { useState } from "react";

// export default function SearchBar({ onSearch }) {
//   const [query, setQuery] = useState("");

//   const handleSearch = () => {
//     if (query.trim()) onSearch(query);
//   };

//   return (
//     <div className="flex gap-2 mb-6">
//       <input
//         type="text"
//         placeholder="Search for songs or artists..."
//         className="p-2 rounded w-full text-black"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button
//         onClick={handleSearch}
//         className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
//       >
//         Search
//       </button>
//     </div>
//   );
// }




// import React, { useState } from 'react';
// import axios from 'axios';

// export default function SearchBar({setNowPlaying}) {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);

//   const handleSearch = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/search?q=${query}`);
//       setResults(res.data.data); // this matches Deezer's API structure
//     } catch (err) {
//       console.error("Search failed:", err);
//     }
//   };

//   return (
//     <div className="bg-gray-900 p-4 rounded-lg shadow-md">
//       <div className="flex gap-2">
//         <input
//           type="text"
//           className="flex-1 px-4 py-2 rounded text-white"
//           placeholder="Search for a song or artist..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
//         >
//           Search
//         </button>
//       </div>

//       {/* Display results */}
//       <div className="mt-6 space-y-4">
//         {results.map((track) => (
//           <div
//             key={track.id}
//             className="flex items-center gap-4 bg-[#1a1a1a] p-3 rounded hover:bg-[#2a2a2a] transition"
//           >
//             <img src={track.album.cover_small} alt={track.title} className="w-12 h-12 rounded" />
//             <div className="flex-1">
//               <h4 className="font-semibold">{track.title}</h4>
//               <p className="text-sm text-gray-400">{track.artist.name}</p>
//             </div>
//             <audio controls src={track.preview} className="w-32" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }






// import React, { useState } from 'react';
// import axios from 'axios';

// export default function SearchBar({ setNowPlaying }) {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);

//   const handleSearch = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/search?q=${query}`);
//       setResults(res.data.data); // this matches Deezer's API structure
//     } catch (err) {
//       console.error("Search failed:", err);
//     }
//   };

//   return (
//     <div className="bg-gray-900 p-4 rounded-lg shadow-md">
//       <div className="flex gap-2">
//         <input
//           type="text"
//           className="flex-1 px-4 py-2 rounded text-white bg-gray-800"
//           placeholder="Search for a song or artist..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
//         >
//           Search
//         </button>
//       </div>

//       {/* Display results */}
//       <div className="mt-6 space-y-4">
//         {results.map((track) => (
//           <div
//             key={track.id}
//             className="flex items-center gap-4 bg-[#1a1a1a] p-3 rounded hover:bg-[#2a2a2a] transition"
//           >
//             <img src={track.album.cover_small} alt={track.title} className="w-12 h-12 rounded" />
//             <div className="flex-1">
//               <h4 className="font-semibold">{track.title}</h4>
//               <p className="text-sm text-gray-400">{track.artist.name}</p>
//             </div>

//             {/* 👇 Play Button to trigger Now Playing */}
//             <button
//               onClick={() => setNowPlaying(track)}
//               className="text-green-400 hover:text-green-300 text-lg"
//               title="Play Preview"
//             >
//               ▶️
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// import React, { useState } from 'react';
// import axios from 'axios';

// export default function SearchBar({ setNowPlaying, likeSong }) {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);

//   const handleSearch = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/search?q=${query}`);
//       setResults(res.data.data); // Deezer-style structure
//     } catch (err) {
//       console.error("Search failed:", err);
//     }
//   };

//   return (
//     <div className="bg-gray-900 p-4 rounded-lg shadow-md">
//       <div className="flex gap-2">
//         <input
//           type="text"
//           className="flex-1 px-4 py-2 rounded text-white bg-gray-800"
//           placeholder="Search for a song or artist..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
//         >
//           Search
//         </button>
//       </div>

//       {/* Display results */}
//       <div className="mt-6 space-y-4">
//         {results.map((track) => (
//           <div
//             key={track.id}
//             className="flex items-center gap-4 bg-[#1a1a1a] p-3 rounded hover:bg-[#2a2a2a] transition"
//           >
//             <img src={track.album.cover_small} alt={track.title} className="w-12 h-12 rounded" />
//             <div className="flex-1">
//               <h4 className="font-semibold">{track.title}</h4>
//               <p className="text-sm text-gray-400">{track.artist.name}</p>
//             </div>

//             {/* ▶️ Play preview */}
//             <button
//               onClick={() => setNowPlaying(track)}
//               className="text-green-400 hover:text-green-300 text-lg mr-2"
//               title="Play Preview"
//             >
//               ▶️
//             </button>

//             {/* ❤️ Like button */}
//             <button
//               onClick={() => likeSong(track)}
//               className="text-pink-500 hover:text-pink-400 text-xl"
//               title="Like this song"
//             >
//               ❤️
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }






import React, { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=12`
      );
      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded border text-black"
          placeholder="Search design styles like 'boho', 'minimal'..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-[#A9513C] hover:bg-[#8e3d2a] px-4 py-2 rounded text-white"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {results.map((img) => (
          <div key={img.id} className="rounded overflow-hidden shadow">
            <img
              src={img.urls.small}
              alt={img.alt_description}
              className="w-full h-48 object-cover"
            />
            <p className="text-sm mt-2 text-center">{img.alt_description || "Untitled"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
