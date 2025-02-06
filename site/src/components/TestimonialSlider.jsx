import React, {useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

//Importing images
import PERSON from '../assets/person.jpg'

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const testimonials = [
    {
      text: "Webiso transformed our outdated website into a modern, user-friendly platform that perfectly represents our brand. Their attention to detail and innovative design solutions have significantly increased our engagement.",
      name: "Sarah Thompson",
      role: "Marketing Director at GreenLeaf Solutions",
      avatar: PERSON
    },
    {
      text: "Webiso transformed our outdated website into a modern, user-friendly platform that perfectly represents our brand. Their attention to detail and innovative design solutions have significantly increased our engagement.",
      name: "Michael Anderson",
      role: "Director of TechSavvy Innovations",
      avatar: PERSON
    },
    {
      text: "Webiso transformed our outdated website into a modern, user-friendly platform that perfectly represents our brand. Their attention to detail and innovative design solutions have significantly increased our engagement.",
      name: "Olivia Martinez",
      role: "Director of Communications at EcoFuture",
      avatar: PERSON
    },
    {
      text: "We've seen a 40% increase in user engagement since the launch. Their commitment to delivering a user-friendly, visually appealing site was evident throughout the project. Highly recommended!",
      name: "Olivia Martinez",
      role: "Director of Communications at EcoFuture",
      avatar: PERSON
    },
  
  
    {
      text: "Webiso transformed our outdated website into a modern, user-friendly platform that perfectly represents our brand. Their attention to detail and innovative design solutions have significantly increased our engagement.",
      name: "Tom Harrison",
      role: "Community Head of the bussiness",
      avatar: PERSON
    },
    {
      text: "Webiso transformed our outdated website into a modern, user-friendly platform that perfectly represents our brand. Their attention to detail and innovative design solutions have significantly increased our engagement.",
      name: "Rachel Brooks",
      role: "E-commerce Lead at ShopDirect",
      avatar: PERSON
    },
    
    {
      text: "We've seen a 40% increase in user engagement since the launch. Their commitment to delivering a user-friendly, visually appealing site was evident throughout the project. Highly recommended!",
      name: "Olivia Martinez",
      role: "Director of Communications at EcoFuture",
      avatar: PERSON
    },
  
  
    {
      text: "Webiso transformed our outdated website into a modern, user-friendly platform that perfectly represents our brand. Their attention to detail and innovative design solutions have significantly increased our engagement.",
      name: "Tom Harrison",
      role: "Operations Head at ServicePro",
      avatar: PERSON
    },
    {
      text: "Webiso transformed our outdated website into a modern, user-friendly platform that perfectly represents our brand. Their attention to detail and innovative design solutions have significantly increased our engagement.",
      name: "Rachel Brooks",
      role: "E-commerce Lead at ShopDirect",
      avatar: PERSON
    }
  ];

  


const TestimonialSlider = () => {
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0); // Track the active index
  
    const handleSlideChange = (index) => {
      if (swiperInstance) {
        swiperInstance.slideTo(index);
      }
    };
  
    const handleSlideActive = (swiper) => {
      setActiveIndex(swiper.activeIndex); // Update active index when slide changes
    };
  
    return (
      <section className="bg-[#151515] py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-lime-400 text-sm uppercase tracking-wider mb-2">
              Testimonials
            </p>
            <h2 className="">
              <span className="text-4xl bg-gradient-to-r from-[#00ffff] via-[#00ccff] to-[#00ff8a] bg-clip-text text-transparent">
                Client Feedback & Reviews
              </span>
            </h2>
          </div>
  
          {/* Swiper Component */}
          <Swiper
            onSwiper={setSwiperInstance}
            onSlideChange={handleSlideActive} // Update active index on slide change
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="relative"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#242424] rounded-lg p-6 shadow-md">
                  <p className="text-gray-400 mb-4 text-center">
                    {testimonial.text}
                  </p>
                </div>
                <div>
                  <div className="bg-[#151515] flex justify-center items-center">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-600">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-white font-semibold">{testimonial.name}</h3>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
  
          {/* Custom Dot Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(3)].map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`px-1 py-1 rounded-full ${
                  activeIndex === index
                    ? "bg-gradient-to-r from-[#00ffff] via-[#00ccff] to-[#00ff8a]"
                    : "bg-[#242424]"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </section>
    );
  };


  export default TestimonialSlider