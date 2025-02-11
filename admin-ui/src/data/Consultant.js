import { useState } from "react";
import axios from "axios";

const SwitchButton = function () {
  const [isOn, setIsOn] = useState(true);

  return (
    <div
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
        isOn ? "bg-green-500" : "bg-red-500"
      }`}
      onClick={() => setIsOn(!isOn)}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ${
          isOn ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

// Function to fetch all consultations
export const fetchConsultations = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/consulation/getall`
    );

    console.log("Received Data:", data);

    if (!data || !Array.isArray(data.consultations)) {
      console.error("Invalid data format received from server:", data);
      return [];
    }
    const formattedConsultations = data.consultations.map((consultation) => ({
      ...consultation,
      createdAt: formatDate(consultation.createdAt),
    }));
    return formattedConsultations;
  } catch (error) {
    console.error("Error fetching consultations:", error);
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
    field: "id",
    headerClassName: "super-app-theme--header",
    headerName: "Sr No",
    minWidth: 100,
  },
  {
    field: "name",
    headerClassName: "super-app-theme--header",
    headerName: "Name",
    minWidth: 220,
  },
  {
    field: "company",
    headerClassName: "super-app-theme--header",
    headerName: "Company",
    minWidth: 220,
  },
  {
    field: "phone",
    headerClassName: "super-app-theme--header",
    headerName: "Phone",
    minWidth: 180,
  },
  {
    field: "email",
    headerClassName: "super-app-theme--header",
    headerName: "Email",
    minWidth: 220,
  },
  {
    field: "message",
    headerClassName: "super-app-theme--header",
    headerName: "Message",
    minWidth: 220,
  },
  {
    field: "createdAt",
    headerClassName: "super-app-theme--header",
    headerName: "Created At",
    minWidth: 220,
  },
];
