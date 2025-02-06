import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import callSupport from "../assets/customer-support.jpg";

const StartJourneySection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true, // Animation runs only once
    threshold: 0.3, // Trigger when 30% of the component is visible
  });

  useEffect(() => {
    // Simulate visibility when component mounts
    // In production, you'd want to use Intersection Observer
    setIsVisible(true);
  }, []);
  return (
    <div ref={ref} className="relative w-full h-[66vh] max-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${callSupport})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content Container */}
      <div className="relative flex items-center justify-center md:justify-end px-4 md:px-8 lg:px-16 w-full h-full">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-black/60 backdrop-blur-sm rounded-lg p-6 md:p-8 lg:p-10 w-full max-w-lg md:max-w-2/3 lg:max-w-1/2 aspect-square md:aspect-auto flex flex-col justify-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
            Ready to Start? Let's Build{" "}
            <span className="text-emerald-400">Something Great</span> Together!
          </h2>

          <p className="text-gray-300 mb-6 text-sm md:text-base">
            Maecenas tempor ligula phasellus per hac nisi. Facilisi curae nunc
            hendrerit vestibulum lobortis commodo lacus sagittis feugiat. Est
            sollicitudin convallis diam.
          </p>

          <button className="bg-emerald-400 hover:bg-emerald-500 text-black font-semibold py-2 px-6 rounded-full transition-colors duration-200">
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </div>
  );
};


export default StartJourneySection