import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Filter,RefreshCcw } from "lucide-react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import AddAdmin from "../pages/AddAdmin"; // Adjust path as needed

const Breadcrumbs = ({ fetchAdmins, searchQuery, setSearchQuery, setSelectedCategory, setIsOpen, refreshCompanyCount }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isDashboard = location.pathname.includes("/dashboard");
  const isBlogPage = location.pathname.includes("/allblogs");
  const isCategoryPage = location.pathname.includes("/category");
  const isProjectPage = location.pathname.includes("/allprojects");
  const isFeedbackPage = location.pathname.includes("feedback");
  const isAdminPage = location.pathname.includes("/admin/user");
  const isCompanyCountPage = location.pathname.includes("/companycount");

  // State for categories
  const [categories, setCategories] = useState([]);
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [ filterData, setFilterData] = useState([]);

  // Fetch categories from API on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/category/all`
        );
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="p-4 bg-white shadow flex flex-wrap justify-between items-center">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-gray-700 flex-wrap space-x-2">
        <Link to="/" className="hover:text-gray-950 text-lg font-semibold">
          Home
        </Link>
        {pathnames.length > 0 && (
          <ChevronRight className="h-5 w-5 text-gray-400" />
        )}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const formattedName = name
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
          return (
            <div key={routeTo} className="flex items-center">
              {!isLast ? (
                <Link to={routeTo} className="hover:text-gray-900">
                  {formattedName}
                </Link>
              ) : (
                <span className="text-gray-400">{formattedName}</span>
              )}
              {!isLast && (
                <ChevronRight className="h-5 w-5 ms-2 text-gray-400" />
              )}
            </div>
          );
        })}
      </div>

      {/* Search, Dropdown & Buttons */}
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0">
        {/* Search Bar - Hidden on Dashboard and Company Count Page */}
        {!isDashboard && !isCompanyCountPage && (
          <div className="relative w-full sm:w-64">
            <SearchIcon className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        {/* Refresh Button - Only on Company Count Page */}
        {isCompanyCountPage && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md text-sm sm:text-base"
            onClick={refreshCompanyCount}
          >
            <RefreshCcw />
          </button>
        )}

        {/* Dropdown for Category Selection */}
        {(isCategoryPage || isBlogPage) && (
          <div className="relative w-full sm:w-64">
            <Filter className="absolute left-3 top-[10px] text-gray-800" />
            <select
              className="border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm sm:text-base w-full"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category.category_name}>
                  {category?.category_name?.charAt(0).toUpperCase() + category?.category_name?.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Add Blog Button - Only on /allblogs */}
        {isBlogPage && (
          <Link
            to="/admin/blogs/add_blog"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm sm:text-base w-full sm:w-auto text-center"
          >
            Add Blog
          </Link>
        )}

        {/* Add Category Button - Only on /category */}
        {isCategoryPage && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm sm:text-base"
            onClick={() => setIsOpen(true)}
          >
            Add Category
          </button>
        )}

        {/* Add Project Button - Only on /allprojects */}
        {isProjectPage && (
          <Link
            to="/admin/projects/add_project"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm sm:text-base w-full sm:w-auto text-center"
          >
            Add Project
          </Link>
        )}

        {/* Add Feedback Button - Only on /allfeedback */}
        {isFeedbackPage && (
          <Link
            to="/admin/feedback/add_feedback"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm sm:text-base w-full sm:w-auto text-center"
          >
            Add Feedback
          </Link>
        )}

        {isAdminPage && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm sm:text-base w-full sm:w-auto text-center"
            onClick={() => setIsAddAdminOpen(true)}
          >
            Add Admin
          </button>
        )}

        <AddAdmin
          isOpen={isAddAdminOpen}
          onClose={() => setIsAddAdminOpen(false)}
          setAdmins={setAdmins}
          userId={null}
          setFilterData={setFilterData}
          searchQuery={searchQuery}
          fetchAdmins={fetchAdmins}
        />
      </div>
    </div>
  );
};

export default Breadcrumbs;