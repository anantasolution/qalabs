import React , {useEffect} from 'react'

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

//Importing images
import CEO from '../assets/ceo.jpg'

function AboutCeo() {

    const controls = useAnimation();
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
          controls.start("visible");
        }
    }, [controls, inView]);

  return (
    
    <div className="bg-[#151515] p-8">
    <div className="max-w-6xl mx-auto  flex flex-col lg:flex-row-reverse gap-8 items-center">
      <motion.div
        className="lg:w-1/2 relative"
        ref={ref}
        initial={{ x: 100, opacity: 0 }}
        animate={controls}
        variants={{
          visible: { x: 0, opacity: 1, transition: { duration: 1.5 } },
        }}
      >
        <img
          src={CEO || "/placeholder.svg"}
          alt="Team working together"
          className="rounded-lg grayscale hover:grayscale-0 transition-all duration-500 bg-cover"
        />
      </motion.div>

      <motion.div
        className="lg:w-1/2 bg-[#151515] p-8 rounded-lg"
        ref={ref}
        initial={{ x: -100, opacity: 0 }}
        animate={controls}
        variants={{
          visible: { x: 0, opacity: 1, transition: { duration: 1.5 } },
        }}
      >
        <h3 className="text-emerald-400 font-medium mb-4">WHO WE ARE</h3>
        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
          <span className="text-white">Empowering Businesses with </span>
          <span className="bg-gradient-to-r from-[#00ffff] via-[#00ccff] to-[#00ff8a] bg-clip-text text-transparent">
            Cutting-Edge Technology.
          </span>
        </h2>
        <p className="text-gray-400 mb-8 flex flex-col gap-3">
          <p>
            At ZyinexWeb, we specialize in crafting innovative, scalable,
            high-performance digital solutions tailored to your business
            needs. From web development to AI-driven applications, we
            empower brands with technology that drives success.
          </p>
          <p>
            We are a team of passionate tech experts dedicated to
            transforming ideas into reality. With a deep understanding of
            emerging technologies, we deliver solutions that optimise
            efficiency, enhance user experiences, and drive growth.
          </p>
          <p>
            With years of experience and a customer-first approach, we
            ensure that every project we undertake meets the highest
            standards of quality, security, and performance. From startups
            to enterprises, we help businesses navigate the digital
            landscape with confidence.
          </p>
        </p>

    

        {/* <motion.button
          className="bg-[#71ECB6] text-black  hover:bg-[#BAFE6D] transition-colors px-6 py-3 rounded-full hover:opacity-90"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Link to={"/contactus"}>Connect Now</Link>
        </motion.button> */}
      </motion.div>
    </div>
  </div>
  
  )
}

export default AboutCeo