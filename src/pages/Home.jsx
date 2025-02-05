import React, { useState } from "react";
import { motion } from "framer-motion";

import HERO from "../assets/herobg.jpg";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const buttonHover = {
    hover: { scale: 1.05 },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="absolute min-h-screen w-full">
      {/* Dark overlay for background image */}
      <div
        className="absolute inset-0 bg-black/70 z-10"
        style={{
          backgroundImage: `url(${HERO})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
          filter: "grayscale(100%)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            Transform Your
          </motion.h1>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            initial="initial"
            animate="animate"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            <span className="text-blue-300">Online</span>{" "}
            <span className="text-green-400">Presence</span>
          </motion.h1>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8"
            initial="initial"
            animate="animate"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            Today!
          </motion.h1>

          <motion.p
            className="text-gray-300 text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
            initial="initial"
            animate="animate"
            variants={fadeIn}
            transition={{ delay: 0.6 }}
          >
            Est in adipiscing odio lectus parturient ex euismod arcu porttitor
            facilisis.
            <br className="hidden sm:block" />
            Nisi curae blandit facilisis nisi est adipiscing.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4"
            initial="initial"
            animate="animate"
            variants={fadeIn}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              whileHover="hover"
              variants={buttonHover}
              className="bg-green-400 text-black px-8 py-3 rounded-full hover:bg-green-300 transition-colors w-full sm:w-auto"
            >
              Get Started
            </motion.button>

            <motion.button
              whileHover="hover"
              variants={buttonHover}
              className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors w-full sm:w-auto"
            >
              Explore Portfolio
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
