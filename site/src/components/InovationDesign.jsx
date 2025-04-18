import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";

function InovationDesign() {

  const [network,setNetwork] = useState([])

  const fetchData = async () =>{
    try{
       const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/networks`)
       setNetwork(response.data)
    }catch(err){
      console.log(err)
    }
  }

  const [inView, setInView] = useState(false);
  const controls = useAnimation(); // Animation controls for Framer Motion
  const sectionRef = useRef(null);

  useEffect(() => {
    fetchData()
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          controls.start("visible"); // Start animations when in view
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is in view
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

  return (
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
              Modern design for
              <span className="text-4xl md:text-[40px] text-transparent bg-gradient-to-r from-blue-300 to-green-400 bg-clip-text">
                {" "}
                Competitive edges
              </span>
            </h2>
            <p className="text-gray-400 text-md leading-relaxed">
              We create visually spectacular and strategically built websites
              that increase the credibility of the brand and drive customer
              engagement.
            </p>
            {/* <button
              className="bg-[#71ECB6] text-black rounded-full hover:bg-[#BAFE6D] px-4 py-2 text-base px w-fit transition duration-300"
            >
              Learn more
            </button> */}
          </motion.div>

          {/* Right side stats */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            {
              network.map((item,index)=>(
                <motion.div
                key={index}
                className=" bg-neutral-800 p-7 rounded-xl "
                initial={{ y: "150%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-6xl font-dark text-white">{item.Count}</h2>
  
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
                <h4 className="text-gray-400 text-xl mb-4">{item.Title}</h4>
                <div className="h-px bg-gray-500 mb-4"></div>
                <p className="text-gray-400 text-base leading-relaxed">
                  {
                    item.Description
                  }
                </p>
              </motion.div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default InovationDesign;
