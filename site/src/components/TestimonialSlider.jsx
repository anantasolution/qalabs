import React, {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";

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

    const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const getTestimonials = async ()=>{
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/feedback/getallfeedbacks`);
        console.log(response);
        setFeedbacks(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    }
    getTestimonials();
    
  }, [])
  console.log(feedbacks)
    return (
      <section className="bg-[#151515] py-12 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-lime-400 text-sm uppercase tracking-wider mb-2">
              Testimonials
            </p>
            <h2 className="">
              <span className="bg-gradient-to-r from-[#00ffff] via-[#00ccff] to-[#00ff8a] bg-clip-text text-transparent text-2xl md:text-4xl">
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
            pagination={{clickable:true}}
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
            {feedbacks.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#242424] rounded-lg p-6 shadow-md h-48 line-clamp-6">
                  <p className="text-gray-400 mb-4 text-center" dangerouslySetInnerHTML={{ __html: testimonial?.reviewMessage }} />
                </div>
                <div className="w-full">
                  <div className="bg-[#151515] flex justify-start px-3 items-center w-full">
                    <div className="flex items-center justify-between">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-600 text-gray-300">
                        <img
                          src={`${process.env.REACT_APP_API_BASE_FEEDBACK}/${testimonial?.profilePicture?.filename}`}
                          alt={testimonial?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-white font-semibold">{testimonial?.name}</h3>
                        <p className="text-gray-400 text-sm">{testimonial?.designation}</p>
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