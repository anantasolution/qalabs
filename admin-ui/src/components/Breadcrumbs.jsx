import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import SearchIcon from "@mui/icons-material/Search";
import { rows as initialRows } from "../data/Consultant"; // Import your data

const Breadcrumbs = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [filteredRows, setFilteredRows] = useState(initialRows); // Filtered data state

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Handle search input change
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter rows based on the search term
    const filteredData = initialRows.filter((row) =>
      Object.values(row).some(
        (field) => typeof field === "string" && field.toLowerCase().includes(value)
      )
    );
    setFilteredRows(filteredData);
  };

  return (
    <div className="p-4 bg-white shadow rounded-md flex justify-between items-center">
      {/* Breadcrumbs (Left Side) */}
      <div className="flex items-center space-x-2 text-gray-700">
        <Link to="/" className="hover:text-gray-950 text-xl font-semibold">Home</Link>
        {pathnames.length > 0 && <ChevronRight className="h-5 w-5 text-gray-400" />}

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const formattedName =
            name.replace(/-/g, " ").charAt(0).toUpperCase() + name.replace(/-/g, " ").slice(1);

          return (
            <div key={routeTo} className="flex items-center">
              {!isLast ? (
                <Link to={routeTo} className="hover:underline">{formattedName}</Link>
              ) : (
                <span className="text-gray-400">{formattedName}</span>
              )}
              {!isLast && <ChevronRight className="h-5 w-5 text-gray-400" />}
            </div>
          );
        })}
      </div>

      {/* Search Bar (Right Side) */}
      <div className="relative w-64">
        <SearchIcon className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      
    </div>
  );
};

export default Breadcrumbs;
