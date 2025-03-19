import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import HERO from "../assets/hero-section.jpg";
import { motion, useAnimation } from "framer-motion";
import CompanySlider from "./CompanySlider";

const HelpPage = () => {
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
      { threshold: 0.3 } // Trigger when 50% of the section is in view
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

  return (
    <div className="w-full bg-[#151515] overflow-hidden">
      {/* Logo Slider */}
      <CompanySlider />
      {/* Main Content */}
      <div
        className="relative py-32 w-full flex items-center justify-center"
        ref={sectionRef}
      >
        <img
          src={HERO}
          alt="Background"
          className="w-full h-full object-cover absolute inset-0"
        />
        <motion.div
          className="relative w-full flex items-center justify-center md:pl-40 md:justify-start"
          initial={{ y: "-150%", opacity: 0 }}
          animate={inView ? { y: 0, opacity: 100 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="p-8 bg-black bg-opacity-60 rounded-lg max-w-md">
            <h1 className="text-3xl font-bold text-white">
              Looking for Impactful Digital Solutions?
              <span className="bg-gradient-to-r from-[#00ffff] via-[#00ccff] to-[#00ff8a] text-transparent bg-clip-text">
                {" "}
                Let’s Get Started!
              </span>
            </h1>
            <p className="mt-4 text-gray-100 text-sm -tracking-tighter">
              From strategy to execution, create experiences that stand out.
              Connect with us and bring your vision to life.
            </p>
            {/* <button className="mt-6 bg-[#71ECB6] text-black rounded-full hover:bg-[#BAFE6D] py-2 px-4">
              Learn more
            </button> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpPage;
