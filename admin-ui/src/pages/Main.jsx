import React, { useState, useEffect } from "react";
import axios from "axios";
import { DashboardCards } from "../constant/DashboardCard";
import Breadcrumbs from "../components/Breadcrumbs";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "../data/ContactUs";

const Main = () => {
  const dashboardCards = DashboardCards();

  // State to manage table rows and loading state
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Fetch latest contacts from API using Axios
  useEffect(() => {
    const fetchLatestContacts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/contact/latestcontact`
        );

        if (response.data.success) {
          const formattedRows = response.data.data.map((row, index) => ({
            ...row,
            id: index + 1, // Ensure unique ID for DataGrid
            createdAt: formatDate(row.createdAt), // Format the date
            updatedAt: formatDate(row.updatedAt), // Format the date
          }));
          setRows(formattedRows);
        } else {
          console.error("Error fetching contacts:", response.data.message);
          setRows([]);
        }
      } catch (error) {
        console.error("Failed to fetch contacts:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestContacts();
  }, []);

  const StatCard = ({ icon: Icon, title, value, color, progress }) => {
    return (
      <div className="bg-white rounded-lg shadow-md relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-1 h-full ${color}`} />
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
                <Icon className={`w-6 h-6 ${color.replace("bg-", "text-")}`} />
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
      <Breadcrumbs />
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dashboardCards.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

       

        {/* Table Section */}
        <div className="h-full w-full relative pt-1 mt-8"> {/* Removed redundant margin-top */}
          <div className="h-full bg-white px-4 py-5 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">Latest Contacts</h2>
          <br />
            <Box sx={{ height: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                loading={loading}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
