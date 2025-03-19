import React, { useEffect, useState, useRef } from "react";
import { Check } from "lucide-react";
import HERO from "../assets/hero-section.jpg";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  "  Web app Development",
  "CRM/ERP Development",
  "mobile app development",
  "Software Testing",
  "Digital Marketing",
  "AI / ML Solutions",
  "Hardware Services",
];

const stats = [
  { value: 27, label: "Project Done" },
  { value: 4, label: "Happy Client" },
  { value: 4.7, label: "Client Reviews" },
];

const HeroSection = () => {
  const [inView, setInView] = useState(false);
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState(stats.map(() => 0)); // Initialize all counts at 0

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          controls.start("visible");
        }
      },
      { threshold: 0.3 }
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

  useEffect(() => {
    if (inView) {
      stats.forEach((stat, index) => {
        let start = 0;
        const end = stat.value;
        const duration = 3000; // 3 seconds
        const stepTime = Math.abs(Math.floor(duration / end));

        const counter = setInterval(() => {
          start += 1;
          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[index] = start;
            return newCounts;
          });

          if (start >= end) clearInterval(counter);
        }, stepTime);
      });
    }
  }, [inView]);

  return (
    <div
      className="bg-[#151515] text-white p-14 py-20 border-b border-[#717171] overflow-hidden"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
          {/* Left column with image and overlaid services */}
          <div className="relative w-full">
            <motion.div
              className="relative overflow-hidden rounded-lg group"
              initial={{ x: "-150%" }}
              animate={inView ? { x: 0 } : {}}
              transition={{ duration: 2 }}
            >
              <img
                src={HERO}
                alt="Team working together"
                className="w-full md:h-full h-[350px] object-cover filter grayscale transition-all duration-500 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </motion.div>

            {inView && (
              <motion.div
                className="absolute -bottom-16 -left-16 md:-left-6 md:bottom-0 bg-black/50 p-6 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5 }}
              >
                {services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3 mb-4">
                    <div className="bg-emerald-400 rounded-full p-1">
                      <Check className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-white">{service}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right column - Content */}
          <div className="space-y-8 pt-10 md:pt-0">
            <div className="text-[#00ff8a] mb-4">WHO WE ARE</div>

            <motion.h1
              className="text-4xl lg:text-5xl font-bold py-1"
              initial={{ x: "150%" }}
              animate={inView ? { x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              Smart Innovation to Fuel
              <span className="inline-block bg-gradient-to-r from-[#00ffff] via-[#00ccff] to-[#00ff8a] bg-clip-text text-transparent">
                Digital Success
              </span>
            </motion.h1>

            <motion.p
              className="text-gray-400"
              initial={{ x: "150%" }}
              animate={inView ? { x: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              ZyinexWeb is where ideas transform into impactful digital
              experiences. Our team blends creativity and technology to develop
              seamless, high-performance web solutions to suit your professional
              goals.
            </motion.p>

            {/* Stats Section */}
            <motion.div
              className="grid grid-cols-3 gap-8 pt-4 border-t border-b py-4 border-[#717171]"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1 }}
            >
              {stats.map((stat, index) => (
                <div key={stat.value}>
                  <motion.div
                    className="text-3xl font-bold"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, type: "spring" }}
                  >
                    {counts[index]}+
                  </motion.div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.button
              className="bg-[#71ECB6] text-black rounded-full hover:bg-[#BAFE6D] px-6 py-3 hover:opacity-90 transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <Link to={"/contactus"}>Connect now</Link>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
