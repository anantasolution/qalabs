import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columns, rows } from "../data/Consultant"; // Importing Data

const Consultancy = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="h-full w-full bg-gray-100 flex flex-col">
      {/* Table Section */}
      <div className="h-full w-full p-6">
        <div className="h-full bg-white px-4 py-5 rounded-md shadow-md">
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
              checkboxSelection
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Consultancy;
