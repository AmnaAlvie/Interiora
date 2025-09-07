import React from "react";
import { useNavigate } from "react-router-dom";
import BrowseCard from "../components/BrowseCard";
import rustic from "../assets/rustic.jpg";
import minimal from "../assets/minimal.jpg";
import boho from "../assets/boho.jpeg";
import scandi from "../assets/scandi.jpg";
import modern from "../assets/modern.jpg";
import japandi from "../assets/japandi.jpg";

export default function Home() {
  const navigate = useNavigate();

  const designStyles = [
    {
      title: "Minimal",
      image: minimal,
      description: "Clean lines, neutral colors, and clutter-free spaces",
      trending: true
    },
    {
      title: "Scandinavian", 
      image: scandi,
      description: "Light, airy spaces with natural materials",
      trending: false
    },
    {
      title: "Rustic",
      image: rustic, 
      description: "Warm, cozy interiors with vintage elements",
      trending: false
    },
    {
      title: "Bohemian",
      image: boho,
      description: "Eclectic mix of patterns and vibrant colors",
      trending: true
    },
    {
      title: "Modern",
      image: modern,
      description: "Contemporary design with sleek finishes",
      trending: false
    },
    {
      title: "Japandi",
      image: japandi,
      description: "Perfect blend of Japanese and Scandinavian",
      trending: true
    }
  ];

  const handleStyleClick = (styleTitle) => {
    const route = styleTitle.toLowerCase().replace(/\s+/g, "");
    navigate(`/app/genre/${route}`);
  };

  const handleStartExploring = () => {
    navigate("/app/search");
  };

  const handleViewProjects = () => {
    navigate("/app/projects");
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-stone-50 via-white to-amber-50 min-h-screen relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23A9513C' fill-opacity='0.03'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v22H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#A9513C] to-[#944630] rounded-2xl shadow-xl mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 21l4-7 4 7" />
            </svg>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 font-['Playfair_Display']">
            Discover Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#A9513C] to-[#944630]">
              Design Style
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 font-['Inter'] font-light max-w-2xl mx-auto leading-relaxed">
            Explore curated interior design styles and find the perfect aesthetic for your space. 
            From minimalist sanctuaries to bohemian havens.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center gap-12 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#A9513C] font-['Inter']">50K+</div>
              <div className="text-sm text-gray-500 font-['Inter']">Design Ideas</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#A9513C] font-['Inter']">6</div>
              <div className="text-sm text-gray-500 font-['Inter']">Style Categories</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#A9513C] font-['Inter']">100+</div>
              <div className="text-sm text-gray-500 font-['Inter']">New Daily</div>
            </div>
          </div>
        </div>

        {/* Trending Badge */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2 font-['Playfair_Display']">
              Design Collections
            </h2>
            <p className="text-gray-600 font-['Inter'] font-light">
              Handpicked styles to inspire your next project
            </p>
          </div>
          
          <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#A9513C]/10 to-[#944630]/10 px-4 py-2 rounded-full">
            <svg className="w-4 h-4 text-[#A9513C]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-[#A9513C] font-['Inter']">Trending Now</span>
          </div>
        </div>

        {/* Enhanced Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-12">
          {designStyles.map((style, index) => (
            <div
              key={style.title}
              className={`group relative cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => handleStyleClick(style.title)}
            >
              {/* Enhanced Card */}
              <div className="relative overflow-hidden rounded-3xl shadow-xl bg-white border border-gray-100 hover:shadow-2xl transition-all duration-500">
                {/* Trending Badge */}
                {style.trending && (
                  <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-[#A9513C] to-[#944630] text-white px-3 py-1 rounded-full text-xs font-semibold font-['Inter'] tracking-wide">
                    TRENDING
                  </div>
                )}
                
                {/* Image Container */}
                <div className={`relative overflow-hidden ${index === 0 ? 'h-96' : 'h-64'}`}>
                  <img
                    src={style.image}
                    alt={style.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 font-['Playfair_Display']">
                      {style.title}
                    </h3>
                    <p className="text-white/90 text-sm font-['Inter'] font-light leading-relaxed">
                      {style.description}
                    </p>
                    
                    {/* Explore Button */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="inline-flex items-center text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium font-['Inter']">
                        <span>Explore Style</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-[#A9513C]/5 to-[#944630]/5 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm border border-white/20">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-4 font-['Playfair_Display']">
              Ready to Transform Your Space?
            </h3>
            <p className="text-lg text-gray-600 mb-8 font-['Inter'] font-light">
              Join thousands of design enthusiasts and start creating your dream home today. 
              Search through our curated collection or save your favorite designs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleStartExploring}
                className="bg-gradient-to-r from-[#A9513C] to-[#944630] hover:from-[#944630] hover:to-[#7A3626] text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl font-['Inter'] tracking-wide"
              >
                START EXPLORING
              </button>
              <button 
                onClick={handleViewProjects}
                className="border-2 border-[#A9513C] hover:bg-[#A9513C] hover:text-white text-[#A9513C] px-8 py-4 rounded-2xl font-semibold transition-all duration-300 font-['Inter'] tracking-wide"
              >
                VIEW PROJECTS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
