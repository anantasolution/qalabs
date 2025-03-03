import React, { useState } from 'react';
import { motion } from 'framer-motion';


import HERO from '../assets/herobg.jpg'

//Importing components
import HeroSection from '../components/Hero';
import HelpPage from '../components/HelpPage';
import Cards from '../components/Cards';
import FeaturedProjectSection from '../components/FeatureProduct';
import InovationDesign from '../components/InovationDesign';
import TestimonialSlider from '../components/TestimonialSlider';
import StartJourneySection from '../components/StartJourneySection';
import WhyChooseUs from '../components/WhyChooseUs';
import HeroForm from '../components/HeroForm';
import Video from '../components/Video';
import { Link } from 'react-router-dom';

const Home = () => {

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <>
            <div id='home' className="relative min-h-screen w-full">
                {/* Dark overlay for background image */}
                <div
                    className="absolute inset-0 bg-black/70 z-10"
                    style={{
                        backgroundImage: `url(${HERO})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'multiply',
                        filter: 'grayscale(100%)',
                    }}
                />


                {/* Hero Content */}
                <div className="relative z-20 container mx-auto px-4 sm:px-6 pt-16 sm:pt-24 md:pt-40 pb-16 sm:pb-24 md:pb-32">
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
                            <span className="inline-block bg-gradient-to-r from-[#00ffff] via-[#00ccff] to-[#00ff8a] bg-clip-text text-transparent">Online Presence</span>{' '}
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
                            Est in adipiscing odio lectus parturient ex euismod arcu porttitor facilisis.
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
                            <button
                                className="bg-[#71ECB6] text-black  hover:bg-[#BAFE6D] transition-colors px-8 py-3 rounded-full w-full sm:w-auto"
                            >
                                Get Started
                            </button>

                            <Link to={"/project"}
                                className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-[#BAFE6D] hover:border-[#BAFE6D] hover:text-black transition-colors w-full sm:w-auto"
                            >
                                Explore Portfolio
                            </Link>
                        </motion.div>
                    </div>
                </div>
                <div className='md:relative z-50'>
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
        </>
    );
};

export default Home;