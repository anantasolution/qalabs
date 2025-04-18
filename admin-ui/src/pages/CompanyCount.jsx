import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Pencil, X } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import LinearProgress from '@mui/material/LinearProgress';

const CompanyCount = () => {
    const [companyCount, setCompanyCount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [editingItem, setEditingItem] = useState({ Title: "", value: 0 });

    // Function to generate random pastel colors
    const generatePastelColor = () => {
        const r = Math.floor(Math.random() * 55) + 200;
        const g = Math.floor(Math.random() * 55) + 200;
        const b = Math.floor(Math.random() * 55) + 200;
        return {
            background: `rgb(${r}, ${g}, ${b})`,
            text: `rgb(${Math.floor(r * 0.2)}, ${Math.floor(g * 0.2)}, ${Math.floor(b * 0.2)})`,
        };
    };

    // Generate colors once when component mounts
    const [cardColors] = useState([
        generatePastelColor(),
        generatePastelColor(),
        generatePastelColor()
    ]);

    const fetchCompanyCount = async () => {
        setLoading(true); // Set loading to true when fetching starts
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/company-count/`
            );
            setCompanyCount(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching counts:", error);
            toast.error("Failed to fetch. Please try again.");
        } finally {
            setTimeout(() => {
                setLoading(false); // Set loading to false when fetching ends
            }, 300);
        }
    };

    const handleEditClick = (title, value) => {
        setEditingItem({ Title: title, value });
        setIsEditPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsEditPopupOpen(false);
    };

    const handleSaveEdit = async () => {
        try {
            const fieldMapping = {
                "Projects Done": "ProjectDone",
                "Happy Clients": "HappyClients",
                "Client Reviews": "ClientReviews"
            };

            const fieldToUpdate = fieldMapping[editingItem.Title];

            if (!fieldToUpdate) {
                toast.error("Invalid field to update");
                return;
            }

            const companyCountId = companyCount._id; // or however you access the ID

            await axios.put(
                `${process.env.REACT_APP_API_BASE_URL}/company-count/${companyCountId}`,
                {
                    [fieldToUpdate]: editingItem.value,
                    Title: editingItem.Title
                }
            );

            // Update local state
            setCompanyCount(prev => ({
                ...prev,
                [fieldToUpdate]: editingItem.value,
                Title: editingItem.Title
            }));

            toast.success(`${editingItem.Title} updated successfully!`);
            setIsEditPopupOpen(false);
        } catch (error) {
            console.error("Error updating count:", error);
            toast.error("Failed to update. Please try again.");
        }
    };

    // Function to refresh company count data
    const refreshCompanyCount = () => {
        fetchCompanyCount();
    };

    useEffect(() => {
        fetchCompanyCount();
    }, []);

    console.log(editingItem)

    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col">
            <Breadcrumbs title="Company Count" refreshCompanyCount={refreshCompanyCount} />
            <div className="p-6 h-full w-full">
                <div className="p-6 bg-white rounded-md mx-auto shadow">
                    {loading ? (
                        <div className="text-gray-500 text-center mx-auto py-8" style={{ width: "30%" }}> Loading... <LinearProgress className="my-3 py-1 rounded-lg" /> </div>
                    ) : companyCount ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: "Projects Done", value: companyCount.ProjectDone },
                                { label: "Happy Clients", value: companyCount.HappyClients },
                                { label: "Client Reviews", value: companyCount.ClientReviews },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    style={{ backgroundColor: cardColors[idx].background }}
                                    className="p-6 rounded-xl shadow text-center relative md:min-h-[200px] flex flex-col justify-center"
                                >

                                    <h3
                                        className="text-lg md:text-xl font-semibold"
                                        style={{ color: cardColors[idx].text }}
                                    >
                                        {item.label}
                                    </h3>
                                    <p
                                        className="text-3xl md:text-4xl font-bold mt-2"
                                        style={{ color: cardColors[idx].text }}
                                    >
                                        {item.value}
                                    </p>
                                    <button
                                        className="absolute top-2 right-2 text-white p-2 rounded"
                                        style={{ backgroundColor: "rgb(79, 135, 234)" }}
                                        onClick={() => handleEditClick(item.label, item.value)}
                                    >
                                        <Pencil size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 text-center">No data available.</div>
                    )}
                </div>
            </div>

            {/* Edit Popup Modal */}
            {isEditPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Edit Count</h3>
                            <button
                                onClick={handleClosePopup}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={editingItem.Title}
                                    readOnly
                                    onChange={(e) => setEditingItem({ ...editingItem, Title: e.target.value })}
                                    className="w-full px-3 py-2 border outline-none border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Count
                                </label>
                                <input
                                    type="number"
                                    value={editingItem.value}
                                    onChange={(e) => setEditingItem({ ...editingItem, value: parseInt(e.target.value) || 0 })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={handleClosePopup}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveEdit}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyCount;