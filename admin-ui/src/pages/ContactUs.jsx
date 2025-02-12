import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columns, getAllContacts } from "../data/ContactUs"; // Import API function
import Breadcrumbs from "../components/Breadcrumbs";
import ConfirmPopUp from "../components/ConfirmPopUp"; // Import ConfirmPopUp component
import Tooltip from "@mui/material/Tooltip";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";

const ContactUs = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]); // Store contacts from backend
  const [filterData, setFilterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Add searchQuery state
  const [confirmPopUp, setConfirmPopUp] = useState(false); // State for confirm popup
  const [selectedContact, setSelectedContact] = useState(null); // State for selected contact

  useEffect(() => { 
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const data = await getAllContacts();
        if (!data || !Array.isArray(data)) {
          console.error("Invalid data received:", data);
          setContacts([]); // Set empty array to avoid errors
        } else {
          setContacts(
            data.map((contact, index) => ({ ...contact, id: index + 1 }))
          );
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setContacts([]); // Ensure state is always an array
      }
      setLoading(false);
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const filterData = () => {
      if (!searchQuery) {
        setFilterData(contacts);
      } else {
        const filteredData = contacts.filter((contact) => {
          const nameMatch = contact.name
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          const emailMatch = contact.email
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          return nameMatch || emailMatch;
        });
        setFilterData(filteredData);
      }
    };
    filterData();
  }, [searchQuery, contacts]);

  const handleDeleteContact = async () => {
    if (selectedContact && selectedContact._id) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/contact/delete/${selectedContact._id}`);
        
        // Filter out deleted contact
        setContacts((prevContacts) => prevContacts.filter(contact => contact._id !== selectedContact._id));
        
        setConfirmPopUp(false);
        setSelectedContact(null);
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };
  
  const handleOpenConfirmPopUp = (contact) => {
    setSelectedContact(contact);
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
          <Box sx={{ height: "100%" }}>
            <DataGrid
              rows={filterData} // Use filterData instead of contacts
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
            />
          </Box>
        </div>
      </div>
      {confirmPopUp && (
        <ConfirmPopUp
          setIsOpen={setConfirmPopUp}
          onConfirm={handleDeleteContact}
        />
      )}
    </div>
  );
};

export default ContactUs;