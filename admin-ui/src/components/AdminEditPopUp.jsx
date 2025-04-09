import React, { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const AdminEditPopup = ({ setIsOpen, selectedAdmin, handleEditAdmin }) => {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        username: selectedAdmin?.username || "",
        email: selectedAdmin?.email || "",     
        mobileno: selectedAdmin?.mobileno || "",
        password: selectedAdmin?.password || "",
    });

    useEffect(() => {
        if (selectedAdmin) {
            setFormData({
                username: selectedAdmin.username || "",
                email: selectedAdmin.email || "",
                mobileno: selectedAdmin.mobileno || "",
                password: selectedAdmin.password || "",
            });
        }
    }, [selectedAdmin]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedAdmin || !selectedAdmin._id) {
            console.error("selectedAdmin is undefined or missing _id");
            return;
        }
    
        handleEditAdmin({ ...formData, _id: selectedAdmin._id }); 
    };
    

    return (
        <AnimatePresence>
            <motion.div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/80">
                <motion.div
                    className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", duration: 0.5, bounce: 0.4 } }}
                    exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-semibold text-center mb-4">Edit Admin</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-black">Admin Name</label>
                                <input type="text" name="username" value={formData.username} className="border p-2 rounded w-full" onChange={handleChange} />
                            </div>
                           
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                        <div>
                                <label className="block text-sm font-medium text-black">Email</label>
                                <input type="email" name="email" value={formData.email} className="border p-2 rounded w-full" onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black">Mobile No</label>
                                <input type="text" name="mobileno" value={formData.mobileno} className="border p-2 rounded w-full" onChange={handleChange} />
                            </div>
                            
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-black">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    className="border p-2 rounded w-full pr-10" // Add padding to prevent icon overlap
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center text-black"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4 mt-4">
                            <button type="button" className="px-6 py-2 rounded bg-gray-500 text-white cursor-pointer" onClick={() => setIsOpen(false)}>Cancel</button>
                            <button type="submit" className="px-6 py-2 rounded bg-blue-600 text-white cursor-pointer">Edit</button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AdminEditPopup;


