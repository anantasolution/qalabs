import React , {useState} from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import {  Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import FOOTER from '../assets/footer.png'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const buttonHover = {
        hover: { scale: 1.05 }
    };

    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            x: "100%",
            transition: {
                duration: 0.2
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3
            }
        }
    };

  return (
     
     <nav className="fixed w-full z-50 px-4 sm:px-6 py-4">
     <div className="container mx-auto flex justify-between items-center">
         <div className="flex items-center justify-center">
             <img src={FOOTER} alt="Webiso" className="h-6 sm:h-8" />
         </div>

         {/* Desktop Navigation */}

         <div className='hidden lg:flex items-center space-x-8'>
             <Link to={'/'} ><span className="text-white hover:text-[#BAFE6D] transition-colors">Homepage</span></Link>
             <Link to={'/aboutus'}><span className="text-white hover:text-[#BAFE6D] transition-colors">About us</span></Link>
             <Link to={'/services'}><span className="text-white hover:text-[#BAFE6D] transition-colors">Services</span></Link>
             <Link to={'/project'}><span className="text-white hover:text-[#BAFE6D] transition-colors">Project</span></Link>
             <Link to={'/contactus'}><span className="text-white hover:text-[#BAFE6D] transition-colors">Contact us</span></Link>
         </div>

         <div className="hidden lg:flex items-center ">
            
             <motion.button
                 whileHover="hover"
                 variants={buttonHover}
                 className="bg-[#71ECB6] text-black px-6 py-2 rounded-full hover:bg-[#BAFE6D] transition-colors cursor-pointer"
             >
                 Get Started
             </motion.button>
         </div>

         {/* Mobile Menu Button */}
         <button
             className="lg:hidden text-white p-2"
             onClick={() => setIsMenuOpen(!isMenuOpen)}
         >
             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
     </div>

     {/* Mobile Menu */}
     <AnimatePresence>
         {isMenuOpen && (
             <motion.div
                 initial="closed"
                 animate="open"
                 exit="closed"
                 variants={mobileMenuVariants}
                 className="fixed inset-y-0 right-0 w-full sm:w-64 bg-gray-900 p-6 lg:hidden"
             >
                 <div className="flex flex-col space-y-4">
                     <a href="#" className="text-white hover:text-green-400 transition-colors py-2">Homepage</a>
                     <a href="#" className="text-white hover:text-green-400 transition-colors py-2">About us</a>
                     <a href="#" className="text-white hover:text-green-400 transition-colors py-2">Services</a>
                     <a href="#" className="text-white hover:text-green-400 transition-colors py-2">Project</a>
                     <a href="#" className="text-white hover:text-green-400 transition-colors py-2">Contact us</a>
                     <a href="#" className="text-white hover:text-green-400 transition-colors py-2">Pages</a>
                 </div>
             </motion.div>
         )}
     </AnimatePresence>
 </nav>

  )
}

export default Navbar