import React, { useState } from "react";
import { motion } from "framer-motion";
import Cards from "../components/Cards";
import GetInTouch from "../components/GetInTouch";
import WhyChooseUs from "../components/WhyChooseUs";
import Questions from "../components/Questions";
import BI from "../assets/background.jpeg";


//Importing components
import InovationDesign from "../components/InovationDesign";
import Video from "../components/Video";

const Services = () => {
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
              className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold text-6xl"
            >
              Services
            </a>
          </motion.div>

          <br />

          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={upsideVariants}
          >
            <p className="text-white text-3xl opacity-100">
              Tailored Solutions for Your Digital Success.
            </p>
          </motion.div>
        </div>
      </div>
      <InovationDesign></InovationDesign>
      <Video />
      <Cards></Cards>
      <GetInTouch></GetInTouch>
      <div className="pt-64">
        <WhyChooseUs></WhyChooseUs>
      </div>
      <Questions></Questions>
    </div>
  );
};

export default Services;
