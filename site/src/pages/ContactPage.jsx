import React from 'react';
import { motion } from 'framer-motion';
import BI from '../assets/background.jpeg'

const ContactPage = () => {

    const leftColumnVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const rightColumnVariants = {
        hidden: { x: 100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

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
        <>
            {/* Title */}
            <div className="relative min-h-[70vh]  bg-cover bg-center" 
             style={{ backgroundImage: `url(${BI})` }} 
            >

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
                            Contact us
                        </a>
                    </motion.div>

                    <br />

                    <motion.div
                        className="space-y-8"
                        initial="hidden"
                        animate="visible"
                        variants={upsideVariants}
                    >
                        <p className="text-white text-[25px] opacity-100">
                            Start the conversation to establish a good <br /> relationship and business.
                        </p>
                    </motion.div>
                </div>

            </div>
            <div className="min-h-screen bg-neutral-900 text-white p-8 px-16 w-full">
                <div className="max-w-full mx-auto flex gap-12 pt-16 mt-10 pb-16 mb-10">
                    {/* Left Column */}
                    <motion.div
                        className="space-y-10 w-[45%] "
                        initial="hidden"
                        animate="visible"
                        variants={leftColumnVariants}
                    >
                        <div>
                            <h2 className="text-lime-300 text-sm font-medium mb-2">GET IN TOUCH</h2>
                            <h1 className="bg-clip-text text-white font-semibold text-[35px]">
                                Seamless Communication,
                                <br />
                                <span className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold text-[35px]">
                                    Global Impact <span className="text-white">.</span>
                                </span>
                            </h1>
                            <br />
                            <p className="text-gray-400">
                                Auctor dictumst inceptos metus est ad himenaeos habitasse <br /> litora natoque libero nunc
                            </p>
                            <br />
                            <div className="max-w-md w-300">
                                <div className="border-t border-gray-500 my-4 w-400 mx-left"></div>
                            </div>
                        </div>

                        <div className="space-y-7">
                            <div className="flex items-center gap-4">
                                <div className="bg-lime-300 p-4 rounded-full">
                                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-xl">Head Office</h3>
                                    <p className="text-gray-400">Jalan Cempaka Wangi No 22</p>
                                    <p className="text-gray-400">Jakarta - Indonesia</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-lime-300 p-4 rounded-full">
                                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-xl">Email Support</h3>
                                    <p className="text-gray-400">support@yourdomain.tld</p>
                                    <p className="text-gray-400">hello@yourdomain.tld</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-lime-300 p-4 rounded-full">
                                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-xl">Let's Talk</h3>
                                    <p className="text-gray-400">Phone : +6221.2002.2012</p>
                                    <p className="text-gray-400">Fax : +6221.2002.2013</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Contact Form */}
                    <motion.div
                        className="bg-neutral-900 col-span-2 w-[55%] border border-zinc-600 rounded-2xl py-8 px-10 " // Reduced padding (py-12 to py-8)
                        style={{ maxWidth: '5000px', maxHeight: '100vh' }} // Limiting height to 80% of the viewport height
                        initial="hidden"
                        animate="visible"
                        variants={rightColumnVariants}
                    >
                        <h2 className="text-4xl mb-2">Send us a message</h2>
                        <p className="text-gray-400 mb-4">
                            Auctor dictumst inceptos metus est ad himenaeos habitasse litora natoque libero nunc
                        </p>

                        <form className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input type="text" className="w-full px-4 py-2 bg-neutral-800 text-white rounded-lg border border-gray-600" placeholder="Name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Company</label>
                                    <input type="text" className="w-full px-4 py-2 bg-neutral-800 text-white rounded-lg border border-gray-600" placeholder="Company" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Phone</label>
                                    <input type="tel" className="w-full px-4 py-2 bg-neutral-800 text-white rounded-lg border border-gray-600" placeholder="Phone" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <input type="email" className="w-full px-4 py-2 bg-neutral-800 text-white rounded-lg border border-gray-600" placeholder="Email" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Subject</label>
                                <input type="text" className="w-full px-4 py-2 bg-neutral-800 text-white rounded-lg border border-gray-600" placeholder="Subject" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Message</label>
                                <textarea placeholder="Message" className="w-full px-4 py-2 bg-neutral-800 text-white rounded-lg border border-gray-600 h-24"></textarea>
                            </div>

                            <button
                                type="submit"
                                className="bg-emerald-300 hover:bg-lime-300 text-gray-900 px-4 py-2 font-sm transition-colors duration-300 flex items-center gap-2 cursor-pointer rounded-full"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>


            {/* Google Maps Section */}
            <div>
                <section className="p-0"> {/* Removed padding from section */}
                    <div className="w-full max-w-full"> {/* Removed max-width limit */}
                        <iframe
                            className="w-full h-[500px] rounded-lg shadow-lg" // Keeping map height and width full
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d63467.022415707266!2d106.86193725497907!3d-6.1723914803575575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1738742651281!5m2!1sen!2sin"
                            style={{ border: 0, margin: 0 }} // Removed border and margin
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps"
                        ></iframe>
                    </div>
                </section>
            </div>

        </>
    );
};

export default ContactPage;