import React from "react";
import LOGO from "../assets/logo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Autoplay, FreeMode } from "swiper/modules";

const logos = [
  LOGO, LOGO, LOGO, LOGO, LOGO, LOGO, LOGO, LOGO, LOGO, LOGO, LOGO,
];

const CompanySlider = () => {
  return (
    <>
      <div className="w-full py-7 md:py-10 bg-[#151515] flex justify-center px-10 border-t border-gray-600">
        <Swiper
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={6000} // Slow, smooth scrolling
          freeMode={true} // Enables seamless motion
          modules={[Autoplay, FreeMode]}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 }, // Mobile
            480: { slidesPerView: 3, spaceBetween: 15 }, // Small tablets
            768: { slidesPerView: 4, spaceBetween: 20 }, // Tablets
            1024: { slidesPerView: 5, spaceBetween: 20 }, // Small laptops
            1280: { slidesPerView: 6, spaceBetween: 20 }, // Large screens
          }}
          className="w-full"
        >
          {logos.map((logo, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <img src={logo} alt="logo" className="h-10 brightness-0 invert opacity-70" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default CompanySlider;