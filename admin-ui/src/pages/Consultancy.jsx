import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columns, fetchConsultations } from "../data/Consultant";
import { AlertCircle } from "lucide-react";
import Breadcrumbs from '../components/Breadcrumbs';

const Consultancy = () => {
  const [loading, setLoading] = useState(true);
  const [consultations, setConsultations] = useState([]);
  const [error] = useState(null);

  useEffect(() => {
    const loadConsultations = async () => {
      setLoading(true);
      try {
        const data = await fetchConsultations();
        if (!data || !Array.isArray(data)) {
          console.error("invalid data format received from server:", data);
          setConsultations([]);
        } else {
          setConsultations(
            data.map((consultations, index) => ({
              ...consultations,
              id: index + 1,
            }))
          );
        }
      } catch (err) {
        console.error("Error loading consultations:", err);
        setConsultations([]);
      }
      setLoading(false);
    };

    loadConsultations();
  }, []);

  return (

    <div className="h-full w-full bg-gray-100 flex flex-col">
      <div className="">
        <Breadcrumbs />
      </div>
      {/* Table Section */}
      <div className="h-full w-full p-6">
        <div className="h-full bg-white px-4 py-5 rounded-md shadow-md">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center text-red-700">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>{error}</span>
            </div>
          )}
          <Box sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={consultations}
              columns={columns}
              loading={loading}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Consultancy;
