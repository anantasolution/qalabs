import React from 'react';
import { motion } from 'framer-motion';

const Project = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-center">
      {/* First Full Page Section */}
      <motion.div className="h-screen flex flex-col items-center justify-center text-white">
        <motion.h1 className="text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-300 via-green-400 to-green-500 text-transparent bg-clip-text">
            Project
          </span>
        </motion.h1>

        <motion.p className="text-3xl max-w-2xl mx-auto">
          Tailored Solutions for Your Digital Success.
        </motion.p>
      </motion.div>

      {/* Cards Section */}
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="relative bg-gray-100 rounded-lg shadow-lg overflow-hidden group h-96" 
            >
              {/* Image Background */}
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(https://via.placeholder.com/400x200?text=Card+${index + 1})` }}
              ></div>

              {/* Content with Slide-Up Animation */}
              <div className="absolute inset-0 bg-black/70 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="translate-y-16 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-semibold text-white mb-2">Project {index + 1}</h3>
                  <p className="text-sm text-gray-300">
                    Tailored solutions for your digital needs.
                  </p>
                </div>

                {/* Hover-only Button */}
                <motion.button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  Learn More
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;