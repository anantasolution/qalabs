import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPopUp({ setIsOpen, selectedAdmin, handleResetPasswordAdmin }) {
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    new_password: "",
  });

  const validateData = (name, value) => {
    let newErrors = { ...errors };

    if (!value) {
      newErrors[name] = `${name.replace("_", " ")} is required`;
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateData(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        validateData(key, formData[key]);
        isValid = false;
      }
    });

    if (!isValid) return;

    try {
      await handleResetPasswordAdmin(selectedAdmin._id,  formData.new_password);
    } catch (error) {
      console.error("Reset password failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Reset Password</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>

       
          {/* New Password */}
          <div className="relative">
            <label className="block text-sm font-medium">
              New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={newPasswordVisible ? "text" : "password"}
                className="w-full p-2 border border-gray-300 rounded pr-10"
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
              />
              {errors.new_password && (
                <span className="text-xs text-red-500">{errors.new_password}</span>
              )}
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-sm"
                onClick={() => setNewPasswordVisible(!newPasswordVisible)}
              >
                {newPasswordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
