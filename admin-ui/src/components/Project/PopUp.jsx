import React, { useEffect } from 'react';

const PopUp = ({ isOpen, onClose, onConfirm, projectTitle }) => {
    useEffect(() => {
        // Handle escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 border"
            onClick={handleBackdropClick}
        >
            <div className="relative max-w-md w-full mx-4">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="p-6 pb-0">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-red-100 rounded-full">
                                {/* Delete Icon */}
                                <svg
                                    className="w-6 h-6 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Delete Project 
                            </h2>
                        </div>
                        <p className="mt-4 text-gray-600">
                            Are you sure you want to delete "<span className="font-medium">{projectTitle}</span>"?
                            This action cannot be undone and all data associated with this will be permanently removed.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="p-6 pt-4 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUp;