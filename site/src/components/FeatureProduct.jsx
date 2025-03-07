import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";


const ProjectCard = ({ id, image, title, description, controls }) => {
  const [hover, setHover] = useState(null);
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

 

  return (
    <div
      className="bg-zinc-900 h-[600px] relative rounded-xl overflow-hidden group"
      // initial="hidden"
      // animate={controls}
      // variants={fadeIn}
      // transition={{ duration: 2, delay: id * 0.2 }} // Staggered effect
      onMouseEnter={() => setHover(id)}
      onMouseLeave={() => setHover(null)}
    >
      <div className="relative transition-[height] duration-300 ease-out h-[410px]">
        <img src={`${process.env.REACT_APP_API_BASE_PROJECT}/${image}`} alt={title} className="w-full h-[410px] object-cover" />
      </div>
      <div
        className={`absolute w-full ${hover === id ? "bottom-0" : "-bottom-[3.8rem]"
          } transition-all duration-300 bg-[#242424] p-6`}
      >
        <h3 className="text-white tracking-wide leading-10 text-3xl font-light mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-400 font-medium leading-6 text-sm mb-4 line-clamp-6" dangerouslySetInnerHTML={{ __html: description }} />

        {/* <button className="bg-emerald-400 text-black px-4 py-2 rounded-full text-sm transition-colors">
          Learn more
        </button> */}
      </div>
    </div>
  );
};

const FeaturedProjectSection = () => {
  const controls = useAnimation(); // Animation controls for Framer Motion
  const sectionRef = useRef(null);

  const locations = useLocation();
  const isProjectPage = () => {
    return locations.pathname.includes("projects");
  }

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         setInView(true);
  //         controls.start("visible"); // Start animations when in view
  //       } else {
  //         // controls.start("hidden"); // Optionally, reverse animations when out of view
  //       }
  //     },
  //     { threshold: 0.3 } // Trigger when 50% of the section is in view
  //   );

  //   if (sectionRef.current) {
  //     observer.observe(sectionRef.current);
  //   }

  //   return () => {
  //     if (sectionRef.current) {
  //       observer.unobserve(sectionRef.current);
  //     }
  //   };
  // }, []);

  // const projects = [
  //   {
  //     image: P1,
  //     title: "Man & Dance Company Perfume",
  //     description:
  //       "Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum.",
  //   },
  //   {
  //     image: P2,
  //     title: "Nancy Watch Promotional Landing page",
  //     description:
  //       "Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum.",
  //   },
  //   {
  //     image: P3,
  //     title: "Malika Perfume Funnel Landing Page",
  //     description:
  //       "Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum.",
  //   },
  //   {
  //     image: P1,
  //     title: "Man & Dance Company Perfume",
  //     description:
  //       "Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum.",
  //   },
  //   {
  //     image: P2,
  //     title: "Nancy Watch Promotional Landing page",
  //     description:
  //       "Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum.",
  //   },
  //   {
  //     image: P3,
  //     title: "Malika Perfume Funnel Landing Page",
  //     description:
  //       "Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum.",
  //   },
  // ];

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const getProjects = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/project/getallprojects`);
        console.log(response);
        setProjects(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getProjects();
  }, []);

  return (
    <section className="w-full bg-[#151515] min-h-screen" ref={sectionRef} id="project">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col text-center py-12 md:py-24">
          <p className="text-lime-400 text-xs md:text-base uppercase tracking-wider mb-4">
            FEATURED PROJECT
          </p>
          <h1 className="text-2xl md:text-4xl text-white">
            Inspired by{" "}
            <span className="bg-gradient-to-r from-[#00ffff] via-[#00ccff] to-[#00ff8a] bg-clip-text text-transparent">
              Our Projects?
            </span>{" "}
            Let's <br /> Create Yours!
          </h1>
        </div>

        {/* Cards Grid */}
        {loading ?
          (<div className="w-full p-10 h-[500px] bg-[#151515] flex justify-center items-center">
            <div className="animate-spin border-e-2 border-green-500 h-14 w-14 rounded-full"></div>
          </div>)
          :
          (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  id={index}
                  image={project?.photo?.filename}
                  title={project.title}
                  description={project.description}
                  controls={controls}
                  ref={sectionRef}
                />
              ))}
            </div>
          )
        }
        {isProjectPage() && <div className="w-full flex justify-center items-center">
          <Link to={"/project"} className="bg-[#71ECB6] text-black rounded-full flex justify-center items-center hover:bg-[#BAFE6D] py-2 px-6 transition-colors duration-200 w-36">
            Show More
          </Link>
        </div>}
      </div>
    </section>
  );
};

export default FeaturedProjectSection;
