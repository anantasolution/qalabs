import React from "react";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <div>
      <div className="bg-neutral-900 text-white min-h-screen">
        {/* Hero Section */}
        <div>
          <motion.div
            className="text-center py-24 px-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold mb-4">
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold text-6xl">
                Services
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              Tailored Solutions for Your Digital Success.
            </p>
          </motion.div>
        </div>
        {/* Stats Section */}
        <div className="bg-black py-32">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Left side content */}
              <motion.div
                className="flex flex-col justify-center space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-5xl font-normal leading-tight text-white">
                  Innovative Design for{" "}
                  <span className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold text-5xl">
                    {" "}
                    Modern Businesses.
                  </span>
                </h2>
                <p className="text-gray-500 text-xl leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leo.
                </p>
                <motion.button
                  className="bg-teal-400 text-black px-8 py-4 rounded-full text-base font-normal w-fit hover:bg-teal-500 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Learn more
                </motion.button>
              </motion.div>

              {/* Right side stats */}
              <div className="grid grid-cols-2 gap-8">
                <motion.div
                  className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-7xl font-light text-white">+60%</h3>
                    <svg
                      className="w-6 h-6 text-teal-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  </div>
                  <h4 className="text-gray-400 text-2xl mb-6">
                    Traffic Increase
                  </h4>
                  <div className="h-px bg-zinc-800 mb-6"></div>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    By optimizing your website for search engines and enhancing
                    user experience.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-7xl font-light text-white">+30%</h3>
                    <svg
                      className="w-6 h-6 text-teal-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  </div>
                  <h4 className="text-gray-400 text-2xl mb-6">
                    Revenue Increase
                  </h4>
                  <div className="h-px bg-zinc-800 mb-6"></div>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    Rise in revenue as more visitors convert into paying
                    customers.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center py-16 px-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            Innovative Design for{" "}
            <span className="text-blue-300">Modern Businesses.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <motion.button
            className="bg-green-400 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-500 transition duration-300"
            whileHover={{ scale: 1.1 }}
          >
            Learn more
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;