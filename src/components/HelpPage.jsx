import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import HERO from "../assets/hero-section.jpg";
import LOGO from "../assets/logo.png";

const logos = [
  //   "logo1.png",
  //   "logo2.png",
  //   "logo3.png",
  //   "logo4.png",
  //   "logo5.png",
  //   "logo6.png",
  LOGO,
  LOGO,
  LOGO,
  LOGO,
  LOGO,
  LOGO,
];

const HelpPage = () => {
  return (
    <div className="w-full min-h-screen bg-black">
      {/* Logo Slider */}
      <div className="w-full py-10 bg-black flex justify-cent">
        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          loop={true}
          autoplay={{ delay: 2000 }}
          modules={[Autoplay]}
          className="w-3/4"
        >
          {logos.map((logo, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <img src={logo} alt="logo" className="h-10" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Content */}
      <div className="relative w-full min-h-[100vh] flex items-center justify-center">
        <img
          src={HERO}
          alt="Background"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="relative w-full flex items-center justify-center md:pl-40 md:justify-start">
          <div className="p-8 bg-black bg-opacity-60 rounded-lg max-w-md text-center">
            <h1 className="text-3xl font-bold text-white">
              See How We Can Help Your{" "}
              <span className="bg-gradient-to-r from-[#00ffff] via-[#00ccff] to-[#00ff8a] text-transparent bg-clip-text">
                Business Grow.
              </span>
            </h1>
            <p className="mt-4 text-gray-100 text-sm">
              Maecenas tempor ligula phasellus per hac nisl. Facilisi curae nunc
              hendrerit vestibulum lobortis commodo lacus sagittis feugiat.
            </p>
            <button className="mt-6 bg-green-500 text-black py-2 px-4 rounded-md hover:bg-green-400">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
