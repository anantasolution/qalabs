import React from "react";

//Importing components
import { DashboardCards } from "../constant/DashboardCard";

// importing icons
import { MoreVertical } from "lucide-react";
import { ChevronRight } from "lucide-react";
import SearchIcon from "@mui/icons-material/Search";


function Main() {

  const StatCard = ({
    icon: Icon,
    title,
    value,
    total,
    amount,
    percentage,
    color,
  }) => {
    return (
      <div className="bg-white rounded-lg p-6 custom-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-gray-100">
              <Icon className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {value}/{total}
              </h3>
              <p className="text-gray-600">{title}</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-4">
          <p className="text-gray-600 mb-2">{title}</p>
          <div className="relative pt-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                  <div
                    className={`w-full flex flex-col justify-center rounded ${color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <span className="ml-4 text-gray-600">
                {amount ? `$${amount.toLocaleString()}` : ` ${percentage}% `} (
                {percentage}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="w-full flex items-center justify-between p-4 bg-white border-b">
        {/* Left side - Breadcrumbs */}
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
          <ChevronRight className="h-5 w-5 text-gray-400" />
          <span className="text-gray-500">Home</span>
          <ChevronRight className="h-5 w-5 text-gray-400" />
          <span className="text-gray-400">Dashboard</span>
        </div>

        {/* Right side - Filter and Date Range */}
        <div className="flex items-center space-x-4">
          <div className="md:flex hidden border rounded-md p-1.5 gap-1.5 justify-center items-center">
            <span>
              <SearchIcon></SearchIcon>
            </span>
            <input
              type="text"
              className="outline-none"
              placeholder="Search here...."
            ></input>
          </div>
          
        </div>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DashboardCards.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;