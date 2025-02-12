import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import { ChevronRight } from 'lucide-react';
import SearchIcon from "@mui/icons-material/Search";
import BlogCards from "../components/Blog/BlogCards";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";


import axios from "axios";
import { toast } from "react-toastify";


// For formating date formate
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    // Extract hours, minutes, and AM/PM
    let hours = date.getHours();
    hours = hours % 12 || 12; // Convert 24-hour to 12-hour format

    // Extract day, short month, and year
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" })
    const year = date.getFullYear();

    // Return formatted string with the extra space after hh:mm
    return `${day} ${month} ${year}`;
};


const Blogs = () => {

    const [loading, setLoading] = useState(false);

    const [addForm, setAddForm] = useState(false);

    const [blogs, setBlogs] = useState([]);

    const fetchData = async ()=>{
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/blogs/getAllBlog`);

            const blogs = response.data.data.map((item, index) => ({
                ...item,
                updatedAt: formatTimestamp(item.updatedAt), // Format timestamp
                category_name: item.category.category_name

            }));


            setBlogs(blogs);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

    useEffect(()=>{
        fetchData();
    },[])

    return (
        <>
            {/* {addForm && (
                <div className="fixed z-50 inset-0 bg-black/50  flex justify-center items-center">
                    <BlogCreationForm setShow={setAddForm}/>
                </div>
            )} */}
            <section className="flex flex-col ">
                {/* Navbar code */}
                <Breadcrumbs></Breadcrumbs>
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
                   <BlogCards data={blogs}/>
                   </Box>
                </div>
            </section>
        </>
    )
}

export default Blogs;