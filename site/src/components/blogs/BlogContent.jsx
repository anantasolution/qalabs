import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import SocialShare from './SocialShare';
import { useEffect } from 'react';
import axios from "axios";

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


const BlogContent = ({data}) => {

    const [categories, setCategories] = useState([]);
    const [trendingBlogs, setTrendingBlogs] = useState([]);

    const getLatestBlogs = async ()=>{
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/blogs/latestblogs`);
            console.log(response.data.data);
            setTrendingBlogs(response?.data?.data);
        } catch (error) {
         console.log(error);
        }
    }


    const getTrendingCategories = async () => {
        setCategories([]);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/category/terndingBlogs`);
            console.log(response);

            response?.data?.data?.map(val => {
                setCategories(prev => [...prev, val.category_name])
            });

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getTrendingCategories(); 
        getLatestBlogs();
    },[])


    return (
        <div className="min-h-screen bg-[#151515] text-gray-300 w-full flex justify-center py-5">
            {/* Main Content and Sidebar */}
            <div className="flex flex-col lg:flex-row w-11/12 md:w-10/12 gap-3 md:gap-10 ">
                {/* Main Content */}

                <div className="flex flex-col gap-1 p-2  md:w-11/12 text-lg">
                    <section className="bg-[#151515] flex flex-col text-white w-11/12 gap-6 py-3">
                        <div id='preview' className={`h-full`} dangerouslySetInnerHTML={{ __html: data.content }} />
                    </section>

                    <SocialShare />

                    {/* Author details */}
                    {/* <section className="flex items-center space-x-4 p-6 bg-[#242424] rounded-xl">
                        <div className=" rounded-full overflow-hidden">
                            <img
                                src={blogimage}
                                alt="Author"
                                className="h-16 w-16  object-cover"
                            />
                        </div>
                        <div>
                            <h3 className=" font-semibold ">Natalie Stanley</h3>
                            <p className="text-sm text-gray-400">
                                Hi, this is dummy biographical info for the design template kit moxcreative.
                                If any questions do hesitate to send us a message on the profile page ThemeForest.
                            </p>
                        </div>
                    </section> */}

                    {/* Comment Form */}
                    {/* <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Leave a Reply</h2>
                        <p className="text-sm text-gray-400 mb-6">
                            Your email address will not be published. Required fields are marked *
                        </p>

                        <form className="space-y-6">
                            <div>
                                <label htmlFor="comment" className="block text-sm font-medium mb-2">
                                    Comment *
                                </label>
                                <textarea
                                    id="comment"
                                    required
                                    rows={6}
                                    className="w-full px-4 py-2 bg-[#242424] border border-gray-700 rounded-lg focus:outline-none focus:border focus:border-green-500  focus:border-transparent"
                                />
                            </div>

                            
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                    className="w-full px-4 py-2 bg-[#242424] border border-gray-700 rounded-lg focus:outline-none focus:border focus:border-green-500  focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                    className="w-full px-4 py-2 bg-[#242424] border border-gray-700 rounded-lg focus:outline-none focus:border focus:border-green-500 focus:border-transparent"
                                    />
                                </div>

                            {/* Website Input */}
                    {/* <div>
                                <label
                                    htmlFor="website"
                                    className="block text-lg font-medium text-gray-200 mb-2"
                                >
                                    Website
                                </label>
                                <input
                                    type="url"
                                    id="website"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-[#242424] border border-gray-700 rounded-lg 
                                     text-gray-200 focus:outline-none focus:border focus:border-green-500 focus:border-transparent
                                     transition-colors duration-200"
                                />
                            </div> */}

                    {/* Remember Me Checkbox */}
                    {/* <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded border-gray-700 bg-gray-800 
                                     text-green-500 focus:ring-2 focus:ring-green-500"
                                />
                                <label
                                    htmlFor="rememberMe"
                                    className="text-gray-200"
                                >
                                    Save my name, email, and website in this browser for the next time I comment.
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-400 text-black font-medium rounded-full hover:bg-green-500 transition-colors duration-200"
                            >
                                Post Comment
                            </button>
                        </form>
                    </section> */}
                </div>

                {/* Sidebar */}
                <div className=" flex flex-col justify-center md:justify-start">

                    <div className='px-3 space-y-4'>

                        {/* Popular Categories */}
                        <div className="bg-[#242424] rounded-lg p-6 mb-6">
                            <h2 className="text-2xl font-bold mb-4 text-white">Popular Categories</h2>
                            <ul className="space-y-3">
                                {categories.map((category, index) => (
                                    <li key={index} className="flex items-center gap-2  pb-2 border-b border-dashed border-[#3A3A3A]">
                                        <span className="text-green-400">↗</span>
                                        <a href="" className="text-gray-400 hover:text-green-400 transition-colors">
                                            {category.charAt(0).toUpperCase() + category?.slice(1)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter Section */}
                        <div className="bg-[#030303] rounded-xl p-6">
                            <h2 className="text-xl  mb-4 text-white">Newsletter</h2>
                            <p className='pb-5 text-gray-400'>
                                Signup our newsletter to get update information, news, insight or promotions.
                            </p>
                            <input
                                type="Name"
                                placeholder="Enter your Name"
                                className="w-full px-4 py-2 mb-3 bg-[#242424] rounded-full text-white focus:outline-none focus:border focus:border-green-400"
                            />
                            <input
                                type="email"
                                placeholder="Enter your Email"
                                className="w-full px-4 py-2 mb-3 bg-[#242424] rounded-full text-white focus:outline-none focus:border focus:border-green-400"
                            />
                            <button className="w-full bg-green-400 text-gray-900 py-2 flex justify-center items-center gap-2 rounded-full hover:bg-green-500 transition-colors">
                                <Mail />
                                Sign up
                            </button>
                        </div>

                        {/* Latest posts  */}
                        <div className="bg-[#242424] p-8 rounded-lg md:w-11/12">
                            <h2 className="text-2xl  mb-6">Latest Blogs</h2>
                            <div className="space-y-6">
                                {trendingBlogs.map((post, index) => (
                                    <div key={index} className="flex space-x-4">
                                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ">
                                            <img
                                                src={`${process.env.REACT_APP_API_BASE}/${post?.image?.filename}`}
                                                alt={post.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-medium hover:text-blue-400 transition-colors duration-200 pr-5">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-gray-400">{formatTimestamp(post.updatedAt)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogContent;