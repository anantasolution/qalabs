import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import SearchIcon from "@mui/icons-material/Search";
import BlogCards from "../components/Blog/BlogCards";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import axios from "axios";
import { toast } from "react-toastify";

// For formatting date format
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
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  // Return formatted string with the extra space after hh:mm
  return `${day} ${month} ${year}`;
};

const extractParagraphs = (htmlString) => {
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
  return matches
    ? matches.map((tag) => tag.replace(/<\/?p[^>]*>/g, "")).join("\n")
    : htmlString.trim();

    // Match content inside <p>...</p> tags
    const matches = htmlString.match(/<p[^>]*>(.*?)<\/p>/g);
    
    // Extract text content from matched <p> tags, or return original text if no <p> tags are found
    return matches ? await matches.map(tag => tag.replace(/<\/?p[^>]*>/g, "")).join("\n") : htmlString.trim();
};

const Blogs = () => {

  const [loading, setLoading] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Add searchQuery state
  const [selectedCategory, setSelectedCategory] = useState(""); // Add selectedCategory state
  const [filteredBlogs, setFilteredBlogs] = useState([]); // Add filteredBlogs state

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/blogs/getAllBlog`
      );

      const blogs = await Promise.all(
        response.data.data.map(async (item, index) => ({
          ...item,
          updatedAt: formatTimestamp(item.updatedAt), // Format timestamp
          category_name: item.category.category_name,
          content: extractParagraphs(item.content),
        }))
      );

      setBlogs(blogs);
      setFilteredBlogs(blogs); // Initialize filteredBlogs
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);


    const [blogs, setBlogs] = useState([]);

    const fetchData = async ()=>{
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/blogs/getAllBlog`);

            const blogs = response.data.data.map((item, index) => ({
                ...item,
                updatedAt: formatTimestamp(item.updatedAt), // Format timestamp
                category_name: item.category.category_name,
                content : extractParagraphs(item.content)
            }));


            setBlogs(blogs);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      let filteredData = blogs;

      if (searchQuery) {
        filteredData = filteredData.filter(
          (blog) =>
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.category_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedCategory) {
        filteredData = filteredData.filter(
          (blog) =>
            blog.category_name.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      setFilteredBlogs(filteredData);
    };

    filterData();
  }, [searchQuery, selectedCategory, blogs]);

  return (
    <>
      <section className="flex flex-col borde">
        {/* Navbar code */}
        <Breadcrumbs
          setSearchQuery={setSearchQuery}
          setSelectedCategory={setSelectedCategory}
        />{" "}
        {/* Pass setSearchQuery and setSelectedCategory */}
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
            <BlogCards data={filteredBlogs} /> {/* Use filteredBlogs */}
          </Box>
        </div>
      </section>
    </>
  );
};

export default Blogs;
