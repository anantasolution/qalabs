import React from 'react'
import { motion } from "framer-motion";

function InovationDesign() {
  return (
    <div className="bg-[#151515] py-32">
       <div className="max-w-[1400px] mx-auto px-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
           {/* Left side content */}
           <motion.div
             className="flex flex-col justify-center space-y-6 max-w-xl"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3 }}
           >
             <h2 className="text-4xl md:text-[40px] leading-tight text-white">
               Innovative Design for{" "}
               <span className="text-4xl md:text-[40px] text-transparent bg-gradient-to-r from-blue-300 to-green-400 bg-clip-text">
                 Modern Businesses.
               </span>
             </h2>

             <p className="text-gray-400 text-md leading-relaxed">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
               elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
               leo.
             </p>
             <motion.button
               className="bg-green-300 text-black px-4 py-2 rounded-full text-base px w-fit hover:bg-teal-500 transition duration-300"
               whileHover={{ scale: 1.05 }}
             >
               Learn more
             </motion.button>
           </motion.div>

           {/* Right side stats */}
           <div className="grid grid-cols-2 gap-6">
             <motion.div
               className=" bg-neutral-800 p-7 rounded-3xl border border-gray-700"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
               whileHover={{ scale: 1.02 }}
             >
               <div className="flex items-start justify-between mb-4">
                 <h3 className="  text-4xl font-dark text-white">+60%</h3>
                 <svg
                   className="w-10 h-10 text-emerald-400"
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
               <h4 className="text-gray-400 text-xl mb-4">
                 Traffic Increase
               </h4>
               <div className="h-px bg-gray-500 mb-4"></div>
               <p className="text-gray-400 text-base leading-relaxed">
                 By optimizing your website for search engines and enhancing
                 user experience.
               </p>
             </motion.div>

             <motion.div
               className="bg-black p-8 rounded-3xl border border-gray-700"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.6 }}
               whileHover={{ scale: 1.02 }}
             >
               <div className="flex items-start justify-between mb-4">
                 <h3 className="text-4xl font-dark text-white">+30%</h3>
                 <svg
                   className="w-10 h-10 text-emerald-400"
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
               <h4 className="text-gray-400 text-xl mb-4">
                 Revenue Increase
               </h4>
               <div className="h-px bg-zinc-700 mb-4"></div>
               <p className="text-gray-400 text-base leading-relaxed">
                 Rise in revenue as more visitors convert into paying
                 customers.
               </p>
             </motion.div>
           </div>
         </div>
       </div>
    </div>
  )
}

export default InovationDesign