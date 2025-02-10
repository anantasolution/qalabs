//Wrire column data
import { useState } from "react";

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

export const rows = [
  {
    id: 1,
    name: "John Carter",
    company: "Global Solutions Ltd.",
    email: "john.carter@example.com",
    phone: "9876543210",
    message: "Looking for business strategy consultation.",
    createdAt: "2025-02-10",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    company: "Tech Innovators Inc.",
    email: "sarah.mitchell@techinnovators.com",
    phone: "8765432109",
    message: "Need guidance on digital transformation.",
    createdAt: "2025-02-09",
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    company: "Finance Experts LLC",
    email: "michael.rodriguez@financeexperts.com",
    phone: "7654321098",
    message: "Looking for financial planning advice.",
    createdAt: "2025-02-08",
  },
  {
    id: 4,
    name: "Emma Johnson",
    company: "Healthcare Solutions",
    email: "emma.johnson@healthcare.com",
    phone: "6543210987",
    message: "Need consultation on medical regulations.",
    createdAt: "2025-02-07",
  },
  {
    id: 5,
    name: "David Brown",
    company: "Marketing Experts Ltd.",
    email: "david.brown@marketingexperts.com",
    phone: "5432109876",
    message: "Seeking digital marketing strategy advice.",
    createdAt: "2025-02-06",
  },
];
