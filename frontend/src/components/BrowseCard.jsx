// src/components/BrowseCard.jsx
// src/components/BrowseCard.jsx
// src/components/BrowseCard.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const BrowseCard = ({ title, image }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     // convert title to lowercase and remove spaces for routing
//     navigate(`/genre/${title.toLowerCase().replace(/\s/g, '')}`);
//   };

//   return (
//     <div
//       onClick={handleClick}
//       className={`cursor-pointer rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 `}
//     >
      
//       <img
//         src={image}
//         alt={title}
//         className="w-full h-auto object-contain"
//       />
//     </div>
//   );
// };

// export default BrowseCard;


import { useNavigate } from "react-router-dom";

const BrowseCard = ({ title, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const route = title.toLowerCase().replace(/\s+/g, "");
    navigate(`/app/genre/${route}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 bg-gradient-to-br from-[#A9513C] to-[#944630] hover:shadow-xl"
    >
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-3 text-center font-semibold text-white text-lg capitalize bg-gradient-to-t from-black/50 to-transparent">
        {title}
      </div>
    </div>
  );
};

export default BrowseCard;
