import React from "react";
import LOGO from "../assets/logo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Autoplay, FreeMode } from "swiper/modules";
import {toast} from 'react-toastify'
import axios from 'axios'
import { useEffect } from "react";
import { useState } from "react";

const CompanySlider = () => {

  const [logos,setLogos] = useState([])


  const fetchPhotoes = async () =>{
    try{
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/photos`)
      setLogos(response.data.map((item)=>(
         `${process.env.REACT_APP_API_BASE_LOGOS}/${item.image.filename}`
      )))
    }catch(err){
      console.log(err)
      toast.error(err?.response?.data?.message || "Something went wrong.")
    }
  }

  console.log("logos---->",logos)

  useEffect(()=>{
    fetchPhotoes()
  },[])


  return (
    <>
      <div className="w-full py-7 md:py-10 bg-[#151515] flex justify-center px-10 border-t border-gray-600">
        <Swiper
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 0 }}
          speed={1500} // Slow, smooth scrolling
          freeMode={true} // Enables seamless motion
          modules={[Autoplay]}
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