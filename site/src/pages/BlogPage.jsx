import React, { useEffect, useState } from 'react';
import BlogHeroSection from '../components/blogs/BlogHeroSection';
import BlogContent from '../components/blogs/BlogContent';
import { useLocation } from "react-router-dom";
import axios from 'axios';

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

const BlogPage = () => {

    const location = useLocation();

    const [blogPost, setBlogPost] = useState({
        title: '',
        category: '',
        content: '',
        image: null,
        imagePreview: '',
        updatedAt : ''
    });

    useEffect(() => {
        const getBlogData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/blogs/getSpecificBlog/${location.state}`);
                setBlogPost({
                    category: response.data?.data?.category?.category_name,
                    content: response.data?.data?.content,
                    image: response.data?.data?.image?.filename,
                    title: response.data?.data?.title,
                    updatedAt: formatTimestamp(response?.data?.data?.updatedAt)
                });

            } catch (error) {
                console.log(error);
            }
        }
        getBlogData();
    }, [])

    return (
        <>
            <BlogHeroSection data={blogPost} />
            <BlogContent data={blogPost} />
        </>
    );
};

export default BlogPage;