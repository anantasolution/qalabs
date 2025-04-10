import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columns, getAllAdmin } from "../data/Admin"; // Import API function
import Breadcrumbs from "../components/Breadcrumbs";
import AdminDeletePopUp from "../components/AdminDeletePopUp"; // Import ConfirmPopUp component
import Tooltip from "@mui/material/Tooltip";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from '@mui/icons-material/LockReset';
import axios from "axios"; 
import AdminEditPopup from "../components/AdminEditPopUp";
import ResetPasswordPopUp from "../components/ResetPasswordPopUp"; // Import ResetPasswordPopUp component
import { toast } from "react-toastify"; // Import toast for notifications

const Admin = () => {
    const [loading, setLoading] = useState(true);
    const [admins, setAdmins] = useState([]); // Store contacts from backend
    const [filterData, setFilterData] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // Add searchQuery state
    const [confirmPopUp, setConfirmPopUp] = useState(false); // State for confirm popup
    const [editPopUp, setEditPopUp] = useState(false); // State for confirm popup
    const [resetPasswordPopUp, setResetPasswordPopUp] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null); // State for selected contact

    const fetchAdmins = async () => {
        setLoading(true);
        try {
            const data = await getAllAdmin();
            if (!data || !Array.isArray(data)) {
                console.error("Invalid data received:", data);
                setAdmins([]); // Set empty array to avoid errors
            } else {
                setAdmins(data);

            }
        } catch (error) {
            console.error("Error fetching admins:", error);
            setAdmins([]); // Ensure state is always an array
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    useEffect(() => {
        const filterData = () => {
            if (!searchQuery) {
                setFilterData(admins);
            } else {
                const filteredData = admins.filter((admin) => {
                    const usernameMatch = admin.username
                        .toString()
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
                    const emailMatch = admin.email
                        .toString()
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
                    return usernameMatch || emailMatch;
                });
                setFilterData(filteredData);
            }
        };
        filterData();
    }, [searchQuery, admins]);

    const handleDeleteAdmin = async () => {
        if (selectedAdmin && selectedAdmin._id) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/admin/deleteAdmin/${selectedAdmin._id}`);

                // Filter out deleted contact
                setAdmins((prevAdmins) => prevAdmins.filter(admin => admin._id !== selectedAdmin._id));

                setConfirmPopUp(false);
                setSelectedAdmin(null);
                toast.success("Admin deleted successfully");
            } catch (error) {
                console.error("Error deleting admin:", error);
                toast.error("Failed to delete admin. Please try again.");

            }
        }
    };

    const handleEditAdmin = async (updatedAdminData) => {
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API_BASE_URL}/admin/updateAdmin/${updatedAdminData._id}`,
                updatedAdminData
            );

            setAdmins((prevAdmins) =>
                prevAdmins.map((admin) =>
                    admin._id === updatedAdminData._id ? { ...admin, ...updatedAdminData } : admin
                )
            );

            setEditPopUp(false);
            setSelectedAdmin(null);
            toast.success("Admin updated successfully!");
        } catch (error) {
            console.error("Error updating admin:", error);
            toast.error("Failed to update admin. Please try again.");
        }
    };

    const handleResetPasswordAdmin = async (adminId, newpassword) => {
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API_BASE_URL}/admin/changePassword/${adminId}`,
                {
                    newpassword,
                }
            );

            toast.success("Password reset successfully!"); 
            setResetPasswordPopUp(false);
            setSelectedAdmin(null);
        }
        catch (error) {
            console.error("Error deleting admin:", error); 
          
            if (error.response) {
              console.error("Response Data:", error.response.data); 
              console.error("Status Code:", error.response.status);
              console.error("Headers:", error.response.headers);
            }
          
            toast.error("Failed to delete admin. Please try again.");
          }
    };



    const handleOpenConfirmPopUp = (admin) => {
        setSelectedAdmin(admin);
        setConfirmPopUp(true);
    };


    const handleOpenEditPopUp = (admin) => {
        setSelectedAdmin(admin);
        setEditPopUp(true);
    };


    const handleOpenResetPasswordPopUp = (admin) => {
        setSelectedAdmin(admin);
        setResetPasswordPopUp(true);
    };

    const updatedColumns = [
        ...columns,
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            flex: 1,
            minWidth: 220,
            renderCell: (params) => {
                return (
                    <div className="flex items-center gap-4 h-full">
                        <Tooltip title="Delete" arrow>
                            <span
                                onClick={() => handleOpenConfirmPopUp(params.row)}
                                className="bg-red-500 hover:bg-red-600 transition-colors duration-300 text-white w-8 h-8 flex justify-center items-center rounded-full cursor-pointer"
                            >
                                <DeleteOutlineIcon className="text-white" style={{ fontSize: '1.4rem' }} />
                            </span>
                        </Tooltip>

                        <Tooltip title="Edit" arrow>
                            <span
                                onClick={() => handleOpenEditPopUp(params.row)}
                                className="bg-blue-600 hover:bg-blue-800 transition-colors duration-300 text-white w-8 h-8 flex justify-center items-center rounded-full cursor-pointer"
                            >
                                <EditIcon className="text-white" style={{ fontSize: '1.4rem' }} />
                            </span>
                        </Tooltip>

                        <Tooltip title="Delete" arrow>
                            <span
                                onClick={() => handleOpenResetPasswordPopUp(params.row)}
                                className="bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 text-white w-8 h-8 flex justify-center items-center rounded-full cursor-pointer"
                            >
                                <LockResetIcon className="text-white" style={{ fontSize: '1.4rem' }} />
                            </span>
                        </Tooltip>

                    </div>
                )
            }
        },
    ];

    return (
        <div className="h-full w-full bg-gray-100 flex flex-col">
            <Breadcrumbs setSearchQuery={setSearchQuery}  fetchAdmins={fetchAdmins} />
            {/* Table Section */}
            <div className="h-full w-full p-6">
                <div className="h-full bg-white px-4 py-5 rounded-md shadow-md">
                    <Box sx={{ height: "100%" }}>
                        <DataGrid
                            rows={filterData}
                            columns={updatedColumns}
                            getRowId={(row) => row._id}
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
            {confirmPopUp && (
                <AdminDeletePopUp
                    setIsOpen={setConfirmPopUp}
                    onConfirm={handleDeleteAdmin}
                />
            )}
            {editPopUp && (
                <AdminEditPopup
                    setIsOpen={setEditPopUp}
                    selectedAdmin={selectedAdmin}
                    handleEditAdmin={handleEditAdmin}
                />
            )}
            {resetPasswordPopUp && selectedAdmin && (
                <ResetPasswordPopUp
                    setIsOpen={setResetPasswordPopUp}
                    selectedAdmin={selectedAdmin}
                    handleResetPasswordAdmin={handleResetPasswordAdmin}
                />
            )}


        </div>
    );
};

export default Admin;