import React from 'react';


const ContactPage = () => {
    return (
        <>
            {/* Title */}
            <div className="relative min-h-[70vh]  bg-cover bg-center" style={{ backgroundImage: "url('https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/3d-black-paper-craft-cubic-patterned-background.jpg')" }}>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <a
                        href="/contact"
                        className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold text-6xl"
                    >
                        Contact us
                    </a>
                    <br />
                    <p className="text-white text-3xl opacity-100">
                        Start the conversation to establish a good <br /> relationship and business.
                    </p>
                </div>

            </div>

            {/* Contact Form & Information */}
            <div className="min-h-screen bg-neutral-900 text-white p-8">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
                    {/* Left Column */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-lime-300 text-sm font-medium mb-2">GET IN TOUCH</h2>
                            <h1 className="bg-clip-text text-white font-semibold text-4xl">
                                Seamless Communication,
                                <br />
                                <span className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold text-4xl">
                                    Global Impact <span className="text-white">.</span>
                                </span>
                            </h1>
                            <br />
                            <p className="text-gray-400">
                                Auctor dictumst inceptos metus est ad himenaeos habitasse <br /> litora natoque libero nunc
                            </p>
                            <br />
                            <div className="border-t border-gray-500 my-4"></div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-lime-300 p-4 rounded-full">
                                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
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
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
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
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-xl">Let's Talk</h3>
                                    <p className="text-gray-400">Phone : +6221.2002.2012</p>
                                    <p className="text-gray-400">Fax : +6221.2002.2013</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="bg-neutral-900 border border-zinc-600 rounded-2xl p-8">
                        <h2 className="text-4xl  mb-6">Send us a message</h2>
                        <p className="text-gray-400 mb-8">
                            Auctor dictumst inceptos metus est ad himenaeos habitasse litora natoque libero nunc
                        </p>

                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-neutral text-white rounded-lg border border-gray-600"
                                        placeholder="Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Company</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-neutral text-white rounded-lg border border-gray-600"
                                        placeholder="Company"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 bg-neutral text-white rounded-lg border border-gray-600"
                                        placeholder="Phone"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 bg-neutral text-white rounded-lg border border-gray-600"
                                        placeholder="Email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Subject</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-neutral text-white rounded-lg border border-gray-600"
                                    placeholder="Subject"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    placeholder="Message"
                                    className="w-full px-4 py-3 bg-neutral text-white rounded-lg border border-gray-600"
                                ></textarea>
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
                    </div>
                </div>
            </div>

            {/* Google Maps Section */}
            <div className='bg-black '>
                <section className="flex flex-col items-center justify-center p-6 bg-black text-white">
                    <div className="w-full max-w-9xl">
                        <iframe
                            className="w-full h-[500px] rounded-lg shadow-lg" // Increased height here
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d63467.022415707266!2d106.86193725497907!3d-6.1723914803575575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1738742651281!5m2!1sen!2sin"
                            style={{ border: 0 }}
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