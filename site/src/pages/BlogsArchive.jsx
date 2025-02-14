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

    // Extract day, short month, and year
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" })
    const year = date.getFullYear();

    // Return formatted string with the extra space after hh:mm
    return `${day} ${month} ${year}`;
};

const BlogsArchive = ()=>{

    const [blogs, setBlogs] = useState([]);

    const [loading, setLoading] = useState(true);

    const extractParagraphs = (htmlString) => {
        if (!htmlString) return ""; // Handle empty or undefined input

        // Remove all HTML tags and keep only the text content
        return htmlString
            .replace(/<\/?[^>]+(>|$)/g, "") // Remove all HTML tags
            .trim(); // Remove extra spaces
    };


    useEffect(() => {
        const getBlogs = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/blogs/getAllBlog`);
                const blogs = response.data.data.map((item) => ({
                    ...item,
                    updatedAt: formatTimestamp(item.updatedAt), // Format timestamp
                    category_name: item.category.category_name,
                    content: extractParagraphs(item?.content) // Now extracts only text
                }));
                setBlogs(blogs);
                setLoading(false);
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
            {
                loading ? 
                    <div className="w-full p-10 h-[500px] bg-black/90 flex justify-center items-center">
                    <div className="animate-spin border-e-2 border-green-500 h-14 w-14 rounded-full"></div>
                </div>
                :
                    <BlogCardsPage data={blogs} /> 
            }
        </>
    )
}

export default BlogsArchive;