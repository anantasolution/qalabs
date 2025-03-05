import React, { useState, useRef, useEffect } from "react";
import BI from "../../../assets/background.jpeg";
import { motion, useAnimation } from "framer-motion";
import { Check } from "lucide-react";
import IMAGE from "../../../assets/img_1.jpg";

const NetworkSolutions = () => {

    const [openIndex, setOpenIndex] = useState(null);
    const [inView, setInView] = useState(false);
    const controls = useAnimation(); // Animation controls for Framer Motion
    const sectionRef = useRef(null);
    const progressControls = useAnimation(); // Animation controls for the progress circle


    const features = [
        {
            title: "Expertise and Experience",
            description:
                "Our team of seasoned professionals brings over 25 years of experience in web design and SEO, ensuring top-notch quality and innovative solutions for your business.",
        },
        {
            title: "Comprehensive Services",
            description:
                "We provide complete digital solutions from website development to SEO optimization.",
        },
        {
            title: "Client-Centric Approach",
            description:
                "We tailor our services to meet your specific business needs, ensuring maximum satisfaction.",
        },
        {
            title: "Increased Conversion Rates",
            description:
                "Our strategies help in improving user engagement and lead conversion.",
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    controls.start("visible"); // Start animations when in view
                    progressControls.start({ strokeDasharray: "97, 100" }); // Animate the progress circle
                } else {
                    controls.start("hidden"); // Optionally, reverse animations when out of view
                    progressControls.start({ strokeDasharray: "97, 0" });
                }
            },
            { threshold: 0.3 } // Trigger when 30% of the section is in view
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

    const toggleDescription = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <div className="min-h-screen bg-[#151515] text-white">
            {/* --- About Us Section with Background Image starting from the very top and extra margin from nav --- */}
            <div
                className="relative min-h-[50vh] md:min-h-[60vh]  bg-cover bg-center"
                style={{ backgroundImage: `url(${BI})` }}
            >
                <section className="text-center py-32">
                    <motion.h1
                        className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-[#00ffff] via-[#00ccff] to-[#00ff8a] bg-clip-text text-transparent"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        Network Solutions
                    </motion.h1>
                    <motion.p
                        className="text-lg sm:text-xl font-light mt-4"
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        Your Partner in Innovative Web Design.
                    </motion.p>
                </section>
            </div>

            <div
                className="bg-[#151515] py-16 md:py-24 overflow-hidden"
                ref={sectionRef}
            >
                <div className="max-w-[1400px] mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                        {/* Left side content */}
                        <motion.div
                            className="flex flex-col justify-center space-y-6 max-w-xl"
                            initial={{ x: "-150%" }}
                            animate={inView ? { x: 0 } : {}}
                            transition={{ duration: 1 }}
                        >
                            <h2 className="text-4xl md:text-[40px] leading-tight text-white">
                                Innovative Design for{" "}
                                <span className="text-4xl md:text-[40px] text-transparent bg-gradient-to-r from-blue-300 to-green-400 bg-clip-text">
                                    Modern Businesses.
                                </span>
                            </h2>
                            <p className="text-gray-400 text-md leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                            </p>
                        </motion.div>

                        {/* Right side stats */}
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                            <motion.div
                                className=" bg-neutral-800 p-7 rounded-xl "
                                initial={{ y: "150%" }}
                                animate={inView ? { y: 0 } : {}}
                                transition={{ duration: 1 }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <h2 className="text-6xl font-dark text-white">+60%</h2>

                                    <svg
                                        className="w-12 h-12 text-emerald-400"
                                        viewBox="0 0 25 25"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                                        />
                                    </svg>
                                </div>
                                <h4 className="text-gray-400 text-xl mb-4">Traffic Increase</h4>
                                <div className="h-px bg-gray-500 mb-4"></div>
                                <p className="text-gray-400 text-base leading-relaxed">
                                    By optimizing your website for search engines and enhancing
                                    user experience.
                                </p>
                            </motion.div>

                            <motion.div
                                className="bg-black p-8 rounded-xl border border-gray-700"
                                initial={{ x: "150%" }}
                                animate={inView ? { x: 0 } : {}}
                                transition={{ duration: 1 }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <h2 className="text-6xl font-dark text-white">+30%</h2>
                                    <svg
                                        className="w-10 h-10 text-emerald-400"
                                        viewBox="0 0 25 25"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                                        />
                                    </svg>
                                </div>
                                <h4 className="text-gray-400 text-xl mb-4">Revenue Increase</h4>
                                <div className="h-px bg-zinc-700 mb-4"></div>
                                <p className="text-gray-400 text-base leading-relaxed">
                                    Rise in revenue as more visitors convert into paying
                                    customers.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="min-h-screen w-full bg-[#151515] text-white flex justify-end items-center py-14 md:py-16 overflow-hidden"
                ref={sectionRef}
            >
                <div className="w-full min-h-[70vh] md:min-h-[100vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 ">
                    {/* Left Section */}
                    <motion.div
                        className="space-y-6 md:space-y-10 px-10 md:pl-16"
                        initial={{ x: "-100%" }}
                        animate={{ x: inView ? "0%" : "-100%" }}
                        transition={{ duration: 1 }}
                    >
                        <h3 className="text-green-500 text-sm md:text-md uppercase tracking-wider">
                            WHY CHOOSE US
                        </h3>
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                            Crafting
                            <span className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold">
                                {" "}
                                Digital Experiences{" "}
                            </span>
                            That Matter.
                        </h2>
                        <p className="text-[#828282] text-md md:text-xl">
                            Dictumst porta ultricies tristique hac vestibulum himenaeos
                            ligula. Cubilia sapien torquent at finibus accumsan et
                            pellentesque class lacinia tristique.
                        </p>
                        <p className="text-[#828282] text-md md:text-xl">
                            Dictumst porta ultricies tristique hac vestibulum himenaeos
                            ligula. Cubilia sapien torquent at finibus accumsan et
                            pellentesque class lacinia tristique.
                        </p>

                        
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default NetworkSolutions;