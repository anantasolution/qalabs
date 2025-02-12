import React, { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import axios from "axios";

const Categories = () => {
  // Function to generate random light colors
  const generatePastelColor = () => {
    // Generate higher values for RGB to ensure light colors
    const r = Math.floor(Math.random() * 55) + 200; // 200-255
    const g = Math.floor(Math.random() * 55) + 200; // 200-255
    const b = Math.floor(Math.random() * 55) + 200; // 200-255

    // Create darker version for text (60% of the background color)
    const textR = Math.floor(r * 0.2);
    const textG = Math.floor(g * 0.2);
    const textB = Math.floor(b * 0.2);

    return {
      background: `rgb(${r}, ${g}, ${b})`,
      text: `rgb(${textR}, ${textG}, ${textB})`,
    };
  };

  const date = new Date().toLocaleDateString("IN");

  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/category/all`
        );

        const formattedCategories = data.data.map((category) => ({
          name: category.category_name,
          count: category.blogs.length,
          updatedAt: new Date(category.updatedAt).toLocaleDateString("en-IN"), // Correct locale
          colors: generatePastelColor(),
        }));

        setCategory(formattedCategories); // Update state once
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-full w-full bg-gray-100 flex flex-col">
      <div className="">
        <Breadcrumbs />
      </div>
      <div className="p-6 h-full w-full">
        <div className="p-6 bg-white h-full rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.map((category) => (
              <div
                key={category.name}
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
                        Last Updated : {date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
