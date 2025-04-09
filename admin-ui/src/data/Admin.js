import axios from "axios";

export const getAllAdmin = async () => {
    try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/admin/getAllAdmin`
        );

        console.log("Received Data:", data); // Debugging log

        if (!data || !Array.isArray(data.data)) {
            console.error("Invalid data format:", data);
            return [];
        }

        const formattedAdmins = data.data.map((admin) => ({
            ...admin,
            id: admin._id,
            createdAt: formatDate(admin.createdAt),
        }));

        return formattedAdmins;
    } catch (error) {
        console.error("Error fetching admins:", error);
        return [];
    }
};

const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


export const columns = [
    {
        field: "srNo", 
        headerName: "Sr No",
        minWidth: 100,
        sortable: false,      
        filterable: false,
        renderCell: (params) => {
          const sortedRows = params.api.getSortedRowIds?.();
          if (!sortedRows) return "";
          const index = sortedRows.indexOf(params.id);
          return index !== -1 ? index + 1 : "";
        },
      },
    { field: "username", headerClassName: "super-app-theme--header", headerName: "Name", minWidth: 220 },
    { field: "email", headerClassName: "super-app-theme--header", headerName: "Email", minWidth: 220 },
    { field: "mobileno", headerClassName: "super-app-theme--header", headerName: "Mobile No", minWidth: 220 },
    { field: "createdAt", headerName: "Created At", minWidth: 150 },


];
