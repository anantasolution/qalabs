import React , {useState} from 'react'

import { motion } from 'framer-motion'


//Importing icons
import P1 from '../assets/product1.jpg'
import P2 from '../assets/product2.jpg'
import P3 from '../assets/product3.jpg'

//Importing components
import CompanySlider from '../components/CompanySlider'
import StartJourneySection from '../components/StartJourneySection'
import TestimonialSlider from '../components/TestimonialSlider'


const ProjectCard = ({id, image, title, description }) => {
  
  const [Hover,setHover] = useState(null)

  const onMouseIn = (id) =>{
     setHover(id)
  }

  const onMouseOut = () =>{
    setHover(null)
  }

  return (
    <div className="bg-zinc-900 h-[600px] relative rounded-xl overflow-hidden group">
      <div className="relative transition-[height] duration-300 ease-out h-[410px]">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div onMouseEnter={()=>onMouseIn(id)} onMouseLeave={onMouseOut} className={`absolute ${(Hover!==null && Hover!==undefined && Hover===id)?"bottom-0":"-bottom-[3.8rem]"} transition-all duration-300  bg-[#242424] p-6`}>
        <h3 className="text-white tracking-wide leading-10  text-3xl font-light mb-2">{title}</h3>
        <p className="text-gray-400 font-medium leading-6 text-sm mb-4">{description}</p>
        <div className="transition-all duration-300 ease-in-out">
          <button className="bg-emerald-400 text-black px-4 py-2 rounded-full text-sm transition-colors">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};

function Project() {


  const projects = [
    {
      image: P1,
      title: "Man & Dance Company Perfume",
      description: "Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum."
    },
    {
      image: P2,
      title: "Nancy Watch Promotional Landing page",
      description: "Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum."
    },
    {
      image: P3,
      title: "Malika Perfume Funnel Landing Page",
      description: "Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum."
    },
    {
      image: P1,
      title: "Man & Dance Company Perfume",
      description: "Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum."
    },
    {
      image: P2,
      title: "Nancy Watch Promotional Landing page",
      description: "Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum."
    },
    {
      image: P3,
      title: "Malika Perfume Funnel Landing Page",
      description: "Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum."
    }
  ];

const upsideVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const downsideVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

  return (
    <div className='bg-[#151515]'>
    <div className="relative min-h-[50vh]  bg-cover bg-center" style={{ backgroundImage: "url('https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/3d-black-paper-craft-cubic-patterned-background.jpg')" }}>

    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={downsideVariants}
        >
            <a
                href="/contact"
                className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold text-6xl"
            >
                Project
            </a>
        </motion.div>

        <br />

        <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={upsideVariants}
        >
            <p className="text-white text-3xl opacity-100">
            Tailored Solutions for Your Digital Success.
            </p>
        </motion.div>
    </div>

   </div>
  <div className='w-full bg-[#151515]'>
   <div className='max-w-7xl mx-auto py-20 px-4'>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12 md:pb-24">
          {projects.map((project, index) => (
            <ProjectCard
              id={index}
              image={project.image}
              title={project.title}
              description={project.description}
            />
          ))}
     </div>
   </div>
  </div>
   <CompanySlider></CompanySlider>
   <StartJourneySection></StartJourneySection>
   <TestimonialSlider></TestimonialSlider>
   </div>
  )
}

export default Project