import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import FOOTER from '../assets/footer.png'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // for tracking url 
    const location = useLocation();

    const sidebarVariants = {
        closed: {
            x: "100%",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        open: {
            x: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const menuItems = [
        { name: 'Homepage', path: '/' },
        { name: 'About us', path: '/aboutus' },
        { name: 'Services', path: '/services' },
        { name: 'Project', path: '/project' },
        { name: 'Contact us', path: '/contactus' },
        { name: 'Blog Archive', path: '/blogsarchive' }
    ];

    return (
        <nav className="absolute w-full z-50 px-4 sm:px-6 py-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center justify-center">
                    <img src={FOOTER} alt="Webiso" className="h-6 sm:h-8" />
                </div>

                {/* Desktop Navigation */}
                <div className='hidden lg:flex items-center space-x-8 z-50'>
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={` transition-colors ${location.pathname === item.path
                                ? 'text-[#BAFE6D]'
                                : 'hover:text-[#BAFE6D] text-white'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Get Started Button */}
                <div className="hidden lg:flex items-center">
                    <button className="bg-[#71ECB6] text-black px-6 py-2 rounded-full hover:bg-[#BAFE6D] transition-colors cursor-pointer">
                        Get Started
                    </button>
                </div>

                <div className='flex  justify-between items-center gap-7  md:hidden'>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-white p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>


                <div className="hidden md:block lg:hidden  items-center">
                    <button className="bg-[#71ECB6] text-black px-6 py-2 rounded-full hover:bg-[#BAFE6D] transition-colors cursor-pointer">
                        Get Started
                    </button>
                </div>
                </div>
            </div>

            {/* Mobile Sidebar Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-40"
                            onClick={() => setIsMenuOpen(false)}
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={sidebarVariants}
                            className="fixed inset-y-0 right-0 w-64 bg-gray-900 z-50 shadow-lg"
                        >
                            <div className="flex flex-col p-6 pt-12 space-y-6">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-white text-lg hover:text-[#BAFE6D] transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            
        </nav>
    )
}

export default Navbar;