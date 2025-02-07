import React, { useEffect, useState, useRef } from "react";
import { Check } from "lucide-react";
import HERO from "../assets/hero-section.jpg";
import { motion, useAnimation } from "framer-motion";

const services = [
  "Custom Solutions",
  "Cutting-Edge Design",
  "SEO Optimization",
  "Responsive Design",
  "Innovative Technology",
  "Security and Reliability",
];

const stats = [
  { value: "27K+", label: "Project Done" },
  { value: "4K+", label: "Happy Client" },
  { value: "4.7", label: "Client Reviews" },
];

const HeroSection = () => {
  const [inView, setInView] = useState(false);
  const controls = useAnimation(); // Animation controls for Framer Motion
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          controls.start("visible"); // Start animations when in view
        } else {
          controls.start("hidden"); // Optionally, reverse animations when out of view
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is in view
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, staggerChildren: 0.2 },
    },
    hidden: { opacity: 0, y: 50, transition: { duration: 1 } },
  };

  const itemVariants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -50 },
  };

  const counterVariants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, type: "spring" },
    },
    hidden: { opacity: 0, scale: 0.5 },
  };

  return (
    <div
      className=" bg-[#151515] text-white p-14 py-20 border-b border-[#717171] overflow-hidden"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left column with image and overlaid services */}
          <div className="relative">
            <motion.div
              className="relative overflow-hidden rounded-lg group"
              initial={{ x: "-150%" }}
              animate={inView ? { x: 0 } : {}}
              transition={{ duration: 2 }}
            >
              <img
                src={HERO}
                alt="Team working together"
                className="w-full h-full object-cover filter grayscale transition-all duration-500 group-hover:grayscale-0"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </motion.div>

            {/* Services list */}
            {inView && (
              <motion.div
                className="absolute left-0 bottom-0 bg-gradient-to-t from-black via-black/95 to-transparent p-6 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5 }}
              >
                {services.map((service) => (
                  <div key={service} className="flex items-center gap-3 mb-4">
                    <div className="bg-[#00ff8a]/20 rounded-full p-1">
                      <Check className="w-4 h-4 text-[#00ff8a]" />
                    </div>
                    <span className="text-sm">{service}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right column - Content */}
          <div className="space-y-8">
            {/* WHO WE ARE text */}
            <div className="text-[#00ff8a] mb-4">WHO WE ARE</div>

            {/* Heading */}
            <motion.h1
              className="text-4xl lg:text-5xl font-bold"
              initial={{ x: "150%" }}
              animate={inView ? { x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              Innovative Solutions for Your{" "}
              <span className="inline-block bg-gradient-to-r from-[#00ffff] via-[#00ccff] to-[#00ff8a] bg-clip-text text-transparent">
                Online Success.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-gray-400"
              initial={{ x: "150%" }}
              animate={inView ? { x: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Sem iaculis facilisis convallis ex aliquam massa a venenatis
              blandit pede rhoncus. Euismod consectetuer nostra etiam lectus
              potenti accumsan pellentesque venenatis.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 pt-4 border-t border-b py-4 border-[#717171]"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1 }}
            >
              {stats.map((stat) => (
                <div key={stat.value}>
                  <motion.div
                    className="text-3xl font-bold"
                    variants={counterVariants}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.button
              className="bg-gradient-to-r from-[#00ff8a] to-[#00ccff] text-black px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.5 }}
            >
              Discover more
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
