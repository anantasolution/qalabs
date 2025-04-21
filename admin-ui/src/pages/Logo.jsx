import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumbs from '../components/Breadcrumbs';
import LinearProgress from '@mui/material/LinearProgress';
import { Trash2, X } from 'lucide-react';
import { toast } from 'react-toastify';

const Logo = () => {
    const [logos, setLogos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [logoToDelete, setLogoToDelete] = useState(null);

    const fetchLogos = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/photos`);
            setLogos(response.data.map((item) => ({
                _id: item._id,
                url: `${process.env.REACT_APP_API_BASE_LOGO}/${item.image.filename}`
            })));
        } catch (err) {
            setError(err);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }
    };

    const openDeleteModal = (id) => {
        setLogoToDelete(id);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setLogoToDelete(null);
    };

    const deleteLogo = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/photos/${logoToDelete}`);
            setLogos(logos.filter(logo => logo._id !== logoToDelete));
            closeDeleteModal();
            toast.success('🗑️ Logo deleted successfully!');
        } catch (err) {
            setError(err);
            closeDeleteModal();
            toast.error('❌ Failed to delete logo!');
        }
    };

    useEffect(() => {
        fetchLogos();
    }, []);

    return (
        <div className="min-h-screen w-full bg-gray-50 flex flex-col">
            <Breadcrumbs title="Logo" refreshCompanyCount={fetchLogos} />
            <div className="h-full w-full p-4 sm:p-6">
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                    {loading ? (
                        <div className="text-gray-500 text-center mx-auto py-8" style={{ width: "30%" }}>
                            Loading... <LinearProgress className="my-3 py-1 rounded-lg" />
                        </div>
                    ) : logos.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {logos.map(logo => (
                                <div key={logo._id} className="bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center">
                                    <img
                                        src={logo.url}
                                        alt="logo"
                                        className="h-24 w-auto object-contain mb-2"
                                    />
                                    <button
                                        onClick={() => openDeleteModal(logo._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                                        aria-label="Delete logo"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-10">No logos found.</p>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Confirm Delete</h3>
                            <button
                                onClick={closeDeleteModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <p className="mb-6 text-sm text-gray-700">
                            Are you sure you want to delete this logo? This action cannot be undone.
                        </p>
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
