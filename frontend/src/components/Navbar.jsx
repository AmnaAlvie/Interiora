import React from "react";
// const Navbar = () => {
//   return (
//     <nav className="bg-gray-980 w-full px-6 py-4 flex justify-between items-center">
//       <h1 className="text-2xl font-bold text-green-400">Spotify</h1>
//       <ul className="flex space-x-6 text-sm font-medium">
//         <li className="hover:text-green-300 cursor-pointer">Home</li>
//         <li className="hover:text-green-300 cursor-pointer">Search</li>
//         <li className="hover:text-green-300 cursor-pointer">Library</li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

export default function Navbar() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <button className="bg-gray-800 px-4 py-2 rounded">⬅️</button>
        <button className="bg-gray-800 px-4 py-2 rounded ml-2">➡️</button>
      </div>
      <div>
        <button className="bg-white text-black px-4 py-2 rounded-full">Log In</button>
      </div>
    </div>
  );
}