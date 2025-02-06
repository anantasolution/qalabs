import React, { useState } from 'react';

//Importing icons
import P1 from '../assets/product1.jpg'
import P2 from '../assets/product2.jpg'
import P3 from '../assets/product3.jpg'

const ProjectCard = ({id, image, title, description }) => {
  
  const [Hover,setHover] = useState(null)

  console.log("Hover value--->",Hover)

  const onMouseIn = (id) =>{
     console.log("hover on ",id)
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

const FeaturedProjectSection = () => {
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
    }
  ];

  return (
    <section className="w-full bg-[#151515] min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col text-center py-12 md:py-24">
          <p className="text-lime-400 text-xs md:text-base uppercase tracking-wider mb-4">
            FEATURED PROJECT
          </p>
          <h1 className='text-4xl text-white'>
          Inspired by <span className='bg-gradient-to-r from-[#00ffff] via-[#00ccff] to-[#00ff8a] bg-clip-text text-transparent'>Our Projects?</span> Let's <br></br> Create Yours!
          </h1>
          
        </div>

        {/* Cards Grid */}
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
    </section>
  );
};

export default FeaturedProjectSection;