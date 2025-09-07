import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Import interior design assets
import logo from "../assets/logo.png";
import minimal from "../assets/minimal.jpg";
import modern from "../assets/modern2.jpg";
import boho from "../assets/boho2.jpg";
import scandi from "../assets/scandi.jpg";
import rustic from "../assets/rustic.jpg";
import japandi from "../assets/japandi.jpg";

export default function Welcome() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const triggerHeight = window.innerHeight * 0.7;
      setIsVisible(scrollTop > triggerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const designStyles = [
    {
      id: 1,
      title: "Minimalist",
      image: minimal,
      description: "Clean lines, neutral colors, and clutter-free spaces that promote tranquility."
    },
    {
      id: 2,
      title: "Modern",
      image: modern,
      description: "Contemporary design with sleek finishes and innovative materials."
    },
    {
      id: 3,
      title: "Bohemian",
      image: boho,
      description: "Eclectic mix of patterns, textures, and vibrant colors for free spirits."
    },
    {
      id: 4,
      title: "Scandinavian",
      image: scandi,
      description: "Light, airy spaces with natural materials and functional beauty."
    },
    {
      id: 5,
      title: "Rustic",
      image: rustic,
      description: "Warm, cozy interiors featuring natural wood and vintage elements."
    },
    {
      id: 6,
      title: "Japandi",
      image: japandi,
      description: "Perfect blend of Japanese minimalism and Scandinavian functionality."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <div 
        className="relative h-screen flex flex-col justify-center items-center"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${boho}) center/cover`
        }}
      >
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-6">
          <div className="flex items-center">
            <img src={logo} alt="Interiora" className="h-8 w-8 mr-2" />
            <span className="text-3xl font-bold font-['Playfair_Display'] text-white ">Interiora</span>
          </div>
          <div className="flex gap-4">
            <Link 
              to="/login"
              className="px-4 py-2 text-white hover:text-[#A9513C] transition-colors"
            >
              Sign In
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="text-center z-10 max-w-4xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Transform Your Space
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-4"
          >
            DISCOVER ENDLESS DESIGN POSSIBILITIES
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg mb-8 text-gray-300"
          >
            Explore curated interior design styles, get inspired, and create your dream home
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              to="/signup"
              className="inline-flex items-center bg-[#A9513C] hover:bg-[#944630] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              GET STARTED FOR FREE
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Design Styles Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#A9513C]">
              Discover Your Style
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From minimalist sanctuaries to bohemian havens, explore diverse interior design styles 
              that speak to your personality. Our curated collection helps you find the perfect 
              aesthetic for every room in your home.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designStyles.map((style, index) => (
              <motion.div
                key={style.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-2xl">
                  <div className="aspect-w-16 aspect-h-12">
                    <img
                      src={style.image}
                      alt={style.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold mb-2 text-[#f6f5f0]">
                      {style.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {style.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#A9513C] to-[#944630]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of design enthusiasts who have already started their journey 
              to creating beautiful, personalized spaces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/signup"
                className="bg-white hover:bg-gray-100 text-[#A9513C] px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                Start Your Design Journey
              </Link>
              <Link 
                to="/login"
                className="border-2 border-white hover:bg-white hover:text-[#A9513C] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"
              >
                Already a Member? Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 px-6 text-center border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <img src={logo} alt="DesignHub" className="h-8 w-8 mr-2" />
            <span className="text-2xl font-bold text-[#A9513C]">Interiora</span>
          </div>
          <p className="text-gray-400">
            © 2025 Interiora. Transform your space, transform your life.
          </p>
        </div>
      </footer>
    </div>
  );
}
