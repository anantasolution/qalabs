import { useState } from "react";

const SwitchButton = function () {
    const [isOn, setIsOn] = useState(true);

    return (
        <div
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${isOn ? "bg-green-500" : "bg-red-500"}`}
            onClick={() => setIsOn(!isOn)}
        >
            <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ${isOn ? "translate-x-6" : "translate-x-0"}`}
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
        field: "subject",
        headerClassName: "super-app-theme--header",
        headerName: "Subject",
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
    { id: 1, name: "Stylic", company: "Tech Solutions", phone: "8272625212", email: "stylic@gmail.com", subject: "Project Inquiry", message: "Looking for a web development team.", createdAt: "2024-02-10" },
    { id: 2, name: "John Doe", company: "Oceanic Ventures", phone: "9123456789", email: "johndoe@example.com", subject: "Service Request", message: "Need details about your services.", createdAt: "2024-02-09" },
    { id: 3, name: "Jane Smith", company: "Mountain Corp", phone: "8987654321", email: "janesmith@gmail.com", subject: "Job Application", message: "Applying for a software engineer role.", createdAt: "2024-02-08" },
    { id: 4, name: "Alex Johnson", company: "Sunset Industries", phone: "8234567890", email: "alex.johnson@outlook.com", subject: "Partnership Proposal", message: "Interested in a business collaboration.", createdAt: "2024-02-07" },
    { id: 5, name: "Emily Brown", company: "Royal Heritage Ltd.", phone: "9988776655", email: "emily.brown@yahoo.com", subject: "Event Sponsorship", message: "Looking for sponsors for an event.", createdAt: "2024-02-06" },
    { id: 6, name: "Michael White", company: "Skyline Technologies", phone: "7766554433", email: "michael.white@example.com", subject: "Technical Support", message: "Need help with software integration.", createdAt: "2024-02-05" },
    { id: 7, name: "Sarah Green", company: "Lakeside Enterprises", phone: "6677889900", email: "sarah.green@mail.com", subject: "Product Inquiry", message: "Want details on your latest products.", createdAt: "2024-02-04" }
];