import React, { useState } from "react";

import { motion } from "framer-motion";
import BI from "../assets/background.jpeg";


//Importing icons
import P1 from "../assets/product1.jpg";
import P2 from "../assets/product2.jpg";
import P3 from "../assets/product3.jpg";

//Importing components
import CompanySlider from "../components/CompanySlider";
import StartJourneySection from "../components/StartJourneySection";
import TestimonialSlider from "../components/TestimonialSlider";
import FeaturedProjectSection from "../components/FeatureProduct";

function Project() {
  const projects = [
    {
      image: P1,
      title: "Man & Dance Company Perfume",
      description:
        "Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum.",
    },
    {
      image: P2,
      title: "Nancy Watch Promotional Landing page",
      description:
        "Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum.",
    },
    {
      image: P3,
      title: "Malika Perfume Funnel Landing Page",
      description:
        "Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum.",
    },
    {
      image: P1,
      title: "Man & Dance Company Perfume",
      description:
        "Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum.",
    },
    {
      image: P2,
      title: "Nancy Watch Promotional Landing page",
      description:
        "Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum.",
    },
    {
      image: P3,
      title: "Malika Perfume Funnel Landing Page",
      description:
        "Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum.",
    },
  ];

  const upsideVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const downsideVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-[#151515]">
     <div
            className="relative min-h-[50vh] md:min-h-[60vh]  bg-cover bg-center"
            style={{ backgroundImage: `url(${BI})` }}
          >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={downsideVariants}
          >
            <a
              href="/contact"
              className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold text-4xl sm:text-6xl"
            >
              Project
            </a>
          </motion.div>

          <br />

          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={upsideVariants}
          >
            <p className="text-white text-lg sm:text-xl opacity-100">
              Tailored Solutions for Your Digital Success.
            </p>
          </motion.div>
        </div>
      </div>
      <FeaturedProjectSection />
      <CompanySlider />
      <StartJourneySection />
      <TestimonialSlider />
    </div>
  );
}

export default Project;
