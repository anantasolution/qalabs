import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X, CheckCircle, Trash2 } from "lucide-react";

const ConfirmPopUp = ({ setIsOpen, onConfirm }) => {
    const [modalState, setModalState] = useState("confirm"); // 'confirm', 'cancelled', 'deleted'

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => setModalState("confirm"), 300); // Reset state after animation
    };

    const handleCancel = () => {
        setModalState("cancelled");
        setTimeout(handleClose, 1500); // Automatically close after 1.5 seconds
    };

    return (
        <AnimatePresence>
            <motion.div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <motion.div
                    className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", duration: 0.5, bounce: 0.4 } }}
                    exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6">
                        {modalState === "confirm" && (
                            <div className="space-y-6">
                                <motion.div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                                    <Trash2 className="w-8 h-8 text-red-500" />
                                </motion.div>
                                <div className="text-center space-y-2">
                                    <h2 className="text-2xl font-semibold text-gray-800">Are you sure?</h2>
                                    <p className="text-gray-600">You won't be able to revert this!</p>
                                </div>
                                <div className="flex gap-3 justify-center">
                                    <motion.button
                                        className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition-colors"
                                        onClick={handleCancel}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        No, Cancel!
                                    </motion.button>
                                    <motion.button
                                        className="px-6 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                                        onClick={onConfirm}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Yes, Delete it!
                                    </motion.button>
                                </div>
                            </div>
                        )}
                        {modalState === "cancelled" && (
                            <div className="space-y-6">
                                <motion.div 
                                    className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                >
                                    <X className="w-8 h-8 text-blue-500" />
                                </motion.div>
                                <div className="text-center space-y-2">
                                    <h2 className="text-2xl font-semibold text-gray-800">Cancelled</h2>
                                    <p className="text-gray-600">Your contact is safe!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ConfirmPopUp;