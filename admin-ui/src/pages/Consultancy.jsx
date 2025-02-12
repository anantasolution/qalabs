import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columns, fetchConsultations } from "../data/Consultant";
import { AlertCircle } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import ConfirmPopUp from "../components/ConfirmPopUp"; // Import ConfirmPopUp component
import Tooltip from "@mui/material/Tooltip";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";


const Consultancy = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [consultations, setConsultations] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [error] = useState(null);
  const [confirmPopUp, setConfirmPopUp] = useState(false); // State for confirm popup
  const [selectedConsultation, setSelectedConsultation] = useState(null); // State for selected contact
  

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

 useEffect(() => {
    const filterData = () => {
      if (!searchQuery) {
        setFilterData(consultations);
      } else {
        const filteredData = consultations.filter((consultation) => {
          const nameMatch = consultation.name
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          const emailMatch = consultation.email
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          return nameMatch || emailMatch;
        });
        setFilterData(filteredData);
      }
    };
    filterData();
  }, [searchQuery, consultations]);

  const handleDeleteConsultation = async () => {
    if (selectedConsultation && selectedConsultation._id) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/consulation/delete/${selectedConsultation._id}`);
        
        // Filter out deleted consultation
        setConsultations((prevConsultations) => prevConsultations.filter(consultation => consultation._id !== selectedConsultation._id));
        
        setConfirmPopUp(false);
        setSelectedConsultation(null);
      } catch (error) {
        console.error("Error deleting consultation:", error);
      }
    }
  };

    const handleOpenConfirmPopUp = (consultation) => {
      setSelectedConsultation(consultation);
      setConfirmPopUp(true);
    };

    const updatedColumns = [
      ...columns,
      {
        field: "delete",
        headerName: "Action",
        sortable: false,
        renderCell: (params) => {
          return (
              <div className="flex items-center gap-3 h-full">
             <Tooltip title="Delete" arrow>
  <span
       onClick={() => handleOpenConfirmPopUp(params.row)}
      className="bg-red-500 hover:bg-red-600 transition-colors duration-300 text-white w-8 h-8 flex justify-center items-center rounded-full cursor-pointer"
  >
      <DeleteOutlineIcon className="text-white" style={{ fontSize: '1.4rem' }} />
  </span>
  </Tooltip>
          
          </div>
          )
      }
      },
    ];

  return (
    <div className="h-full w-full bg-gray-100 flex flex-col">
      <Breadcrumbs setSearchQuery={setSearchQuery} />
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
              rows={filterData}
              columns={updatedColumns}
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
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </div>
      </div>
      {confirmPopUp && (
        <ConfirmPopUp
          setIsOpen={setConfirmPopUp}
          onConfirm={handleDeleteConsultation}
        />
      )}
    </div>
  );
};

export default Consultancy;
