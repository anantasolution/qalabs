import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import SearchIcon from "@mui/icons-material/Search";

const Breadcrumbs = ({ setSearchQuery, setIsOpen }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isDashboard = location.pathname.includes("/dashboard");
  const isBlogPage = location.pathname.includes("/allblogs");
  const isCategoryPage = location.pathname.includes("/category"); // ✅ Check for category page

  return (
    <div className="p-4 bg-white shadow flex flex-wrap justify-between items-center">
      {/* ✅ Left Side: Breadcrumbs */}
      <div className="flex items-center text-gray-700 flex-wrap space-x-2">
        <Link to="/" className="hover:text-gray-950 text-lg font-semibold">
          Home
        </Link>
        {pathnames.length > 0 && <ChevronRight className="h-5 w-5 text-gray-400" />}

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const formattedName = name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

          return (
            <div key={routeTo} className="flex items-center">
              {!isLast ? (
                <Link to={routeTo} className="hover:text-gray-900">{formattedName}</Link>
              ) : (
                <span className="text-gray-400">{formattedName}</span>
              )}
              {!isLast && <ChevronRight className="h-5 w-5 ms-2 text-gray-400" />}
            </div>
          );
        })}
      </div>

      {/* ✅ Right Side: Search & Buttons */}
      <div className="flex items-center space-x-4 mt-2 md:mt-0">
        {/* Search Bar - Hidden on Dashboard */}
        {!isDashboard && (
          <div className="relative w-full sm:w-64">
            <SearchIcon className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e)=> setSearchQuery(e.target.value)}
            />
          </div>
        )}

        {/* ✅ Add Blog Button - Only on /allblogs */}
        {isBlogPage && (
          <Link
            to="/admin/blogs/add_blog"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm sm:text-base"
          >
            Add Blog
          </Link>
        )}

        {/* ✅ Add Category Button - Only on /category */}
        {isCategoryPage && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm sm:text-base"
            onClick={()=>setIsOpen(true)}
          >
            Add Category
          </button>
        )}
      </div>
    </div>
  );
};

export default Breadcrumbs;
