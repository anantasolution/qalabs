import React from "react";
import { motion } from "framer-motion";

import HERO from "../assets/herobg.jpg";

//Importing components
import HeroSection from "../components/Hero";
import HelpPage from "../components/HelpPage";
import Cards from "../components/Cards";
import FeaturedProjectSection from "../components/FeatureProduct";
import InovationDesign from "../components/InovationDesign";
import TestimonialSlider from "../components/TestimonialSlider";
import StartJourneySection from "../components/StartJourneySection";
import WhyChooseUs from "../components/WhyChooseUs";
import HeroForm from "../components/HeroForm";
import Video from "../components/Video";
import { useNavigate } from "react-router-dom";

// whats app icon
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Home = () => {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  // method to redirect when whatsapp button clicked
  const handleClick = () => {
    const phone = '919316727742';
    const url = `https://wa.me/${phone}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative">

      <button onClick={handleClick} className="rounded-full p-2 bg-green-500 fixed top-[89%] left-5 sm:top-[70%] sm:left-10 z-[80] text-white flex justify-center items-center">
        <WhatsAppIcon style={{ fontSize: "2.5rem" }} />
      </button>

      <div id="home" className="relative min-h-screen w-full">
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
        <div className="relative z-20 container mx-auto px-4 sm:px-6 pt-28 sm:pt-24 md:pt-40 pb-16 sm:pb-24 md:pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 inline-block bg-gradient-to-r from-[#00ffff] via-[#00ccff] to-[#00ff8a] bg-clip-text text-transparent"
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
              <span className="inline-block bg-gradient-to-r from-[#00ffff] via-[#00ccff] to-[#00ff8a] bg-clip-text text-transparent">
                Online Presence
              </span>{" "}
            </motion.h1>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 inline-block bg-gradient-to-r from-[#00ffff] via-[#00ccff] to-[#00ff8a] bg-clip-text text-transparent"
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
              Empower your brand with cutting-edge digital solutions designed to
              captivate, engage and convert. Let's build something extraordinary
              together.
              <br className="hidden sm:block" />
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4"
              initial="initial"
              animate="animate"
              variants={fadeIn}
              transition={{ delay: 0.8 }}
            >
              <button
                onClick={() => navigate("/contactus")}
                className="cursor-pointer bg-[#71ECB6] text-black  hover:bg-[#BAFE6D] transition-colors px-8 py-3 rounded-full w-full sm:w-auto z-50"
              >
                Get Started
              </button>

              <a
                href="#project"
                className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-[#BAFE6D] hover:border-[#BAFE6D] hover:text-black transition-colors w-full sm:w-auto z-50"
              >
                Explore Portfolio
              </a>
            </motion.div>
          </div>
        </div>
        <div className="md:relative  border border-red-500">
          <HeroForm></HeroForm>
        </div>
      </div>

      <HeroSection></HeroSection>
      <HelpPage></HelpPage>
      <InovationDesign></InovationDesign>
      <Video></Video>
      <Cards></Cards>
      <StartJourneySection></StartJourneySection>
      <FeaturedProjectSection></FeaturedProjectSection>
      <WhyChooseUs></WhyChooseUs>
      <TestimonialSlider></TestimonialSlider>
    </div>
  );
};

export default Home;
