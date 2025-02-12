import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columns, getAllContacts } from "../data/ContactUs"; // Import API function
import Breadcrumbs from "../components/Breadcrumbs";

const ContactUs = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]); // Store contacts from backend
  const [filterData, setFilterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Add searchQuery state
 

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

  return (
    <div className="h-full w-full bg-gray-100 flex flex-col">
        <Breadcrumbs setSearchQuery={setSearchQuery} />
      {/* Table Section */}
      <div className="h-full w-full p-6">
        <div className="h-full bg-white px-4 py-5 rounded-md shadow-md">
          <Box sx={{ height: "100%" }}>
            <DataGrid
              rows={filterData} // Use filterData instead of contacts
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
              checkboxSelection
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;