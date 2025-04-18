import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumbs from '../components/Breadcrumbs';
import LinearProgress from '@mui/material/LinearProgress';
import { Trash2, X } from 'lucide-react';

const Logo = () => {
    const [logos, setLogos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [logoToDelete, setLogoToDelete] = useState(null);

    // Define fetchLogos function
    const fetchLogos = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/photos`);
            setLogos(response.data.map((item)=>`${process.env.REACT_APP_API_BASE_LOGO}/${item.image.filename}`));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    console.log(logos)

    // Open delete confirmation modal
    const openDeleteModal = (id) => {
        setLogoToDelete(id);
        setShowDeleteModal(true);
    };

    // Close delete confirmation modal
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setLogoToDelete(null);
    };

    // Define deleteLogo function
    const deleteLogo = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/photos/${logoToDelete}`);
            setLogos(logos.filter(logo => logo._id !== logoToDelete));
            closeDeleteModal();
        } catch (err) {
            setError(err);
            closeDeleteModal();
        }
    };

    useEffect(() => {
        fetchLogos();
    }, []);

    if (loading) return (
        <div className="text-gray-500 text-center mx-auto py-8" style={{ width: "30%" }}>
            Loading... <LinearProgress className="my-3 py-1 rounded-lg" />
        </div>
    );

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col">
            <Breadcrumbs title="Logo" refreshCompanyCount={fetchLogos} />

            <div className="h-full w-full p-6">
                <div className="h-full bg-white px-4 py-5 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Our Logos</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {logos.map(logo => (
                            <div key={logo._id} className="flex flex-col justify-center items-center">
                                <img
                                    src={logo}
                                    alt={"image"}
                                    className="h-24 w-auto"
                                />
                                <button
                                    onClick={() => openDeleteModal(logo._id)}
                                    className="mt-2 bg-red-500 text-white p-1 rounded hover:bg-red-600 flex items-center justify-center"
                                    aria-label="Delete logo"
                                >
                                    <Trash2 />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-80 shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Confirm Delete</h3>
                            <button 
                                onClick={closeDeleteModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <p className="mb-6">Are you sure you want to delete this logo? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={closeDeleteModal}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteLogo}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Logo;