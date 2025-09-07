// import React, { useState } from "react";
// import Sidebar from "../components/SideBar";
// import TopBar from "../components/TopBar";
// import NowPlaying from "../components/NowPlaying"; // We'll create this
// import { Outlet } from "react-router-dom";

// export default function Layout() {
//   const [nowPlaying, setNowPlaying] = useState(null);

//   return (
//     <div className="flex h-screen text-white overflow-hidden bg-red-900">
//       <Sidebar />

//       <div className="flex flex-col flex-1 overflow-y-auto">
//         <TopBar />
//         <Outlet context={{ nowPlaying, setNowPlaying }} />
//       </div>

//       <NowPlaying nowPlaying={nowPlaying} />
//     </div>
//   );
// }


import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import TopBar from "../components/TopBar";
//import NowPlaying from "../components/NowPlaying";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [nowPlaying, setNowPlaying] = useState(null);

  return (
    <div className="flex h-screen text-black bg-gradient-to-br from-[#fff8f4] via-[#f5e6d3] to-[#e8d5b7] overflow-hidden">
      {/* Sidebar - consistent brownish red */}
      <div className="bg-[#A9513C] text-white">
        <Sidebar />
      </div>

      {/* Main content - white with warm background */}
      <div className="flex flex-col flex-1 overflow-y-auto bg-white">
        <TopBar />
        {/* Use Outlet for nested routes */}
        <div className="flex-1">
          <Outlet context={{ nowPlaying, setNowPlaying }} />
        </div>
      </div>

      {/* NowPlaying - red */}
      {/* <div className="bg-red-900 text-white">
        <NowPlaying nowPlaying={nowPlaying} />
      </div> */}
    </div>
  );
}
