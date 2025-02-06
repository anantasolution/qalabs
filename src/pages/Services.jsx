import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Navbar from "../components/Navbar";
import Questions from "../components/Questions";
import programmersWorkLateAtNight from "../assets/programmers-work-late-at-night.jpg";
import customerSupport from "../assets/customer-support.jpg";

const Services = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const VideoOverlay = () => (
    <div className="absolute inset-20 flex flex-col items-center justify-center bg-zinc-950 bg-opacity-50 max-w-[50%] max-h-[60%">
      <motion.div
        className="bg-white rounded-full p-6 mb-8 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsPlaying(true)}
      >
        <Play className="w-8 h-8 text-emerald-400 hover:text-emerald-300" />
      </motion.div>
      <h2 className="text-4xl mb-4 text-center max-w-2xl">
        <span className="text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text font-normal">
          Innovative Solutions
        </span>{" "}
        for Your
        <br /> Online Success
      </h2>
    </div>
  );

  const closeVideo = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <div className="bg-neutral-900 text-white min-h-screen">
        <Navbar />
        {/* Hero Section */}
        <div>
          <motion.div
            className="text-center py-24 px-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold mb-4">
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold text-6xl">
                Services
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              Tailored Solutions for Your Digital Success.
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="bg-black py-32">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              {/* Left side content */}
              <motion.div
                className="flex flex-col justify-center space-y-6 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-4xl md:text-[40px] leading-tight text-white">
                  Innovative Design for{" "}
                  <span className="text-4xl md:text-[40px] text-transparent bg-gradient-to-r from-blue-300 to-green-400 bg-clip-text">
                    Modern Businesses.
                  </span>
                </h2>

                <p className="text-gray-400 text-md leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leo.
                </p>
                <motion.button
                  className="bg-green-300 text-black px-4 py-2 rounded-full text-base px w-fit hover:bg-teal-500 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Learn more
                </motion.button>
              </motion.div>

              {/* Right side stats */}
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  className=" bg-neutral-800 p-7 rounded-3xl border border-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="  text-4xl font-dark text-white">+60%</h3>
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
                  <h4 className="text-gray-400 text-xl mb-4">
                    Traffic Increase
                  </h4>
                  <div className="h-px bg-gray-500 mb-4"></div>
                  <p className="text-gray-400 text-base leading-relaxed">
                    By optimizing your website for search engines and enhancing
                    user experience.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-black p-8 rounded-3xl border border-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-4xl font-dark text-white">+30%</h3>
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
                  <h4 className="text-gray-400 text-xl mb-4">
                    Revenue Increase
                  </h4>
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

        {/* VIDEO SECTION */}
        <div className="bg-black py-20 flex justify-center items-center">
          <div className="relative max-w-6xl w-full aspect-video rounded-xl overflow-hidden shadow-lg">
            {isPlaying ? (
              <>
                <iframe
                  src="https://www.youtube.com/embed/Mtjatz9r-Vc?autoplay=1"
                  title="YouTube video player"
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <button
                  className="absolute top-15 right-10 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
                  onClick={closeVideo}
                >
                  X
                </button>
              </>
            ) : (
              <div
                className="relative w-full h-full bg-cover bg-center  transition-transform "
                style={{
                  backgroundImage: `url(${programmersWorkLateAtNight})`,
                  height: "65%",
                  width: "100%",
                }}
              >
                <VideoOverlay setIsPlaying={setIsPlaying} />
              </div>
            )}
          </div>
        </div>

        {/* CARD SECTION */}
        <div
          className="min-h-screen bg-neutral-900 text-white p-8 flex justify-center items-center"
          style={{
            backgroundImage:
              'url("https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/bg_img3_.png")', // Replace with your actual image URL
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Container for the grid of cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
            {Array(6) // Change the number to control how many cards you want
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="max-w-sm w-full bg-neutral-800 p-8 rounded-lg shadow-lg space-y-6 border-2 border-neutral-700 transition-all duration-300 ease-in-out hover:border-lime-500"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-lime-300 p-4 rounded-full -mt-8">
                      <svg
                        className="w-6 h-6 text-gray-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-white text-3xl text-left">
                        Web Design
                      </h1>
                      <p className="text-gray-400 text-sm text-left">
                        Auctor dictumst inceptos metus est ad himenaeos
                        habitasse
                        <br />
                        litora natoque libero nunc
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-gray-500 my-4"></div>
                  <p>
                    Netus condimentum erat vestibulum sollicitudin sem tempor
                    lacinia.
                  </p>
                  <button
                    type="submit"
                    className="bg-emerald-300 hover:bg-lime-300 text-gray-900 px-4 py-2 font-sm transition-colors duration-300 flex items-center gap-2 cursor-pointer rounded-full"
                  >
                    Get Started
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/*GET IN TOUCH */}
        <div>
          <motion.div
            className="flex flex-col relative h-[420px] items-center space-y-5 px-6 md:px-12 py-20 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${customerSupport})` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <h1 className="text-[#BAFE6D] text-sm tracking-wide uppercase z-10">
              Get In Touch
            </h1>
            <h2 className="text-4xl font-normal leading-tight text-white z-10">
              Need more{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold">
                help & Support?
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center justify-center">
            <div className="bg-gray-800 p-6 rounded-sm">
              <div className="icon">
                <svg
                  className="w-8 h-8"
                  fill="#BAFE6D"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M88.2 309.1c9.8-18.3 6.8-40.8-7.5-55.8C59.4 230.9 48 204 48 176c0-63.5 63.8-128 160-128s160 64.5 160 128s-63.8 128-160 128c-13.1 0-25.8-1.3-37.8-3.6c-10.4-2-21.2-.6-30.7 4.2c-4.1 2.1-8.3 4.1-12.6 6c-16 7.2-32.9 13.5-49.9 18c2.8-4.6 5.4-9.1 7.9-13.6c1.1-1.9 2.2-3.9 3.2-5.9zM208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 41.8 17.2 80.1 45.9 110.3c-.9 1.7-1.9 3.5-2.8 5.1c-10.3 18.4-22.3 36.5-36.6 52.1c-6.6 7-8.3 17.2-4.6 25.9C5.8 378.3 14.4 384 24 384c43 0 86.5-13.3 122.7-29.7c4.8-2.2 9.6-4.5 14.2-6.8c15.1 3 30.9 4.5 47.1 4.5zM432 480c16.2 0 31.9-1.6 47.1-4.5c4.6 2.3 9.4 4.6 14.2 6.8C529.5 498.7 573 512 616 512c9.6 0 18.2-5.7 22-14.5c3.8-8.8 2-19-4.6-25.9c-14.2-15.6-26.2-33.7-36.6-52.1c-.9-1.7-1.9-3.4-2.8-5.1C622.8 384.1 640 345.8 640 304c0-94.4-87.9-171.5-198.2-175.8c4.1 15.2 6.2 31.2 6.2 47.8l0 .6c87.2 6.7 144 67.5 144 127.4c0 28-11.4 54.9-32.7 77.2c-14.3 15-17.3 37.6-7.5 55.8c1.1 2 2.2 4 3.2 5.9c2.5 4.5 5.2 9 7.9 13.6c-17-4.5-33.9-10.7-49.9-18c-4.3-1.9-8.5-3.9-12.6-6c-9.5-4.8-20.3-6.2-30.7-4.2c-12.1 2.4-24.8 3.6-37.8 3.6c-61.7 0-110-26.5-136.8-62.3c-16 5.4-32.8 9.4-50 11.8C279 439.8 350 480 432 480z" />
                </svg>
              </div>
              <h1 className="text-3xl font-normal">Customer Support</h1>
              <p className="text-gray-500">
                Mus quisque non ridiculus sed himenaeos adipiscing consectetur
                fusce tempus lectus pretium.
              </p>
              <motion.button
                className="bg-teal-400 text-black px-6 py-2 rounded-full text-sm font-normal w-fit hover:bg-[#BAFE6D] transition duration-300"
                whileHover={{ scale: 1.1, backgroundColor: "#BAFE6D" }}
              >
                Chat now
              </motion.button>
            </div>
            <div className="bg-gray-800 p-6 rounded-sm">
              <div className="icon">
                <svg
                  className="w-8 h-8"
                  fill="#BAFE6D"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z" />
                </svg>
              </div>
              <h1 className="text-3xl font-normal">Ticket Support</h1>
              <p className="text-gray-500">
                Mus quisque non ridiculus sed himenaeos adipiscing consectetur
                fusce tempus lectus pretium.
              </p>
              <motion.button
                className="bg-teal-400 text-black px-6 py-2 rounded-full text-sm font-normal w-fit hover:bg-[#BAFE6D] transition duration-300"
                whileHover={{ scale: 1.1, backgroundColor: "#BAFE6D" }}
              >
                send Message
              </motion.button>
            </div>
            <div className="bg-gray-800 p-6 rounded-sm">
              <div className="icon">
                <svg
                  className="w-8 h-8"
                  fill="#BAFE6D"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M88 0C74.7 0 64 10.7 64 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C120.5 112.3 128 119.9 128 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C119.5 47.7 112 40.1 112 24c0-13.3-10.7-24-24-24zM32 192c-17.7 0-32 14.3-32 32L0 416c0 53 43 96 96 96l192 0c53 0 96-43 96-96l16 0c61.9 0 112-50.1 112-112s-50.1-112-112-112l-48 0L32 192zm352 64l16 0c26.5 0 48 21.5 48 48s-21.5 48-48 48l-16 0 0-96zM224 24c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C232.5 112.3 240 119.9 240 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C231.5 47.7 224 40.1 224 24z" />
                </svg>
              </div>
              <h1 className="text-3xl font-normal">Free Insight</h1>
              <p className="text-gray-500">
                Mus quisque non ridiculus sed himenaeos adipiscing consectetur
                fusce tempus lectus pretium.
              </p>
              <motion.button
                className="bg-teal-400 text-black px-6 py-2 rounded-full text-sm font-normal w-fit hover:bg-[#BAFE6D] transition duration-300"
                whileHover={{ scale: 1.1, backgroundColor: "#BAFE6D" }}
              >
                Chat now
              </motion.button>
            </div>
            <div>
              <motion.div
                className="flex flex-col relative h-[420px] items-center space-y-5 px-6 md:px-12 py-20 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: ` url(${customerSupport}) ` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
                <h1 className="text-[#BAFE6D] text-sm tracking-wide uppercase z-10">
                  Get In Touch
                </h1>
                <h2 className="text-4xl font-normal leading-tight text-white z-10">
                  Need more{" "}
                  <span className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold">
                    help & Support?
                  </span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center justify-center">
                <div className="bg-gray-800 p-6 rounded-sm">
                  <div className="icon">
                    <svg
                      className="w-8 h-8"
                      fill="#BAFE6D"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M88.2 309.1c9.8-18.3 6.8-40.8-7.5-55.8C59.4 230.9 48 204 48 176c0-63.5 63.8-128 160-128s160 64.5 160 128s-63.8 128-160 128c-13.1 0-25.8-1.3-37.8-3.6c-10.4-2-21.2-.6-30.7 4.2c-4.1 2.1-8.3 4.1-12.6 6c-16 7.2-32.9 13.5-49.9 18c2.8-4.6 5.4-9.1 7.9-13.6c1.1-1.9 2.2-3.9 3.2-5.9zM208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 41.8 17.2 80.1 45.9 110.3c-.9 1.7-1.9 3.5-2.8 5.1c-10.3 18.4-22.3 36.5-36.6 52.1c-6.6 7-8.3 17.2-4.6 25.9C5.8 378.3 14.4 384 24 384c43 0 86.5-13.3 122.7-29.7c4.8-2.2 9.6-4.5 14.2-6.8c15.1 3 30.9 4.5 47.1 4.5zM432 480c16.2 0 31.9-1.6 47.1-4.5c4.6 2.3 9.4 4.6 14.2 6.8C529.5 498.7 573 512 616 512c9.6 0 18.2-5.7 22-14.5c3.8-8.8 2-19-4.6-25.9c-14.2-15.6-26.2-33.7-36.6-52.1c-.9-1.7-1.9-3.4-2.8-5.1C622.8 384.1 640 345.8 640 304c0-94.4-87.9-171.5-198.2-175.8c4.1 15.2 6.2 31.2 6.2 47.8l0 .6c87.2 6.7 144 67.5 144 127.4c0 28-11.4 54.9-32.7 77.2c-14.3 15-17.3 37.6-7.5 55.8c1.1 2 2.2 4 3.2 5.9c2.5 4.5 5.2 9 7.9 13.6c-17-4.5-33.9-10.7-49.9-18c-4.3-1.9-8.5-3.9-12.6-6c-9.5-4.8-20.3-6.2-30.7-4.2c-12.1 2.4-24.8 3.6-37.8 3.6c-61.7 0-110-26.5-136.8-62.3c-16 5.4-32.8 9.4-50 11.8C279 439.8 350 480 432 480z" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-normal">Customer Support</h1>
                  <p className="text-gray-500">
                    Mus quisque non ridiculus sed himenaeos adipiscing
                    consectetur fusce tempus lectus pretium.
                  </p>
                  <motion.button
                    className="bg-teal-400 text-black px-6 py-2 rounded-full text-sm font-normal w-fit hover:bg-[#BAFE6D] transition duration-300"
                    whileHover={{ scale: 1.1, backgroundColor: "#BAFE6D" }}
                  >
                    Chat now
                  </motion.button>
                </div>
                <div className="bg-gray-800 p-6 rounded-sm">
                  <div className="icon">
                    <svg
                      className="w-8 h-8"
                      fill="#BAFE6D"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-normal">Ticket Support</h1>
                  <p className="text-gray-500">
                    Mus quisque non ridiculus sed himenaeos adipiscing
                    consectetur fusce tempus lectus pretium.
                  </p>
                  <motion.button
                    className="bg-teal-400 text-black px-6 py-2 rounded-full text-sm font-normal w-fit hover:bg-[#BAFE6D] transition duration-300"
                    whileHover={{ scale: 1.1, backgroundColor: "#BAFE6D" }}
                  >
                    send Message
                  </motion.button>
                </div>
                <div className="bg-gray-800 p-6 rounded-sm">
                  <div className="icon">
                    <svg
                      className="w-8 h-8"
                      fill="#BAFE6D"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M88 0C74.7 0 64 10.7 64 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C120.5 112.3 128 119.9 128 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C119.5 47.7 112 40.1 112 24c0-13.3-10.7-24-24-24zM32 192c-17.7 0-32 14.3-32 32L0 416c0 53 43 96 96 96l192 0c53 0 96-43 96-96l16 0c61.9 0 112-50.1 112-112s-50.1-112-112-112l-48 0L32 192zm352 64l16 0c26.5 0 48 21.5 48 48s-21.5 48-48 48l-16 0 0-96zM224 24c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C232.5 112.3 240 119.9 240 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C231.5 47.7 224 40.1 224 24z" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-normal">Free Insight</h1>
                  <p className="text-gray-500">
                    Mus quisque non ridiculus sed himenaeos adipiscing
                    consectetur fusce tempus lectus pretium.
                  </p>
                  <motion.button
                    className="bg-teal-400 text-black px-6 py-2 rounded-full text-sm font-normal w-fit hover:bg-[#BAFE6D] transition duration-300"
                    whileHover={{ scale: 1.1, backgroundColor: "#BAFE6D" }}
                  >
                    Chat now
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
          {/* Questions Section */}
          <Questions />

          {/* CTA Section */}
          <motion.div
            className="text-center py-16 px-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Innovative Design for{" "}
              <span className="text-blue-300">Modern Businesses.</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <motion.button
              className="bg-green-400 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-500 transition duration-300"
              whileHover={{ scale: 1.1 }}
            >
              Learn more
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Services;
