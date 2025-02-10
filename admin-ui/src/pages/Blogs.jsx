import { Box } from "@mui/material";
import React, { useRef, useState } from "react";

import { motion, useAnimation } from "framer-motion";
import { toast } from "react-toastify";

import { ChevronRight, Settings } from 'lucide-react';
import SearchIcon from "@mui/icons-material/Search";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import NotInterestedOutlinedIcon from "@mui/icons-material/NotInterestedOutlined";
import SystemUpdateAltOutlinedIcon from "@mui/icons-material/SystemUpdateAltOutlined";
import BlogCards from "../components/Blog/BlogCards";

const Blogs = () => {

    const [loading, setLoading] = useState(false);


    return (
        <>
            <section className="flex flex-col border">
                {/* Navbar code */}
                <div className="w-full flex items-center justify-between p-4 bg-white border-b">
                    {/* Left side - Breadcrumbs */}
                    <div className="flex items-center space-x-2">
                        <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-500">Home</span>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-400">Blogs</span>
                    </div>

                    {/* Right side - Filter and Date Range */}
                    <div className="flex items-center space-x-4">
                        <div className="md:flex hidden border rounded-md p-1.5 gap-1.5 justify-center items-center">
                            <span>
                                <SearchIcon></SearchIcon>
                            </span>
                            <input
                                type="text"
                                className="outline-none"
                                placeholder="Search here...."
                            ></input>
                        </div>
                        <div className=" flex">
                            <button className="bg-blue-500 p-2 font-medium text-white hover:bg-blue-700">
                                Add Blog
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="h-[87.9%] w-full p-6">
                <div className="h-full py-5 px-4 rounded-md bg-white overflow-y-scroll shadow-md">
                    <Box
                        sx={{
                            height: "100%",
                            "& .super-app-theme--header": {
                                // backgroundColor: "#edf3fd",
                            },
                        }}
                    >
                   <BlogCards />
                   </Box>
                </div>
            </section>
        </>
    )
}

export default Blogs;