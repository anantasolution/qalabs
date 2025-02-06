import React from 'react'
import { motion } from "framer-motion";
import bgImage from "../assets/young-woman-customer-support-posing-in-the-office.jpg";
import { MessagesSquare, Coffee, Mail } from 'lucide-react';

const GetInTouch = () => {
    return (
        
        <div className="w-full">
            {/* Background Banner */}
            <div
                className="relative flex flex-col h-[420px] items-center text-center space-y-5 px-4 sm:px-6 md:px-12 py-32 bg-cover bg-center bg-no-repeat overflow-hidden"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 z-0"></div>

                {/* Title Content */}
                <motion.h1
                    className="text-[#BAFE6D] text-sm tracking-wide uppercase z-10"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 1,
                        ease: "easeInOut",
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                    }}
                >
                    Get In Touch
                </motion.h1>
                <motion.h2
                    className="text-2xl sm:text-3xl md:text-[38px] font-normal leading-tight text-white z-10"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.5,
                        duration: 1,
                        ease: "easeInOut",
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                    }}
                >
                    Need more{" "}
                    <span className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold">
                        help & Support?
                    </span>
                </motion.h2>
            </div>

            {/* Support Cards */}
            <div className="absolute -mt-36 z-10 grid grid-cols-1 md:grid-cols-3 gap-6 p-3 xl:p-10">
                {/* Customer Support */}
                <motion.div
                    className="bg-[#242424] p-4 lg:px-6 lg:py-8 rounded-lg text-center md:py-9"
                    initial={{ opacity: 0, x: -100 }} // Start from the left
                    animate={{ opacity: 1, x: 0 }} // End at normal position
                    transition={{
                        delay: 0.5,
                        duration: 1,
                        ease: "easeInOut",
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                    }}
                >
                    <div className="pb-3 md:pb-6 flex items-center justify-center">
                        <span className="bg-[#494949] rounded-full p-4 sm:p-5">
                            <MessagesSquare className="text-[#BAFE6D] w-[35px] h-[35px] sm:w-[45px] sm:h-[45px]" strokeWidth={"1.4px"} />
                        </span>
                    </div>
                    <h1 className="text-lg sm:text-[20px] md:text-[24px] pb-2">Customer Support</h1>
                    <p className="text-sm md:text-[16px] text-[#828282] leading-6 px-2 lg:px-8 pb-5">
                        Mus quisque non ridiculus sed himenaeos adipiscing consectetur fusce tempus lectus pretium.
                    </p>
                    <motion.button
                        className="bg-[#71ECB6] text-black px-6 py-2 rounded-full text-sm font-normal hover:bg-[#BAFE6D] transition duration-300"
                        whileHover={{ backgroundColor: "#BAFE6D" }}
                    >
                        Chat now
                    </motion.button>
                </motion.div>


                {/* Ticket Support */}
                <motion.div
                    className="bg-gradient-to-r from-[#71ECB6] to-[#BAFE6D] p-4 lg:px-6 lg:py-8 rounded-lg text-center md:py-9"
                    initial={{ opacity: 0, y: 50 }} // Start from below the normal position
                    animate={{ opacity: 1, y: 0 }} // End at the normal position
                    transition={{
                        delay: 0.7,
                        duration: 1,
                        ease: "easeInOut",
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                    }}
                >
                    <div className="pb-3 md:pb-6 flex items-center justify-center">
                        <span className="bg-white rounded-full p-4 sm:p-5">
                            <Mail className="text-[#26AD80] w-[35px] h-[35px] sm:w-[45px] sm:h-[45px]" strokeWidth={"1.4px"} />
                        </span>
                    </div>
                    <h1 className="text-gray-900 text-lg sm:text-[20px] md:text-[24px] pb-2">Ticket Support</h1>
                    <p className="text-gray-900 text-sm md:text-[16px] leading-6 px-2 lg:px-8 pb-5">
                        Mus quisque non ridiculus sed himenaeos adipiscing consectetur fusce tempus lectus pretium.
                    </p>
                    <motion.button
                        className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-normal hover:bg-white hover:text-black transition duration-300"
                        whileHover={{ backgroundColor: "white", color: "black" }}
                    >
                        Send Message
                    </motion.button>
                </motion.div>


                {/* Free Insight */}
                <motion.div
                    className="bg-[#242424] p-4 lg:px-6 lg:py-8 rounded-lg text-center md:py-9"
                    initial={{ opacity: 0, x: 50 }} // Start from the left
                    animate={{ opacity: 1, x: 0 }} // End at the normal position
                    transition={{
                        delay: 0.9,
                        duration: 1,
                        ease: "easeInOut",
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                    }}
                >
                    <div className="pb-3 md:pb-6 flex items-center justify-center">
                        <span className="bg-[#494949] rounded-full p-4 sm:p-5">
                            <Coffee className="text-[#BAFE6D] w-[35px] h-[35px] sm:w-[45px] sm:h-[45px]" strokeWidth={"1.4px"} />
                        </span>
                    </div>
                    <h1 className="text-lg sm:text-[20px] md:text-[24px] pb-2">Free Insight</h1>
                    <p className="text-sm md:text-[16px] text-[#828282] leading-6 px-2 lg:px-8 pb-5">
                        Mus quisque non ridiculus sed himenaeos adipiscing consectetur fusce tempus lectus pretium.
                    </p>
                    <motion.button
                        className="bg-[#71ECB6] text-black px-6 py-2 rounded-full text-sm font-normal hover:bg-[#BAFE6D] transition duration-300"
                        whileHover={{ backgroundColor: "#BAFE6D" }}
                    >
                        Read Article
                    </motion.button>
                </motion.div>

            </div>
        </div>
    )
}

export default GetInTouch