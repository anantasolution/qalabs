import { motion } from "framer-motion"
import BlogCardsPage from "../components/blogs/BlogCardsPage";
import { useEffect } from 'react';
import axios from "axios"
import { useState } from 'react';
import BI from "../assets/background.jpeg";


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

const BlogsArchive = ()=>{

    const [blogs, setBlogs] = useState([]);

    const extractParagraphs = async (htmlString) => {
        if (!htmlString) return ""; // Handle empty or undefined input

        // Check if the input contains any HTML tags
        const hasHtmlTags = /<\/?[a-z][\s\S]*>/i.test(htmlString);

        if (!hasHtmlTags) {
            // If there are no HTML tags, return the original text
            return htmlString.trim();
        }

        // Match content inside <p>...</p> tags
        const matches = htmlString.match(/<p[^>]*>(.*?)<\/p>/g);

        // Extract text content from matched <p> tags, or return original text if no <p> tags are found
        return matches ? await matches.map(tag => tag.replace(/<\/?p[^>]*>/g, "")).join("\n") : htmlString.trim();
    };


    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/blogs/getAllBlog`);
                console.log(response);

                const blogs = response.data.data.map((item, index) => (
                    {
                    ...item,
                    updatedAt: formatTimestamp(item.updatedAt), // Format timestamp
                    category_name: item.category.category_name,
                    content : extractParagraphs(item?.content)

                }));
                setBlogs(blogs);
            } catch (error) {
                console.log(error);
            }
        }

        getBlogs();
    }, [])

    return (
        <>
             <div
                   className="relative min-h-[50vh] md:min-h-[60vh]  bg-cover bg-center"
                   style={{ backgroundImage: `url(${BI})` }}
                 >
                <section className="text-center py-32">
                    <motion.h1
                        className="text-4xl sm:text-6xl font-bold text-[#7CD7F9]"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        Article & <span className="text-[#5CDA92]">News</span>
                    </motion.h1>
                    <motion.p
                        className="text-lg sm:text-xl font-semibold mt-4 text-white"
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        Archives
                    </motion.p>
                </section>
            </div>
            <BlogCardsPage data={blogs} />
        </>
    )
}

export default BlogsArchive;