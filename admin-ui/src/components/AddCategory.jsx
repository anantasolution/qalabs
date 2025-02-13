import axios from 'axios';
import React, { useState } from 'react';
import {toast} from "react-toastify"

const AddCategory = ({ setIsOpen, fetchData}) => {
  
  const [categoryName, setCategoryName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cheking if category name field is not empty
    if(categoryName.trim() === "" || !categoryName){
      toast.warn("Category name is required to add Category.");
      return;
    }
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/category/create`, { category_name : categoryName?.toLowerCase() });
      fetchData();
      if(response){
        toast.success("Category added successfully.");
      }
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };


  return (
    
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">

      <h1 className='w-full text-center py-4 text-xl font-semibold'>Add Category</h1>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Category Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={categoryName}
                onChange={e=> setCategoryName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
  );
};

export default AddCategory;