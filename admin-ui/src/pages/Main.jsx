import React from "react";
import { DashboardCards } from "../constant/DashboardCard";
import Breadcrumbs from "../components/Breadcrumbs";

const Main = () => {
  const dashboardCards = DashboardCards();

  const StatCard = ({ icon: Icon, title, value, color, progress }) => {
    return (
      <div className="bg-white rounded-lg shadow-md relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-1 h-full ${color}`} />
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
                </div>
                <p className="text-gray-600">{title}</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                <div
                  className={`transition-all duration-500 ease-in-out ${color}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Breadcrumbs></Breadcrumbs>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboardCards.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;