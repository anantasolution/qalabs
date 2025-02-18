import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProjectCards from "../components/Project/ProjectCards";
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

  // Extract day, short month, and year
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  // Return formatted string
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
};

const Projects = () => {
  const [loading, setLoading] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Add searchQuery state
  const [filteredProjects, setFilteredProjects] = useState([]); // Add filteredProjects state
 
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/project/getallprojects`
      );
  
      console.log("API Response:", response.data); // Debugging line
  
      if (!Array.isArray(response.data.data)) {
        throw new Error("Invalid API response format: Expected an array");
      }
  
      const projects = response.data.data.map((item) => ({
        ...item,
        updatedAt: formatTimestamp(item.updatedAt), // Format timestamp
        description: extractParagraphs(item.description),
      }));
  
      setProjects(projects);
      setFilteredProjects(projects);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch projects");
    }
  };
  
  

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      let filteredData = projects;

      if (searchQuery) {
        filteredData = filteredData.filter(
          (project) =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredProjects(filteredData);
    };

    filterData();
  }, [searchQuery, projects]);

  return (
    <>
      <section className="flex flex-col borde">
        {/* Navbar code */}
        <Breadcrumbs setSearchQuery={setSearchQuery} /> {/* Pass setSearchQuery */}
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
            <ProjectCards data={filteredProjects} /> {/* Use filteredProjects */}
          </Box>
        </div>
      </section>
    </>
  );
};

export default Projects;