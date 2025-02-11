import axios from "axios";

export const getAllContacts = async () => {
    try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/contact/getall`
        );
        
        console.log("Received Data:", data); // Debugging log

        if (!data || !Array.isArray(data.contacts)) {
            console.error("Invalid data received:", data);
            return [];
        }
        const formattedContacts = data.contacts.map((contact) => ({
            ...contact,
            createdAt: formatDate(contact.createdAt),
          }));
          return formattedContacts;
    } catch (error) {
        console.error("Error fetching contacts:", error);
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
    { field: "id", headerClassName: "super-app-theme--header", headerName: "Sr No", minWidth: 100 },
    { field: "name", headerClassName: "super-app-theme--header", headerName: "Name", minWidth: 220 },
    { field: "company", headerClassName: "super-app-theme--header", headerName: "Company", minWidth: 220 },
    { field: "phone", headerClassName: "super-app-theme--header", headerName: "Phone", minWidth: 180 },
    { field: "email", headerClassName: "super-app-theme--header", headerName: "Email", minWidth: 220 },
    { field: "subject", headerClassName: "super-app-theme--header", headerName: "Subject", minWidth: 220 },
    { field: "message", headerClassName: "super-app-theme--header", headerName: "Message", minWidth: 220 },
    { field: "createdAt", headerClassName: "super-app-theme--header", headerName: "Created At", minWidth: 220 },
];
