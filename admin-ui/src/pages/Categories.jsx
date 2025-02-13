import React, { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import axios from "axios";

const Categories = () => {
  // Function to generate random light colors
  const generatePastelColor = () => {
    const r = Math.floor(Math.random() * 55) + 200; // 200-255
    const g = Math.floor(Math.random() * 55) + 200; // 200-255
    const b = Math.floor(Math.random() * 55) + 200; // 200-255

    // Create a darker version for text (20% of the background color)
    const textR = Math.floor(r * 0.2);
    const textG = Math.floor(g * 0.2);
    const textB = Math.floor(b * 0.2);

    return {
      background: `rgb(${r}, ${g}, ${b})`,
      text: `rgb(${textR}, ${textG}, ${textB})`,
    };
  };

  const [category, setCategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // Add selectedCategory state
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/category/all`
        );

        const formattedCategories = data.data.map((category) => ({
          name: category.category_name,
          count: category.blogs.length,
          updatedAt: new Date(category.updatedAt).toLocaleDateString("en-IN"),
          colors: generatePastelColor(),
        }));

        setCategory(formattedCategories);
        setFilteredCategories(formattedCategories); // Initialize filtered list
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      let filteredData = category;

      if (searchQuery) {
        filteredData = filteredData.filter((cat) =>
          cat.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedCategory) {
        filteredData = filteredData.filter((cat) =>
          cat.name.toLowerCase().includes(selectedCategory.toLowerCase())
        );
      }

      setFilteredCategories(filteredData);
    };

    filterData();
  }, [searchQuery, selectedCategory, category]);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      {/* ✅ Pass setSearchQuery and setSelectedCategory as props to Breadcrumbs */}
      <Breadcrumbs
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="p-6 h-full w-full">
        <div className="p-6 bg-white rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* ✅ Use filteredCategories instead of category */}
            {filteredCategories.map((category, index) => (
              <div
                key={`${category.name}-${index}`} // ✅ Ensure unique key
                className="rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                style={{ backgroundColor: category.colors.background }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: category.colors.text }}
                    >
                      {category.name}
                    </h3>
                    <div
                      className="bg-white rounded-full px-3 py-1 text-sm font-medium shadow-sm"
                      style={{ color: category.colors.text }}
                    >
                      {category.count} posts
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-8 h-1 rounded"
                        style={{ backgroundColor: category.colors.text }}
                      />
                      <span className="text-gray-500 text-sm">
                        Last Updated : {category.updatedAt}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* ✅ Show message if no categories match search */}
            {filteredCategories.length === 0 && (
              <div className="col-span-3 text-center text-gray-500">
                No categories found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
