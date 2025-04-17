// AddAdmin.js
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddAdmin({ isOpen, onClose, setAdmins, setFilterData, searchQuery, fetchAdmins }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPermanent, setIsPermanent] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobileno: "",
    password: "",
    isPermanent: false
  });
  const validateData = (name, value) => {
    const newErrors = { ...errors };
    const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (name !== "isPermanent") {
      if (value === "" || value === null || value === undefined) {
        newErrors[name] = `${name} is required`;
      } else {
        delete newErrors[name];
      }
  
      if (name === "email" && value && !EmailRegex.test(value)) {
        newErrors[name] = "Invalid email format";
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateData(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    Object.entries(formData).forEach(([key, value]) => {
      const valid = validateData(key, value);
      if (!valid) isValid = false;
    });

    if (!isValid) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/createAdmin`,
        { ...formData }
      );

      if (response?.status === 201) {
        fetchAdmins(); // Fetch updated admins list   
        // Update admins and filterData states


        setFormData({ username: "", email: "", mobileno: "", password: "", isPermanent: false });
        setErrors({});
        onClose();
        toast.success("Admin registered successfully!");
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message || "Error registering admin.");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-80 z-40" />

        {/* Modal Container */}
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg z-50">
            <h2 className="text-2xl font-semibold mb-4 text-center">Register Admin</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium">
                  Admin Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded outline-none"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <span className="text-xs text-red-500">{errors.username}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded outline-none"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium">
                  Mobile No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded outline-none"
                  name="mobileno"
                  value={formData.mobileno}
                  onChange={handleChange}
                />
                {errors.mobileno && <span className="text-xs text-red-500">{errors.mobileno}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="w-full p-2 border border-gray-300 rounded pr-10"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium">
                  isPermanent <span className="text-red-500">*</span>
                </label>
                <input
                  type="checkbox"
                  checked={isPermanent}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setIsPermanent(checked);
                    setFormData({ ...formData, isPermanent: checked });
                    validateData("isPermanent", checked);
                  }}
                />
                {errors.isPermanent && <span className="text-xs text-red-500">{errors.isPermanent}</span>}

              </div>


              <div className="flex justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
}