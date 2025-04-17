import React, { useState, useRef, useEffect } from "react";
import BI from "../../../assets/background.jpeg";
import { motion, useAnimation } from "framer-motion";
import { Check } from "lucide-react";
import services_hardware from "../../../assets/services_images/hardware_services/services_hardware.jpg";

const ComputerHardwareSales = () => {
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
          progressControls.start({ strokeDasharray: "90, 100" }); // Animate the progress circle
        } else {
          controls.start("hidden"); // Optionally, reverse animations when out of view
          progressControls.start({ strokeDasharray: "90, 0" });
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
            Computer Hardware Sales
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
                Revolutionise Your Business Using New Generational{" "}
                <span className="text-4xl md:text-[40px] text-transparent bg-gradient-to-r from-blue-300 to-green-400 bg-clip-text">
                  Computer Hardware
                </span>
              </h2>
              <p className="text-gray-400 text-md leading-relaxed">
                Stay ahead in the digital world with high-performance computer
                hardware designed to increase efficiency and reliability. At
                ZyinexWeb, we offer top-tier IT hardware solutions created to
                meet the unique needs of businesses and guarantee seamless
                operations and long-term success.
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
                Turn visitors into loyal customers with engaging and optimised digital solutions.
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
                  Enhance your online presence with data-driven strategies and seamless user experience.                </p>
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
              Premium IT
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold">
                {" "}
                hardware for maximum{" "}
              </span>
              Performance.
            </h2>
            <p className="text-[#828282] text-md md:text-xl">
              Proper computer hardware is the foundation of a simple running
              business. We offer industry-leading desktops, laptops, servers and
              networking equipment to keep your business operating at peak
              performance.
            </p>
            <p className="text-[#828282] text-md md:text-xl">
              Our expert team helps you choose the best hardware solutions based
              on your requirements, ensuring cost-effectiveness and scalability.
              Whether you need enterprise-grade servers, custom workstations or
              efficient storage solutions, we have you covered. With competitive
              prices, ongoing support and reliable brands, we make sure that
              your IT infrastructure is designed for reliability and future
              growth.
            </p>

            {/* Expandable Sections with Smooth Animation */}
          </motion.div>

          {/* Right Section - Larger Image */}
          <motion.div className="relative hidden overflow-hidden md:flex md:justify-center">
            <motion.div
              className="absolute -right-10 rounded-lg w-full  h-full"
              initial={{ x: "100%" }}
              animate={{ x: inView ? "0%" : "100%" }}
              transition={{ duration: 1 }}
            >
              <img
                src={services_hardware}
                alt="Why Choose Us"
                className="max-w-5xl h-full object-fill rounded-lg"
              />
            </motion.div>
            <div className="absolute left-0 bottom-0 flex flex-col items-center gap-4 bg-black/90 p-6 rounded-lg w-72 h-72">
              <div className="relative">
                <svg className="w-32 h-32" viewBox="0 0 36 36">
                  {/* Background Circle */}
                  <path
                    d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#444"
                    strokeWidth="2"
                  />
                  {/* Progress Circle */}
                  <motion.path
                    d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#71ECB6"
                    strokeWidth="2"
                    strokeDasharray="0, 100" // Initial strokeDasharray
                    strokeLinecap="round"
                    animate={progressControls} // Controls the progress animation
                    transition={{ duration: 2 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">90%</span>
                </div>
              </div>
              <div className="flex flex-col items-center w-full gap-2">
                <h1 className="text-white font-medium text-lg"> Our Services</h1>
                <p className="text-base font-medium text-center text-[#818181] mt-2">
                  Computer Hardware Sales
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComputerHardwareSales;
