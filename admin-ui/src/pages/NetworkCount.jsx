import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Pencil, X } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import LinearProgress from "@mui/material/LinearProgress";

const NetworkCount = () => {
    const [networkList, setNetworkList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [editingItem, setEditingItem] = useState({ _id: "", Title: "", Count: "", Description: "" });

    const generatePastelColor = () => {
        const r = Math.floor(Math.random() * 55) + 200;
        const g = Math.floor(Math.random() * 55) + 200;
        const b = Math.floor(Math.random() * 55) + 200;
        return {
            background: `rgb(${r}, ${g}, ${b})`,
            text: `rgb(${Math.floor(r * 0.2)}, ${Math.floor(g * 0.2)}, ${Math.floor(b * 0.2)})`,
        };
    };

    const [cardColors] = useState([
        generatePastelColor(),
        generatePastelColor(),
        generatePastelColor(),
    ]);

    const fetchNetworkList = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/networks`);
            setNetworkList(data);
            console.log(data)
        } catch (error) {
            console.error("Error fetching network list:", error);
            toast.error("Failed to fetch network data.");
        } finally {
            setTimeout(() => setLoading(false), 300);
        }
    };

    const handleEditClick = (item) => {
        setEditingItem(item);
        setIsEditPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsEditPopupOpen(false);
    };

    const handleSaveEdit = async () => {
        try {
            const { _id, Title, Count, Description } = editingItem;
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/networks/${_id}`, {
                Title,
                Count,
                Description,
            });

            setNetworkList((prev) =>
                prev.map((item) =>
                    item._id === _id ? { ...item, Title, Count, Description } : item
                )
            );

            toast.success("Network item updated successfully!");
            setIsEditPopupOpen(false);
        } catch (error) {
            console.error("Error updating network item:", error);
            toast.error("Failed to update network item.");
        }
    };

    useEffect(() => {
        fetchNetworkList();
    }, []);

    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col">
            <Breadcrumbs title="Network Count" refreshCompanyCount={fetchNetworkList} />
            <div className="p-6 h-full w-full">
                <div className="p-6 bg-white rounded-md mx-auto shadow">
                    {loading ? (
                        <div className="text-gray-500 text-center mx-auto py-8" style={{ width: "30%" }}>
                            Loading... <LinearProgress className="my-3 py-1 rounded-lg" />
                        </div>
                    ) : networkList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {networkList.map((item, idx) => {
                                const colors = cardColors[idx % cardColors.length];
                                return (
                                    <div
                                        key={item._id}
                                        style={{ backgroundColor: colors.background }}
                                        className="p-6 rounded-xl shadow text-center relative md:min-h-[200px] flex flex-col justify-center"
                                    >
                                        <h3
                                            className="text-lg md:text-xl font-semibold"
                                            style={{ color: colors.text }}
                                        >
                                            {item.Title}
                                        </h3>
                                        <p
                                            className="text-3xl md:text-4xl font-bold mt-2"
                                            style={{ color: colors.text }}
                                        >
                                            {item.Count}
                                        </p>
                                        <p
                                            className="text-sm mt-2 text-gray-600"
                                            style={{ color: colors.text }}
                                        >
                                            {item.Description}
                                        </p>
                                        <button
                                            className="absolute top-2 right-2 text-white p-2 rounded"
                                            style={{ backgroundColor: "rgb(79, 135, 234)" }}
                                            onClick={() => handleEditClick(item)}
                                        >
                                            <Pencil size={16} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-gray-500 text-center">No network items found.</div>
                    )}
                </div>
            </div>

            {isEditPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Edit Network Item</h3>
                            <button
                                onClick={handleClosePopup}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={editingItem.Title}
                                    onChange={(e) =>
                                        setEditingItem({ ...editingItem, Title: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Count</label>
                                <input
                                    type="text"
                                    value={editingItem.Count}
                                    onChange={(e) =>
                                        setEditingItem({ ...editingItem, Count: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={editingItem.Description}
                                    onChange={(e) =>
                                        setEditingItem({ ...editingItem, Description: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    rows={3}
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

export default NetworkCount;
