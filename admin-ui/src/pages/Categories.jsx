import React, { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import axios from "axios";
import AddCategory from "../components/AddCategory";
import { toast } from "react-toastify";
import DeleteCategoryPopup from "../components/DeleteCategoryPopup";

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


  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/category/all`
      );

      const formattedCategories = data.data.map((category) => ({
        _id: category._id,
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

  const [isOpen, setIsOpen] = useState(false);

  // function for deleting category
  const [isDeleting, setIsDeleting] = useState(false);
  const [categoryName, setCategoryName] = useState(null);
  const [id, setId] = useState(null);

  const handleDelete = (id, name) => {
    setIsDeleting(true);
    setCategoryName(name);
    setId(id);
  }

  const onConfirm = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/category/delete/${id}`);
      console.log(response);
      toast.success("Category and Blogs related to this category deleted.");
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete category.");
    }
  }

  useEffect(() => {
    fetchData();
  }, [isDeleting]);

  

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <AddCategory setIsOpen={setIsOpen} fetchData={fetchData} />
      </div>}
      {isDeleting && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <DeleteCategoryPopup onCancel={setIsDeleting} categoryName={categoryName} onConfirm={onConfirm} />
      </div>}
      <div className="h-full w-full bg-gray-100 flex flex-col">
        <Breadcrumbs setIsOpen={setIsOpen} />

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
                        {category.name?.charAt(0).toUpperCase() + category.name?.slice(1)}
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
                      <button
                        onClick={() => handleDelete(category?._id, category.name)}
                        className="flex items-center justify-center p-1.5 bg-red-500 hover:bg-red-600  text-white text-sm font-medium rounded-lg transition-colors duration-200"
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
