
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@mui/material";

const logos = [
  "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_6.png",
  "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_7.png",
  "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_5.png",
  "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_8.png",
  "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_3.png",
];

const testimonials = [
  {
    text: "Webiso transformed our outdated website into a modern, user-friendly platform that perfectly represents our brand. Their attention to detail and innovative design solutions have significantly increased our online engagement and sales. I highly recommend their services!",
    name: "Sarah Thompson",
    role: "Marketing Director at GreenLeaf Solutions",
    avatar: "https://klyker.com/wp-content/uploads/2013/09/weird-people-21.jpg",
  },
  {
    text: "Webiso delivered exactly what we were looking for – a beautiful, mobile-friendly website that attracts more customers to our online store. The process was smooth, and their support post-launch has been outstanding. We couldn't be happier with the results!",
    name: "Michael Anderson",
    role: "CEO of TechSavvy Innovations",
    avatar: "https://klyker.com/wp-content/uploads/2013/09/weird-people-21.jpg",
  },
  {
    text: "Webiso's team did an incredible job redesigning our website. Their commitment to delivering a user-friendly, visually appealing site was evident throughout the project. We've seen a 40% increase in user engagement and donations since the launch. Highly recommended!",
    name: "Olivia Martinez",
    role: "Director of Communications at EcoFuture Nonprofit",
    avatar: "https://klyker.com/wp-content/uploads/2013/09/weird-people-21.jpg",
  },
];

// Company logo sliding
const LogoMarquee = () => (
  <div className="overflow-hidden py-4 bg-[#1a1a1a] mt-0">
    <div className="flex animate-marquee">
      {logos.concat(logos).map((logo, index) => (
        <img
          key={index}
          src={logo}
          className="h-10 mx-4 brightness-0 invert"
          alt={`Logo ${index}`}
        />
      ))}
    </div>
    <style jsx>{`
      @keyframes marquee {
        0% {
          transform: translateX(100%);
        }
        100% {
          transform: translateX(-100%);
        }
      }
      .animate-marquee {
        display: flex;
        animation: marquee 20s linear infinite;
      }
    `}</style>
  </div>
);

// Project Showcase
const ProjectShowcase = () => {
  const projects = [
    {
      title: "Peter's Gym",
      description: "Gym website description.",
      imageUrl:
        "https://th.bing.com/th/id/OIP.czeVpoLo3ZK0FG6dhv4uqgHaE7?w=267&h=200&c=12&rs=1&p=0&pcl=1b1a19&o=6&dpr=1.3&pid=23.1",
    },
    {
      title: "Hoffman Wines",
      description: "Wine website description.",
      imageUrl:
        "https://th.bing.com/th/id/OIP.czeVpoLo3ZK0FG6dhv4uqgHaE7?w=267&h=200&c=12&rs=1&p=0&pcl=1b1a19&o=6&dpr=1.3&pid=23.1",
    },
    {
      title: "Coffee Toffee",
      description: "Coffee website description.",
      imageUrl:
        "https://th.bing.com/th/id/OIP.czeVpoLo3ZK0FG6dhv4uqgHaE7?w=267&h=200&c=12&rs=1&p=0&pcl=1b1a19&o=6&dpr=1.3&pid=23.1",
    },
    {
      title: "Marketing Agency",
      description: "Marketing website description.",
      imageUrl:
        "https://th.bing.com/th/id/OIP.czeVpoLo3ZK0FG6dhv4uqgHaE7?w=267&h=200&c=12&rs=1&p=0&pcl=1b1a19&o=6&dpr=1.3&pid=23.1",
    },
    {
      title: "E-Commerce",
      description: "E-commerce website description.",
      imageUrl:
        "https://th.bing.com/th/id/OIP.czeVpoLo3ZK0FG6dhv4uqgHaE7?w=267&h=200&c=12&rs=1&p=0&pcl=1b1a19&o=6&dpr=1.3&pid=23.1",
    },
    {
      title: "Social Media Platform",
      description: "Social media website description.",
      imageUrl:
        "https://th.bing.com/th/id/OIP.czeVpoLo3ZK0FG6dhv4uqgHaE7?w=267&h=200&c=12&rs=1&p=0&pcl=1b1a19&o=6&dpr=1.3&pid=23.1",
    },
  ];

  const ProjectCard = ({ title, description, imageUrl }) => (
    <div className="relative group h-[200px] md:h-[300px] rounded-lg overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all duration-300" />
      <div className="absolute inset-x-0 bottom-0 p-2 transition-all duration-300 group-hover:-translate-y-2">
        <h3 className="text-lg md:text-xl font-bold text-white mb-1">
          {title}
        </h3>
        <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {description}
        </p>
        <button className="mt-1 bg-emerald-400 hover:bg-emerald-500 text-black px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Learn more
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-900 p-2 mt-0">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

// HeroSection component
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen bg-gray-900">
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-75"
        style={{
          backgroundImage:
            "url('https://optimise2.assets-servd.host/acid-lorikeet/production/assets/imagery/blog_metrics.png?w=1200&h=630&q=82&auto=format&fit=crop&dm=1631129451&s=3e486cfab77c908dd4566cf6f9309125')",
        }}
      />
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="col-span-1"></div>
            <Card
              className={`col-span-1 p-5 bg-gray-900/80 backdrop-blur transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                Ready to Start? Let's Build{" "}
                <span className="text-cyan-400">Something Great</span> Together!
              </h1>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Maecenas tempor ligula phasellus per hac nisi. Facilisi curae
                nunc hendrerit vestibulum lobortis commodo lacus sagittis
                feugiat. Est sollicitudin convallis diam.
              </p>
              <button className="bg-emerald-400 hover:bg-emerald-500 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors">
                Start Your Journey
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Testimonial Slider component
export const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl text-white mb-8">What Our Clients Say</h2>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center">
            <div className="relative">
              <div className="flex justify-center">
                <img
                  src={testimonials[currentSlide].avatar}
                  alt="avatar"
                  className="w-16 h-16 rounded-full border-4 border-white mb-4"
                />
              </div>
              <p className="text-xl text-gray-300 italic mb-4">
                "{testimonials[currentSlide].text}"
              </p>
              <p className="font-semibold text-white">
                {testimonials[currentSlide].name}
              </p>
              <p className="text-gray-400">{testimonials[currentSlide].role}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Project component
const Project = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
    <motion.div
      className="h-[50vh] flex flex-col items-center justify-center text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <span className="bg-gradient-to-r from-blue-300 via-green-400 to-green-500 text-transparent bg-clip-text">
          Project
        </span>
      </motion.h1>
      <motion.p
        className="text-lg sm:text-xl lg:text-2xl max-w-xl mx-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Tailored Solutions for Your Digital Success.
      </motion.p>
    </motion.div>
    <ProjectShowcase />
    <LogoMarquee />
    <HeroSection />
    <TestimonialSlider />
  </div>
);

export default Project;