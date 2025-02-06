import React from 'react';
import { motion } from 'framer-motion';

const Cards = () => {
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1.5 } }
    };

    return (
        <motion.div
            className="min-h-screen bg-neutral-900 text-white p-8 flex justify-center items-center"
            style={{
                backgroundImage: "url('https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/bg_img3_.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
        >
            {/* Container for the grid of cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
                {/* First Card */}
                <motion.div
                    className="max-w-sm w-full bg-neutral-800 p-8 rounded-lg shadow-lg space-y-6 border-2 border-neutral-700 transition-all duration-300 ease-in-out hover:border-lime-500"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <div className="flex items-center space-x-4">
                        <div className="bg-lime-300 p-4 rounded-full -mt-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>

                        </div>
                        <div>
                            <h1 className="text-white text-3xl text-left">Web Design</h1>
                            <p className="text-gray-400 text-sm text-left">
                                Auctor dictumst inceptos metus est ad himenaeos habitasse <br /> litora natoque libero nunc
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-gray-500 my-4"></div>
                    <p>Netus condimentum erat vestibulum sollicitudin sem tempor lacinia.</p>
                    <button
                        type="submit"
                        className="bg-emerald-300 hover:bg-lime-300 text-gray-900 px-4 py-2 font-sm transition-colors duration-300 flex items-center gap-2 cursor-pointer rounded-full"
                    >
                        Get Started
                    </button>
                </motion.div>

                {/* Second Card */}
                <motion.div
                    className="max-w-sm w-full bg-neutral-800 p-8 rounded-lg shadow-lg space-y-6 border-2 border-neutral-700 transition-all duration-300 ease-in-out hover:border-lime-500"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <div className="flex items-center space-x-4">
                        <div className="bg-lime-300 p-4 rounded-full -mt-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                            </svg>

                        </div>
                        <div>
                            <h1 className="text-white text-3xl text-left whitespace-nowrap">Web Development</h1>
                            <p className="text-gray-400 text-sm text-left">
                                Auctor dictumst inceptos metus est ad himenaeos habitasse <br /> litora natoque libero nunc
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-gray-500 my-4"></div>
                    <p>Netus condimentum erat vestibulum sollicitudin sem tempor lacinia.</p>
                    <button
                        type="submit"
                        className="bg-emerald-300 hover:bg-lime-300 text-gray-900 px-4 py-2 font-sm transition-colors duration-300 flex items-center gap-2 cursor-pointer rounded-full"
                    >
                        Get Started
                    </button>
                </motion.div>

                {/* Third Card */}
                <motion.div
                    className="max-w-sm w-full bg-neutral-800 p-8 rounded-lg shadow-lg space-y-6 border-2 border-neutral-700 transition-all duration-300 ease-in-out hover:border-lime-500"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <div className="flex items-center space-x-4">
                        <div className="bg-lime-300 p-4 rounded-full -mt-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>

                        </div>
                        <div>
                            <h1 className="text-white text-3xl text-left whitespace-nowrap">Digital Marketing</h1>
                            <p className="text-gray-400 text-sm text-left">
                                Auctor dictumst inceptos metus est ad himenaeos habitasse <br /> litora natoque libero nunc
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-gray-500 my-4"></div>
                    <p>Netus condimentum erat vestibulum sollicitudin sem tempor lacinia.</p>
                    <button
                        type="submit"
                        className="bg-emerald-300 hover:bg-lime-300 text-gray-900 px-4 py-2 font-sm transition-colors duration-300 flex items-center gap-2 cursor-pointer rounded-full"
                    >
                        Get Started
                    </button>
                </motion.div>

                {/* Fourth Card */}
                <motion.div
                    className="max-w-sm w-full bg-neutral-800 p-8 rounded-lg shadow-lg space-y-6 border-2 border-neutral-700 transition-all duration-300 ease-in-out hover:border-lime-500"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <div className="flex items-center space-x-4">
                        <div className="bg-lime-300 p-4 rounded-full -mt-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
                            </svg>

                        </div>
                        <div>
                            <h1 className="text-white text-3xl text-left whitespace-nowrap">Visual Identity</h1>
                            <p className="text-gray-400 text-sm text-left">
                                Auctor dictumst inceptos metus est ad himenaeos habitasse <br /> litora natoque libero nunc
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-gray-500 my-4"></div>
                    <p>Netus condimentum erat vestibulum sollicitudin sem tempor lacinia.</p>
                    <button
                        type="submit"
                        className="bg-emerald-300 hover:bg-lime-300 text-gray-900 px-4 py-2 font-sm transition-colors duration-300 flex items-center gap-2 cursor-pointer rounded-full"
                    >
                        Get Started
                    </button>
                </motion.div>

                {/* Fifth Card */}
                <motion.div
                    className="max-w-sm w-full bg-neutral-800 p-8 rounded-lg shadow-lg space-y-6 border-2 border-neutral-700 transition-all duration-300 ease-in-out hover:border-lime-500"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <div className="flex items-center space-x-4">
                        <div className="bg-lime-300 p-4 rounded-full -mt-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                            </svg>

                        </div>
                        <div>
                            <h1 className="text-white text-3xl text-left whitespace-nowrap">Consultation</h1>
                            <p className="text-gray-400 text-sm text-left">
                                Auctor dictumst inceptos metus est ad himenaeos habitasse <br /> litora natoque libero nunc
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-gray-500 my-4"></div>
                    <p>Netus condimentum erat vestibulum sollicitudin sem tempor lacinia.</p>
                    <button
                        type="submit"
                        className="bg-emerald-300 hover:bg-lime-300 text-gray-900 px-4 py-2 font-sm transition-colors duration-300 flex items-center gap-2 cursor-pointer rounded-full"
                    >
                        Get Started
                    </button>
                </motion.div>

                {/* Sixth Card */}
                <motion.div
                    className="max-w-sm w-full bg-neutral-800 p-8 rounded-lg shadow-lg space-y-6 border-2 border-neutral-700 transition-all duration-300 ease-in-out hover:border-lime-500"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <div className="flex items-center space-x-4">
                        <div className="bg-lime-300 p-4 rounded-full -mt-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                        </div>
                        <div>
                            <h1 className="text-white text-3xl text-left whitespace-nowrap">Web Maintenance</h1>
                            <p className="text-gray-400 text-sm text-left">
                                Auctor dictumst inceptos metus est ad himenaeos habitasse <br /> litora natoque libero nunc
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-gray-500 my-4"></div>
                    <p>Netus condimentum erat vestibulum sollicitudin sem tempor lacinia.</p>
                    <button
                        type="submit"
                        className="bg-emerald-300 hover:bg-lime-300 text-gray-900 px-4 py-2 font-sm transition-colors duration-300 flex items-center gap-2 cursor-pointer rounded-full"
                    >
                        Get Started
                    </button>
                </motion.div>

            </div>
        </motion.div>
    );
};

export default Cards;